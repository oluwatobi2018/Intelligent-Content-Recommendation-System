describe('Authentication Tests', () => {
    beforeEach(() => {
        cy.visit('/login'); // Adjust the path to your login page
    });

    it('should display the login form', () => {
        cy.get('form').should('exist');
        cy.get('input[name="email"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('should log in with valid credentials', () => {
        cy.get('input[name="email"]').type('testuser@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        // Assert successful login (adjust based on your app's behavior)
        cy.url().should('not.include', '/login');
        cy.contains('Welcome, Test User').should('exist');
    });

    it('should show an error for invalid credentials', () => {
        cy.get('input[name="email"]').type('invaliduser@example.com');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        // Assert error message
        cy.contains('Invalid email or password').should('exist');
    });
});