import { observer } from "mobx-react-lite";
import store from "../../store/store";
import style from "./modal.module.scss";

const Modal = observer(() => {
 const { modal, cleanDataModal, deleteField } = store;

 if (!modal.isOpen) {
  return null;
 }

 const arrPeoples = modal.people ?? null;

 const renderTheder = () => {
  const keys = Object.keys(arrPeoples ?? {});

  return (
   <tr className="heder">
    {keys.map((key, id) => (
     <th key={id}>{key}</th>
    ))}
   </tr>
  );
 };

 const renderTableBody = () => {
  return (
   <tr>
    {Object.values(arrPeoples ?? {}).map((value, id) => (
     <td key={id}>{value}</td>
    ))}
   </tr>
  );
 };

 const idPeople = modal.people?.id;

 return (
  <div className={style.modalOverlay}>
   <div className={style.modalContent}>
    <button onClick={() => cleanDataModal()} className={style.closeButton}>
     &times;
    </button>
    <h2>{modal.title}</h2>
    <table className={style.dataTable}>
     <thead>{renderTheder()}</thead>
     <tbody>{renderTableBody()}</tbody>
    </table>
    <div className={style.container}>
     <button
      onClick={() => {
       return idPeople === undefined ? null : deleteField(idPeople);
      }}
      className={style.button}
     >
      да
     </button>
     <button onClick={() => cleanDataModal()} className={style.button}>
      нет
     </button>
    </div>
   </div>
  </div>
 );
});

export default Modal;
