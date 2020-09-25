
describe("투명 PNG 로고 어셋 업로드", () => {
    beforeEach(() => {
        cy.login_post_first()
    })
    
    var to_be_success_imgs = ['200x133.png', '300x200.png', '400x266.png', '500x333.png', '700x466.png', '900x600.png', '1000x666.png']
    var to_be_fail_imgs = ['100x66.png']

    it("PNG Transparent 로고 성공 테스트", ()=>{
        var project_name = "PNG Transparent 로고 성공 테스트"
        
        cy.uploadImageAssetReady(project_name)
        cy.uploadImageAsset(project_name, to_be_success_imgs, "transparent/", "브랜드 로고")

        var displayed_logo_seq = to_be_success_imgs.length -1;
        for (const img_name of to_be_success_imgs){
            cy.checkUploadedImageAsset(project_name, img_name, "브랜드 로고", displayed_logo_seq)
            displayed_logo_seq -= 1;
        }
        
        cy.uploadImageAssetAfter("브랜드 로고")
    });

    it("PNG Transparent 로고 실패 테스트", ()=>{
        var project_name = "PNG Transparent 로고 실패 테스트"

        cy.uploadImageAssetFailReady(project_name)

        cy.uploadImageAssetFail(project_name, to_be_fail_imgs, "transparent/", "브랜드 로고")

        cy.uploadImageAssetFailAfter("브랜드 로고")
    });
})