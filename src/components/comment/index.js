import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import dateFormat from '../../utils/date-format';
import CommentReply from '../comment-reply';

function Comment({
  comment,
  locale,
  t,
  isAuth,
  sendComment,
  onReply,
  isReplyOpen,
  onCancel,
  self,
}) {
  const cn = bem('Comment');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <span className={cn('author', { self: self })}>{comment?.author?.profile?.name}</span>
        <span className={cn('date')}>{dateFormat(comment?.dateCreate, locale)}</span>
      </div>
      <p className={cn('text')}>{comment?.text}</p>
      <button className={cn('reply')} onClick={() => onReply(comment._id)}>
        {t('comments.reply')}
      </button>
      {isReplyOpen && (
        <CommentReply
          t={t}
          title={t('comments.newReply')}
          isAuth={isAuth}
          onSubmit={sendComment}
          parent={{ _id: comment._id, _type: 'comment' }}
          onCancel={() => onCancel(null)}
        />
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
      _id: PropTypes.string,
    }),
  }),
  t: PropTypes.func,
  onReply: PropTypes.func,
  onCancel: PropTypes.func,
  sendComment: PropTypes.func,
  isReplyOpen: PropTypes.bool,
  self: PropTypes.bool,
};

Comment.defaultProps = {
  t: (text) => text,
  onReply: () => {},
  sendComment: () => {},
  onCancel: () => {},
};

export default memo(Comment);
