# Hexagonal Architecture React App

This project is a React application with a hexagonal architecture.

## Introduction

This project demonstrates the implementation of Hexagonal Architecture (also known as Ports and Adapters Architecture) in a React application. It showcases how to build maintainable and testable applications by decoupling the business logic from external systems.

## Features

- Clear separation of concerns
- Easy to test and maintain
- Extensible architecture
- Supports integration with various services and repositories

## Project Structure

```plaintext
└── 📁src
    └── 📁components
        └── 📁post
            └── 📁CreatePostForm
                └── CreatePostForm.css
                └── CreatePostForm.tsx
                └── index.ts
            └── 📁PostItem
                └── index.tsx
                └── PostItem.css
                └── PostItem.tsx
        └── 📁user
            └── 📁CreateUserForm
                └── CreateUserForm.css
                └── CreateUserForm.tsx
                └── index.ts
    └── 📁hooks
        └── index.ts
        └── useCreateUser.test.ts
        └── useCreateUser.ts
        └── usePost.test.ts
        └── usePost.ts
        └── usePostActions.test.ts
        └── usePostActions.ts
    └── 📁pages
        └── 📁App
            └── App.css
            └── App.tsx
            └── index.ts
    └── 📁post
        └── 📁application
            └── index.ts
            └── PostService.test.ts
            └── PostService.ts
        └── 📁domain
            └── index.ts
            └── Post.ts
        └── 📁infrastructure
            └── index.ts
            └── PostRepository.test.ts
            └── PostRepository.ts
    └── 📁user
        └── 📁application
            └── index.ts
            └── UserService.test.ts
            └── UserService.ts
        └── 📁domain
            └── index.ts
            └── User.ts
        └── 📁infrastructure
            └── index.ts
            └── UserRepository.test.ts
            └── UserRepository.ts
    └── index.css
    └── index.tsx
    └── react-app-env.d.ts
    └── reportWebVitals.ts
    └── setupTests.ts
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies required for the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run test`

Runs the unit and integration tests using Jest. This includes tests for the services and repositories.

## Running Tests with Cypress

To run the Cypress end-to-end tests, you can use the following commands:

### `npx cypress open`

This command opens the Cypress Test Runner. Use this for interactive testing.

### `npx cypress run`

This command runs the Cypress tests in headless mode, which is useful for CI/CD environments.

## Deployment

This app is deployed on GitHub Pages. You can view it at:

[Hexagonal Architecture App](https://arrayo.github.io/hexagonal-architecture/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

