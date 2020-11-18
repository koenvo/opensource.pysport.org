import os

from fastapi import FastAPI

app = FastAPI()

@app.get("/test")
def test():
    return os.environ['DATABASE_URL']
