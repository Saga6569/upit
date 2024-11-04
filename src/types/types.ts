export interface IPeople {
 id: string;
 name: string;
 skin_color: string;
 eye_color: string;
 gender: string;
}

export interface IModal {
 isOpen: boolean;
 title: string;
 people?: IPeople;
}
