import React, { useState } from "react";
import backgroundImage from "../../assets/login-image.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Alert from "../elements/Alert.jsx";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [toggleAlert, setToggleAlert] = useState(false);

  const GoToHome = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      return;
    }
    setError(false);
    if (email !== "aabcd" || password !== "abcd") {
      setToggleAlert(true);
      return;
    }
    setToggleAlert(false);
    // localStorage.setItem("jwt","aabcd");
    navigate("/chat");
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      {toggleAlert && (
        <Alert alert="Invalid Email or Password" toggle={setToggleAlert} />
      )}
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div
          className="h-1/2 lg:h-screen lg:w-4/6 flex items-center justify-start bg-black"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-white text-5xl lg:text-9xl px-6 lg:px-10 font-bold font-serif outfit-font">
            AI ChatBot
          </h1>
        </div>
        <div className="h-1/2 lg:h-screen lg:w-2/6 flex flex-col justify-around items-center bg-black">
          <div></div>
          <div className="w-full lg:w-4/5 p-6 lg:px-8 ps-0">
            <h1 className="font-bold text-white text-3xl lg:text-5xl pb-4">
              User Login
            </h1>
            <h1 className="text-white text-sm lg:text-base pb-8">
              Enter your account details
            </h1>
            <form className="" onSubmit={GoToHome}>
              <input
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 ps-0 mb-4 w-full bg-transparent border-b-2 focus:outline-none text-white"
              />
              <div className="relative w-full mb-4">
                <input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 ps-0 w-full bg-transparent border-b-2 focus:outline-none text-white"
                  type={passwordVisible ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FontAwesomeIcon icon={faEyeSlash} className="text-white" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} className="text-white" />
                  )}
                </button>
              </div>
              <h1 className="text-themeBlue text-xs lg:text-sm pb-8">
                Forgot Password ?
              </h1>
              {error && (
                <p className="text-red-600 pb-2">
                  ! Please fill username and password
                </p>
              )}
              <button
                type="submit"
                className="w-full p-2 rounded-xl bg-themeBlue text-white"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="text-white mb-4 lg:mb-12 flex justify-between items-center w-full lg:w-4/5 px-6 lg:px-8">
            <h1 className="text-xs lg:text-sm">Don't have an account?</h1>
            <button
              className="bg-themeBlue text-white py-1 px-3 rounded-lg"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
