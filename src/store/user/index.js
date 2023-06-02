import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      isAuth: false,
      waiting: false, // признак ожидания загрузки
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
          ...this.initState(),
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
        ...this.initState(),
        error: [{ message: e.message }],
      });
    }
  }

  async loginByToken() {
    const token = localStorage.getItem('YToken');
    if (!token || !localStorage.getItem('YUser')) {
      this.setState({
        ...this.initState(),
      });
      return;
    }

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

  async logout() {
    const token = localStorage.getItem('YToken');

    await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Token': token,
      },
    });

    this.setState({ ...this.initState() });
    localStorage.removeItem('YToken');
  }

  resetState() {
    this.setState({ ...this.initState() });
  }
}

export default UserState;
