import StoreModule from '../module';

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      isAuth: false,
      waiting: true, // признак ожидания загрузки
      error: [],
    };
  }

  /**
   * user login
   */

  async login(login, password) {
    this.setState({
      ...this.initState(),
      waiting: true,
    });
    console.log(login);
    const body = JSON.stringify({
      login,
      password,
      remember: true,
    });

    try {
      const response = await fetch('/api/v1/users/sign?fields=*', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body,
      });

      if (response.status === 500) {
        throw new Error(`Error ${response.status}: Check connection...`);
      }

      const json = await response.json();

      if (response.status !== 200) {
        this.setState({
          data: {},
          isAuth: false,
          waiting: false,
          error: json.error?.data?.issues?.map((issue) => ({
            code: response.status,
            message: issue.message,
          })),
        });

        return;
      }

      localStorage.setItem('YToken', json.result.token);
      localStorage.setItem(
        'YUser',
        JSON.stringify({
          name: json.result.user.profile.name,
          id: json.result.user._id,
        }),
      );

      this.setState({
        data: json.result.user,
        isAuth: true,
        waiting: false,
        error: [],
      });
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false,
        isAuth: false,
        error: [{ message: e.message }],
      });
    }
  }

  async loginByToken() {
    if (!localStorage.getItem('YToken') || !localStorage.getItem('YUser')) {
      this.setState({
        ...this.initState(),
        waiting: false,
      });
      return;
    }

    const token = localStorage.getItem('YToken');
    const lsUser = JSON.parse(localStorage.getItem('YUser'));

    try {
      const response = await fetch(`/api/v1/users/${lsUser.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-Token': token,
        },
      });

      if (response.status === 500) {
        throw new Error(`Error ${response.status}: Check connection...`);
      }

      const json = await response.json();

      if (response.status !== 200) {
        this.setState({
          ...this.initState(),
          waiting: false,
          error: json.error?.data?.issues?.map((issue) => ({
            code: response.status,
            message: issue.message,
          })),
        });
        return;
      }

      this.setState({
        data: json.result,
        isAuth: true,
        waiting: false,
        error: [],
      });
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        ...this.initState(),
        waiting: false,
        error: [{ message: e.message }],
      });
    }
  }

  logout() {
    this.setState({ ...this.initState(), waiting: false });
    localStorage.removeItem('YToken');
  }
}

export default UserState;
