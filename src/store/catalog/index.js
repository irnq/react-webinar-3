import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this.limit = 10;
  }

  initState() {
    return {
      list: [],
      totalPages: 1,
      currentPage: 1,
    };
  }

  async load() {
    const response = await fetch(
      `/api/v1/articles?limit=${this.limit}&skip=${
        (this.initState().currentPage - 1) * this.limit
      }&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(+json.result.count / this.limit),
      },
      'Загружены товары из АПИ',
    );
  }

  async goToPage(page) {
    const response = await fetch(
      `/api/v1/articles?limit=${this.limit}&skip=${
        (page - 1) * this.limit
      }&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        currentPage: page,
        totalPages: Math.ceil(+json.result.count / this.limit),
      },
      `Загружены товары из АПИ: < ${page} > страница`,
    );
  }
}

export default Catalog;
