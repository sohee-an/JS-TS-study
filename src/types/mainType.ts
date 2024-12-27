export interface Product {
  id: string;
  name: string;
  images: string[];
  regularPrice: number;
}

export interface ProductMap {
  [key: string]: Product;
}

export interface ICountMap {
  [key: string]: number;
}
