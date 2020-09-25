
describe("투명 JPG 이미지 어셋 업로드", () => {

    var img_list = ['100x66.jpg', '200x133.jpg', '300x200.jpg', '400x266.jpg', '500x333.jpg', '700x466.jpg', '900x600.jpg', '1000x666.jpg',  '1100x732.jpg', '1200x800.jpg']
        
    for (const img_name of img_list){ 
        it("[Transparent, JPG] " + img_name, ()=>{
            cy.login_post_first()
            cy.projectCreate()
            cy.uploadImageAsset(img_name, "transparent/", "이미지 어셋")
            cy.wait(1500)
        });
    }
})