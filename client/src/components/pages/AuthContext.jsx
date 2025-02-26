import { createContext, useState } from "react";

const AuthContext = createContext(); // Create a context

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider value={{ username, setUsername, token, setToken, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;