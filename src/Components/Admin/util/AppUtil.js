import Cookies from "js-cookie";
import axios from 'axios';

const AUTH_SERVICE = "http://localhost:8082";
const CHAT_SERVICE = "http://localhost:8085";

axios.defaults.withCredentials = true;

const request = (options) => {
  const headers = new Headers();

  if (options.setContentType !== false) {
    headers.append("Content-Type", "application/json");
  }

  if (Cookies.get("token")) {
    headers.append(
      "Authorization",
      "Bearer " + Cookies.get("token")
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function login(loginRequest) {
  return request({
    url: AUTH_SERVICE + "/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function facebookLogin(facebookLoginRequest) {
  return request({
    url: AUTH_SERVICE + "/facebook/signin",
    method: "POST",
    body: JSON.stringify(facebookLoginRequest),
  });
}

export function signup(signupRequest) {
  return request({
    url: AUTH_SERVICE + "/users",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem("token")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: AUTH_SERVICE + "/users/me",
    method: "GET",
  });
}

// export function getUsers() {
//   if (!localStorage.getItem("token")) {
//     return Promise.reject("No access token set.");
//   }

//   return request({
//     url: AUTH_SERVICE + "/auth/all-users",
//     method: "GET",
//   });
// }

export function countNewMessages(senderId, recipientId) {
  if (!localStorage.getItem("token")) {
    return Promise.reject("No access token set.");
  }

//   return request({
//     url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId + "/count",
//     method: "GET",
//   });

return axios.get(CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId + "/count");
}

export function findChatMessages(senderId, recipientId) {
  if (!localStorage.getItem("token")) {
    return Promise.reject("No access token set.");
  }

//   return request({
//     url: CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId,
//     method: "GET",
//   });

return axios.get(CHAT_SERVICE + "/messages/" + senderId + "/" + recipientId);
}

export function findChatMessage(id) {
  if (!localStorage.getItem("token")) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: CHAT_SERVICE + "/messages/" + id,
    method: "GET",
  });
}