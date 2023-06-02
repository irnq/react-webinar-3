import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function ProtectedRoute(props) {
  const location = useLocation();

  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
  }));

  return select.isAuth ? (
    props.children
  ) : (
    <Navigate to='/login' replace state={{ path: location.pathname }} />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
