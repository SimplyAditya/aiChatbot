import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import admin, { auth, db } from "../../db.js";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const signup = async (name, email, password) => {
  try {
    if (!name || !email || !password) {
      throw (error = {
        message: " Mandatory Fields Missing",
      });
    } else {
      const userRecord = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userRecord.user.uid;
      const userData = {
        uid,
        name,
        email,
      };
      await setDoc(doc(db, "Users", uid), userData);
      return {
        type: "Success",
        message: "Sign Up successful",
      };
    }
  } catch (err) {
    console.log("Error during sign Up: ", err.message);
    return {
      type: "Failure",
      message: err.message,
    };
  }
};

const login = async (email, password) => {
  try {
    if (!email || !password) {
      throw (error = {
        message: " Mandatory Fields Missing",
      });
    }
    const user = await signInWithEmailAndPassword(auth, email, password);
    const token = await user.user.getIdToken();
    return {
      type: "Success",
      user:user.user,
      token: token,
      message: "Sign In Successful",
    };
  } catch (err) {
    console.log("Error Signing In: ", err.message);
    return {
      type: "Failure",
      message: err.message,
    };
  }
};

const blacklistedToken = new Set();

const signInWithToken = async (token) => {
  try {
    if (!token) {
      return {
        type: "Failure",
        message: "Please Sign In Again",
      };
    }
    if (blacklistedToken.has(token)) {
      return {
        type: "Failure",
        message: "Session Expired, Please Sign In Again",
      };
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    let q = query(collection(db, "Users"), where("uid", "==", uid));
    let snapshot = await getDocs(q);
    if (snapshot.empty) {
      return {
        type: "Failure",
        message: "Session Expired, Please Sign In Again",
      };
    } else {
      return {
        type: "Success",
        user:snapshot.docs[0].data(),
        token: token,
        message: "Sign In Successful",
      };
    }
  } catch (err) {
    console.log(`Error Signing In with token : ${err.message}`);
    return {
      type: "Failure",
      message: err.message,
    };
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      type: "Success",
      msg: "Password Reset Mail has been sent",
    };
  } catch (err) {
    console.log(err.code);
    if (err.code === "auth/missing-email") {
      return {
        type: "Failure",
        msg: "Email does not exist. Please check your email id",
      };
    }
    return {
      type: "Failure",
      msg: "Error Sending Password Reset Mail. Please Try again Later",
    };
  }
};

const logout = async (token) => {
  try {
    if (!token) {
      return {
        type: "Failure",
        message: "No token provided. Please log in again.",
      };
    }
    blacklistedToken.add(token);
    return {
      type: "Success",
      message: "Logged out successfully.",
    };
  } catch (err) {
    console.log(err.message);
    return {
      type: "Failure",
      message: "Error logging out. Please try again later.",
    };
  }
};

export { signup, login, signInWithToken, resetPassword, logout };
