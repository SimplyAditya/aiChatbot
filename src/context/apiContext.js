const url="http://127.0.0.1:3000/api"

export const apiContext = {
  getChatsUrl: `${url}/chatbot/getallchats`,
  chatUrl:`${url}/chatbot/chat`,
  registerUrl: `${url}/auth/signup`,
  signInUrl:`${url}/auth/loginwithpassword`,
  tokenUrl:`${url}/auth/loginwithtoken`,
  forgotPasswordUrl:`${url}/auth/forgotpassword`,
  logoutUrl:`${url}/auth/logout`

};

export default apiContext