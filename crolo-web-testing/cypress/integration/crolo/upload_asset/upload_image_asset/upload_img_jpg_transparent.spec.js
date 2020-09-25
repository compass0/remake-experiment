
describe("투명 JPG 이미지 어셋 업로드", () => {
    beforeEach(() => {
        cy.login_post_first()
    })

    var to_be_success_imgs = ['700x466.jpg', '900x600.jpg', '1000x666.jpg',  '1100x732.jpg', '1200x800.jpg']
    var to_be_fail_imgs = ['100x66.jpg', '200x133.jpg', '300x199.jpg', '400x266.jpg', '500x333.jpg']

    
    it("JPG Transparent 이미지 성공 테스트", ()=>{
        var project_name = "JPG Transparent 이미지 성공 테스트"

        // cy.uploadImageAssetReady(project_name)
        // for (const img_name of to_be_success_imgs){ 
        //     cy.uploadImageAsset(project_name, img_name, "transparent/", "이미지 어셋")
        // }
        // cy.uploadImageAssetAfter("이미지 어셋")

        cy.uploadImageAssetReady(project_name)
        cy.uploadImageAsset(project_name, to_be_success_imgs, "transparent/", "이미지 어셋")

        var displayed_img_seq = to_be_success_imgs.length -1;
        for (const img_name of to_be_success_imgs){
            cy.checkUploadedImageAsset(project_name, img_name, "이미지 어셋", displayed_img_seq)
            displayed_img_seq -= 1;
        }
        
        cy.uploadImageAssetAfter("이미지 어셋")
        
    });

    it("JPG Transparent 이미지 실패 테스트", ()=>{
        var project_name = "JPG Transparent 이미지 실패 테스트"

        cy.uploadImageAssetFailReady(project_name)

        cy.uploadImageAssetFail(project_name, to_be_fail_imgs, "transparent/", "이미지 어셋")

        cy.uploadImageAssetFailAfter("이미지 어셋")
        
    });
})