import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      stock: 20,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      price: 300,
      stock: 30,
      image: 'https://via.placeholder.com/150',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(data: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: Product): Product {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload
      };
      return this.products[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Product #${id} not found`);
    this.products.splice(index, 1);
    return true;
  }
}
