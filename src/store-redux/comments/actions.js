export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс состояния и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: 'comments/load-success',
          payload: { list: res.data.result?.items, count: res.data.result?.count },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  post: (message, parent, articleId) => {
    return async (dispatch, getState, services) => {
      //Включаем признак ожидания, без сброса состояния.
      dispatch({ type: 'comments/post-start' });

      if (!articleId) {
        articleId = parent._id;
      }

      const body = JSON.stringify({
        text: message,
        parent,
      });

      try {
        await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body,
        });

        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${articleId}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: 'comments/load-success',
          payload: { list: res.data.result?.items, count: res.data.result?.count },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/post-error' });
      }
    };
  },
};
