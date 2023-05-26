import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function Navigation(props) {
  const cn = bem('Navigation');
  return (
    <div className={cn()}>
      {props.linkList.map((link) => {
        return (
          <Link key={link.title} to={link.href}>
            {link.title}
          </Link>
        );
      })}
    </div>
  );
}

Navigation.propTypes = {
  linkList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(Navigation);
