export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface CreateUser {
  name: string;
  username: string;
  email: string;
}

export interface Errors {
  name?: string;
  username?: string;
  email?: string;
  general?: string;
}

export interface CreateUserProps {
  newUser: CreateUser;
  setNewUser: (newUser: CreateUser) => void;
  errors: Errors;
  handleCreateUser: () => void;
  isEditMode: boolean;
}
