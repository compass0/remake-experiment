
describe("Crolo Test", () => {
    it("프로젝트 전체 선택 후 삭제", () => {
        cy.login();
        cy.projectAllRemove();
    });
})
