import StoreModule from '../module';

class Localization extends StoreModule {
  initState() {
    return {
      lang: 'ru',
    };
  }

  setLang(option) {
    this.setState(
      {
        lang: option,
      },
      `Установлен язык: < ${option} >`,
    );
  }
}

export default Localization;
