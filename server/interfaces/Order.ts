export interface Order {
    id: string,
    name: string,
    quantity: number,
    price: number,
    image: string,
    paid: boolean,
    discount: number,
    UserId: string,
    ProductId?: string
}