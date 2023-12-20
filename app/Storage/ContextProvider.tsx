import { createContext, useState, useEffect, ReactNode } from "react";
type GlobalStorageType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  helloCheck: string;
  setHelloCheck: React.Dispatch<React.SetStateAction<string>>;


};
const GlobalStorage = createContext<GlobalStorageType>({
  token: "",
  setToken: () => {},
  helloCheck: "",
  setHelloCheck: () => {},
});
export default GlobalStorage;
type DataStorageProps = {
  children: ReactNode;
};

export const DataStorage = ({ children }: DataStorageProps) => {
  const [token, setToken] = useState("");
  const [helloCheck, setHelloCheck] = useState("")
  return (
    <GlobalStorage.Provider
      value={{
        token,
        setToken,
        helloCheck, 
        setHelloCheck
      }}
    >
      {children}
    </GlobalStorage.Provider>
  );
};
