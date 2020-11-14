import User from '../models/user';

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
    };
  },

  renderMany(products: User[]) {
    return products.map(product => this.render(product));
  },
};
