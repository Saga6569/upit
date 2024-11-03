import { useAppContext } from "../../AppContext";
import style from "./TableRendering.module.scss";

const TableRendering = () => {
 const { state, setState } = useAppContext();

 const renderTheder = () => {
  if (!state.hasOwnProperty("dataRequest")) {
   return (
    <div className={style.contener}>
     <div className={style.plug}>загрузите данные</div>
    </div>
   );
  }
  const keys = Object.keys(state.dataRequest[0]);
  return (
   <tr>
    {keys.map((key, id) => (
     <th key={id}>{key}</th>
    ))}
   </tr>
  );
 };

 const renderTableBody = () => {
  if (!state.hasOwnProperty("dataRequest")) {
   return null;
  }
  return state.dataRequest.map((people, rowIndex) => (
   <tr key={rowIndex}>
    {Object.values(people).map((value, id) => (
     <td key={id}>{value}</td>
    ))}
   </tr>
  ));
 };

 return (
  <table className={style.dataTable}>
   <thead>{renderTheder()}</thead>
   <tbody>{renderTableBody()}</tbody>
  </table>
 );
};

export default TableRendering;
