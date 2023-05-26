import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Toggler(props) {
  const cn = bem('Toggler');
  const [option, setOption] = useState(0);

  useEffect(() => {
    if (props.defaultValue) {
      const index = props.options.findIndex((opt) => opt.value === props.defaultValue);
      setOption(index);
    }
  }, []);

  const handleClick = () => {
    const nextValue = (option + 1) % props.options.length;
    setOption(nextValue);
    props.onChange(props.options[nextValue].value);
  };

  return (
    <div className={cn()} onClick={handleClick}>
      <p className={cn('title')}>{props.options[option].title}</p>
      <div className={cn('bar')}>
        {props.options.map((_, i) => {
          if (i === option) {
            return <div key={i} className={cn('bar-item', cn('bar-item--active'))}></div>;
          }
          return <div key={i} className={cn('bar-item')}></div>;
        })}
      </div>
    </div>
  );
}

Toggler.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

Toggler.defaultProps = {
  onChange: () => {},
};

export default memo(Toggler);
