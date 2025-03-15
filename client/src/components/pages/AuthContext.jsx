import { createContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext(); // Create a context

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [id, setId] = useState(() => localStorage.getItem("user_id") || "");
  useEffect(() => {
    if (username) localStorage.setItem("username", username);
    if (id) localStorage.setItem("user_id", id);
    if (email) localStorage.setItem("email", email);
    if (token) localStorage.setItem("token", token);
}, [username,token,id,email]);
  return (
    <AuthContext.Provider value={{ username, setUsername, token, setToken, email, setEmail , id , setId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;