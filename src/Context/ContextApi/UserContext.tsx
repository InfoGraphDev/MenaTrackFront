import { LocalStorageEnum } from '@/Core/Enums/LocalStorage';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNotification } from '@/Components/ComplexComponents/Notifications';
import { useNavigate } from 'react-router-dom';

export interface IUser {
    id: string;
    name: string;
    email: string;
  }
  export interface IUserContext {
    user: IUser | null;
    login?:any;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
    esriToken:any
    setEsriToken:any,
  }
  
const UserContext = createContext<IUserContext | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(window.localStorage.getItem(LocalStorageEnum[5])?JSON.parse(window.localStorage.getItem(LocalStorageEnum[5])):null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const SaveEsriToken= window.localStorage.getItem(LocalStorageEnum[6])?window.localStorage.getItem(LocalStorageEnum[6]):false
  const [esriToken,setEsriToken]=useState(SaveEsriToken);

  const login = async (Data) => {};
  const logout = async() => {};

  return (
    <UserContext.Provider value={{ 
        user, login, logout,setEsriToken,
        isLoading, error,esriToken}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;

