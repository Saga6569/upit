import React from "react"; //+
import { AppProvider } from "./AppContext";
import style from "./App.module.scss";

const App = ({ children }: { children: React.ReactNode }) => {

 return (
  <AppProvider>
   <div className={style.app}>{children}</div>
  </AppProvider>
 );
};

export default App;


git config --global user.email "aristov6569@gmail.com"
git config --global user.name "saga6569"