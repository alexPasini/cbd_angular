import { ProductType, ProductTypeSelected } from './card-products.types';

export interface CartItemType{
  product : ProductTypeSelected
  onCart:boolean
  quantity:number
}
