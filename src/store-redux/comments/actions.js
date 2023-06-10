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

  post: (message, parent) => {
    return async (dispatch, getState, services) => {
      //Включаем признак ожидания, без сброса состояния.
      dispatch({ type: 'comments/post-start' });

      const body = JSON.stringify({
        text: message,
        parent,
      });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          method: 'POST',
          body,
        });

        // Комментарии загружены успешно
        dispatch({
          type: 'comments/post-success',
          payload: { comment: res.data?.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/post-error' });
      }
    };
  },

  openReply: (parentId) => {
    const reply = {
      _id: `${parentId}-reply`,
      parent: { _id: parentId, _type: 'comment' },
      isReply: true,
    };
    return { type: 'comments/open-reply', payload: reply };
  },

  reOpenReply: (parentId) => {
    const reply = {
      _id: `${parentId}-reply`,
      parent: { _id: parentId, _type: 'comment' },
      isReply: true,
    };
    return { type: 'comments/reopen-reply', payload: reply };
  },

  closeReply: () => {
    return { type: 'comments/close-reply' };
  },
};
