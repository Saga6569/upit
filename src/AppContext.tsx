import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(null);

export const AppProvider: React.FC<React.PropsWithChildren<unknown>> = ({
 children,
}) => {
 const [state, setState] = useState({}); // Ваше состояние

 return (
  <AppContext.Provider value={{ state, setState }}>
   {children}
  </AppContext.Provider>
 );
};

export const useAppContext = () => {
 return useContext(AppContext);
};
