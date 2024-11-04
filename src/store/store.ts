import { makeAutoObservable, runInAction } from "mobx";
import { IModal, IPeople } from "../types/types";

class Store {
 data: IPeople[] = [];
 isLoding = false;
 modal: IModal = {
  isOpen: false,
  title: "",
 };

 constructor() {
  makeAutoObservable(this);

  console.log(localStorage);

  const localStorageData = localStorage.getItem("data");
  if (localStorageData) {
   this.data = JSON.parse(localStorageData);
  }

  const localStorageModal = localStorage.getItem("modal");
  if (localStorageModal) {
    this.modal = JSON.parse(localStorageModal) as IModal;
  }
 }

 saveLocalStorage() {
  localStorage.setItem("data", JSON.stringify(this.data));
  localStorage.setItem("modal", JSON.stringify(this.modal));
 }

 getData = async () => {
  try {
   this.isLoding = true;
   const response = await fetch("https://swapi.dev/api/people/");
   if (!response.ok) {
    throw new Error("Network response was not ok");
   }
   const data = await response.json();
   const arrKey = ["eye_color", "gender", "name", "skin_color"];
   const newData: IPeople[] = data.results
    .map((people: { [key: string]: IPeople }) => {
     const filteredByKey = Object.keys(people)
      .filter((key: string) => arrKey.includes(key))
      .reduce((acc: { [key: string]: IPeople }, key) => {
       acc[key] = people[key];
       return acc;
      }, {});
     return filteredByKey;
    })
    .map((people: IPeople, index: string) => {
     people.id = index;
     return people;
    });

   runInAction(() => {
    this.isLoding = false;
    this.data = newData;
    this.saveLocalStorage();
   });
  } catch (err) {
   this.isLoding = false;
  }
 };

 clenDate = () => {
  this.data = [];
  this.saveLocalStorage();
 };

 deleteField = (id: string) => {
  const newData = this.data.filter((people) => people.id !== id);
  this.data = newData;
  this.cleanDataModal();
 };

 greatModalData = (people: IPeople) => {
  this.modal = {
   isOpen: true,
   title: "вы уверены что  хотите удалить данные",
   people,
  };
  this.saveLocalStorage();
 };

 cleanDataModal = () => {
  this.modal = { isOpen: false, title: "" };
  this.saveLocalStorage();
 };

 sortDate = (key: keyof IPeople) => {
  if (key === "id") {
   this.data = this.data.sort((a, b) => Number(a.id) - Number(b.id));
   this.saveLocalStorage();
   return;
  }

  const newDate = this.data.sort((a, b) => a[key].localeCompare(b[key]));
  this.data = newDate;
  this.saveLocalStorage();
 };
}

export default new Store();
