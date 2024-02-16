"""create extensions

Revision ID: 993af01835d5
Revises: 
Create Date: 2024-02-16 14:21:30.850082

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "993af01835d5"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # create uuid-ossp extension
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')


def downgrade() -> None:
    # drop uuid-ossp extension
    op.execute('DROP EXTENSION IF EXISTS "uuid-ossp";')
