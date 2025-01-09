
export interface ProductType{
    id:number,
    name:string,
    price:number,
    images:string[]
  }
export interface ImageResponse{
  id:number,
  image:string,
  product:number
  update_at:string
}
  export interface ProductTypeResponse{
  id:number,
  name:string,
  price:number,
  stock:number,
  size:string,
  images:ImageResponse[]

}
export interface ProductTypeSelected extends ProductType{
    size:string
}
