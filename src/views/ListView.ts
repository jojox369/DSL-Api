import List from '../models/list';
import ProductView from './ProductView';
import UserView from './UserView';

export default {
  render(list: List) {
    return {
      id: list.id,
      user: UserView.render(list.user),
      products: ProductView.renderMany(list.products),
    };
  },

  renderMany(lists: List[]) {
    return lists.map(list => this.render(list));
  },
};
