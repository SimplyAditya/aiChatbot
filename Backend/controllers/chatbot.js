import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../db.js";

const chat = async (chats, prompt, uid) => {
  try {
    const apiKey = "AIzaSyD810JzxNQJsh7jzc2RcHqI9JE4o05kaus";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const toGivePrompt = `You are an AI Chatbot being used for our project. You need to help with graphic design tasks and normal casual talks. You can deny to do other tasks other than graphic design but perform the tasks that's within your capibilities. Firstly I am giving you history of prompts the user has already given to you, If the value now is null it means that there is no existing chat and you need to start from fresh ${chats
      .map((chat) => chat.prompt && chat.response)
      .join(
        "\n"
      )} Now from Here I will share the prompt that is given by the user for you to do now: ${prompt}`;
    const result = await model.generateContent(toGivePrompt);
    const output = result.response.text();
    console.log(output);
    const chatData = {
      prommpt: prompt,
      response: output,
      uid: uid,
      timestamp: new Date(),
    };
    await setDoc(doc(db, "Chats", uid), chatData);

    return {
        type: "Success",
        message: output,
      };
  } catch (err) {
    console.log("Error running chatbot", err.message);
    return {
        type: "Failure",
        message: err.message,
      };
  }
};

const getChats = async (uid) => {
  try {
    const q = query(
      collection(db, "Chats"),
      where(uid, "==", uid),
      orderBy("timestamp", "asc")
    );
    const chatsSnapshot = await getDocs(q);
    if(chatsSnapshot.empty){

    }
    const chats = chatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
        type: "Success",
        message: chats,
      };;
  } catch (err) {
    console.log(`Error fetching chats: ${err.message}`);
    return {
        type: "Failure",
        message: err.message,
      };
  }
};

export { chat, getChats };
