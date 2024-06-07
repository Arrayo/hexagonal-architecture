describe('Full Application Flow', () => {
  beforeEach(() => {
    cy.visit('https://arrayo.github.io/hexagonal-architecture/');
  });

  it('completes the full application flow', () => {
    // Step 1: Verify CreateUserForm components are present
    cy.get('input[placeholder="Name"]').should('exist');
    cy.get('input[placeholder="Username"]').should('exist');
    cy.get('input[placeholder="Email"]').should('exist');
    cy.get('button').contains('Submit').should('exist');

    // Step 2: Fill out CreateUserForm and submit
    cy.get('input[placeholder="Name"]').type('John Doe').should('have.value', 'John Doe');
    cy.get('input[placeholder="Username"]').type('johndoe').should('have.value', 'johndoe');
    cy.get('input[placeholder="Email"]').type('john.doe@example.com').should('have.value', 'john.doe@example.com');
    cy.get('button').contains('Submit').click();

    // Step 3: Verify user is logged in
    cy.contains('Logged in as John Doe').should('exist');
    cy.contains('Connected Users').should('exist');
    cy.get('button').contains('Create Post').should('exist');

    // Step 4: Click "Create Post" button and fill out CreatePostForm
    cy.get('button').contains('Create Post').click();
    cy.get('input[placeholder="Title"]').should('exist');
    cy.get('textarea[placeholder="Message"]').should('exist');
    cy.get('button').contains('Submit').should('exist');

    // Step 5: Fill out CreatePostForm and submit
    cy.get('input[placeholder="Title"]').type('Test Post');
    cy.get('textarea[placeholder="Message"]').type('This is a test post');
    cy.get('button').contains('Submit').click();

    // Step 6: Verify the post is created
    cy.contains('Created Posts').should('exist');
    cy.contains('Connected Users').should('exist');

    cy.get('.post-item').should('exist');
    cy.get('.post-item h4').contains('Test Post').should('exist');
    cy.get('.post-item p').contains('This is a test post').should('exist');

    // Step 7: Delete the post
    cy.get('.post-item .fa-trash').click();

    // Step 8: Verify the post is deleted
    cy.get('.post-item').should('not.exist');
    cy.get('button').contains('Create Post').should('exist');

    // Step 9: Edit the user
    cy.get('.fa-pen-to-square').click();
    cy.contains('Edit User').should('exist');
    cy.get('input[placeholder="Name"]').clear().type('Jane Doe').should('have.value', 'Jane Doe');
    cy.get('button').contains('Submit').click();
    cy.contains('Logged in as Jane Doe').should('exist');

    // Step 10: Delete the user
    cy.get('.fa-trash').first().click();

    // Step 11: Verify it returns to the initial CreateUserForm
    cy.get('input[placeholder="Name"]').should('exist');
    cy.get('input[placeholder="Username"]').should('exist');
    cy.get('input[placeholder="Email"]').should('exist');
    cy.get('button').contains('Submit').should('exist');
  });
});
