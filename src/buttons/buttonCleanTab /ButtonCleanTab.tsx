import { observer } from "mobx-react-lite";
import store from "../../store/store";
import style from "./ButtonCleanTab.module.scss";

const ButtonCleanTab = observer(() => {
 const { data, clenDate } = store;

 if (data.length === 0) {
  return null;
 }

 return (
  <div className={style.container}>
   <button className={style.button} onClick={() => clenDate()}>
    отчистка данных
   </button>
  </div>
 );
});

export default ButtonCleanTab;
