import { makeAutoObservable, runInAction } from "mobx";
import { IModal, IPeople } from "../types/types";

class Store {
 data: IPeople[] = [];
 isLoding = false;
 modal: IModal = {
  isOpen: false,
  title: "",
 };
 currentPage = 1;

 constructor() {
  makeAutoObservable(this);

  const localStorageData = localStorage.getItem("data");
  if (localStorageData) {
   this.data = JSON.parse(localStorageData);
  }

  const localStorageModal = localStorage.getItem("modal");
  if (localStorageModal) {
   this.modal = JSON.parse(localStorageModal) as IModal;
  }

  const localStoragePage = localStorage.getItem("page");
  if (localStoragePage) {
   this.currentPage = JSON.parse(localStoragePage);
  }
 }

 saveLocalStorage() {
  localStorage.setItem("data", JSON.stringify(this.data));
  localStorage.setItem("modal", JSON.stringify(this.modal));
  localStorage.setItem("page", JSON.stringify(this.currentPage));
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

 greatModalData = (people: IPeople, title: string, isOpen: boolean) => {
  this.modal = {
   isOpen: isOpen,
   title: title,
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
   const arrId = this.data.map((people) => Number(people.id));
   const firstID = arrId[0];
   const maxID = Math.max(...arrId);
   firstID !== maxID
    ? this.data.sort((a, b) => Number(b.id) - Number(a.id))
    : this.data.sort((a, b) => Number(a.id) - Number(b.id));

   this.saveLocalStorage();
   return;
  }

  const El = this.data[0][key];
  const sortEl = this.data.sort((a, b) => a[key].localeCompare(b[key]))[0][key];

  El !== sortEl
   ? this.data.sort((a, b) => a[key].localeCompare(b[key]))
   : this.data.sort((a, b) => b[key].localeCompare(a[key]));
  this.saveLocalStorage();
 };

 addDateForm = (people: IPeople) => {
  this.data = [...this.data, people];
  this.saveLocalStorage();
 };

 setDate = (newDate: IPeople[]) => {
  this.data = newDate;
  this.saveLocalStorage();
 };

 setCurrentPage = (value: number) => {
  this.currentPage = value;
  this.saveLocalStorage();
 };
}
export default new Store();
