import StoreModule from '../module';

class Products extends StoreModule {
  initState() {
    return {
      fetched: {},
    };
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        fetched: { ...this.getState().fetched, [id]: json.result },
      },
      'Загружена информация о товаре из АПИ',
    );
  }
}

export default Products;
