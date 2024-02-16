from fastapi import APIRouter, Depends, Security, status

from application.schema import TokenPayload, UserCreate, UserResponse
from application.services.user_service import UserService
from application.utils.oauth2 import TokenVerifier
from domain.models.user import UserModel

auth = TokenVerifier()

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("/me", status_code=status.HTTP_200_OK, response_model=UserResponse)
def get_me(
    user_svc: UserService = Depends(UserService),
    auth_result: TokenPayload = Security(auth.verify),
):
    return user_svc.get_user_by_external_id(auth_result.sub)


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
def create_user(
    user: UserCreate,
    user_svc: UserService = Depends(UserService),
    auth_result: TokenPayload = Security(auth.verify),
):
    return user_svc.create_user(auth_result.sub, user)


@router.put("/onboarding", status_code=status.HTTP_200_OK)
def update_onboarding(
    user_svc: UserService = Depends(UserService),
    current_user: UserModel = Security(auth.get_current_user),
):
    return user_svc.update_onboarding(user_id=current_user.id)
