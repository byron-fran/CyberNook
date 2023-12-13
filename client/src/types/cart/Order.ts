export interface Order  {
    name : string,
    quantity : number,
    price : number,
    image : string,
    paid : boolean,
    category? : string,
    stock?: number,
    id : number
}