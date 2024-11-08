import { useForm } from "react-hook-form";
import store from "../store/store";
import style from "./form.module.scss";

import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Form = observer(() => {
 const { greatModalData } = store;

 const {
  register,
  handleSubmit,
  getValues,
  setValue,
  watch,
  formState: { errors },
 } = useForm({
  defaultValues: {
   name: "",
   skin_color: "",
   eye_color: "",
   gender: "",
   id: "",
  },
 });

 useEffect(() => {
  const localStorageData = localStorage.getItem("FormDate");
  if (localStorageData !== null) {
   const parsedData = JSON.parse(localStorageData);
   setValue("name", parsedData.name ?? "");
   setValue("skin_color", parsedData.skin_color ?? "");
   setValue("eye_color", parsedData.eye_color ?? "");
   setValue("gender", parsedData.gender ?? "");
  }
 }, []);

 useEffect(() => {
  localStorage.setItem("FormDate", JSON.stringify(getValues()));
 }, [watch("name"), watch("skin_color"), watch("eye_color"), watch("gender")]);

 const navigate = useNavigate();
 const { data, addDateForm } = store;

 return (
  <form
   onSubmit={handleSubmit((dataForm) => {
    const maxid = data
     .map(({ id }) => id)
     .sort((a, b) => Number(b) - Number(a))[0];
    const newId = maxid === undefined ? 0 : Number(maxid) + 1;
    const people = { ...dataForm, id: String(newId) };
    addDateForm(people);
    localStorage.setItem("FormDate", JSON.stringify({}));
    greatModalData(people, "данные успешно добавлены", true);
    setTimeout(() => {
     greatModalData([], "", false);
    }, 1000);
    navigate("/");
   })}
  >
   <div className={style.contener}>
    <div className={style.textInput}>
     <label>name</label>
     <input {...register("name", { required: true })} />
     {errors.name && <p>Это поле обязательно к заполнению</p>}
    </div>
    <div className={style.textInput}>
     <label>skin_color</label>
     <input {...register("skin_color", { required: true })} />
     {errors.skin_color && <p>Это поле обязательно к заполнению</p>}
    </div>
    <div className={style.textInput}>
     <label>eye_color</label>
     <input {...register("eye_color", { required: true })} />
     {errors.eye_color && <p>Это поле обязательно к заполнению</p>}
    </div>
    <div className={style.textInput}>
     <label>gender</label>
     <input {...register("gender", { required: true })} />
     {errors.gender && <p>Это поле обязательно к заполнению</p>}
    </div>
   </div>
   <button
    className={style.submitForm}
    type="submit"
    disabled={Object.keys(errors).length > 0}
   >
    Добавть
   </button>
   <button
    className={style.home}
    onClick={() => {
     setValue("name", "");
     setValue("skin_color", "");
     setValue("eye_color", "");
     setValue("gender", "");
     localStorage.setItem("FormDate", JSON.stringify({}));
    }}
   >
    очистить форму
   </button>
   <button className={style.home} onClick={() => navigate("/")}>
    назад
   </button>
  </form>
 );
});

export default Form;
