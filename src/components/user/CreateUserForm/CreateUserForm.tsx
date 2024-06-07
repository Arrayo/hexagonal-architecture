import { CreateUserProps } from '../../../user/domain';
import './CreateUserForm.css';

const CreateUserForm = ({ newUser, setNewUser, errors, handleCreateUser, isEditMode }: CreateUserProps) => {
    return (
    <div className="form-section">
        <h2>{isEditMode ? 'Edit User' : 'Create User'}</h2>
        <div className="input-group">
        <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateUser()}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="input-group">
        <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateUser()}
        />
        {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="input-group">
        <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateUser()}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <button onClick={handleCreateUser}>Submit</button>
    </div>
    );
};

export default CreateUserForm;
