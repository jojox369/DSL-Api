import List from '../models/list';
import UserView from './UserView';

export default {
  render(list: List) {
    return {
      id: list.id,
      name: list.name,
      user: UserView.render(list.user),
      list_product: list.listProduct,
    };
  },

  renderMany(lists: List[]) {
    return lists.map(list => this.render(list));
  },
};
