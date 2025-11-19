from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/api/chat")
async def chat(request: Request):
    data = await request.json()
    message = data.get("message", "").lower()

    # Dummy chatbot response logic
    if "hello" in message:
        reply = "Hello! How can I assist you today?"
    elif "help" in message:
        reply = "Sure, I am here to help. What do you need assistance with?"
    else:
        reply = "Sorry, I didn't understand that."

    return JSONResponse(content={"reply": reply})
