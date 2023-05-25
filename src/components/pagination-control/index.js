import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationControl(props) {
  const cn = bem('PaginationControl');

  const [viewPages, setViewPages] = useState([]);

  useEffect(() => {
    const pages = [1];
    for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
      if (i === props.currentPage - 1 && i - pages[0] > 1) {
        pages.push('...');
      }
      if (i > pages[0] && i < props.totalPages) {
        pages.push(i);
      }
      if (i === props.currentPage + 1 && props.totalPages - i > 1) {
        pages.push('...');
      }
    }
    if (props.totalPages > 1) {
      pages.push(props.totalPages);
    }

    setViewPages(pages);
  }, [props.currentPage, props.totalPages]);

  if (viewPages.length <= 1) {
    return false;
  }

  const renderPagination = (page, i, list) => {
    if (page === props.currentPage) {
      return (
        <button
          key={page}
          data-key={page}
          className={cn('btn', cn('btn--current'))}
          onClick={() => props.goTo(page)}
        >
          {page}
        </button>
      );
    }

    if (page === '...') {
      return (
        <div key={`dots-${i}`} data-key={`dots-${page}`} className={cn('dots')}>
          {page}
        </div>
      );
    }
    return (
      <button key={page} data-key={page} className={cn('btn')} onClick={() => props.goTo(page)}>
        {page}
      </button>
    );
  };

  return <div className={cn()}>{viewPages.map(renderPagination)}</div>;
}

PaginationControl.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  goTo: PropTypes.func,
};

export default memo(PaginationControl);
