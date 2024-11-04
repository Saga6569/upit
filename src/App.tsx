import React from "react";
import style from "./App.module.scss";

const App = ({ children }: { children: React.ReactNode }) => {
 return <div className={style.app}>{children}</div>;
};

export default App;
