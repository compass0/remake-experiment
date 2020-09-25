
describe("크리에이티브 테스트", () => {
    it("크리에이티브 생성", () => {
        cy.login_post_first()
        // cy.login()

        cy.createBanner()

        cy.saveBanner()
        
    });
})