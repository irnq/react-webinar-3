import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import dateFormat from '../../utils/date-format';

function Comment({ comment, locale, t, onReply, self }) {
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
  self: PropTypes.bool,
};

Comment.defaultProps = {
  t: (text) => text,
  onReply: () => {},
};

export default memo(Comment);
