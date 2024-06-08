from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI()

class GuestbookEntry(BaseModel):
    name: str
    message: str
    date: str

guestbook_entries: List[GuestbookEntry] = []

@app.get("/", response_class=HTMLResponse)
async def read_index():
    return FileResponse("../front/index.html")

@app.post("/guestbook", response_model=GuestbookEntry)
async def add_guestbook_entry(entry: GuestbookEntry):
    guestbook_entries.append(entry)
    return entry

@app.get("/guestbook", response_model=List[GuestbookEntry])
async def get_guestbook_entries():
    return guestbook_entries

@app.get("/css/style.css")
async def get_css():
    return FileResponse("../front/css/style.css")

@app.get("/js/script.js")
async def get_js():
    return FileResponse("../front/js/script.js")

@app.get("/img/6094668.jpg")
async def get_favicon():
    return FileResponse("../front/img/6094668.jpg")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
