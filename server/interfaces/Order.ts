export interface Order  {
    name : string,
    quantity : number,
    price : number,
    image : string,
    paid : boolean,
    id : string,
    discount : number,
    UserId : string,
    ProductId? : string
}