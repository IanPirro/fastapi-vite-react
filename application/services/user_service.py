from fastapi import Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from application.schema.user import UserCreate
from application.utils.config import Settings, get_settings
from domain.models.user import UserModel
from persistence.database import get_db


class UserService:
    def __init__(
        self,
        db: Session = Depends(get_db),
        settings: Settings = Depends(get_settings),
    ):
        self.db = db
        self.settings = settings

    def create_user(self, external_id: str, user: UserCreate) -> UserModel:
        """
        Create a user in the database with the given external id

        :param external_id: The external id
        :param user: The user
        :return: The user
        """
        to_create = UserModel(
            external_id=external_id,
            **user.model_dump(),
        )
        self.db.add(to_create)

        try:
            self.db.commit()
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
            )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong",
            )

        self.db.refresh(to_create)

        return to_create

    def get_user_by_external_id(self, external_id: str) -> UserModel:
        """
        Get a user by external id

        :param external_id: The external id
        :return: The user
        """
        user = self.db.query(UserModel).filter_by(external_id=external_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user

    def update_onboarding(self, user_id: int) -> UserModel:
        """
        Update the onboarding status for a user

        :param user_id: The user id
        :return: The user
        """
        user = self.db.query(UserModel).filter_by(id=user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        user.has_seen_onboarding = True

        try:
            self.db.commit()
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Something went wrong",
            )
