import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ProductView from '../views/ProductView';
import Product from '../models/Product';
import * as Yup from 'yup';

export default {
  async getAll(request: Request, response: Response) {
    const productRepository = getRepository(Product);

    const products = await productRepository.find();

    return response.json(ProductView.renderMany(products));
  },

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const productRepository = getRepository(Product);

    const product = await productRepository.findOneOrFail(id);

    return response.json(ProductView.render(product));
  },

  async save(request: Request, response: Response) {
    const { name } = request.body;

    const productRepository = getRepository(Product);

    const data = { name };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const product = productRepository.create(data);

    await productRepository.save(product);

    return response.status(201).json(product);
  },
};
