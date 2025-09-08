import { createContext, useContext, useState } from "react";

const InputContext = createContext("");

export const InputProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <InputContext.Provider value={{ inputValue, setInputValue }}>
        {children}
      </InputContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInput = () => {
  return useContext(InputContext);
};
