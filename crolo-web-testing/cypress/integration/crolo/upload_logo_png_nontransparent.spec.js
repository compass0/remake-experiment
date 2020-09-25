
describe("불투명 PNG 로고 어셋 업로드", () => {
    
    var img_list = ['100x66.png', '200x133.png', '300x200.png', '400x266.png', '500x333.png', '700x466.png', '900x600.png', '1000x666.png',  '1100x732.png', '1200x800.png'];

    for (const img_name of img_list){ 
        it("[Non-Transparent, PNG] " + img_name, ()=>{
            cy.login_post_first()
            cy.projectCreate()
            cy.uploadImageAsset(img_name, "non-transparent/", "브랜드 로고")
            cy.wait(1500)
        });
    }
})