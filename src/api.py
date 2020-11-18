import os

from fastapi import FastAPI

# https://github.com/tiangolo/fastapi/issues/840
# https://fastapi.tiangolo.com/tutorial/sql-databases/


app = FastAPI()

@app.get("/test")
def test():
    return os.environ['DATABASE_URL']
