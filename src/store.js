const EMPTY_STATE = {
  list: [],
  cart: [],
  cartSum: 0,
};
/**
 * Хранилище состояния приложения
 */
class Store {
  state = EMPTY_STATE;
  constructor(initState = {}) {
    Object.keys(initState).forEach((key) => {
      this.state[key] = initState[key];
    });
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление в корзину
   */
  addItemToCart(itemCode) {
    const indexOfItem = this.state.cart.findIndex((item) => item.code === itemCode);
    if (indexOfItem < 0) {
      const currentItem = { ...this.state.list.find((item) => item.code === itemCode) };
      if (currentItem) {
        this.setState({
          ...this.state,
          cart: this.state.cart.concat({ ...currentItem, countInCart: 1 }),
          cartSum: this.state.cartSum + currentItem.price,
        });
      }
    } else {
      this.state.cart[indexOfItem].countInCart++;
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart.slice(0, indexOfItem),
          { ...this.state.cart[indexOfItem] },
          ...this.state.cart.slice(indexOfItem + 1),
        ],
        cartSum: this.state.cartSum + this.state.cart[indexOfItem].price,
      });
    }
  }

  /**
   * Удаление из корзины
   * @param code
   */
  deleteItemFromCart(itemCode) {
    const currentItem = this.state.cart.find((item) => item.code === itemCode);
    const totalItemPrice = currentItem.price * currentItem.countInCart;
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== itemCode),
      cartSum: this.state.cartSum - totalItemPrice,
    });
  }
}

export default Store;
