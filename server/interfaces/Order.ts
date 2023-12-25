export interface Order  {
    name : string,
    quantity : number,
    price : number,
    image : string,
    paid : boolean,
    id : string,
    UserId : string,
    ProductId? : string
}