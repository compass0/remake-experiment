
describe("프로젝트 테스트", () => {
    // it("프로젝트 생성 확인", () => {
    //     cy.login_post_first();
    //     cy.projectCreate();

    //     // projectAllRemove();
    // });
    
    // it("프로젝트 전체 선택 후 삭제", () => {
    //     cy.login_post_first();
    //     cy.projectAllRemove();
    // });
    
    it("프로젝트 완전히 삭제 ( 배너 생성 테스트 제외 )", () => {
        cy.login_post_first()
        for(var i = 5; i<51; i++){
            cy.projectAssetRemoveExec(i)
        }
        cy.projectAllRemove();
        // cy.projectAssetRemove(2)
        // cy.projectAssetRemove(3)
        // cy.projectAssetRemove(4)
        
    });
})