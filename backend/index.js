// import { Configuration, OpenAIApi } from "openai";
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";

// const app = express();
// const port = 8000;
// app.use(bodyParser.json());
// app.use(cors());

// const configuration = new Configuration({
//   organization: "org-APrYWJtZ9eSQ8kVaw1wddNuX",
//   apiKey: "API_key",
// });
// const openai = new OpenAIApi(configuration);

// app.post("/", async (request, response) => {
//   const { chats } = request.body;

//   const result = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "You are AkliluGPT. You can help with graphic design tasks",
//       },
//       ...chats,
//     ],
//   });

//   response.json({
//     output: result.data.choices[0].message,
//   });
// });

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });


import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

// Replace with your Gemini API key
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