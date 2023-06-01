import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import SideLayout from '../side-layout';
import { Link } from 'react-router-dom';

function PageHeader(props) {
  const cn = bem('PageHeader');

  return (
    <header className={cn()}>
      <SideLayout side='end'>
        {props.isAuth ? (
          <>
            <Link className={cn('link')} to={props.profileLink}>
              {props.username}
            </Link>
            <button onClick={props.onLogout}>{props.t('header.logout')}</button>
          </>
        ) : (
          <button onClick={props.onLogin}>
            <Link to='/login' className={cn('btn')}>
              {props.t('header.login')}
            </Link>
          </button>
        )}
      </SideLayout>
    </header>
  );
}

PageHeader.propTypes = {
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  t: PropTypes.func,
  isAuth: PropTypes.bool,
  username: PropTypes.string,
  profileLink: PropTypes.string,
};

PageHeader.defaultProps = {
  onLogin: () => {},
  onLogout: () => {},
  t: (text) => text,
  isAuth: false,
};

export default memo(PageHeader);
