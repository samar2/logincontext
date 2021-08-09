import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { setCookie, getCookie, removeCookie } from "../../cookies";
import { toast } from "react-toastify";

export default function SessionProvider({ children }) {
  const [session, setValue] = useState({
    user: {
      access_token: getCookie("token"),
    },
  });

  useEffect(() => {
    function initializeSession() {
      let id = getCookie("id");
      let token = getCookie("token");
      if (token) updateSession({ access_token: token });
      /* fetch(`https://reqres.in/api/users/${id}`, {
                headers: {
                    'token': token
                }
            }).then(res => res.json()).then(res => {
                let user = { ...res.data, token };
                updateSession({ user });
            }); */
    }
    initializeSession();
  }, []);

  function updateSession(nextSession) {
    let value =
      typeof nextSession === "function"
        ? nextSession
        : (prevSession) => ({ ...prevSession, ...nextSession });
    setValue(value);
  }

  async function login({ email, password }) {
    // try to login
    let { auth, error, user_id, access_token } = await fetch(
      "http://localhost:8000/api/user/login",
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    ).then((res) => res.json());
    console.log(auth, error, user_id, access_token);
    // return from the function if you have an error
    if (error || !access_token) return toast.error(error);

    setCookie("id", user_id);
    setCookie("token", access_token);
    let user = { access_token };
    updateSession({ user });
    // toast(`Welcome ${user.first_name}!`);
  }

  function logout() {
    updateSession({ user: { access_token: null } });
    removeCookie("id");
    removeCookie("token");
  }

  const context = {
    session,
    actions: {
      login,
      logout,
    },
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
