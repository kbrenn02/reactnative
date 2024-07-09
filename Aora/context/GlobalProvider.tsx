import { getCurrentUser } from "../lib/appwrite";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
    id: string,
    email: string,
    password: string,
    username: string,
    avatar: string
};

type GlobalContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
      }
      return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
          .then((res) => {
            if(res) {
                setIsLoggedIn(true);
                setUser(res);
            } else {
                setIsLoggedIn(false);
                setUser(null)
            }
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            setIsLoading(false)
          })
    }, []);

    return (
        <GlobalContext.Provider 
          value = {{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading, 
            setIsLoading
          }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;