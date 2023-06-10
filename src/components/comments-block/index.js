import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Comment from '../comment';
import CommentDeleted from '../comment-deleted';
import CommentNew from '../comment-new';
import CommentReply from '../comment-reply';

function CommentsBlock(props) {
  const cn = bem('Comments');

  const nestedCommentStyle = (level) => {
    const nestedStyle = {
      paddingLeft: `${(level % 10) * 30}px`,
    };

    if (level % 10 === 0 && level > 0) {
      nestedStyle['borderTop'] = '1px solid #aaa';
      nestedStyle['borderLeft'] = '1px solid #aaa';
      nestedStyle['boxShadow'] = 'inset 4px 4px 6px 0px #eee';
      nestedStyle['padding'] = '10px 0 0 10px';
      nestedStyle['marginTop'] = '-20px';
    }

    return nestedStyle;
  };

  const renderComments = useCallback(
    ({ comment, level }) => {
      if (comment.isDeleted) {
        return (
          <li key={comment._id} className={cn('list-item')} style={nestedCommentStyle(level)}>
            <CommentDeleted content={props.t('comments.isDeleted')} t={props.t} />
          </li>
        );
      }
      return (
        <li key={comment._id} className={cn('list-item')} style={nestedCommentStyle(level)}>
          {comment.isReply ? (
            <CommentReply
              t={props.t}
              title={props.t('comments.newReply')}
              isAuth={props.isAuth}
              onSubmit={props.sendComment}
              parent={{ ...comment.parent }}
              onCancel={props.closeReply}
            />
          ) : (
            <Comment
              comment={comment}
              locale={props.locale}
              t={props.t}
              onReply={props.openReply}
              self={props.userId === comment?.author?._id}
            />
          )}
        </li>
      );
    },
    [props.isAuth, props.list, props.isReplyOpen],
  );

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.title}</h2>
      <ul className={cn('list')}>{props.list.map(renderComments)}</ul>
      {!props.isReplyOpen && (
        <CommentNew
          t={props.t}
          title={props.t('comments.newComment')}
          isAuth={props.isAuth}
          onSubmit={props.sendComment}
          parent={props.parent}
        />
      )}
    </div>
  );
}

CommentsBlock.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  list: PropTypes.array,
  t: PropTypes.func,
  locale: PropTypes.string,
  isAuth: PropTypes.bool,
  sendComment: PropTypes.func,
  userId: PropTypes.string,
  parent: PropTypes.shape({
    _id: PropTypes.string,
    _type: PropTypes.oneOf(['comment', 'article']),
  }),

  closeReply: PropTypes.func,
  openReply: PropTypes.func,
  isReplyOpen: PropTypes.bool,
};

CommentsBlock.defaultProps = {
  t: (text) => text,
  sendComment: () => {},
  closeReply: () => {},
  openReply: () => {},
};

export default memo(CommentsBlock);
