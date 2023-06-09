import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentReply({ isAuth, t, title, onSubmit, onCancel, parent }) {
  const [message, setMessage] = useState('');

  const cn = bem('CommentReply');

  return isAuth ? (
    <div className={cn()}>
      <h4 className={cn('title')}>{title}</h4>
      <textarea
        className={cn('textarea')}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className={cn('send')}
        onClick={() => {
          onSubmit(message, parent);
        }}
      >
        {t('comments.send')}
      </button>
      <button className={cn('cancel')} onClick={onCancel}>
        {t('comments.cancel')}
      </button>
    </div>
  ) : (
    <div className={cn()}>
      <p className={cn('auth-message')}>
        <Link to='/login' className={cn('auth-message')} state={{ back: location.pathname }}>
          {t('comments.login')}
        </Link>
        {t('comments.warnMessage')}
        <button className={cn('cancel-text')} onClick={onCancel}>
          {t('comments.cancel')}
        </button>
      </p>
    </div>
  );
}

CommentReply.propTypes = {
  isAuth: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  t: PropTypes.func,
  title: PropTypes.string,
  parent: PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.oneOf(['comment', 'article']),
  }),
};

CommentReply.defaultProps = {
  t: (text) => text,
  onSubmit: () => {},
  onCancel: () => {},
};

export default memo(CommentReply);
