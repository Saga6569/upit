import { useAppContext } from "../../AppContext";
import style from "./ButtonCleanTab.module.scss";

const ButtonCleanTab = () => {
 const { state, setState } = useAppContext();

 if (!state.hasOwnProperty("dataRequest")) {
  return null;
 }

 return (
  <div className={style.container}>
   <button
    className={style.button}
    onClick={() => setState({})}
    disabled={state.loading}
   >
    отчистка данных
   </button>
  </div>
 );
};

export default ButtonCleanTab;
