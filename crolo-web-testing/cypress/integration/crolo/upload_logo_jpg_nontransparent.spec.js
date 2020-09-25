
describe("불투명 JPG 로고 어셋 업로드", () => {
    it("브랜드 로고 업로드", ()=>{
        cy.login();
        cy.projectCreate();

        var img_list = ['100x66.jpg', '200x133.jpg', '300x200.jpg', '400x266.jpg', '500x333.jpg', '700x466.jpg', '900x600.jpg', '1000x666.jpg',  '1100x732.jpg', '1200x800.jpg']
        
        for (const img_name of img_list){ 
            it("[Non-Transparent, JPG] " + img_name, ()=>{
                cy.login_post_first()
                cy.projectCreate()
                cy.uploadImageAsset(img_name, "non-transparent/", "브랜드 로고")
                cy.wait(1500)
            });
        }
    });
})