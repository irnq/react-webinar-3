import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce((value) => props.onChange(value, props.name), 600),
    [props.onChange, props.name],
  );

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <label className={cn({ position: props.labelPosition })}>
      {props.label}
      <input
        className={cn({ theme: props.theme })}
        value={value}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={onChange}
        required={props.required}
      />
    </label>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  theme: PropTypes.oneOf(['small', 'medium', 'big']),
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['vertical', 'horizontal']),
  required: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: 'medium',
  labelPosition: 'horizontal',
  required: false,
};

export default memo(Input);
