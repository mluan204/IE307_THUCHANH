import {useState, createContext } from 'react';

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
    const [user,setuser]=useState({id:"",username:""});

    return (
      <UserContext.Provider value={{ user, setuser }}>
        {children}
      </UserContext.Provider>
    );
  };
