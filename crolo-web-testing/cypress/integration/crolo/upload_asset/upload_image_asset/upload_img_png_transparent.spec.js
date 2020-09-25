
describe("투명 PNG 이미지 어셋 업로드", () => {
    beforeEach(() => {
        cy.login_post_first()
    })

    // var img_list = ['100x66.png', '200x133.png', '300x200.png', '400x266.png', '500x333.png', '700x466.png', '900x600.png', '1000x666.png',  '1100x732.png', '1200x800.png'];

        
    // for (const img_name of img_list){ 
    //     it("[Transparent, PNG] " + img_name, ()=>{
    //         var project_name = "[Transparent, PNG] " + img_name + "(이미지)"

    //         cy.uploadImageAssetReady(project_name)
    //         cy.uploadImageAsset(project_name, img_name, "transparent/", "이미지 어셋")
    //         cy.uploadImageAssetAfter("이미지 어셋")
    //     });
    // }

    var to_be_success_imgs = ['500x333.png', '700x466.png', '900x600.png', '1000x666.png',  '1100x733.png', '1200x800.png']
    var to_be_fail_imgs = ['100x66.png', '200x133.png', '300x200.png', '400x266.png']

    it("PNG Transparent 이미지 성공 테스트", ()=>{
        var project_name = "PNG Transparent 이미지 성공 테스트"

        cy.uploadImageAssetReady(project_name)
        cy.uploadImageAsset(project_name, to_be_success_imgs, "transparent/", "이미지 어셋")

        var displayed_img_seq = to_be_success_imgs.length -1;
        for (const img_name of to_be_success_imgs){
            cy.checkUploadedImageAsset(project_name, img_name, "이미지 어셋", displayed_img_seq)
            displayed_img_seq -= 1;
        }
        
        cy.uploadImageAssetAfter("이미지 어셋")
    });

    it("PNG Transparent 이미지 실패 테스트", ()=>{
        var project_name = "PNG Transparent 이미지 실패 테스트"

        cy.uploadImageAssetFailReady(project_name)

        cy.uploadImageAssetFail(project_name, to_be_fail_imgs, "transparent/", "이미지 어셋")

        cy.uploadImageAssetFailAfter("이미지 어셋")
    });
})