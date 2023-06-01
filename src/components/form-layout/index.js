import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormLayout(props) {
  const cn = bem('FormLayout');

  return (
    <form className={cn()} onSubmit={props.onSubmit}>
      <h1 className={cn('title')}>{props.title}</h1>
      <div className={cn('fields')}>{props.children}</div>
      {props.error?.length > 0 &&
        props.error.map((e) => (
          <p key={e.message} className={cn('error')}>{`Error ${e.code}: ${e.message}`}</p>
        ))}
      <button type='submit'>{props.labelSubmit}</button>
    </form>
  );
}

FormLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  labelSubmit: PropTypes.string,
  error: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string,
    }),
  ),
};

FormLayout.defaultProps = {
  title: 'Форма',
  labelSubmit: 'Отправить',
  onSubmit: () => {},
};

export default memo(FormLayout);
