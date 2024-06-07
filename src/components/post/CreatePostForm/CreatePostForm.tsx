import { CreatePostProps } from '../../../post/domain';
import './CreatePostForm.css';

const CreatePostForm = ({ newPost, setNewPost, handleCreatePost, errors }: CreatePostProps) => {
    return (
    <div className="create-post-section">
        <h3>Create Post</h3>
        <div className="input-group">
        <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="input-group">
        <textarea
            placeholder="Message"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        {errors.body && <p className="error">{errors.body}</p>}
        </div>
        <button onClick={handleCreatePost} className="create-post-button">Submit</button>
    </div>
    );
};

export default CreatePostForm;
