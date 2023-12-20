import cookie from "js-cookie";

// set in cookie
export const setCookie = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = (key: string) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};
// set in localstorage
export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
// remove from localstorage
export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response: any, next: any) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};
// access user info from localstorage
export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        const user = localStorage.getItem("user");
        if (user) {
          return JSON.parse(user);
        }
      } else {
        return false;
      }
    }
  }
};
export const signout = (next: any) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};
export const updateUser = (response: any, next: any) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = localStorage.getItem("user");
    if (auth) {
      auth = JSON.parse(auth);
    }
    auth = response.data.user;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
