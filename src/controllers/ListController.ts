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
}

interface ListProductResponse {
  list_id: number;
  user_id: number;
}

export default {
  async getAll(request: Request, response: Response) {
    const listRepository = getRepository(List);

    const lists = await listRepository.find();

    return response.json(ListView.renderMany(lists));
  },

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const listRepository = getRepository(List);

    const list = await listRepository.findOneOrFail(id, {
      relations: ['products'],
    });

    return response.json(ListView.render(list));
  },

  async save(request: Request, response: Response) {
    let { user, products } = request.body;

    products = products.map((product: ProductRequest) => {
      return { id: product.id, amount: product.amount };
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
      products: productsResponse.map(product => product.name),
    };

    return response.status(201).json(listProductResponse);
  },

  async update(request: Request, response: Response) {
    /* const { list } = request.body;
    const listRepository = getRepository(List);
    const schema = Yup.object().shape({
      user: Yup.object().shape({
        id: Yup.number().required(),
      }),
      products: Yup.array(
        Yup.object().shape({
          id: Yup.number().required(),
        }),
      ),
    });

    await schema.validate(list, {
      abortEarly: false,
    });

    const listUpdated = listRepository.create(list);

    await listRepository.update(list.id, listUpdated);

    return response.json(listUpdated); */
  },
  async delete(request: Request, response: Response) {},
};
