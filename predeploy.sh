curl -sL https://aka.ms/InstallAzureCLIDeb | bash
az login --service-principal -u $AZURE_APP_ID -p $AZURE_PW --tenant $AZURE_TENANT_ID
