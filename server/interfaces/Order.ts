export interface Order  {
    name : string,
    quantity : number,
    price : number,
    image : string,
    paid : boolean,
    id : number | string,
    UserId : number | string
}