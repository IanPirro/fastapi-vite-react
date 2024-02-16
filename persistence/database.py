from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from application.utils.config import get_settings

engine = create_engine(get_settings().sql_alchemy_database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
