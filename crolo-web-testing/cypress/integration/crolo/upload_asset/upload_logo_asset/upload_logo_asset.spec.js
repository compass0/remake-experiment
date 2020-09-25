
describe("브랜드 로고 어셋 업로드 테스트", () => {
    beforeEach(() => {
        cy.login_post_first()
    })

    ////// enter img name after put image in .../fixture/general/
    var to_be_success_imgs = ["500x333.jpg"]
    var to_be_fail_imgs = ["100x66.png"]

    
    it("성공할 일반 로고 어셋 업로드(transparent/non-transparent)", ()=>{
        var img_names = to_be_success_imgs
        var project_name = "로고 어셋 업로드(성공 예상)"
        
        cy.uploadImageAssetReady(project_name)
        cy.uploadImageAsset(project_name, img_names, "general/", "브랜드 로고")
        cy.uploadImageAssetAfter("브랜드 로고")
    });

    it("실패할 일반 로고 어셋 업로드(transparent/non-transparent)", ()=>{
        var img_names = to_be_fail_imgs
        var project_name = "로고 어셋 업로드(실패 예상)"

        cy.uploadImageAssetFailReady(project_name)
        cy.uploadImageAssetFail(project_name, img_names, "general/", "브랜드 로고")
        cy.uploadImageAssetFailAfter()
    });
})