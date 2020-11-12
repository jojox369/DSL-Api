import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ListView from '../views/ListView';
import List from '../models/list';
import * as Yup from 'yup';

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
    let { user_id, products } = request.body;

    products = products.map(product => {
      return { id: product };
    });

    const listRepository = getRepository(List);

    const data = { user_id, products };

    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      products: Yup.array(
        Yup.object().shape({
          id: Yup.number().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const list = listRepository.create(data);

    await listRepository.save(list);

    return response.status(201).json(list);
  },
  async update(request: Request, response: Response) {},
  async delete(request: Request, response: Response) {},
};
