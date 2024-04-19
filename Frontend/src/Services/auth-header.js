export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.jwtTokenoken) {
    // return { Authorization: 'Bearer ' + user.accessToken };
    return { "Bearer ": user.jwtToken };
  } else {
    return {};
  }
}
