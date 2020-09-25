
describe("이미지 어셋 업로드 테스트", () => {
    ////// enter img name after put image in .../fixture/general/
    var to_be_success_img = "500x333.png"
    var to_be_fail_img = "500x333.jpg"
    

    it("성공할 일반 이미지 어셋 업로드(transparent/non-transparent)", ()=>{
        var img_name = to_be_success_img
        // cy.login();
        cy.login_post_first();
        // cy.visit("http://34.85.63.192:3000/")
        // cy.projectCreate();
        cy.uploadImageAsset(img_name, "general/", "이미지 어셋")
        
    });

    // it("실패할 일반 이미지 어셋 업로드(transparent/non-transparent)", ()=>{
    //     var img_name = to_be_fail_img
    //     // cy.login();
    //     cy.login_post_first()
    //     // cy.visit("http://34.85.63.192:3000/")
    //     // cy.projectCreate();
    //     cy.uploadImageAssetFail(img_name, "general/", "이미지 어셋")
        
    // });
})