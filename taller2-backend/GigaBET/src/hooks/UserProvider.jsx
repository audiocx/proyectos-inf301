import React, { useState, useContext } from "react";

const userContext = React.createContext();
const userToggleContext = React.createContext();
const walletContext = React.createContext();

export function useUserContext() {
  return useContext(userContext);
}

export function useUserLogChanger() {
  return useContext(userToggleContext);
}

export function useUpdateWallet() {
  return useContext(walletContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const logChanger = (userInfo) => {
    if (user) {
      setUser(null);
    } else {
      setUser(userInfo);
    }
  };

  const updateWallet = (amount) => {
    setUser({
      nick: user.nick,
      profileType: user.profileType,
      wallet: amount,
    });
  };

  return (
    <userContext.Provider value={user}>
      <userToggleContext.Provider value={logChanger}>
        <walletContext.Provider value={updateWallet}>
          {children}
        </walletContext.Provider>
      </userToggleContext.Provider>
    </userContext.Provider>
  );
}
