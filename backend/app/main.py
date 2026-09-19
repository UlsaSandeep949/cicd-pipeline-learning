from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Pipeline Dashboard API",
    version="1.0.0"
)

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Pipeline Dashboard API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "OK",
        "service": "pipeline-backend"
    }


@app.get("/pipelines")
def get_pipelines():
    return {
        "pipelines": [
            {
                "id": 1,
                "name": "Data Pipeline",
                "status": "Success"
            },
            {
                "id": 2,
                "name": "ETL Pipeline",
                "status": "Running"
            },
            {
                "id": 3,
                "name": "ML Pipeline",
                "status": "Failed"
            },
            {
                "id": 4,
                "name": "MMMM Pipeline",
                "status": "Failed"
            }
        ]
    }
