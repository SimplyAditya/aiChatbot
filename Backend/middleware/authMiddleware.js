import { collection, getDocs, query, where } from "firebase/firestore";
import admin, { db } from "../db.js";

const checkAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res
        .status(401)
        .send({ msg: "Existing Session has expired. Please Sign In Again" });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const q = query(collection(db, "Users"), where("uid", "==", uid));

    const user = await getDocs(q);
    if (user.empty) {
      res.status(403).send({
        type: "Failure",
        message: "Please Sign In Again",
      });
    } else {
      req.user = {
        uid: uid,
      };
      next();
    }
  } catch (err) {
    console.log(err.message);
    res.status(400),
      send({
        type: "Failure",
        message: "Please Sign In Again",
      });
  }
};

export default checkAuthentication;
