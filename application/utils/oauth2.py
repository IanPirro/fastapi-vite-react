from typing import Optional

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer, SecurityScopes
from sqlalchemy.orm import Session

from application.schema.auth import TokenPayload
from domain.models.user import UserModel
from persistence.database import get_db

from .config import get_settings
from .exceptions import UnauthenticatedException, UnauthorizedException


class TokenVerifier:
    def __init__(self):
        self.config = get_settings()
        jwks_url = f"https://{self.config.auth0_domain}/.well-known/jwks.json"
        self.jwks_client = jwt.PyJWKClient(jwks_url)

    def verify(
        self,
        security_scopes: SecurityScopes,
        token: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer()),
    ) -> TokenPayload:
        if token is None:
            raise UnauthenticatedException

        try:
            signing_key = self.jwks_client.get_signing_key_from_jwt(
                token.credentials
            ).key
        except jwt.exceptions.PyJWKClientError as error:
            raise UnauthorizedException(str(error))
        except jwt.exceptions.DecodeError as error:
            raise UnauthorizedException(str(error))

        try:
            payload = jwt.decode(
                token.credentials,
                signing_key,
                algorithms=self.config.auth0_algorithms,
                audience=self.config.auth0_api_audience,
                issuer=self.config.auth0_issuer,
            )
        except Exception as error:
            raise UnauthorizedException(str(error))

        if len(security_scopes.scopes) > 0:
            self._check_claims(payload, "scope", security_scopes.scopes)

        return TokenPayload(**payload)

    def _check_claims(self, payload, claim_name, expected_value):
        if claim_name not in payload:
            raise UnauthorizedException(
                detail=f'No claim "{claim_name}" found in token'
            )

        payload_claim = payload[claim_name]

        if claim_name == "scope":
            payload_claim = payload[claim_name].split(" ")

        for value in expected_value:
            if value not in payload_claim:
                raise UnauthorizedException(detail=f'Missing "{claim_name}" scope')

    def get_current_user(
        self,
        security_scopes: SecurityScopes,
        token: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer()),
        db: Session = Depends(get_db),
    ):
        validated = self.verify(security_scopes, token)

        user = (
            db.query(UserModel).filter(UserModel.external_id == validated.sub).first()
        )

        if not user:
            raise UnauthorizedException(detail="User not found")

        return user
