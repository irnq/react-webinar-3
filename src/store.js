const EMPTY_STATE = {
  list: [],
  cart: [],
  itemsCountInCart: {},
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
    const currentItem = this.state.list.find((item) => item.code === itemCode);
    if (!this.state.itemsCountInCart[itemCode]) {
      if (currentItem) {
        this.setState({
          ...this.state,
          cart: this.state.cart.concat(currentItem),
          itemsCountInCart: { ...this.state.itemsCountInCart, [itemCode]: 1 },
          cartSum: this.state.cartSum + currentItem.price,
        });
      }
    } else {
      this.setState({
        ...this.state,
        itemsCountInCart: {
          ...this.state.itemsCountInCart,
          [itemCode]: this.state.itemsCountInCart[itemCode] + 1,
        },
        cartSum: this.state.cartSum + currentItem.price,
      });
    }
  }

  /**
   * Удаление из корзины
   * @param code
   */
  deleteItemFromCart(itemCode) {
    const currentItem = this.state.cart.find((item) => item.code === itemCode);
    const totalItemPrice = currentItem.price * this.state.itemsCountInCart[itemCode];
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== itemCode),
      itemsCountInCart: { ...this.state.itemsCountInCart, [itemCode]: 0 },
      cartSum: this.state.cartSum - totalItemPrice,
    });
  }
}

export default Store;
