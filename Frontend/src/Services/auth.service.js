import axios from "axios";

const API_URL = "http://localhost:8095/auth";
const API_GATEWAY_URL ="http://localhost:8084/auth"
const signup = (email, password) => {
  return axios
    .post(API_URL + "/create-user", {
      email,
      password,
    })
    .then((response) => {
     
      // localStorage.setItem("user", JSON.stringify(response.data));
      // console.log(response.data)

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response.data)
      if (response.data.jwtToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  if(localStorage.getItem("user"))
  {
    return JSON.parse(localStorage.getItem("user")).username;
  }
  return "";
};
const updatePassword = (email,password) =>{
  axios.put(API_URL + "/forgotPassword", {
    email,
    password,
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => console.error('Error updating password:', error));

}
const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  updatePassword
};

export default authService;
