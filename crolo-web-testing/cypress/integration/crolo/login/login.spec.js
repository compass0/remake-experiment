
describe("로그인 테스트", () => {
    it("로그인", () => {
        cy.log(Cypress.version)

        cy.login_post_first()
    });
})