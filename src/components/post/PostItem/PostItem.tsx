import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { PostItemProps } from '../../../post/domain';
import './PostItem.css';

const PostItem = ({ post, handleDeleteClick }: PostItemProps) => {
    return (
        <div className="post-item">
            <div className="post-header">
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(post.id)} />
            </div>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
        </div>
    );
};

export default PostItem;
