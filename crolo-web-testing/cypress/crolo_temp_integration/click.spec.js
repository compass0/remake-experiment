import 'cypress-file-upload';

var id = "bluesalt752@gmail.com"
var password = "asdf1234!"

var today = new Date();
var year = today.getFullYear(); // 년도
var month = today.getMonth() + 1;  // 월
var date = today.getDate();  // 날짜
var day = today.getDay();  // 요일

var hours = today.getHours(); // 시
var minutes = today.getMinutes();  // 분
var seconds = today.getSeconds();  // 초
var milliseconds = today.getMilliseconds(); // 밀리초

var project_name = year.toString() + month.toString() + date.toString() + day.toString() + hours.toString() + minutes.toString() + seconds.toString() + milliseconds.toString();


var login = function(){
    cy.visit("http://34.85.63.192:3000/");
    cy.get("#normal_login_email")
    .type(id, {timeout:1000})
    cy.get("#normal_login_password")
    .type(password, {timeout:1000})

    cy.get("#normal_login > div:nth-child(3) > div > div > div > button")
    .click()

    cy.wait(2000)

    cy.get("#root > section > section > header > div > div:nth-child(2) > div > span")
}

// should be run after running login function.
var projectAllRemove = function(){
    // 어셋 라이브러리로 이동
    cy.get("#sub1\\$Menu > li:nth-child(2) > span:nth-child(2)")
    .click()
    
    cy.wait(3000)

    // 프로젝트 전체 선택
    cy.get(".ant-btn.ant-btn-link.ant-btn-sm")
    .click()
    // cy.get("#root > section > section > main > section > div > div.ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content.ant-tabs-card-content > div.ant-tabs-tabpane.ant-tabs-tabpane-active > div:nth-child(1) > button.ant-btn.ant-btn-link.ant-btn-sm")
    // .click()

    // 휴지통 버튼 선택
    cy.get("#root > section > section > main > section > div > div.ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content.ant-tabs-card-content > div.ant-tabs-tabpane.ant-tabs-tabpane-active > div:nth-child(1) > button:nth-child(2)")
    .click()


    // 삭제 확인 버튼 클릭
    cy.get(".ant-modal-footer").find("div").find("button").eq(1)
    .click()
}   

var projectCreate = function(){
    cy.get("#sub1\\$Menu > li:nth-child(1) > span:nth-child(2)")
    .click()

    cy.get("#root > section > section > main > div > button")
    .click()

    cy.get("body > div:nth-child(7) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > input")
    .type(project_name, {timeout:3000})

    cy.get("body > div:nth-child(7) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > div > button.ant-btn.ant-btn-primary")
    .click()

    cy.reload()

    cy.get("#rc_select_0")
    .click()

    cy.get(".ant-select-item-option-content").contains(project_name)
}


/*
    image_name
    ex) "와디즈_어셋-removebg-preview.png"

    upload_type
    ex) "브랜드 로고"
    ex) "이미지 어셋"
*/
var uploadImageAsset = function(image_name, path, upload_type){

    cy.on('uncaught:exception', (err, runnable) => {
        // expect(err.message).to.include('something about the error')
        expect(err.message).to.include('something about the error')

        // using mocha's async done callback to finish
        // this test so we prove that an uncaught exception
        // was thrown
        cy.log("이미지 업로드 실패")

        // return false to prevent the error from
        // failing this test
        return false
    })

    var alert_stmt = " 파일이 업로드 되었습니다."
    cy.get("#rc_select_0")
    .click()
    
    cy.get(".ant-select-item-option-content").eq(0)
    .click()

    cy.get("#rc_select_1")
    .click()

    cy.get(".ant-select-item-option-content").contains(upload_type)
    .click()

    // cy.get(".ant-upload-btn").find("input")
    // .attach_file('./와디즈_어셋-removebg-preview.png', 'image/png')

    
    // cy.fixture('와디즈_어셋-removebg-preview.png').then(fileContent => {
    //     cy.get('input[type="file"]').attachFile({ 
    //         fileContent, mimeType: 'image/*'
    //     });
    // });

    cy.get('input[type="file"]').attachFile(path + image_name, 'image/*');
    
    cy.get("#root > section > section > main > section > div.ant-tabs.ant-tabs-top.ant-tabs-line.ant-tabs-no-animation > div.ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content > div.ant-tabs-tabpane.ant-tabs-tabpane-active > div.align-right > button")
    .click({timeout:2000})
    
    cy.wait(2000)
    
    cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(0).should('have.attr', 'title', image_name, {timeout:1000})
    // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(0).find('[title="와디즈 로고.png"]', {timeout:1000})
    // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find('[title="와디즈_어셋-removebg-preview.png"]', {timeout:1000})
    
    cy.wait(1000)

    cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(1).should('have.attr', 'title', project_name, {timeout:1000})
    // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find('[title="' + project_name + '"]', {timeout:1000})
    
    cy.wait(1000)

    cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(2).should('have.text', upload_type, {timeout:1000})
    // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).contains(project_name, {timeout:1000})
    
    cy.wait(1000)
    cy.get(".ant-alert-message").should("have.text", image_name + alert_stmt)

    cy.wait(1000)
}

var uploadImageAssetSmallSize = function(image_name, upload_type){
    var alert_stmt = " 파일을 업로드할 수 없습니다. 최소 픽셀 사이즈를 확인해주세요."
    cy.get("#rc_select_0")
    .click()
    
    cy.get(".ant-select-item-option-content").eq(0)
    .click()

    cy.get("#rc_select_1")
    .click()

    cy.get(".ant-select-item-option-content").contains(upload_type)
    .click()

    cy.get('input[type="file"]').attachFile(image_name, 'image/*');
    
    cy.get("#root > section > section > main > section > div.ant-tabs.ant-tabs-top.ant-tabs-line.ant-tabs-no-animation > div.ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content > div.ant-tabs-tabpane.ant-tabs-tabpane-active > div.align-right > button")
    .click({timeout:2000})
    
    cy.wait(1000)
    cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(0).should('not.have.attr', 'title', image_name, {timeout:1000})
    // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(0).find('[title="와디즈 로고.png"]', {timeout:1000})
    // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find('[title="와디즈_어셋-removebg-preview.png"]', {timeout:1000})
    
    cy.wait(1000)
    cy.get(".ant-alert-message").should("have.text", image_name + alert_stmt)

    cy.wait(3000)
}


// if lang == "kor", 한글 선택, 
// else if lang == "eng", 영어 선택.
var enterTextAsset = function(lang, very_small_text, small_text, intermediate_text, long_text, very_long_text, text_asset_num = 1){
    
    // 프로젝트 목록 열기
    cy.get("#rc_select_0")
    .click()
    
    // 목록에서 프로젝트 선택
    cy.get(".ant-select-item-option-content").eq(0)
    .click()

    // 텍스트 버튼 클릭
    cy.get("#tab-2")
    .click()

    // 텍스트 어셋 글자 입력
    var text_asset_seletor = ".editable.edit"
    cy.get(text_asset_seletor).eq(0).type(very_small_text)

    cy.get(text_asset_seletor).eq(1).type(small_text)

    cy.get(text_asset_seletor).eq(2).type(intermediate_text)

    cy.get(text_asset_seletor).eq(3).type(long_text)

    cy.get(text_asset_seletor).eq(4).type(very_long_text)

    // 저장하기 버튼 클릭
    cy.get(".ant-tabs-tabpane.ant-tabs-tabpane-active").find(".ant-btn.ant-btn-primary")
    .click()


    // 언어 선택안하고 저장하기 버튼 클릭시, 
    // 경고 문구 제대로 뜨는지 확인
    cy.get(".ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content").find('[role="tabpanel"]').eq(1).find(".ant-alert-message")
    .should("have.text", "입력할 언어를 선택해주세요.")


    // ( if lang = 0, 한국어, if lang = 1, 영어)
    var lang_number = (lang == "kor" ? "0" : (lang == "eng" ? "1" : "error_trigger"))

    // 한국어 또는 영어 라디오 버튼 선택
    cy.get(".ant-radio-group.ant-radio-group-outline").find(".ant-radio-button-wrapper").eq(lang_number).find(".ant-radio-button-input")
    .check({force: true})

    // 저장하기 버튼 클릭
    cy.get(".ant-tabs-tabpane.ant-tabs-tabpane-active").find(".ant-btn.ant-btn-primary")
    .click()

    // 저장되었다는 문구 뜨는지 확인
    cy.get(".ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content").find('[role="tabpanel"]').eq(1).find(".ant-alert-message")
    .should("have.text", "텍스트가 저장 되었습니다.")

    // 어셋 라이브러리 탭 클릭
    cy.get("#sub1\\$Menu > li:nth-child(2) > span:nth-child(2)")
    .click()

    // 제일 최근(제일 위) 프로젝트 텍스트 에셋의 개수 확인 ( 함수에서 입력받은 text_asset_num과 같은지 )
    cy.get(".ant-collapse-item").eq(0).find(".list-detail").eq(1).find(".ant-typography").eq(1).find("strong").should("have.text", text_asset_num.toString())

    // 제일 최근(제일 위) 프로젝트 클릭
    cy.get(".ant-collapse-item").eq(0)
    .click()

    cy.wait(2000)

    // 텍스트 에셋 내용물 확인 ( TODO : 텍스트 에셋이 1개일때만 현재 가능, 한 프로젝트에 누적되었을때 불가능 )
    cy.get(".ant-collapse-content").find(".text-item").find(".text-item-line").find(".ant-typography").eq(1).should('have.text', very_small_text)
    cy.get(".ant-collapse-content").find(".text-item").find(".text-item-line").find(".ant-typography").eq(3).should('have.text', small_text)
    cy.get(".ant-collapse-content").find(".text-item").find(".text-item-line").find(".ant-typography").eq(5).should('have.text', intermediate_text)
    cy.get(".ant-collapse-content").find(".text-item").find(".text-item-line").find(".ant-typography").eq(7).should('have.text', long_text)
    cy.get(".ant-collapse-content").find(".text-item").find(".text-item-line").find(".ant-typography").eq(9).should('have.text', very_long_text)

    // 제일 최근(제일 위) 프로젝트 체크
    cy.get(".ant-checkbox-input").eq(0).check()

    // 어셋 라이브러리 >> 프로젝트 선택 후 활성화된 텍스트 탭으로 이동
    cy.get(".ant-tabs-nav-wrap").contains("텍스트").click()

    // 텍스트 어셋이 없으면 안됨. 
    // ( 텍스트 어셋이 없다 == classname : ant-empty-description인 태그(항목 없음을 보여주는 태그)가 있다 )
    cy.get(".ant-empty-description").should("not.exist");
    // cy.get(".ant-empty-description").should('not.have.text', "항목 없음")


    // 텍스트 어셋 내용물 확인 ( TODO : 텍스트 에셋이 1개일때만 현재 가능, 한 프로젝트에 누적되었을때 불가능 )
    cy.get(".text-item-large").find(".editable.disabled").eq(0).should("have.text", very_small_text)
    cy.get(".text-item-large").find(".editable.disabled").eq(1).should("have.text", small_text)
    cy.get(".text-item-large").find(".editable.disabled").eq(2).should("have.text", intermediate_text)
    cy.get(".text-item-large").find(".editable.disabled").eq(3).should("have.text", long_text)
    cy.get(".text-item-large").find(".editable.disabled").eq(4).should("have.text", very_long_text)
}

describe("Crolo Test", () => {
    // it("로그인", () => {
    //     login();
    // });

// ㅡㅡㅡㅡㅡㅡㅡㅡ

    // it("프로젝트 생성 확인", () => {
    //     login();
    //     projectCreate();

    //     // projectAllRemove();
    // });

// ㅡㅡㅡㅡㅡㅡㅡㅡ



    // it("프로젝트 전체 선택 후 삭제", () => {
    //     login();
    //     projectAllRemove();
    // });


// ㅡㅡㅡㅡㅡㅡㅡㅡ

// 어셋 라이브러리로 이동

    
    // it("프로젝트 전체 삭제 ( 어셋이 있는 것 까지 ) ", (done) => {
    //     Cypress.on('fail', (err, runnable) => {
    //         expect(err.message).to.include('cy.click()')
    //         // returning false here prevents Cypress from
    //         // failing the test
            
    //         done()
    //         cy.log(err.message)
    //         return false
    //     })
        
    //     login();
    //     projectAllRemove()
        
    //     cy.reload()
    //     cy.wait(3000)
        
    //     cy.get(".ant-checkbox-input").eq(0).check()
        
    //     // 어셋 라이브러리 >> 프로젝트 선택 후 활성화된 로고 탭으로 이동
    //     cy.get(".ant-tabs-nav-wrap").contains("로고").click()
    //     cy.wait(2000)
    //     cy.get(".ant-empty-description").should("not.exist").then();
        
    //     // 어셋 라이브러리 >> 프로젝트 선택 후 활성화된 이미지 탭으로 이동
    //     cy.get(".ant-tabs-nav-wrap").contains("이미지").click()
    //     cy.wait(2000)
    //     cy.get(".ant-collapse-content-box").find(".image-item-container").find(".ant-checkbox-input").each((checkbox) => {
    //         checkbox.check()
    //     })

    //     // 어셋 라이브러리 >> 프로젝트 선택 후 활성화된 텍스트 탭으로 이동
    //     cy.get(".ant-tabs-nav-wrap").contains("텍스트").click()
    //     cy.wait(2000)

         
        

    //     // cy.get("#sub1\\$Menu > li:nth-child(2) > span:nth-child(2)")
    //     // .click()
        
    //     cy.wait(3000)
    // });


// ㅡㅡㅡㅡㅡㅡㅡㅡ
    // it("이미지 어셋 업로드", ()=>{
    //     login();
    //     projectCreate();

    //     uploadImageAsset("와디즈_어셋-removebg-preview.png", "이미지 어셋")
    // });

    
    // // cy.task("readdir", { path: "transparent/" }, { timeout: 30000 });

    // // var transparent_img_list = fs.readdirSync("transparent/")
    // // var fs = require('fs');
    // // var files = fs.readdirSync('');
    // // var rawFile = new XMLHttpRequest();

    // // fso = new ActiveXObject("scripting.FileSystemObject");
    // // var srt = fso.GetFolder("c:\\");
    // // var fc = new Enumerator(srt.files);
    
    // // for(var width = 100; width< 1600; width+=100){
    // //     var k = 0;
        
    // //     it("커스텀 이미지 어셋 업로드", ()=>{
    // //         // var files = cy.task("readdir", { path: "C:/Users/remake/gdrive/remake/crolo-web-testing/cypress/cypress/fixtures/transparent" }, { timeout: 5000 });
    // //         // cy.log(files)
    // //         // login();
    // //         // projectCreate();
    
    // //         // uploadImageAsset("와디즈_어셋-removebg-preview.png", "이미지 어셋")
    // //         cy.log(k)
    // //     });
    // //     k += 1;
    // // }
    
    
    // // it("커스텀 이미지 어셋 업로드", ()=>{
    // //     cy.fixture("transparent/*").each((img)=>{
    // //         cy.log(img)
    // //     })
    // // });
    // // var transparent_img_list = ['100x66.png', '150x100.png', '200x133.png', '300x199.png', '300x200.png', '400x266.png', '450x300.png', '500x333.png', '600x399.png', '600x400.png', '650_433.png', '700x466.png', '750x500.png', '800x533.png', '900x599.png', '900x600.png', '1000x666.png', '1050x700.png', '1100x732.png', '1200x799.png', '1200x800.png', '1300x866.png', '1351x900.png', '1400x932.png', '1500x999.png', '1501x1000.png', '1651x1100.png', '1801x1200.png', '1951x1300.png', '2101x1400.png', '2251x1500.png'];

    // // var transparent_img_list = ['100x66.png', '200x133.png', '300x200.png', '400x266.png', '500x333.png', '600x400.png', '700x466.png', '800x533.png', '900x600.png', '1000x666.png',  '1100x732.png', '1200x800.png',  '1300x866.png', '1400x932.png', '1500x999.png', '1651x1100.png', '1801x1200.png', '1951x1300.png', '2101x1400.png', '2251x1500.png'];




    // var transparent_img_list_png = ['100x66.png', '200x133.png', '300x200.png', '400x266.png', '500x333.png', '700x466.png', '900x600.png', '1000x666.png',  '1100x732.png', '1200x800.png'];
    // var transparent_img_list_jpg = ['100x66.jpg', '200x133.jpg', '300x200.jpg', '400x266.jpg', '500x333.jpg', '700x466.jpg', '900x600.jpg', '1000x666.jpg',  '1100x732.jpg', '1200x800.jpg']

    // // ['1300x866.jpg', '1400x933.jpg', '1500x1000.jpg', '1650x1100.jpg', '1800x1200.jpg']

    // var cnt = 0;
    
    // for (const img_name of ['500x333.jpg']){ 
    //     it("[Transparent] 커스텀 이미지 어셋 업로드 (" + img_name.slice(0, -4) + ")", ()=>{
    //         cnt += 1;
    //         cy.log(img_name)
    //         // if (cnt == 1){
    //         login()
    //         projectCreate()
    //         // }
    //         uploadImageAsset(img_name, "non-transparent/", "이미지 어셋")
    //         cy.wait(3000)
    //     });
    // }
    
    

// ㅡㅡㅡㅡㅡㅡㅡㅡ
    
    // var transparent_img_list = ['100x66.png', '200x133.png', '300x200.png', '400x266.png', '500x333.png', '600x400.png', '700x466.png', '800x533.png', '900x600.png', '1000x666.png',  '1100x732.png', '1200x800.png'];


    // var cnt = 0;
    
    // for (const img_name of transparent_img_list){ 
    //     it("[Transparent] 커스텀 이미지 어셋 업로드 (" + img_name.slice(0, -4) + ")", ()=>{
    //         cnt += 1;
    //         cy.log(img_name)
    //         // if (cnt == 1){
    //         login()
    //         projectCreate()
    //         // }
    //         uploadImageAsset(img_name, "transparent/", "이미지 어셋")
    //         cy.wait(3000)
    //     });
    // }


//     it("브랜드 로고 어셋 업로드", ()=>{
//         login();
//         projectCreate();

//         uploadImageAsset("와디즈 로고.png", "브랜드 로고")
//     });

//     it("브랜드 로고 어셋 업로드(Non-transparent 이미지)", ()=>{
//         login();
//         projectCreate();

//         uploadImageAsset("와디즈 로고.png", "브랜드 로고")
//     });

// // ㅡㅡㅡㅡㅡㅡㅡㅡ

//     it("커스텀 이미지 어셋 업로드 ( 작은 이미지 (255x255) )", ()=>{
//         login();
//         projectCreate();

//         // for(var image of ["255x255_jpg.jpg", "256x256_png.png"]){
//         //     uploadImageAssetSmallSize(image, "이미지 어셋")
//         //     cy.wait(1000)
//         // }

//         uploadImageAssetSmallSize("255x255_jpg.jpg", "이미지 어셋")

//     });

//     it("브랜드 로고 어셋 업로드 ( 작은 이미지 (255x255) )", ()=>{
//         login();
//         projectCreate();

//         // for(var image of ["255x255_jpg.jpg", "256x256_png.png"]){
//         //     uploadImageAssetSmallSize(image, "이미지 어셋")
//         //     cy.wait(1000)
//         // }

//         uploadImageAssetSmallSize("255x255_jpg.jpg", "브랜드 로고")

//     });

// // ㅡㅡㅡㅡㅡㅡㅡㅡ

//     it("텍스트 어셋 업로드 (한글)", ()=>{
//         login();
//         projectCreate();

//         enterTextAsset("kor", "가나다", "가나다라마바", "가나다라마바사아자차카타파", "가나다라마바사아자차카타파하가나다라마바사", "가나다라마바사아자차카타파하가나다라마바사아자차카타파하바나다");
        
//     });
    
//     it("텍스트 어셋 업로드 (영어)", ()=>{
//         login();
//         projectCreate();

//         enterTextAsset("eng", "abcd", "abcdefghijk", "abcdefghijklmnopqrstuv", "abcdefghijklmnopqrstuvwxyzabcdefghi", "abcdefghijklmnopqrstuvwxyzabcdefghiabcdefghijklmnopq" ,text_asset_num = 2);
//     });
  });