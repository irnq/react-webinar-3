import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';
import { getLocaleText } from '../../service/localization';

function Navigation(props) {
  const cn = bem('Navigation');
  return (
    <div className={cn()}>
      {props.linkList.map((link) => {
        return (
          <Link key={link.key} to={link.href}>
            {getLocaleText('navigation', link.key, props.locale)}
          </Link>
        );
      })}
    </div>
  );
}

Navigation.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      href: PropTypes.string,
    }),
  ).isRequired,
  locale: PropTypes.string,
};

export default memo(Navigation);
