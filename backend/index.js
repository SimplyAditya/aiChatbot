import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const apiKey = "AIzaSyD810JzxNQJsh7jzc2RcHqI9JE4o05kaus";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.post("/", async (request, response) => {
  const { chats } = request.body;

  const prompt = `You are AkliluGPT. You can help with graphic design tasks. ${chats.map((chat) => chat.content).join('\n')}`;

  try {
    
    const result = await model.generateContent(prompt);
    const output = result.response.text();
    console.log(output)
    response.json({
      output,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});