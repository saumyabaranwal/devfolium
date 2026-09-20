from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.portfolio import Portfolio
from app.schemas.portfolio import (
    PortfolioCreate,
    PortfolioResponse,
    PortfolioUpdate,
)

router = APIRouter(prefix="/portfolios", tags=["Portfolios"])


@router.post(
    "",
    response_model=PortfolioResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_portfolio(
    payload: PortfolioCreate,
    db: Session = Depends(get_db),
):
    portfolio = Portfolio(
        slug=payload.slug,
        title=payload.title,
        theme_id=payload.theme_id,
        profile=payload.profile,
    )

    try:
        db.add(portfolio)
        db.commit()
        db.refresh(portfolio)
        return portfolio
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="That portfolio slug is already taken.",
        )


@router.get("", response_model=list[PortfolioResponse])
def list_portfolios(db: Session = Depends(get_db)):
    statement = select(Portfolio).order_by(Portfolio.updated_at.desc())
    return list(db.scalars(statement).all())


@router.get("/{portfolio_id}", response_model=PortfolioResponse)
def get_portfolio(
    portfolio_id: UUID,
    db: Session = Depends(get_db),
):
    portfolio = db.get(Portfolio, portfolio_id)

    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found.")

    return portfolio


@router.patch("/{portfolio_id}", response_model=PortfolioResponse)
def update_portfolio(
    portfolio_id: UUID,
    payload: PortfolioUpdate,
    db: Session = Depends(get_db),
):
    portfolio = db.get(Portfolio, portfolio_id)

    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found.")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(portfolio, field, value)

    db.commit()
    db.refresh(portfolio)
    return portfolio


@router.delete(
    "/{portfolio_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_portfolio(
    portfolio_id: UUID,
    db: Session = Depends(get_db),
):
    portfolio = db.get(Portfolio, portfolio_id)

    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found.")

    db.delete(portfolio)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)