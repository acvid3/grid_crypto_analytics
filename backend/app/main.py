from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.api.investment_routes import root_router, api_router

app = FastAPI(
    title="Grid Crypto Analytics API", 
    version="1.0.0",
    description="API for grid trading strategy backtesting using Binance historical data"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(root_router)
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
