from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.routes.portfolios import router as portfolios_router
from app.core.config import settings
from app.database.session import get_db

# Tables are no longer created here — run `alembic upgrade head` instead.

app = FastAPI(
    title=settings.app_name,
    version="0.2.0",
    description="Backend for DevFolium — structured portfolios, themes, résumé import and local AI.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolios_router)


@app.get("/health", tags=["Health"])
def health_check(db: Session = Depends(get_db)):
    """Liveness + database check. Returns 'degraded' if Postgres is unreachable."""
    try:
        db.execute(text("SELECT 1"))
        database = "ok"
    except Exception:
        database = "unreachable"
    return {"status": "ok" if database == "ok" else "degraded", "database": database}
