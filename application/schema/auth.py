from typing import List

from pydantic import BaseModel


class TokenPayload(BaseModel):
    iss: str
    sub: str
    aud: List[str]
    iat: int
    exp: int
    azp: str
    scope: str
