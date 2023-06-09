import { memo, useCallback, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import { useSelector as useReduxSelector, useDispatch } from 'react-redux';
import shallowEqual from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';

import CommentsBlock from '../../components/comments-block';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';

function Comments({ id }) {
  const dispatch = useDispatch();

  useInit(() => {
    dispatch(commentsActions.load(id));
  }, [id]);

  const isAuth = useSelector((state) => state.session.exists);
  const userId = useSelector((state) => state.session.user._id);

  const select = useReduxSelector(
    (state) => ({
      waiting: state.comments.waiting,
      comments: state.comments.list,
      count: state.comments.count,
    }),
    shallowEqual,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t, lang } = useTranslate();

  const list = useMemo(
    () =>
      treeToList(listToTree(select.comments, '_id', id), (comment, level) => ({
        comment,
        level,
      })),
    [select.comments],
  );

  const callbacks = {
    sendComment: useCallback(
      (message, parent) => {
        dispatch(commentsActions.post(message, parent, id));
      },
      [dispatch],
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsBlock
        count={select.count}
        list={list}
        t={t}
        title={`${t('comments.title')} (${select.count})`}
        locale={lang}
        isAuth={isAuth}
        sendComment={callbacks.sendComment}
        parent={{ _id: id, _type: 'article' }}
        userId={userId}
      />
    </Spinner>
  );
}

export default memo(Comments);
