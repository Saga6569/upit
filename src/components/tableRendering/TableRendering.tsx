import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { IPeople } from "../../types/types";
import style from "./TableRendering.module.scss";
import { useState } from "react";

const rowsPerPage = 5;
const TableRendering = observer(() => {
 const {
  data,
  greatModalData,
  sortDate,
  setDate,
  setCurrentPage,
  currentPage,
 } = store;

 const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

 const handleDragStart = (index: number) => setDraggedIndex(index);
 const handleDragOver = (index: number) => {
  if (draggedIndex === index) return;
  const reorderedRows = [...data];
  const draggedRow = reorderedRows[draggedIndex!];
  reorderedRows.splice(draggedIndex!, 1);
  reorderedRows.splice(index, 0, draggedRow);
  setDraggedIndex(index);
  setDate(reorderedRows);
 };

 const handleDragEnd = () => {
  setDraggedIndex(null);
 };

 const displayData = () => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = currentPage * rowsPerPage;
  return data.slice(startIndex, endIndex);
 };

 const goToPrevPage = () => {
  if (currentPage > 1) {
   setCurrentPage(currentPage - 1);
  }
 };

 const goToNextPage = () => {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  if (currentPage < totalPages) {
   setCurrentPage(currentPage + 1);
  }
 };

 const totalPages = Math.ceil(data.length / rowsPerPage);

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
   <tr>
    {keys.map((key, id) => (
     <th className={style.hederCell} key={id} style={{ userSelect: "none" }}>
      <span>{key}</span>
      <span
       className={style.buttonSort}
       onClick={() => sortDate(key as keyof IPeople)}
      >
       ↑↓
      </span>
     </th>
    ))}
   </tr>
  );
 };

 const renderTableBody = () => {
  if (displayData().length === 0) {
   return null;
  }
  return displayData().map((people: IPeople, rowIndex) => {
   const arrId = data.map((people) => people.id);
   const index = arrId.indexOf(people.id);
   return (
    <tr
     draggable
     key={rowIndex}
     onClick={() => greatModalData(people, "удалить данные", true)}
     onDragStart={() => handleDragStart(index)}
     onDragOver={(e) => {
      e.preventDefault();
      handleDragOver(index);
     }}
     onDragEnd={handleDragEnd}
     style={{
      backgroundColor: draggedIndex === index ? "#e0e0e0" : "white",
      cursor: "move",
     }}
    >
     {Object.values(people).map((value, id) => (
      <td key={id}>{value}</td>
     ))}
    </tr>
   );
  });
 };

 return (
  <>
   <table className={style.dataTable}>
    <thead>{renderTheder()}</thead>
    <tbody>{renderTableBody()}</tbody>
   </table>
   {data.length > 0 && (
    <div className={style.pagination}>
     <button onClick={goToPrevPage} disabled={currentPage === 1}>
      ← Назад
     </button>
     <span>Страница {currentPage}</span>
     <button onClick={goToNextPage} disabled={currentPage === totalPages}>
      Вперед →
     </button>
    </div>
   )}
  </>
 );
});

export default TableRendering;
