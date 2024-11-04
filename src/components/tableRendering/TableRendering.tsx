import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { IPeople } from "../../types/types";
import style from "./TableRendering.module.scss";

const TableRendering = observer(() => {
 const { data, greatModalData, sortDate } = store;

 const renderTheder = () => {
  if (data.length === 0) {
   return (
    <div className={style.contener}>
     <div className={style.plug}>загрузите данные</div>
    </div>
   );
  }
  const keys = Object.keys(data[0]);
  return (
   <tr className="heder">
    {keys.map((key, id) => (
     <th onClick={() => sortDate(key)} key={id}>
      {key}
     </th>
    ))}
   </tr>
  );
 };

 const renderTableBody = (arrPeoples: IPeople[]) => {
  if (arrPeoples.length === 0) {
   return null;
  }
  return arrPeoples.map((people: IPeople, rowIndex) => (
   <tr key={rowIndex} onClick={() => greatModalData(people)}>
    {Object.values(people).map((value, id) => (
     <td key={id}>{value}</td>
    ))}
   </tr>
  ));
 };

 return (
  <table className={style.dataTable}>
   <thead>{renderTheder()}</thead>
   <tbody>{renderTableBody(data)}</tbody>
  </table>
 );
});

export default TableRendering;
