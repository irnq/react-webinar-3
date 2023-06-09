import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function CommentNew({ isAuth, t, title, onSubmit, parent }) {
  const [message, setMessage] = useState('');

  const cn = bem('CommentNew');

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
    </div>
  ) : (
    <div className={cn()}>
      <p className={cn('auth-message')}>
        <Link to='/login' className={cn('auth-message')} state={{ back: location.pathname }}>
          {t('comments.login')}
        </Link>
        {t('comments.warnMessage')}
      </p>
    </div>
  );
}

CommentNew.propTypes = {
  isAuth: PropTypes.bool,
  onSubmit: PropTypes.func,
  t: PropTypes.func,
  title: PropTypes.string,
  parent: PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.oneOf(['comment', 'article']),
  }),
};

CommentNew.defaultProps = {
  t: (text) => text,
  onSubmit: () => {},
};

export default memo(CommentNew);
