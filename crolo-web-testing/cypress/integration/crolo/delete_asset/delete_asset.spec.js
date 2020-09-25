
describe("어셋 삭제", () => {
    beforeEach(() => {
        cy.login_post_first()
    })

    it("프로젝트 선택 창 - 전체 어셋 삭제", () => {
        var project_number = 1 // 어셋 라이브러리에서 위에서(최근) 몇번째 프로젝트의 어셋을 삭제할지.
        var project_name = "프로젝트 어셋 전체 삭제"
        
        cy.projectAssetRemoveReady(project_name)
        cy.projectAssetRemove(project_number-1, project_name)
        cy.projectAssetRemoveAfter()
    });

    it("프로젝트 선택 후 - 이미지 어셋 삭제", () => {
        var project_name = "이미지 어셋 삭제"

        cy.imageAssetRemoveReady(project_name)
        cy.imageAssetRemove(0)
        cy.imageAssetRemoveAfter()
    });

    it("프로젝트 선택 후 - 로고 어셋 삭제", () => {
        var project_name = "로고 어셋 삭제"

        cy.logoAssetRemoveReady(project_name)
        cy.logoAssetRemove(0)
        cy.logoAssetRemoveAfter()
    });

    it("프로젝트 선택 후 - 텍스트 어셋 삭제", () => {
        var project_name = "텍스트 어셋 삭제"

        cy.textAssetRemoveReady(project_name)
        cy.textAssetRemove(0)
        cy.textAssetRemoveAfter()
    });
})