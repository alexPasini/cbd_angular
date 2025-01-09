import { Injectable } from '@angular/core';
import axios from 'axios';
import { ProductType, ProductTypeResponse } from './shared/types/card-products.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = 'http://127.0.0.1:8000';

  constructor() {}

  // Método de exemplo para fazer uma requisição GET
  async getProducts():Promise<ProductTypeResponse[]> {
    try {
      const data:ProductTypeResponse[] = (await axios.get(`${this.BASE_URL}/products/`)).data;
      return data

    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
