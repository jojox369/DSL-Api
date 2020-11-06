import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/user';
import UserView from '../views/UserView';

export default {
  async getAll(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const user = await userRepository.find();

    return response.json(UserView.renderMany(user));
  },

  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id);
      return response.json(UserView.render(user));
    } catch (err) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  },

  async save(request: Request, response: Response) {
    const { username, password } = request.body;
  },
};
