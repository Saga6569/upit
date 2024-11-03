import style from "./ButtonRequestDate.module.scss";
import { useAppContext } from "../../AppContext";

const ButtonRequestDate = () => {
 const { state, setState } = useAppContext();

 const loadData = async () => {
  setState({ ...state, loading: true });
  try {
   const response = await fetch("https://swapi.dev/api/people/");
   if (!response.ok) {
    throw new Error("Network response was not ok");
   }
   const data = await response.json();
   const arrKey = [
    "eye_color",
    "gender",
    "name",
    "skin_color",
   ];
   const newData = data.results.map((people: any) => {
    const filteredByKey = Object.keys(people)
     .filter((key) => arrKey.includes(key)) // Оставляем только нужные ключи
     .reduce((acc, key) => {
      if (key === "films") {
       acc[key] = people[key].length;
       return acc;
      }
      acc[key] = people[key]; // Добавляем в новый объект
      return acc;
     }, {});
    return filteredByKey;
   }).map((people: any, id: string) => ({id, ...people}))

   setState({ ...state, dataRequest: newData, loading: false });
  } catch (err) {

  } finally {
  }
 };

 return (
  <div className={style.container}>
   <button className={style.button} onClick={loadData} disabled={state.loading}>
    {state.loading ? "Загрузка..." : "Загрузить данные"}
   </button>
   {state.loading && <div className={style.loader}></div>} {/* Прелоадер */}
  </div>
 );
};

export default ButtonRequestDate;
