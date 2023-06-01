import StoreModule from '../module';

/**
 * Список категорий товаров
 */
class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      list: [],
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      // Товар загружен успешно
      this.setState(
        {
          list: json.result.items,
          waiting: false,
        },
        'Категории товаров загружены из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        list: [],
        waiting: false,
      });
    }
  }
}

export default CategoriesState;
