
describe("프로젝트 테스트", () => {
    beforeEach(() => {
        cy.login_post_first()
    })
    it("프로젝트 생성 확인", () => {
        const project_name = "프로젝트 생성 테스트"

        cy.projectCreate(project_name);

        cy.projectAllRemove([project_name]);
    });
    
    it("프로젝트 전체 선택 후 삭제", () => {
        const project_names = ["프로젝트 전체 선택 후 삭제1", "프로젝트 전체 선택 후 삭제2"]

        project_names.forEach(project_name => cy.projectCreate(project_name));
        cy.projectAllRemove(project_names);
    });

    /*
    it("프로젝트 완전히 삭제(테스트용 x, 실행용 o )", () => {
        cy.login_post_first()
        for(var i = 5; i<7; i++){
            cy.projectAssetRemoveExec(i)
        }
        cy.wait(3000)
        cy.projectAllRemove();
        
    }); */
})