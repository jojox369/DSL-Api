import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/user';
import UserView from '../views/UserView';
import * as Yup from 'yup';
import * as bcrypt from 'bcrypt';

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
      return response.status(404).json({ warning: 'User not found' });
    }
  },

  async save(request: Request, response: Response) {
    const { username, password, name } = request.body;

    const saltRounds = 10;

    const passwordCrypt = await bcrypt.hash(password, saltRounds);

    const userRepository = getRepository(User);

    const data = { username, password: passwordCrypt, name };

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const verifyUser = await userRepository.findOne({ username });

    if (verifyUser) {
      return response.status(200).json({ message: 'User already exists' });
    } else {
      const user = userRepository.create(data);

      await userRepository.save(user);

      return response.status(201).json(user);
    }
  },

  async auth(request: Request, response: Response) {
    const { username, password } = request.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { username: username },
    });

    if (user === undefined) {
      return response.json({ error: 'User not found' });
    } else {
      let passwordCrypt: any;
      passwordCrypt = user?.password;

      const verifyPassword = await bcrypt.compare(password, passwordCrypt);
      if (user?.username === username && verifyPassword) {
        return response.json({
          message: 'User authenticated',
          user: UserView.render(user),
        });
      } else {
        return response.json({ error: 'Username and/or Password invalid' });
      }
    }
  },
};
