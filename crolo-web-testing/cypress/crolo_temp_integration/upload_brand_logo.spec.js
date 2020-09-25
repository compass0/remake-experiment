
describe("Crolo Test", () => {
    it("[사이즈별] 브랜드 로고 어셋 업로드 테스트", ()=>{
        cy.login();
        cy.projectCreate();

        var transparent_img_list_png = ['100x66.png', '200x133.png', '300x200.png', '400x266.png', '500x333.png', '700x466.png', '900x600.png', '1000x666.png',  '1100x732.png', '1200x800.png'];
        var transparent_img_list_jpg = ['100x66.jpg', '200x133.jpg', '300x200.jpg', '400x266.jpg', '500x333.jpg', '700x466.jpg', '900x600.jpg', '1000x666.jpg',  '1100x732.jpg', '1200x800.jpg']

        // ['1300x866.jpg', '1400x933.jpg', '1500x1000.jpg', '1650x1100.jpg', '1800x1200.jpg']

        var cnt = 0;
        
        for (const img_name of ['500x333.jpg']){ 
            it("[Transparent] 브랜드 로고 업로드 (" + img_name.slice(0, -4) + ")", ()=>{
                cnt += 1;
                cy.log(img_name)
                // if (cnt == 1){
                cy.login()
                cy.projectCreate()
                // }
                
                cy.uploadImageAsset(img_name, "non-transparent/", "브랜드 로고")
                cy.wait(3000)
            });
        }
    });
})