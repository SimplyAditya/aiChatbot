import axios from "axios"
import apiContext from "../context/apiContext";

export const useData=async (token)=>{
    const data = await axios.get(apiContext.getChatsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data.message)
    return data.data.message 
}
