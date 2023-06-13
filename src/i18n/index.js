import translate from './translate';

class i18nService {
  constructor(services, config) {
    this.services = services;
    this.config = config;
    this._lang = 'ru';
    this.listeners = [];
  }

  get lang() {
    return this._lang;
  }

  /**
   *
   * @param {String} local
   */
  setLang = (local) => {
    this._lang = local;
    this.services.api.setHeader(this.config.langHeader, this.lang);
    for (const listener of this.listeners) {
      listener(this.lang);
    }
  };

  t = (text, number) => translate(this.lang, text, number);

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
}

export default i18nService;
