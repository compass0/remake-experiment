
describe("불투명 JPG 로고 어셋 업로드", () => {
    beforeEach(() => {
        cy.login_post_first()
    })

    var to_be_success_imgs = ['200x133.jpg', '300x200.jpg', '400x266.jpg', '500x333.jpg', '700x466.jpg', '900x600.jpg', '1000x666.jpg']
    var to_be_fail_imgs = ['100x66.jpg']

    it("JPG NonTransparent 로고 성공 테스트", ()=>{
        var project_name = "JPG NonTransparent 로고 성공 테스트"
        
        cy.uploadImageAssetReady(project_name)
        cy.uploadImageAsset(project_name, to_be_success_imgs, "non-transparent/", "브랜드 로고")

        var displayed_logo_seq = to_be_success_imgs.length -1;
        for (const img_name of to_be_success_imgs){
            cy.checkUploadedImageAsset(project_name, img_name, "브랜드 로고", displayed_logo_seq)
            displayed_logo_seq -= 1;
        }
        
        cy.uploadImageAssetAfter("브랜드 로고")
    });

    it("JPG NonTransparent 로고 실패 테스트", ()=>{
        var project_name = "JPG NonTransparent 로고 실패 테스트"

        cy.uploadImageAssetFailReady(project_name)

        cy.uploadImageAssetFail(project_name, to_be_fail_imgs, "non-transparent/", "브랜드 로고")

        cy.uploadImageAssetFailAfter("브랜드 로고")
    });
})
