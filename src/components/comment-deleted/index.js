import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentDeleted(props) {
  const cn = bem('CommentDeleted');

  return (
    <div className={cn()}>
      <p className={cn('text')}>{props.content}</p>
    </div>
  );
}

CommentDeleted.propTypes = {
  content: PropTypes.string,
  t: PropTypes.func,
};

CommentDeleted.defaultProps = {
  t: (text) => text,
};

export default memo(CommentDeleted);
