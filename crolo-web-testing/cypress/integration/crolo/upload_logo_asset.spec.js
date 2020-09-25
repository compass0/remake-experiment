
describe("브랜드 로고 어셋 업로드 테스트", () => {
    ////// enter img name after put image in .../fixture/general/
    var to_be_success_img = "500x333.jpg"
    var to_be_fail_img = "100x66.png"

    
    it("성공할 일반 로고 어셋 업로드(transparent/non-transparent)", ()=>{
        var img_name = to_be_success_img
        cy.login_post_first();
        // cy.projectCreate();
        cy.uploadImageAsset(img_name, "general/", "브랜드 로고")
        
    });

    it("실패할 일반 로고 어셋 업로드(transparent/non-transparent)", ()=>{
        var img_name = to_be_fail_img
        cy.login_post_first();
        // cy.projectCreate();
        cy.uploadImageAssetFail(img_name, "general/", "브랜드 로고")
        
    });
})