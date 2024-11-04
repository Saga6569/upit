import style from "./ButtonRequestDate.module.scss";
import store from "../../store/store";
import { observer } from "mobx-react-lite";

const ButtonRequestDate = observer(() => {
 const { getData, isLoding, data } = store;
 return (
  <div className={style.container}>
   <button
    className={style.button}
    onClick={() => getData()}
    disabled={isLoding || data.length !== 0}
   >
    {isLoding ? "Загрузка..." : "Загрузить данные"}
   </button>
   {isLoding && <div className={style.loader}></div>}
  </div>
 );
});

export default ButtonRequestDate;
