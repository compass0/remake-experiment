
describe("어셋 삭제", () => {
    // it("프로젝트 선택 창 - 전체 어셋 삭제", () => {
    //     var project_number = 2 // 어셋 라이브러리에서 위에서(최근) 몇번째 프로젝트의 어셋을 삭제할지.

    //     cy.login_post_first()
    //     cy.projectAssetRemove(project_number-1)
    // });

    it("프로젝트 선택 후 - 이미지 어셋 삭제", () => {
        cy.login_post_first()
        
        cy.imageAssetRemove(0)
    });

    it("프로젝트 선택 후 - 로고 어셋 삭제", () => {
        cy.login_post_first()
        
        cy.logoAssetRemove()
    });

    it("프로젝트 선택 후 - 텍스트 어셋 삭제", () => {
        cy.login_post_first()
        
        cy.textAssetRemove()
    });
})