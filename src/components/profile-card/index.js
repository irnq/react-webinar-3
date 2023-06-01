import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ user, t }) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{t('profile.title')}</h1>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.name')}:</div>
        <div className={cn('value')}>{user.profile?.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.phone')}:</div>
        <div className={cn('value')}>{user.profile?.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('profile.email')}:</div>
        <div className={cn('value')}>{user.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
  }).isRequired,
  t: PropTypes.func,
};

ProfileCard.defaultProps = {
  t: (text) => text,
};

export default memo(ProfileCard);
