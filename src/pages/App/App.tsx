import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateUserForm from '../../components/user/CreateUserForm';
import CreatePostForm from '../../components/post/CreatePostForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateUser, usePostActions } from '../../hooks';
import PostItem from '../../components/post/PostItem';
import './App.css';

const App = () => {
    const {
        errors: userErrors,
        handleCreateUser,
        handleDeleteUser,
        handleEditUser,
        selectedUser,
        setNewUser,
        isLoggedIn,
        isEditMode,
        newUser,
        users,
    } = useCreateUser();

    const {
        extendedHandleDeleteUser,
        userHasCreatedPost,
        setIsCreatingPost,
        handleDeleteClick,
        handleCreatePost,
        isCreatingPost,
        createdPosts,
        randomUsers,
        setNewPost,
        postErrors,
        newPost,
    } = usePostActions(selectedUser, users, handleDeleteUser);

    return (
        <div className="App">
        {!isLoggedIn && !selectedUser && <p>Loading...</p>}

        {!isLoggedIn && selectedUser && (
            <CreateUserForm
            newUser={newUser}
            setNewUser={setNewUser}
            errors={userErrors}
            handleCreateUser={handleCreateUser}
            isEditMode={isEditMode}
            />
        )}

        {isLoggedIn && (
            <div className="success-section">
            <div className="user-actions">
                <p>Logged in as <strong>{selectedUser?.name}</strong></p>
                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditUser(selectedUser!)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => extendedHandleDeleteUser(selectedUser!.id)} />
            </div>
            {!isCreatingPost && (
                <button
                className="create-post-button"
                onClick={() => setIsCreatingPost(true)}
                disabled={userHasCreatedPost}
                >
                Create Post
                </button>
            )}
            {isCreatingPost && (
                <CreatePostForm
                newPost={newPost}
                setNewPost={setNewPost}
                handleCreatePost={handleCreatePost}
                errors={postErrors}
                />
            )}
            {createdPosts.length > 0 && (
                <div className="posts-section">
                <h3>Created Posts</h3>
                {createdPosts.map(post => (
                    <PostItem key={post.id} post={post} handleDeleteClick={handleDeleteClick} />
                ))}
                </div>
            )}
            <div className="connected-users">
                <h3>Connected Users:</h3>
                {randomUsers.map(user => (
                <p key={user.id}>{user.name}</p>
                ))}
            </div>
            </div>
        )}
        </div>
    );
};

export default App;
