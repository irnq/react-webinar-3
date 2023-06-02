import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
    };
  }

  async load(id) {
    const token = localStorage.getItem('YToken');
    if (!token || !localStorage.getItem('YUser')) {
      return;
    }

    if (!id) {
      id = JSON.parse(localStorage.getItem('YUser')).id;
    }

    this.setState({
      data: {},
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-Token': token,
        },
      });

      const json = await response.json();

      this.setState(
        {
          data: json.result,
          waiting: false,
        },
        'Загружен профиль из АПИ',
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false,
      });
    }
  }
}

export default ProfileState;
