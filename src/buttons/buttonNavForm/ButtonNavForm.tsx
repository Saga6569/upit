import style from "./buttonNavForm.module.scss";

import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import store from "../../store/store";
const ButtonNavForm = observer(() => {
 const { data } = store;

 const navigate = useNavigate();

 if (data.length === 0) {
  return null;
 }
 return (
  <div className={style.container}>
   <button className={style.button} onClick={() => navigate("form")}>
    Добавть
   </button>
  </div>
 );
});

export default ButtonNavForm;
