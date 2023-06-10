// Начальное состояние
const initialState = {
  list: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, list: [], count: 0, waiting: true };

    case 'comments/load-success':
      return { ...state, list: action.payload.list, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, list: [], count: 0, waiting: false }; //@todo текст ошибки сохранить?

    case 'comments/post-start':
      return { ...state, waiting: true };

    case 'comments/post-success':
      return {
        ...state,
        list: state.list.concat(action.payload.comment),
        count: state.count + 1,
        waiting: false,
      };

    case 'comments/post-error':
      return { ...state, waiting: false }; //@todo текст ошибки сохранить?

    case 'comments/open-reply':
      return { ...state, list: state.list.concat(action.payload) };

    case 'comments/reopen-reply':
      return { ...state, list: state.list.slice(0, -1).concat(action.payload) };

    case 'comments/close-reply':
      return { ...state, list: state.list.slice(0, -1) };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
