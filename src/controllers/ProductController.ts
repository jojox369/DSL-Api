import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ProductView from '../views/ProductView';
import Product from '../models/product';
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
    try {
      const product = await productRepository.findOneOrFail(id);

      return response.json(ProductView.render(product));
    } catch (err) {
      return response.status(404).json({ warning: 'product not found' });
    }
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

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const productRepository = getRepository(Product);
    await productRepository.delete(id);
    try {
      return response.json({});
    } catch (err) {
      return response.json({ error: 'Cannot delete product' });
    }
  },
};
