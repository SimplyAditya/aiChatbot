import express from "express";
import {
  login,
  logout,
  resetPassword,
  signInWithToken,
  signup,
} from "../controllers/auth/auth.js";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await signup(name, email, password);
    res.status(200).send(response);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Internal Server Error");
  }
});

router.route("/loginwithpassword").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Internal Server Error");
  }
});

router.route("/loginwithtoken").post(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await signInWithToken(token);
    res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Internal Server Error");
  }
});

router.route("/forgotpassword").get(async (req, res) => {
  try {
    const email = req.query.email;
    const response = await resetPassword(email);
    res.status(200).send(response);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Internal Server Error");
  }
});

router.route("/logout").post(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await logout(token);
    res.status(200).send(user);
  } catch (err) {
    console.log(err.mcessage);
    res.status(400).send("Internal Server Error");
  }
});

export default router;
