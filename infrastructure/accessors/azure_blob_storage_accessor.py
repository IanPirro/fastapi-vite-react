import datetime

from azure.identity import DefaultAzureCredential
from azure.storage.blob import (
    BlobClient,
    BlobSasPermissions,
    BlobServiceClient,
    UserDelegationKey,
    generate_blob_sas,
)
from fastapi import Depends, HTTPException, status

from application.utils.config import Settings, get_settings


class AzureBlobStorageAccessor:
    """Azure Blob Storage Accessor"""

    def __init__(self, settings: Settings = Depends(get_settings)):
        self.account_url = settings.azure_storage_url
        self.container_name = settings.azure_storage_container
        self.credential = DefaultAzureCredential()
        self.blob_service_client = BlobServiceClient(
            account_url=self.account_url, credential=self.credential
        )
        self.container_client = self.blob_service_client.get_container_client(
            self.container_name
        )

    def upload_blob(self, blob_name: str, data: bytes):
        """Uploads a blob to the container."""
        try:
            blob_client = self.container_client.get_blob_client(blob_name)
            return blob_client.upload_blob(data, overwrite=True)
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error while uploading blob, please try again",
            )

    def request_user_delegation_key(
        self, blob_service_client: BlobServiceClient
    ) -> UserDelegationKey:
        """Requests a user delegation key from the blob service client."""

        delegation_key_start_time = datetime.datetime.now(datetime.timezone.utc)
        delegation_key_expiry_time = delegation_key_start_time + datetime.timedelta(
            days=1
        )

        try:
            user_delegation_key = blob_service_client.get_user_delegation_key(
                key_start_time=delegation_key_start_time,
                key_expiry_time=delegation_key_expiry_time,
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error while requesting user delegation key, please try again",
            )

        return user_delegation_key

    def create_user_delegation_sas_blob(
        self, blob_client: BlobClient, user_delegation_key: UserDelegationKey
    ):
        """Creates a user delegation SAS for the blob using a user delegation key."""

        start_time = datetime.datetime.now(datetime.timezone.utc)
        expiry_time = start_time + datetime.timedelta(days=1)

        sas_token = generate_blob_sas(
            account_name=blob_client.account_name,
            container_name=blob_client.container_name,
            blob_name=blob_client.blob_name,
            user_delegation_key=user_delegation_key,
            permission=BlobSasPermissions(read=True),
            expiry=expiry_time,
            start=start_time,
        )

        return sas_token

    def get_blob_sas_url(self, blob_name: str):
        """Get a blob SAS URL."""
        try:
            blob_client = self.container_client.get_blob_client(blob_name)
            user_delegation_key = self.request_user_delegation_key(
                self.blob_service_client
            )
            sas_token = self.create_user_delegation_sas_blob(
                blob_client, user_delegation_key
            )
            return blob_client.url + "?" + sas_token
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error while getting blob SAS URL, please try again",
            )
