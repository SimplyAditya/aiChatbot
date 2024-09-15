import express from "express";
import checkAuthentication from "../middleware/authMiddleware.js";
import { chat, getChats } from "../controllers/chatbot.js";
const router = express.Router();

router.route("/getallchats").get(checkAuthentication, async (req, res) => {
  try {
    const uid = req.user.uid;
    const chats = await getChats(uid);
    res.status(200).send(chats);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Internal Server Error");
  }
});

router.route("/chat").post(checkAuthentication, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { prompt, chats } = req.body;
    const response = await chat(chats, prompt, uid);
    res.status(200).send(response);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Internal Server Error");
  }
});

export default router;
