export interface IBookData{
    book_id:string,
    user_id:string | undefined,
    book_title:string,
    book_img:string,
    book_price:number,
    book_count:number,
}


export interface IBookOrders{
    book_id:string,
    bookOrder:IBookData,
    fromWishList?:boolean,
}

export interface IBookItem {
  id: string,
  title: string,
  quantity: number,
  price: number,
  img?: string,
}

export interface IOrder{
  id:string,
  order_id:string,
  created_at?:string,
  user_id:string,
  book_id:string,
  book_title:string,
  book_price:number,
  book_count:number,
}

export interface IOrderBooksIds{
  book_id:string
}
