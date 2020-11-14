import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ListView from '../views/ListView';
import * as Yup from 'yup';
import ListProduct from '../models/ListProduct';
import Product from '../models/Product';
import List from '../models/list';
import User from '../models/User';

interface ProductRequest {
  id: number;
  amount: number;
  price: number;
}

interface ListProductResponse {
  list_id: number;
  user_id: number;
}

export default {
  async getAll(request: Request, response: Response) {
    const { user } = request.params;
    console.log(user);
    const listRepository = getRepository(List);

    const lists = await listRepository.find({
      where: { user: { id: Number(user) } },
      relations: ['user'],
    });

    return response.json(ListView.renderMany(lists));
  },

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const listRepository = getRepository(List);

    const list = await listRepository.findOneOrFail(id);

    return response.json(ListView.render(list));
  },

  async save(request: Request, response: Response) {
    let { user, products } = request.body;

    products = products.map((product: ProductRequest) => {
      return { id: product.id, amount: product.amount, price: product.price };
    });

    const listRepository = getRepository(List);
    const listProductRepository = getRepository(ListProduct);
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const data = { user, products };

    const schema = Yup.object().shape({
      user: Yup.object().shape({
        id: Yup.number().required(),
      }),
      products: Yup.array(
        Yup.object().shape({
          id: Yup.number().required(),
          amount: Yup.number().required(),
          price: Yup.number().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const list = listRepository.create(data);

    const listSaved = await listRepository.save(list);

    const listProductData = products.map((product: ProductRequest) => {
      return {
        list_id: listSaved.id,
        product_id: product.id,
        amount: product.amount,
        price: product.price,
      };
    });

    const listProduct = listProductRepository.create(listProductData);
    await listProductRepository.save(listProduct);

    // Recuperando os produtos para listar os nomes
    const productsResponse = await productRepository.findByIds(
      products.map((product: Product) => product.id),
    );

    //busca o usuario
    const userResponse = await userRepository.findOneOrFail(user.id);

    const listProductResponse = {
      list_id: list.id,
      user_id: userResponse.name,
      /* products: productsResponse.map(product => {
        return { name: product.name };
      }), */
      products: await Promise.all(
        listProduct.map(async listProduct => {
          const product = await productRepository.findOne(
            listProduct.product_id,
          );
          let productName: any;
          productName = product?.name;

          const response = {
            id: listProduct.product_id,
            name: productName.name,
            amout: listProduct.amount,
            price: listProduct.price,
          };
          return response;
        }),
      ),
    };

    return response.status(201).json(listProductResponse);
  },

  async update(request: Request, response: Response) {
    let { id, products } = request.body;

    const listProductRepository = getRepository(ListProduct);

    const schema = Yup.object().shape({
      id: Yup.number().required(),

      products: Yup.array(
        Yup.object().shape({
          id: Yup.number().required(),
        }),
      ),
    });

    const data = { id, products };

    await schema.validate(data, {
      abortEarly: false,
    });

    const list = await listProductRepository.find({
      where: { list_id: Number(id) },
    });

    list.forEach(async listProduct => {
      await listProductRepository.delete({
        list_id: Number(id),
        product_id: listProduct.product_id,
      });
    });

    products = await Promise.all(
      products.map(async (product: ProductRequest) => {
        const productSave = listProductRepository.create({
          list_id: Number(id),
          product_id: product.id,
          amount: product.amount,
          price: product.price,
        });

        return await listProductRepository.save(productSave);
      }),
    );

    return response.json({ id, products });
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const listRepository = getRepository(List);

    try {
      await listRepository.delete(id);
      return response.json({});
    } catch (err) {
      return response.json({ message: 'ERROR: cannot delete list' });
    }
  },
};
