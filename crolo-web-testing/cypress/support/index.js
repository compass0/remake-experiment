// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

/*
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
*/

import 'cypress-file-upload';
import '../plugins/index'


//////////////////////
// ** 로그인 관련 ** //
/////////////////////

var access_token;
Cypress.Commands.add('login_post_first', () => {
    const YAML = require('yamljs')
    cy.log("실행")
    cy.readFile('cypress/config/config_crolo_test.yml')
    .then((str) => {
        // parse the string into object literal
        var yml_obj = YAML.parse(str)
        var email = yml_obj.crolo["email"]
        var password = yml_obj.crolo["pwd"]
        var login_url = yml_obj.crolo["login_url"]
        var main_url = yml_obj.crolo["main_url"]
        
        // Post 방식으로 정보 보내어, Crolo login
        cy.request({
            method: 'POST',
            url: login_url,
            body: {
                email: email, 
                password: password
            },
        })
        .then((resp) => {
            access_token = resp.body.accessToken
            window.localStorage.setItem('crolo-token', resp.body.accessToken)
        })
    
        // Crolo 메인 페이지로 이동.
        cy.visit(main_url)

        // 로그인 후, 메인 페이지로 정상 이동되었는지 확인.
        // 가이드 바로가기 버튼 옆 나의 로그인 이메일이 제대로 보이는지 확인.
        cy.get("#root > section > section > header > div > div:nth-child(2) > div > span").should('exist')
        cy.log("*** 로그인 성공 ***")
    })
})



////////////////////////
// ** 프로젝트 관련 ** //
///////////////////////

// TODO : cy.getByText 써보고 contains보다 더 좋은 것 같으니 전체 테스트에서 contains 대신 이것 쓰기
// TODO : 각각의 로직에 cy.log() 달아서 설명하기. ( 코드 모르는 사람이 결과만 봐도 제대로 된지, 어디서 막힌지 알수 있도록 )
Cypress.Commands.add("projectCreateExec", (project_name) => {
    cy.log("*** \'" + project_name + "\' 프로젝트 생성 시도 ***")

    // 어셋 업로드 탭으로 이동.
    cy.contains("어셋 업로드")
    .click({force:true})
    // cy.get("#sub1\\$Menu > li:nth-child(1) > span:nth-child(2)")
    // .click()
    
    // 새 프로젝트 만들기 버튼 클릭.
    cy.contains("새 프로젝트 만들기")
    .click({force : true})

    // 생성할 프로젝트 명 입력.
    cy.get(".ant-modal-body").find(".ant-input")
    .type(project_name, {timeout:3000})

    // 확인 버튼 클릭.
    cy.get(".ant-modal-footer").find(".ant-btn.ant-btn-primary")
    .click()

    cy.wait(3000)
    
    // "프로젝트 선택" 드랍다운 버튼 클릭하여 프로젝트 목록뷰 활성화.
    cy.get("#rc_select_1")
    .click({force : true})

    // 프로젝트 목록에서 생성한 프로젝트가 존재하는지 확인.
    cy.get(".ant-select-item-option-content").contains(project_name)

    cy.log("*** \'" + project_name + "\' 프로젝트 생성 성공 ***")
});

// TODO : 탭 선택하는 것 다 contains로 바꾸기.
Cypress.Commands.add("projectCreate", (project_name) => {
    // 어셋 업로드 탭으로 이동.
    cy.contains("어셋 업로드")
    .click({force:true})
    // cy.get("#sub1\\$Menu > li:nth-child(1) > span:nth-child(2)")
    // .click()
    
    // 새 프로젝트 만들기 버튼 클릭.
    cy.contains("새 프로젝트 만들기")
    .click({force : true})

    // 생성할 프로젝트 명 입력.
    cy.get(".ant-modal-body").find(".ant-input")
    .type(project_name, {timeout:3000})

    // 확인 버튼 클릭.
    cy.get(".ant-modal-footer").find(".ant-btn.ant-btn-primary")
    .click()

    cy.wait(3000)
    
    // "프로젝트 선택" 드랍다운 버튼 클릭하여 프로젝트 목록뷰 활성화.
    cy.get("#rc_select_1")
    .click({force : true})

    // 프로젝트 목록에서 생성한 프로젝트가 존재하는지 확인.
    cy.get(".ant-select-item-option-content").contains(project_name)

    // 어셋 라이브러리로 이동
    cy.contains("어셋 라이브러리")
    .click({force:true})

    
    // ToBeCheck : 페이지 리로드. (초기에 페이지 리로드 안할시, 새로 생성한 프로젝트가 뜨지 않았음.)
    cy.reload()
    cy.wait(5000)

    // 페이지 
    cy.get(".ant-typography").contains(project_name)
    cy.log("*** SUCCESS : \'" + project_name + "\' 프로젝트 생성 성공 ***")
});


Cypress.Commands.add("projectAllRemoveExec", () => {
    // 어셋 라이브러리로 이동
    cy.contains("어셋 라이브러리")
    .click({force:true})
    
    cy.reload()

    cy.wait(5000)

    // 프로젝트 전체 선택
    cy.get(".ant-btn.ant-btn-link.ant-btn-sm")
    .click()

    // 휴지통(삭제) 버튼 선택
    cy.get('[data-icon="delete"]').click({force:true})


    // 삭제 확인 버튼 클릭
    cy.get(".ant-modal-footer").find("div").find("button").eq(1)
    .click()

    cy.reload()
});


// should be run after running login function.
// TODO : 삭제(휴지통) 버튼 selector 고치기 : cy.get(".ant-btn.ant-btn-link.ant-btn-icon-only").click()으로
// TODO : 그 이후에 병행되는 버튼 클릭들도 selector 고치기.
// veri_project_names : names of projects used for the verification of the result.
Cypress.Commands.add("projectAllRemove", (veri_project_names) => {
    // 어셋 라이브러리로 이동
    cy.contains("어셋 라이브러리")
    .click({force:true})
    
    cy.wait(5000)

    // 프로젝트 전체 선택
    cy.get(".ant-btn.ant-btn-link.ant-btn-sm")
    .click()

    // 휴지통(삭제) 버튼 선택
    cy.get('[data-icon="delete"]').click({force:true})


    // 삭제 확인 버튼 클릭
    cy.get(".ant-modal-footer").find("div").find("button").eq(1)
    .click()

    cy.reload()
    cy.wait(5000)

    veri_project_names.forEach(veri_project_name => cy.contains(veri_project_name).should("not.exist"));

    cy.log("*** SUCCESS : 프로젝트 " + veri_project_names.length + "개 전체 삭제 성공 ***")
});


//////////////////////////////////////////////
// ** 이미지 어셋, 브랜드 로고 업로드 관련 ** //
//////////////////////////////////////////////

Cypress.Commands.add("uploadImageAssetExec", (project_name, image_names, path, upload_type) => {
    cy.log("*** \'" + project_name + "\' 프로젝트 이미지 \'" + image_name + "\' 업로드 시도 ***")
    var alert_stmt = " 파일이 업로드 되었습니다."
    
    // 어셋 업로드 탭으로 이동.
    cy.contains("어셋 업로드")
    .click({force:true})
    
    cy.wait(3000)
    
    // "프로젝트 선택" 드랍다운 버튼 클릭하여 프로젝트 목록뷰 활성화.
    cy.get("#rc_select_1")
    .click({force : true})

    cy.wait(3000)
    
    // 프로젝트 목록창이 펼쳐졌는지 확인 후 생성한 프로젝트가 존재하는지 확인 및 해당 프로젝트 클릭.
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").contains(project_name)
    .click()
    // cy.get(".ant-select-item-option-content").contains(project_name)
    // .click()

    cy.wait(1000)

    // "어셋 타입" 드랍다운 버튼 클릭하여 어셋 타입 목록뷰 활성화.
    cy.get("#rc_select_2")
    .click()

    // 어셋 타입 목록창이 펼쳐졌는지 확인 후 로고테스트면 브랜드 로고, 이미지 테스트면 이미지 어셋을 찾아 클릭. (upload_type parameter에 따라)
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").contains(upload_type)
    .click({force:true})

    // 이미지들을 하나씩 모두 업로드.
    for(var iter_image_names = 0; iter_image_names < image_names.length; iter_image_names++){
        var image_name = image_names[iter_image_names]
        cy.get('input[type="file"]').attachFile(path + image_name, 'image/*'); // 이미지 업로드.

        cy.wait(1000)
        // cy.get(".ant-alert-message").should("have.text", image_name + alert_stmt)

        cy.log("*** \'" + project_name + "\' 프로젝트 이미지 \'" + image_name + "\' 업로드 성공 ***")
    }
});

/*
    image_name
    ex) "와디즈_어셋-removebg-preview.png"

    upload_type
    ex) "브랜드 로고"
    ex) "이미지 어셋"
*/
// TODO : 어셋 라이브러리에서 프로젝트 클릭할 때 프로젝트 이름("어셋 업로드 테스트") contains로 찾아서하기.
Cypress.Commands.add("uploadImageAsset", (project_name, image_names, path, upload_type) => {
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

    // 어셋 업로드 탭으로 이동.
    cy.contains("어셋 업로드")
    .click({force:true})
    
    cy.wait(3000)
    
    // "프로젝트 선택" 드랍다운 버튼 클릭하여 프로젝트 목록뷰 활성화.
    cy.get("#rc_select_1")
    .click({force : true})

    cy.wait(3000)
    
    // 프로젝트 목록창이 펼쳐졌는지 확인 후 생성한 프로젝트가 존재하는지 확인 및 해당 프로젝트 클릭.
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").contains(project_name)
    .click()
    // cy.get(".ant-select-item-option-content").contains(project_name)
    // .click()

    cy.wait(1000)

    // "어셋 타입" 드랍다운 버튼 클릭하여 어셋 타입 목록뷰 활성화.
    cy.get("#rc_select_2")
    .click({force : true})

    cy.wait(1500)
    
    // 어셋 타입 목록창이 펼쳐졌는지 확인 후 로고테스트면 브랜드 로고, 이미지 테스트면 이미지 어셋을 찾아 클릭. (upload_type parameter에 따라)
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").contains(upload_type)
    .click({force:true})

    // 이미지들을 하나씩 모두 업로드.
    for(var iter_image_names = 0; iter_image_names < image_names.length; iter_image_names++){
        var image_name = image_names[iter_image_names]
        
        cy.get('input[type="file"]').attachFile(path + image_name, 'image/*'); // 이미지 업로드.
        
        cy.wait(5000)

        // 업로드 목록이 갱신되도록 버튼 클릭.
        cy.get(".anticon.anticon-redo")
        .click({force : true})
        // cy.get("#root > section > section > main > section > div.ant-tabs.ant-tabs-top.ant-tabs-line.ant-tabs-no-animation > div.ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content > div.ant-tabs-tabpane.ant-tabs-tabpane-active > div.align-right > button")
        // .click({timeout:2000})
        
        cy.wait(3000)

        // 업로드 목록에서 업로드한 이미지 이름이 있는지 확인.
        cy.get(".ant-table-tbody").find(">tr").eq(0).contains(image_name, {timeout : 10000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(0).should('have.attr', 'title', image_name, {timeout:1000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(0).find('[title="와디즈 로고.png"]', {timeout:1000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find('[title="와디즈_어셋-removebg-preview.png"]', {timeout:1000})
        
        cy.wait(1000)

        // 업로드 목록에서 이미지를 업로드한 프로젝트 이름이 있는지 확인.
        cy.get(".ant-table-tbody").find(">tr").eq(0).contains(project_name, {timeout : 10000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(1).should('have.attr', 'title', project_name, {timeout:1000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(1).should('have.attr', 'title', "어셋 업로드 테스트", {timeout:1000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find('[title="' + project_name + '"]', {timeout:1000})
        
        cy.wait(1000)

        // 업로드 목록에서 업로드한 이미지 타입이 맞는지 확인.
        cy.get(".ant-table-tbody").find(">tr").eq(0).contains(upload_type, {timeout : 10000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(2).should('have.text', upload_type, {timeout:1000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).contains(project_name, {timeout:1000})
        
        cy.wait(1000)
        // cy.get(".ant-alert-message").should("have.text", image_name + alert_stmt)

        cy.log("*** SUCCESS : \'" + project_name + "\' 프로젝트 이미지 \'" + image_name + "\' 업로드 성공 ***")
    }
    
});

// TODO RIGHT NOW : flag 수정.
// ** TODO RIGHT NOW : checkUploadedImageAsset 로직 추가.

var flag = 0
Cypress.Commands.add("checkUploadedImageAsset", (project_name, image_name, upload_type, displayed_img_seq) => {
    if(flag == 0){
        // 어셋 라이브러리 탭에서 해당 프로젝트 체크 후 이미지 어셋 또는 로고 어셋 잘 업로드 되었는지 확인.
        // 어셋 라이브러리 탭 클릭
        cy.contains("어셋 라이브러리")
        .click({force:true})

        cy.reload() // ToBeCheck : 2020_06_08 발견된 버그로 어셋 업로드 후 어셋라이브러리 클릭시 에러가 발생하였습니다뜸. 따라서 reload를 추가해서 임시로 해결해준다.
        cy.wait(5000)

        // 제일 최근(제일 위) 프로젝트 체크
        cy.get(".ant-checkbox-input").eq(0).check({timeout:1500})

        // 어셋 라이브러리 >> 프로젝트 선택 후 활성화된 이미지 또는 로고 탭으로 이동
        var type = upload_type == "이미지 어셋" ? "이미지" : (upload_type == "브랜드 로고" ? "로고" : "error_trigger")
        cy.get(".ant-tabs-nav-wrap").contains(type).click()
        
        cy.wait(5000)
        
        // cy.contains(project_name).click({force : true})
        // 해당 탭에서 어셋이 있는지 확인. ( 어셋이 없다면, .ant-collapse-content-box 원소 내에 .ant-empty-description 원소가 존재한다는 조건하에. )
        cy.get(".ant-collapse-content-box").find(".ant-empty-description").should("not.exist")
    }
    flag = 1
    
    // image_names.reverse()
    // for(var displayed_img_seq = 0, img_seq = displayed_img_seq; displayed_img_seq < image_names.length; displayed_img_seq++){
    //     var image_name = image_names[img_seq]

    //     cy.get(".image-item-contents").find("img").eq(displayed_img_seq).should("have.attr", "src").then((src)=>{
    //         expect(src.slice(src.lastIndexOf('_') + 1, src.length)).to.eq(image_name)
    //         cy.log("*** SUCCESS : \'" + project_name + "\' 프로젝트 이미지 \'" + image_name + "\' 업로드 성공 최종 확인***")
    //     })
    // }

    // 업로드된 이미지 이름과 실제 어셋라이브러리의 특정 프로젝트의 특정 어셋 탭의 목록에 있는 이미지 또는 로고 이름이 같은지 확인.
    cy.get(".image-item-contents").find("img").eq(displayed_img_seq).should("have.attr", "src").then((src)=>{
        // expect(src.slice(src.lastIndexOf('_') + 1, src.length)).to.eq(image_name)
        // 업로드된 JPG, JPEG 이미지는 PNG로 변경됨.
        expect(src.slice(src.lastIndexOf('_') + 1, src.length)).to.eq(image_name.slice(0, image_name.lastIndexOf('.')) + ".png")
        cy.log("*** SUCCESS : \'" + project_name + "\' 프로젝트 이미지 \'" + image_name + "\' 업로드 성공 최종 확인***")
    })
    
});

Cypress.Commands.add("uploadImageAssetFail", (project_name, image_names, path, upload_type) => {
    var alert_stmt = " 파일을 업로드할 수 없습니다. 최소 픽셀 사이즈를 확인해주세요."

    // 어셋 업로드 탭으로 이동.
    cy.contains("어셋 업로드")
    .click({force:true})

    cy.wait(3000)
    
    // "프로젝트 선택" 드랍다운 버튼 클릭하여 프로젝트 목록뷰 활성화.
    cy.get("#rc_select_1")
    .click({force : true})

    cy.wait(3000)
    
    // 프로젝트 목록창이 펼쳐졌는지 확인 후 생성한 프로젝트가 존재하는지 확인 및 해당 프로젝트 클릭.
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").contains(project_name)
    .click()
    // cy.get(".ant-select-item-option-content").eq(0)
    // .click()

    cy.wait(1000)

    // "어셋 타입" 드랍다운 버튼 클릭하여 어셋 타입 목록뷰 활성화.
    cy.get("#rc_select_2")
    .click()

    // 어셋 타입 목록창이 펼쳐졌는지 확인 후 로고테스트면 브랜드 로고, 이미지 테스트면 이미지 어셋을 찾아 클릭. (upload_type parameter에 따라)
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").contains(upload_type)
    .click({force:true})

    for(var iter_image_names = 0; iter_image_names < image_names.length; iter_image_names++){
        var image_name = image_names[iter_image_names]

        cy.get('input[type="file"]').attachFile(path + image_name, 'image/*'); // 이미지 업로드
    
        cy.wait(5000)



        // 업로드 목록이 갱신되도록 버튼 클릭.
        cy.get(".anticon.anticon-redo")
        .click({force : true})
        // cy.get("#root > section > section > main > section > div.ant-tabs.ant-tabs-top.ant-tabs-line.ant-tabs-no-animation > div.ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content > div.ant-tabs-tabpane.ant-tabs-tabpane-active > div.align-right > button")
        // .click({timeout:2000})
        
        cy.wait(3000)

        // 업로드 목록에서 업로드한 이미지 이름이 없는지 확인.
        cy.get(".ant-table-tbody").find(">tr").eq(0).contains(image_name).should("not.exist")
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(0).should('not.have.attr', 'title', image_name, {timeout:1000})
        // TODO : contains로 바꾸기. 이 프로젝트 명("이미지 어셋 업로드(실패 예상)")을 포함하지 않는다로.
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find(">td").eq(0).find('[title="와디즈 로고.png"]', {timeout:1000})
        // cy.get(".ant-table-row.ant-table-row-level-0").eq(0).find('[title="와디즈_어셋-removebg-preview.png"]', {timeout:1000})
        
        cy.wait(1000)

        // cy.get(".ant-alert-message").contains(alert_stmt)
        // cy.get(".ant-alert-message").contains(image_name)

        // cy.get(".ant-alert-message").contains(/.*/ + image_name + /.*/ + alert_stmt)
        // cy.get(".ant-alert-message").should("contain", ".\*" + image_name + ".\*" + alert_stmt)
        // cy.get(".ant-alert-message").should("have.text", image_name + alert_stmt)

        cy.log("*** SUCCESS : \'" + project_name + "\' 프로젝트 이미지 \'" + image_name + "\' 업로드 실패 예상 테스트 성공 ***")
    }
});




/////////////////////////////////
// ** 턱스트 어셋 업로드 관련 ** //
/////////////////////////////////

// if lang == "kor", 한글 선택, 
// else if lang == "eng", 영어 선택.
Cypress.Commands.add("enterTextAssetExec", (project_name, lang, very_small_text, small_text, intermediate_text, long_text, very_long_text) => {
    cy.log("*** \'" + project_name + "\' 프로젝트 텍스트 \'" + very_small_text + "\' 등 업로드 시도 ***")

    // 어셋 업로드 탭으로 이동.
    cy.contains("어셋 업로드")
    .click({force:true})
    
    cy.wait(3000)
    
    // "프로젝트 선택" 드랍다운 버튼 클릭하여 프로젝트 목록뷰 활성화.
    cy.get("#rc_select_1")
    .click({force : true})

    cy.wait(3000)
    
    // 프로젝트 목록창이 펼쳐졌는지 확인 후 생성한 프로젝트가 존재하는지 확인 및 해당 프로젝트 클릭.
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").contains(project_name)
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

    var lang_number = (lang == "kor" ? "0" : (lang == "eng" ? "1" : "error_trigger")) // ( if lang = 0, 한국어, if lang = 1, 영어)

    // 한국어 또는 영어 라디오 버튼 선택
    cy.get(".ant-radio-group.ant-radio-group-outline").find(".ant-radio-button-wrapper").eq(lang_number).find(".ant-radio-button-input")
    .check({force: true})

    // 저장하기 버튼 클릭
    cy.get(".ant-tabs-tabpane.ant-tabs-tabpane-active").find(".ant-btn.ant-btn-primary")
    .click()

    cy.log("*** \'" + project_name + "\' 프로젝트 텍스트 \'" + very_small_text + "\' 등 업로드 성공 ***")
});

// if lang == "kor", 한글 선택, 
// else if lang == "eng", 영어 선택.
Cypress.Commands.add("enterTextAsset", (project_name, lang, very_small_text, small_text, intermediate_text, long_text, very_long_text, accumulate_text_num = 1) => {
    cy.log("*** \'" + project_name + "\' 프로젝트 텍스트 \'" + very_small_text + "\' 등 업로드 시도 ***")
    
    // 어셋 업로드 탭으로 이동.
    cy.contains("어셋 업로드")
    .click({force:true})
    
    cy.wait(3000)
    
    // "프로젝트 선택" 드랍다운 버튼 클릭하여 프로젝트 목록뷰 활성화.
    cy.get("#rc_select_1")
    .click({force : true})

    cy.wait(3000)
    
    // 프로젝트 목록창이 펼쳐졌는지 확인 후 생성한 프로젝트가 존재하는지 확인 및 해당 프로젝트 클릭.
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").contains(project_name)
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
    // cy.get(".ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content").find('[role="tabpanel"]').eq(1).find(".ant-alert-message")
    // .should("have.text", "입력할 언어를 선택해주세요.")


    // ( if lang = 0, 한국어, if lang = 1, 영어)
    var lang_number = (lang == "kor" ? "0" : (lang == "eng" ? "1" : "error_trigger"))

    // 한국어 또는 영어 라디오 버튼 선택
    cy.get(".ant-radio-group.ant-radio-group-outline").find(".ant-radio-button-wrapper").eq(lang_number).find(".ant-radio-button-input")
    .check({force: true})

    // 저장하기 버튼 클릭
    cy.get(".ant-tabs-tabpane.ant-tabs-tabpane-active").find(".ant-btn.ant-btn-primary")
    .click()

    // 저장되었다는 문구 뜨는지 확인
    // cy.get(".ant-tabs-content.ant-tabs-content-no-animated.ant-tabs-top-content").find('[role="tabpanel"]').eq(1).find(".ant-alert-message")
    // .should("have.text", "텍스트가 저장 되었습니다.")

    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})

    cy.reload()  // ToBeCheck : 2020_06_08 발견된 버그로 어셋 업로드 후 어셋라이브러리 클릭시 에러가 발생하였습니다뜸. 따라서 reload를 추가해서 임시로 해결해준다.
    cy.wait(5000)

    // 제일 최근(제일 위) 프로젝트 텍스트 에셋의 개수 확인 ( 함수에서 입력받은 accumulate_text_num 같은지 )
    cy.get(".ant-collapse-item").eq(0).find(".list-detail").eq(1).find(".ant-typography").eq(1).find("strong").should("have.text", accumulate_text_num.toString())

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

    cy.log("*** SUCCESS : \'" + project_name + "\' 프로젝트 텍스트 \'" + very_small_text + "\' 등 업로드 성공 ***")
});


//////////////////////////////////////////////
// ** 이미지 어셋, 브랜드 로고, 텍스트 어셋 삭제 관련 ** //
//////////////////////////////////////////////

Cypress.Commands.add("imageAssetRemove", (number) => {
    
    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})

    cy.wait(3000)
    cy.reload() // ToBeCheck : 
    
    cy.get(".ant-collapse-item").eq(number).find(".list-detail").eq(2).find(".ant-typography").eq(1).find("strong").invoke('text').then((text) => {
        // reload 해야만 image asset 개수가  업데이트됨. 바로 업데이트 되는지 확인하려면 위에 cy.reload() 제거해야함.
        // 어셋 라이브러리에 표시되는 해당 프로젝트의 이미지 어셋의 개수가 1개 이상인지 확인
        expect(parseInt(text)).to.be.greaterThan(0)

        if(parseInt(text) > 0){
            // 제일 최근(제일 위) 프로젝트 체크
            cy.get(".ant-checkbox-input").eq(number).check()

            // 이미지 탭으로 이동.
            cy.get("#tab-images")
            .click()

            // 현재 활성화되어 있는 탭(이미지 탭)에 있는 모든 어셋 체크박스 체크(페이지 번호가 여러개일만큼 많다면, 현재는 첫 페이지에 있는 어셋만 체크되도록 구현.)
            cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-checkbox-input").check({multiple:true, force : true})

            // 휴지통(삭제) 버튼 클릭.
            cy.get('[data-icon="delete"]').eq(1).click({force:true})

            // 확인 버튼 클릭.
            cy.get(".ant-modal-footer").contains("확인")
            .click()

            cy.wait(2000)

            // 제대로 삭제되었는지 확인(제대로 삭제되었다면, .ant-empty-description 원소가 존재해야 함.)
            cy.get(".ant-empty-description").should("exist")
        }
    })

    cy.log("*** SUCCESS : " + number + "번째 프로젝트의 이미지 어셋 삭제 성공 *** ")
});


Cypress.Commands.add("logoAssetRemove", (number) => {
    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})  

    cy.wait(3000)

    cy.reload()

    cy.get(".ant-collapse-item").eq(number).find(".list-detail").eq(3).find(".ant-typography").eq(1).find("strong").invoke('text').then((text) => {
        // reload 해야만 logo asset 개수가  업데이트됨. 바로 업데이트 되는지 확인하려면 위에 cy.reload() 제거해야함.
        // 어셋 라이브러리에 표시되는 해당 프로젝트의 브랜드 로고 어셋의 개수가 1개 이상인지 확인
        expect(parseInt(text)).to.be.greaterThan(0)
        if(parseInt(text) > 0){
            // 제일 최근(제일 위) 프로젝트 체크
            cy.get(".ant-checkbox-input").eq(number).check()

            // 로고 탭 클릭.
            cy.get("#tab-logos")
            .click()

            // 현재 활성화되어있는 탭(로고 탭)에 있는 모든 어셋 체크박스 체크(페이지 번호가 여러개일만큼 많다면, 현재는 첫 페이지에 있는 어셋 체크되도록 구현.)
            cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-checkbox-input").check({multiple:true, force : true})

            // 휴지통(삭제) 버튼 클릭.
            cy.get('[data-icon="delete"]').eq(1).click({force:true})

            // 확인 버튼 클릭.
            cy.get(".ant-modal-footer").contains("확인")
            .click()

            cy.wait(2000)

            // 제대로 삭제되었는지 확인(제대로 삭제되었다면, .ant-empty-description 원소가 존재해야 함.)
            cy.get(".ant-empty-description").should("exist")
        }
    })
    cy.log("*** SUCCESS : " + number + "번째 프로젝트의 로고 어셋 삭제 성공 *** ")
});


Cypress.Commands.add("textAssetRemove", (number) => {
    
    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})

    cy.wait(3000)

    cy.reload()

    cy.get(".ant-collapse-item").eq(number).find(".list-detail").eq(1).find(".ant-typography").eq(1).find("strong").invoke('text').then((text) => {
        // reload 해야만 text asset 개수가  업데이트됨. 바로 업데이트 되는지 확인하려면 위에 cy.reload() 제거해야함.
        // 어셋 라이브러리에 표시되는 해당 프로젝트의 텍스트 어셋의 개수가 1개 이상인지 확인
        expect(parseInt(text)).to.be.greaterThan(0)

        if(parseInt(text) > 0){
            // 제일 최근(제일 위) 프로젝트 체크
            cy.get(".ant-checkbox-input").eq(number).check()

            // 텍스트 탭 클릭.
            cy.get("#tab-texts")
            .click()

            // 현재 활성화되어있는 탭(텍스트 탭)에 있는 모든 어셋 체크박스 체크(페이지 번호가 여러개일만큼 많다면, 현재는 첫 페이지에 있는 어셋만 체크되도록 구현.)
            cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-checkbox-input").check({multiple:true, force : true})

            // 휴지통(삭제) 버튼 클릭.
            cy.get('[data-icon="delete"]').eq(1).click({force:true})

            // 확인 버튼 클릭.
            cy.get(".ant-modal-footer").contains("확인")
            .click()

            cy.wait(2000)

            // 제대로 삭제되었는지 확인(제대로 삭제되었다면, .ant-empty-description 원소가 존재해야 함.)
            cy.get(".ant-empty-description").should("exist")
        }
    })
    cy.log("*** SUCCESS : " + number + "번째 프로젝트의 텍스트 어셋 삭제 성공 *** ")
});


Cypress.Commands.add("projectAssetRemove", (number, project_name) => {
    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})

    cy.reload() // ToBeCheck : 2020_06_08 발견된 버그로 어셋 업로드 후 어셋라이브러리 클릭시 에러가 발생하였습니다뜸. 따라서 reload를 추가해서 임시로 해결해준다.
    cy.wait(5000)

    // 해당 프로젝트(프로젝트 이름으로 결정)를 찾아서 클릭.
    cy.contains(project_name)
    .click({force : true})

    for(var i = 1; i<4; i++){
        cy.wait(3000)
        cy.get(".ant-collapse-item").eq(number).find(".list-detail").eq(i).find(".ant-typography").eq(1).find("strong").invoke('text').then((text) => {
            // reload 해야만 asset 개수가  업데이트됨. 바로 업데이트 되는지 확인하려면 위에 cy.reload() 제거해야함.
            // 어셋 라이브러리에 표시되는 해당 프로젝트의 어셋의 개수가 1개 이상인지 확인.
            // 한개 이상의 어셋이 있다면 삭제 작업 다시 수행.
            if(parseInt(text) > 0){      
                
                // 해당 프로젝트를 클릭했을 때 활성화된 어셋 목록 창에 있는 모든 어셋들의 체크박스를 체크.
                cy.get(".ant-collapse-item").eq(number).find(".ant-collapse-content-box").find(".ant-checkbox-input").check({multiple: true, force : true, timeout : 60000})

                // 휴지통(삭제) 버튼 클릭.
                cy.get('[data-icon="delete"]').click({force:true})

                // 확인 버튼 클릭.
                cy.get(".ant-modal-footer").contains("확인")
                .click()
            }
        })
    }

    cy.wait(3000)
    
    for(var i = 1; i<4; i++){
        cy.wait(3000)
        cy.get(".ant-collapse-item").eq(number).find(".list-detail").eq(i).find(".ant-typography").eq(1).find("strong").invoke('text').then((text) => { 
            // 어셋 라이브러리에 표시되는 해당 프로젝트의 어셋의 개수가 1개 이상인지 확인.
            expect(parseInt(text)).to.equal(0);
        })
    }
    

    // 해당 프로젝트의 활성화된 어셋 목록 창에 항목 없음 element가 존재하는지 확인.
    // cy.get(".ant-collapse-item").eq(number).find(".ant-empty-description").should("exist")
    cy.get(".ant-collapse-item").eq(number).contains("항목 없음").should("exist")

    // 해당 프로젝트(프로젝트 이름으로 결정)를 클릭.
    cy.contains(project_name)
    .click({force : true})

    // 해당 프로젝트(프로젝트 목록에서의 순서로 결정) 체크박스 체크.
    cy.get(".ant-checkbox-input").eq(number).check()

    // 로고 탭 클릭.
    cy.get("#tab-logos")
    .click()

    // 로고 어셋 목록에 항목 없음 element가 존재하는지 확인.
    cy.get(".ant-collapse-content.ant-collapse-content-active").contains("항목 없음").should("exist")
    
    // 이미지 탭 클릭.
    cy.get("#tab-images")
    .click()

    // 이미지 어셋 목록에 항목 없음 element가 존재하는지 확인.
    cy.get(".ant-collapse-content.ant-collapse-content-active").eq(1).contains("항목 없음").should("exist")

    // 텍스트 탭 클릭.
    cy.get("#tab-texts")
    .click()

    // 텍스트 어셋 목록에 항목 없음 element가 존재하는지 확인.
    cy.get(".ant-collapse-content.ant-collapse-content-active").eq(2).contains("항목 없음").should("exist")
    
    cy.log("*** SUCCESS : " + number + "번째 프로젝트의 모든 어셋 삭제 성공 *** ")
});


// Cypress.Commands.add("projectAssetRemoveExec", (number) => {
//     // 어셋 라이브러리 탭 클릭
//     cy.contains("어셋 라이브러리")
//     .click({force:true})
    
//     // var i = 2;
//     cy.wait(3000)
//     cy.get(".ant-collapse-item").eq(number)
//     .click()

//     for(var i = 1; i<4; i++){
//         cy.wait(3000)
//         cy.get(".ant-collapse-item").eq(number).find(".list-detail").eq(i).find(".ant-typography").eq(1).find("strong").invoke('text').then((text) => {
//             if(parseInt(text) > 0){      
//                 
//                 cy.get(".ant-collapse-item").eq(number).find(".ant-collapse-content-box").find(".ant-checkbox-input").check({multiple: true, force : true, timeout : 60000})
    
//                 cy.get('[data-icon="delete"]').click({force:true})

//                 cy.get(".ant-modal-footer").contains("확인")
//                 .click()
//             }
//         })
//     }

//     cy.wait(3000)
// });





///////////////////////////////
// ** 배너 생성, 저장 관련 ** //
//////////////////////////////

// var start_date = new Date(year, month, day, hours, minutes, seconds);
Cypress.Commands.add("createBanner", (project_name, banner_type, banner_size, banner_lang, text_set, selector_CTA, selector_ttst, selector_ltst) =>{

    // 배너 메이커 >> 배너 디자인 탭 클릭
    cy.contains("배너 디자인")
    .click({force:true})
    // cy.get("#sub2\\$Menu > li > span:nth-child(2)")
    // .click()

    // 프로젝트 선택 목록 클릭.
    var selector_text = "배너를 저장할 프로젝트를 선택하세요."
    cy.get(".ant-layout-content").contains(selector_text)
    .click({force: true})
    // cy.get(".ant-select-selector").find("#projectId")
    // .click()
    
    cy.wait(500)

    // 프로젝트 검색 후 클릭.
    cy.get(".ant-select-selector").find("#projectId")
    .type(project_name)
    cy.get(".ant-select-item-option-content").eq(0)
    .click()

    cy.wait(500)

    // 배너 타입 선택 목록 클릭.
    var selector_text = "배너 타입을 선택하세요."
    cy.get(".ant-layout-content").contains(selector_text)
    .click({force: true})

    // 배너타입 "베이직 & 커버"와 "카탈로그" 중 선택 후 클릭.
    cy.get(".ant-select-item-option-content").contains(banner_type)
    .click({force: true})
    // cy.get(".ant-select-item-option-content").contains("베이직 & 커버")
    // .click({force: true})
    // cy.get(".ant-select-item-option-content").contains("카탈로그")
    // .click({force: true})

    cy.wait(500)
    
    // 배너 사이즈 선택 목록 클릭.
    var selector_text = "배너 사이즈를 선택하세요."
    cy.get(".ant-layout-content").contains(selector_text)
    .click({force: true})

    // 배너 사이즈 "1200 x 628 픽셀"와 "1080 x 1080 픽셀" 중 선택 후 클릭.
    cy.get(".ant-select-item-option-content").contains(banner_size)
    .click({force: true})
    // cy.get(".ant-select-item-option-content").contains("1200 x 628 픽셀")
    // .click({force: true})
    // cy.get(".ant-select-item-option-content").contains("1080 x 1080 픽셀")
    // .click({force: true})

    cy.wait(500)

    // 배너 언어 선택 목록 클릭.
    var selector_text = "배너 언어를 선택하세요."
    cy.get(".ant-layout-content").contains(selector_text)
    .click({force: true})

    // "한국어"와 "영어" 중 선택 후 클릭.
    cy.get(".ant-select-item-option-content").contains(banner_lang)
    .click({force: true})
    // cy.get(".ant-select-item-option-content").contains("한국어")
    // .click({force: true})
    // cy.get(".ant-select-item-option-content").contains("영어")
    // .click({force: true})

    // "다음" 버튼 클릭.
    cy.contains("다음").click()
    
    cy.wait(500)

    // 브랜드 로고 선택 목록 클릭.
    var selector_text = "브랜드 로고를 선택하세요."
    cy.get(".ant-layout-content").contains(selector_text)
    .click({force: true})

    // 제일 첫번째 브랜드 로고 어셋 클릭.
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").eq(0).find(".ant-select-item-option-content").find("img").eq(0).click()

    cy.wait(500)

     // 이미지 어셋 선택
     var selector_text = "이미지 어셋을 선택하세요."
     cy.get(".ant-layout-content").contains(selector_text)
     .click({force: true})

     // 제일 첫번째 이미지 어셋 클릭.
     cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").eq(1).find(".ant-select-item-option-content").find("img").eq(0).click()
    
     cy.wait(500)

     // 텍스트 세트 선택 목록 클릭.
     var selector_text = "텍스트 세트를 선택하세요."
     cy.get(".ant-layout-content").contains(selector_text)
     .click({force: true})

    // 텍스트 세트 선택 후 클릭.
    cy.contains(text_set)
    .click({force : true})
    // cy.contains("MacBook Pro 어떤일이든 어디에서든")
    // .click({force : true})
    //  cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").eq(2).find(".ant-select-item-option-content").find("span").eq(1).click()

    cy.wait(500)

     var selector_text = "CTA 버튼을 선택하세요."
    //  var selector_CTA = "더 보기"

     // CTA 버튼 선택 목록 클릭.
     cy.get(".ant-layout-content").contains(selector_text)
     .click({force: true})

     cy.wait(500)

    // "더 보기" 버튼 클릭.
     cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").eq(3).find(".ant-select-item-option-content").contains(selector_CTA).click()

    // "다음" 버튼 선택
    cy.contains("다음").click()
    // cy.get(".ant-btn-primary")
    // .click()

    cy.wait(500)

    // 텍스트 자간 선택 목록 클릭.
    // var selector_ttst = "넓게"  // ttst : Tracking text style type
    // var selector_ttst_num = selector_ttst == "보통" ? 1 : selector_ttst == "좁게" ? 0 : selector_ttst == "넓게" ? 2 : -2 // -2 is a error trigger.
    cy.get("#trackingTextStyleType").click()

    // 특정 텍스트 자간 선택.
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").eq(0).find(".ant-select-item-option-content").contains(selector_ttst).click({force: true})
    // cy.get("#trackingTextStyleType_list_" + selector_ttst_num.toString()).click({force: true})

    cy.wait(500)

    // 텍스트 행간 선택 목록 클릭.
    // var selector_ltst = "좁게"  // ltst : Leading Text Style Type
    // var selector_ltst_num = selector_ltst == "보통" ? 1 : selector_ltst == "좁게" ? 0 : selector_ltst == "넓게" ? 2 : -2 // -2 is a error trigger.
    cy.get("#leadingTextStyleType").click({force: true})

    // 특정 텍스트 행간 선택.
    cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").eq(1).find(".ant-select-item-option-content").contains(selector_ltst).click({force: true})
    // cy.get("#leadingTextStyleType_list_" + selector_ltst_num.toString()).click({force: true})

    // "생성하기" 버튼 클릭.
    cy.contains("생성하기").click()
    // cy.get(".ant-btn-primary")
    // .click()

    // 생성 중 안내 문구 확인
    var selector_notice_stmt = "CROLO가 배너를 디자인하고 있습니다."
    cy.contains(selector_notice_stmt).should("exist")

    // "작업 관리자로 바로가기" 버튼 클릭 하여 작업 관리자로 이동.
    cy.contains("작업 관리자로 바로가기").click({force : true})
    // cy.get("#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(6) > span:nth-child(2)").click()

    cy.wait(2000)
    
    // 작업관리자 작업 목록에 배너 생성 작업 중인 프로젝트 이름 "배너 생성 테스트"이 제일 최근(최상단)에 있는지 확인.
    cy.get(".ant-table-tbody").find("tr").eq(0).contains("배너 생성 테스트").should("exist")
    cy.get(".ant-table-tbody").find("tr").eq(0).find("td").eq(4).should(($status) => {
        const status_text = $status.text();
        expect(status_text).to.eq("작업중")
    })

    // 배너가 생성되기 까지 50초를 기다린다.
    var expected_gen_time = 50000 // 단위 : ms, ex) 10000 : 10초
    cy.wait(expected_gen_time);
    
    // 배너 생성 목록이 갱신되도록 버튼 클릭.
    cy.get(".ant-btn.ant-btn-primary").click()

    // 해당 배너 생성 작업이 성공햇는지 확인.
    cy.get(".ant-table-tbody").find("tr").eq(0).find("td").eq(4).should(($status) => {
        const status_text = $status.text();
        expect(status_text).to.eq("생성됨")
    })

    cy.wait(1000)

    // TODO : 같은 프로젝트 명으로 생성하게 되는데 같은 이름의 이전 것을 생성된 것이라고 판단하지 않도록
    // cy.get(".ant-table-tbody").find("tr").eq(0).find("td").should(($date) => {
    //     cy.log($date);
    //     cy.log(typeof($date));
    //     const date_text = ($date).text();
    //     var year = date_text.substring(0,4);
    //     var month = date_text.substring(5,7);
    //     var day = date_text.substring(8, 10);
        
    //     var hour = date_text.substring(11, 13);
    //     var minute = date_text.substring(14, 16);
    //     var second = "30";

    //     var date = new Date(year, month, day, hour, minute, second);
    //     cy.log(date)

    //     var gen_result = start_date < date ? "true" : "false"
    //     cy.log(gen_result)

    //     expect(gen_result).to.match("true")
    // })

    // 클릭하기 버튼의 링크를 가져와서 생성된 배너 이미지 목록으로 이동.
    cy.get(".ant-table-tbody").find("tr").eq(0).find("td").eq(5).find("a").should("have.attr", "href").then((href) => {
        cy.visit("http://34.85.63.192:3000" + href)
        
        // 생성된 배너들이 1개 이상 존재하는지 확인.
        // TODO :  1, 2, 3... 페이지 번호 다 순회 
        cy.get(".image-item-container").find(".image-item-contents").find("img").its('length').should("be.gte", 1)
    })

    // cy.get(".ant-table-tbody").find("tr").eq(0).find("td").eq(4).find(a).invoke("attr", "href").then((href) => {
    //     cy.visit(href)
    // })
    
    // // 배너 갤러리에 생성 되었는지 확인
    // cy.get("#root > section > aside > div.ant-layout-sider-children > ul > li.ant-menu-item.ant-menu-item-selected > span:nth-child(2)").click()

    // cy.contains("배너 생성 테스트").should("exist")
});

// TODO : 완료됨이라고 표시된 프로젝트는 저장이 안되도록 하는 것 테스트,
// TODO : 저장 후 완료됨이라고 표시되는지 테스트.
// TODO : 저장됨 탭 저장안됨 탭 체크 테스트.
// TODO : 전체 이미지가 다 저장되었는지 확인 ( 1, 2, 3... 페이지 번호 다 순회 )
Cypress.Commands.add("saveBanner", () =>{
    
    // 작업관리자 탭으로 이동.
    cy.contains("작업 관리자").click({force : true})
    // cy.get("#root > section > aside > div.ant-layout-sider-children > ul > li:nth-child(6) > span:nth-child(2)").click()
    
    // 작업관리자 작업 목록에 배너 생성 완료된 프로젝트 이름 "배너 생성 테스트"이 제일 최근(최상단)에 있는지 확인.
    cy.get(".ant-table-tbody").find("tr").eq(0).contains("배너 생성 테스트").should("exist")

    // TODO : 같은 프로젝트 명으로 생성하게 되는데 같은 이름의 이전 것을 생성된 것이라고 판단하지 않도록
    // TODO : .should("have.text").then 해보기.
    // cy.get(".ant-table-tbody").find("tr").eq(0).find("td").should(($date) => {
    //     cy.log($date);
    //     cy.log(typeof($date));
    //     const date_text = ($date).text();
    //     var year = date_text.substring(0,4);
    //     var month = date_text.substring(5,7);
    //     var day = date_text.substring(8, 10);
        
    //     var hour = date_text.substring(11, 13);
    //     var minute = date_text.substring(14, 16);
    //     var second = "30";

    //     var date = new Date(year, month, day, hour, minute, second);
    //     cy.log(date)

    //     var gen_result = start_date < date ? "true" : "false"
    //     cy.log(gen_result)

    //     expect(gen_result).to.match("true")
    // })

    // 클릭하기 버튼의 링크를 가져와서 생성된 배너 이미지 목록으로 이동.
    cy.get(".ant-table-tbody").find("tr").eq(0).find("td").eq(5).find("a").should("have.attr", "href").then((href) => {
        cy.visit("http://34.85.63.192:3000" + href)
        
        cy.get(".image-item-container").find(".image-item-contents").find("img").its('length').should("be.gte", 1)
    })
    
    // 생성된 배너들의 이미지 링크를 저장.
    var images = new Array();
    cy.get(".image-item-contents").find("img").each((img, i)=>{
        images[i] = img.attr("src");
        // images[i] = img.getAttribute("src")
    })
    
    
    // 생성된 배너들을 모두 체크 (현재는 한 페이지 내의 배너들만.)
    cy.get(".image-item-container").find(".ant-checkbox").find("input").check({multiple: true, force: true})
    
    // 저장하기 버튼 클릭하여 모든 생성된 배너들 저장.(현재는 한 페이지내의 배너들만.)
    // 버튼 클릭 후, 배너 갤러리 탭으로 자동으로 이동됨.
    cy.get(".ant-btn.ant-btn-primary").click()
    
    // cy.contains("배너 갤러리").click()
    // TODO : "배너 생성 프로젝트" 라는 이름의 프로젝트를 찾아서 처리하도록 바꾸기.
    // 배너 갤러리에 생성 되었는지 확인 ( 저장하기 버튼 클릭시 자동 배너 갤러리로 이동 )
    
    // 배너 갤러리 탭이 로딩될 때까지 기다리기.
    cy.wait(10000)

    // "배너 생성 테스트" 프로젝트 클릭.
    cy.contains("배너 생성 테스트").click()
    cy.wait(5000)

    // 배너가 존재하는지 확인.
    cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-empty-description").should("not.exist")

    // 배너 이미지의 개수가 1개 이상인지 확인.
    cy.get(".ant-collapse-content.ant-collapse-content-active").find(".creative-item-contents").find("img").its('length').should("be.gte", 1)

    // "배너 생성 테스트" 프로젝트 다시 클릭하여, 활성화된 창 비활성화 시키기.
    cy.contains("배너 생성 테스트").click()

    // 가장 첫번째 프로젝트 (항상 "배너 생성 테스트"여야함.) 체크박스 체크.
    cy.get(".ant-collapse.ant-collapse-borderless.ant-collapse-icon-position-right").find(".ant-collapse-item").eq(0).find(".ant-collapse-header").find(".ant-checkbox-input").check()

    // 배너 갤러리 탭에서 배너 수평 탭 선택
    cy.get("#tab-creatives").contains("배너").click()

    // 배너들 목록이 존재하는지 확인.
    cy.get(".ant-collapse-content-box").contains("항목 없음").should("not.exist")
    // cy.get(".ant-empty-description").should("not.exist")
    
    // 배너 목록의 모든 배너 클릭하여 배너 이미지 창 활성화 시키기.
    cy.get(".ant-collapse-content-box").find(".ant-collapse-header").click({force : true, multiple:true})

    // TODO : 10개 이상 이미지 즉, 페이지가 넘어갈때도 검사되게 하기.
    // 이전에 저장한 배너 이미지 링크와 동일한지 파악함으로써 배너 이미지가 제대로 저장되었는지 확인.
    images.forEach(image => cy.get(".ant-collapse-content-box").find(".ant-collapse-item.ant-collapse-item-active").find(".creative-item-contents").find("img").should("have.attr", "src", image))
});


/////////////////////////////////////////////
// ** 카탈로그 어셋 정보 다운로드, 업로드 관련 ** //
////////////////////////////////////////////

// 카탈로그 어셋 정보 다운로드시 "CROLO Catalog Input Form.xlsx" 파일의 컬럼들.
const columns = [
    "File Name", 
    "Asset ID", 
    "Asset Name", 
    "Product Name", 
    "Price", 
    "Sale Price", 
    "Currency", 
    "Description", 
    "Insert Description"
];

// 카탈로그 어셋 정보 업로드시 업로드 하는 파일에 있는 데이터들.
const completed_rows = [[
    "900x600.png", 
    "5eea7692b1aca97dc5152e2a", 
    "custom-asset_825_411_red_green_yellow", 
    "가나다",
    "3400",
    "5500",
    "KRW",
    "",
    "OPTIONAL"
], [
    "700x466.png", 
    "5eea7690b1aca97dc5152e28",
    "custom-asset_642_319_red_green_blue",
    "라마바사",
    "1500000",
    "3000000",
    "KRW",
    "",
    "OPTIONAL"
], [
    "500x333.png", 
    "5eea768fb1aca97dc5152e26",
    "custom-asset_460_229_green_red_blue",
    "apple",
    "3.5",
    "5.5",
    "USD",
    "",
    "OPTIONAL"
]];

// 상품 정보 입력 창의 어셋의 정보들을 가져와 전달받은 items 배열에 저장하는 함수.
// 상품 정보 입력 창의 행(i), 열(j)의 순서로 차례대로 저장된다.
function getAssetInfo(cy, i, j, items){
    cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0.ant-table-row-selected").eq(i).find(".ant-table-cell.ant-table-cell-ellipsis").eq(j)
    .invoke('text').then((text) => {
        items[i][j] = text
    });
}

Cypress.Commands.add("catalogAssetDownload", (number) =>{
    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})

    cy.wait(3000)

    // TODO : 프로젝트 이름으로 클릭해서 활성화된 창에서 어셋 고르는 걸로.
    // 제일 최근(제일 위) 프로젝트 체크
    cy.get(".ant-checkbox-input").eq(0).check({timeout:1500})

    cy.wait(1000)
    
    // 이미지 탭 클릭.
    cy.get("#tab-images")
    .click()

    cy.wait(1000)

    // 이미지 탭의 모든 이미지들의 체크박스 체크.
    cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-checkbox-input").check({multiple:true, force : true})

    // TODO : data-icon="more" 이용해서 찾도록 고치기.
    // 햄버거 버튼(점 세개) 클릭.
    cy.get(".ant-btn.ant-dropdown-trigger.ant-btn-link.ant-btn-icon-only").eq(0).click({force : true})

    // TODO : "상품 정보 입력" contains로 찾도록 고치기.
    // 활성화된 햄버거 메뉴에서 "상품 정보 입력" 클릭.
    cy.get(".ant-dropdown-menu-item.ant-dropdown-menu-item-only-child").eq(2).click({force : true})

    cy.wait(5000)

    // 카탈로그 정보 입력 창에서 모든 이미지 어셋 체크박스 체크.
    cy.get(".ant-spin-nested-loading").find(".ant-checkbox-input").eq(0).check()

    cy.wait(500)

    // 상품 정보 입력 창에서 모든 어셋들의 파일 이름, 어셋 ID, 어셋 이름을 가져와서 저장.
    var items = new Array(3);
    var i, j;
    for(i = 0; i<3; i++){
        items[i] = new Array(3);
        
        for(j = 0; j < 3; j++){
            getAssetInfo(cy, i, j, items);
            console.log(items[i][j])
        }
    }

    /*
    for(i = 0; i<3; i++){
        for(j=0; j<3; j++){
            console.log(items[i][j])
        }
    }
    */

    // 엑셀 양식 다운로드를 희망하는 어셋을 선택해주세요. 어셋 체크 안할 시 경고 문구 뜨는지 확인.
    // cy.get(".ant-btn.ant-btn-primary.ant-btn-sm").eq(1).click()
    // cy.get(".ant-alert-message").should("have.text", "엑셀 양식 다운로드를 희망하는 어셋을 선택해주세요.")

    /*
    // 다른 항목들을 웹에서 직접 입력했음에도 다운받았을 때 엑셀파일에 안쓰여지는지 보기 위함.
    for(var i = 0; i<2; i++){
        for(var j = 3; j < 9; j++){
            if(j == 6){
                cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0.ant-table-row-selected").eq(i).find(".ant-table-cell").eq(j+2).click()
                cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").find(".ant-select-item-option-content").eq(0).click() // eq(0) : KRW, eq(1) : USD
            }
            else if(j == 8){
                cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0.ant-table-row-selected").eq(i).find(".ant-table-cell").eq(j+2).click()
                cy.get(".ant-select-dropdown.ant-select-dropdown-placement-bottomLeft").not(".ant-select-dropdown-hidden").find(".ant-select-item-option-content").eq(1).click() // eq(0) : REQUIRED, eq(1) : OPTIONAL
            }
            else{
                if(completed_rows[i][j] != "")
                    cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0.ant-table-row-selected").eq(i).find(".ant-table-cell").eq(j+2).type(completed_rows[i][j])
            }
        }
    }
    */

    // "엑셀 다운로드" 버튼이 있는지 확인 후 클릭.
    cy.contains("엑셀 다운로드").click({force : true})
    // cy.get(".ant-btn.ant-btn-primary.ant-btn-sm").eq(1).should("be.visible").click()

    // 다운로드가 완료되기까지 기다림.
    // arbitrary wait so that the download can complete
    cy.wait(8000);

    // 엑셀 파일 다운로드가 제대로 되었는지 확인.
    // call the parseXlsx task we created above to parse the excel and return data as json
    cy.task('parseXlsx',"C:\\Users\\louis\\Downloads\\CROLO Catalog Input Form.xlsx").then(
        jsonData => {
            // finally write the assertion rule to check if that data matches the data we expected the excel file to have.
            expect(jsonData[0].data[0]).to.eqls(columns); // 엑셀 파일의 컬럼들.
            
            for(var i =0; i <3; i++){
                expect(jsonData[0].data[1][i]).to.eqls(items[0][i]); // 엑셀 파일의 첫 번째 아이템 행
                expect(jsonData[0].data[2][i]).to.eqls(items[1][i]); // 엑셀 파일의 두 번째 아이템 행
                expect(jsonData[0].data[3][i]).to.eqls(items[2][i]); // 엑셀 파일의 세 번째 아이템 행
            }
        }
    );


});

// TODO : 다운받은 엑셀에 직접 써서 가져오기. => catalogAssetUploadAfter에서 다른 정보로 대체하는 로직 없앨수 있음(more automatic)
Cypress.Commands.add("catalogAssetUpload", (project_name, upload_file_path, upload_file_name) =>{
    cy.log("*** \'" + project_name + "\' 프로젝트 카탈로그 어셋 정보 \'.../fixture/" + upload_file_path + upload_file_name +"\' 업로드 시도 ***")
    
    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})

    cy.wait(3000)

    // TODO : 프로젝트 이름으로 클릭해서 활성화된 창에서 어셋 고르는 걸로.
    // 제일 최근(제일 위) 프로젝트 체크
    cy.get(".ant-checkbox-input").eq(0).check({timeout:1500})

    // 이미지 탭 클릭.
    cy.get("#tab-images")
    .click()

    // 이미지 탭의 모든 이미지들의 체크박스 체크.
    cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-checkbox-input").check({multiple:true, force : true})

    // TODO : data-icon="more" 이용해서 찾도록 고치기.
    // 햄버거 버튼(점 세개) 클릭.
    cy.get(".ant-btn.ant-dropdown-trigger.ant-btn-link.ant-btn-icon-only").eq(0).click({force : true})

    // 카탈로그 정보 입력 창에서 모든 이미지 어셋 체크박스 체크.
    cy.get(".ant-dropdown-menu-item.ant-dropdown-menu-item-only-child").eq(2).click({force : true})

    cy.wait(3000)

    // // "엑셀 업로드" 버튼이 있는지 확인 후 클릭.
    // cy.contains("엑셀 업로드").click({force : true})
    // cy.get(".ant-btn.ant-btn-primary.ant-btn-sm").eq(0).click()

    // 미리 준비된 엑셀 파일 업로드.
    cy.get('#file').attachFile(upload_file_path + upload_file_name, {encoding: 'utf-8', force:true});

    // 미리 준비된 엑셀 파일의 상품 정보들이 웹 상의 상품 정보 입력창에 제대로 입력되었는지 확인.
    for(var i = 0; i<2; i++){
        for(var j = 3; j < 9; j++){
            if(j == 6){
                cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0").eq(i).find(".ant-table-cell").eq(j+2).find(".ant-select-selection-item").should("have.text", completed_rows[i][j])
            }
            else if(j == 8){
                cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0").eq(i).find(".ant-table-cell").eq(j+2).find(".ant-select-selection-item").should("have.text", completed_rows[i][j])
            }
            else{
                if(completed_rows[i][j] != "")
                    cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0").eq(i).find(".ant-table-cell").eq(j+2).find("input").invoke("attr", "value").should("eq", completed_rows[i][j])
            }
        }
    }
    
    // 확인 버튼 클릭.
    cy.contains("확인")
    .click({force:true})


    // 다시 접속하여 입력한 정보가 제대로 저장되어 있는지 확인하는 작업을 아래에서 거친다.
    // 이전 작업에서 항상 미리 준비된 엑셀 파일과 다른 상품 정보가 입력된 상태에서 시작하도록 후처리했기 때문에 제대로 저장되지 않았다면 아래의 로직에서 에러 발생. (catalogAssetUploadAfter 참고)
    cy.reload()

    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})

    cy.wait(3000)

    // 제일 최근(제일 위) 프로젝트 체크
    cy.get(".ant-checkbox-input").eq(0).check({timeout:1500})

    // 이미지 탭 클릭.
    cy.get("#tab-images")
    .click()

    // 이미지 탭의 모든 이미지들의 체크박스 체크.
    cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-checkbox-input").check({multiple:true, force : true})

    // TODO : data-icon="more" 이용해서 찾도록 고치기.
    // 햄버거 버튼(점 세개) 클릭.
    cy.get(".ant-btn.ant-dropdown-trigger.ant-btn-link.ant-btn-icon-only").eq(0).click({force : true})

    // 카탈로그 정보 입력 창에서 모든 이미지 어셋 체크박스 체크.
    cy.get(".ant-dropdown-menu-item.ant-dropdown-menu-item-only-child").eq(2).click({force : true})

    cy.wait(3000)

    // 미리 준비된 엑셀 파일의 상품 정보들이 웹 상의 상품 정보 입력창에 제대로 입력되었는지 확인.
    for(var i = 0; i<2; i++){
        for(var j = 3; j < 9; j++){
            if(j == 6){
                cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0").eq(i).find(".ant-table-cell").eq(j+2).find(".ant-select-selection-item").should("have.text", completed_rows[i][j])
            }
            else if(j == 8){
                cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0").eq(i).find(".ant-table-cell").eq(j+2).find(".ant-select-selection-item").should("have.text", completed_rows[i][j])
            }
            else{
                if(completed_rows[i][j] != "")
                    cy.get(".ant-table-tbody").find(".ant-table-row.ant-table-row-level-0").eq(i).find(".ant-table-cell").eq(j+2).find("input").invoke("attr", "value").should("eq", completed_rows[i][j])
            }
        }
    }
    
    // 확인 버튼 클릭.
    cy.contains("확인")
    .click({force:true})

    cy.log("*** \'" + project_name + "\' 프로젝트 카탈로그 어셋 정보 \'.../fixture/" + upload_file_path + upload_file_name +"\' 업로드 성공 ***")
});

Cypress.Commands.add("catalogAssetUploadExec", (project_name, upload_file_path, upload_file_name) =>{
    cy.log("*** \'" + project_name + "\' 프로젝트 카탈로그 어셋 정보 \'.../fixture/" + upload_file_path + upload_file_name +"\' 업로드 시도 ***")
    
    // 어셋 라이브러리 탭에 있다면, 어셋 라이브러리 클릭이 안되기 때문에,
    // 어셋 라이브러리 탭을 클릭하여, 어셋 라이브러리 첫 페이지로 항상 갈수 있게 하기 위함.
    cy.reload()

    // 어셋 라이브러리 탭 클릭
    cy.contains("어셋 라이브러리")
    .click({force:true})

    cy.wait(3000)

    // 제일 최근(제일 위) 프로젝트 체크
    cy.get(".ant-checkbox-input").eq(0).check({timeout:1500})

    // 이미지 탭 클릭.
    cy.get("#tab-images")
    .click()

    // 이미지 탭의 모든 이미지들의 체크박스 체크.
    cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-checkbox-input").check({multiple:true, force : true})

    // TODO : data-icon="more" 이용해서 찾도록 고치기.
    // 햄버거 버튼(점 세개) 클릭.
    cy.get(".ant-btn.ant-dropdown-trigger.ant-btn-link.ant-btn-icon-only").eq(0).click({force : true})

    // 카탈로그 정보 입력 창에서 모든 이미지 어셋 체크박스 체크.
    cy.get(".ant-dropdown-menu-item.ant-dropdown-menu-item-only-child").eq(2).click({force : true})

    cy.wait(3000)

    // // "엑셀 업로드" 버튼이 있는지 확인 후 클릭.
    // cy.contains("엑셀 업로드").click({force : true})
    // // cy.get(".ant-btn.ant-btn-primary.ant-btn-sm").eq(0).click()
    
    // cy.fixture('catalog/' + fileName).then(fileContent => {
    // cy.get('.ant-btn.ant-btn-primary.ant-btn-sm').upload({ fileContent, fileName, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', encoding: 'UTF-8', })})

    // 미리 준비된 엑셀 파일 업로드.
    cy.get('#file').attachFile(upload_file_path + upload_file_name, {encoding: 'utf-8', force:true});
    
    cy.wait(3000)

    // 확인 버튼 클릭
    cy.contains("확인")
    .click({force:true})

    cy.wait(3000)

    // // 카탈로그 정보 입력 창이 제대로 닫혔는지 확인.
    // cy.get("#tab-images").should("exist")

    cy.log("*** \'" + project_name + "\' 프로젝트 카탈로그 어셋 정보 \'.../fixture/" + upload_file_path + upload_file_name +"\' 업로드 성공 ***")
});



/////////////////////////////////////////////
// ** 테스트 케이스 준비 및 초기화 관련  ** ///
////////////////////////////////////////////


//   전체 어셋 삭제   //
//////////////////
Cypress.Commands.add("projectAssetRemoveReady", (project_name) => {
    var image_names = ["500x333.png", ]
    var logo_names = ["500x333.jpg", ]
    
    cy.projectCreateExec(project_name)
    cy.uploadImageAssetExec(project_name, image_names, "general/", "이미지 어셋")
    cy.uploadImageAssetExec(project_name, logo_names, "general/", "브랜드 로고")

    cy.enterTextAssetExec(project_name, "kor", "가나다", "가나다라마바", "가나다라마바사아자차카타파", "가나다라마바사아자차카타파하가나다라마바사", "가나다라마바사아자차카타파하가나다라마바사아자차카타파하바나다");

    cy.enterTextAssetExec(project_name, "eng", "abcd", "abcdefghijk", "abcdefghijklmnopqrstuv", "abcdefghijklmnopqrstuvwxyzabcdefghi", "abcdefghijklmnopqrstuvwxyzabcdefghiabcdefghijklmnopq");
    
    // 어셋들이 모두 업로드 되기를 기다림.
    cy.wait(37000)
});


Cypress.Commands.add("projectAssetRemoveAfter", () =>{
    // TODO : 프론트에서 어셋라이브러리에서 프로젝트별로 속성값 주면, 특정 프로젝트 "프로젝트 어셋 전체 삭제"만 선택해서 삭제하도록 변경
    cy.reload()
    cy.projectAllRemoveExec()
});




//   이미지 어셋 삭제   //
////////////////////////
// TODO : 이미지 어셋, 로고 어셋, 텍스트 어셋 삭제시 각각 어셋 라이브러리에 프로젝트 볼때 삭제 전과 삭제 후 표시되는 숫자값 모두 맞게 표시되는지 확인하기.
Cypress.Commands.add("imageAssetRemoveReady", (project_name) => {
    var image_names = ["500x333.png", ]
    
    cy.projectCreateExec(project_name)
    cy.uploadImageAssetExec(project_name, image_names, "general/", "이미지 어셋")
    // 어셋들이 모두 업로드 되기를 기다림.
    cy.wait(15000)
});
Cypress.Commands.add("imageAssetRemoveAfter", () =>{
    // TODO : 프론트에서 어셋라이브러리에서 프로젝트별로 속성값 주면, 특정 프로젝트 "이미지 어셋 삭제"만 선택해서 삭제하도록 변경
    cy.reload()
    cy.projectAllRemoveExec()
});



//   브랜드 로고 어셋 삭제   //
/////////////////////////////
Cypress.Commands.add("logoAssetRemoveReady", (project_name) => {
    var logo_names = ["500x333.jpg", ]
    
    cy.projectCreateExec(project_name)
    cy.uploadImageAssetExec(project_name, logo_names, "general/", "브랜드 로고")
    // 어셋들이 모두 업로드 되기를 기다림.
    cy.wait(15000)
});

Cypress.Commands.add("logoAssetRemoveAfter", () =>{
    // TODO : 프론트에서 어셋라이브러리에서 프로젝트별로 속성값 주면, 특정 프로젝트 "로고 어셋 삭제"만 선택해서 삭제하도록 변경
    cy.reload()
    cy.projectAllRemoveExec()
});



//   텍스트 어셋 삭제   //
////////////////////////
Cypress.Commands.add("textAssetRemoveReady", (project_name) => {
    cy.projectCreateExec(project_name)
    
    cy.enterTextAssetExec(project_name, "kor", "가나다", "가나다라마바", "가나다라마바사아자차카타파", 
    "가나다라마바사아자차카타파하가나다라마바사", "가나다라마바사아자차카타파하가나다라마바사아자차카타파하바나다");
    
    cy.enterTextAssetExec(project_name, "eng", "abcd", "abcdefghijk", "abcdefghijklmnopqrstuv", 
    "abcdefghijklmnopqrstuvwxyzabcdefghi", "abcdefghijklmnopqrstuvwxyzabcdefghiabcdefghijklmnopq");
    // 어셋들이 모두 업로드 되기를 기다림.
    cy.wait(25000)
});

Cypress.Commands.add("textAssetRemoveAfter", () =>{
    // TODO : 프론트에서 어셋라이브러리에서 프로젝트별로 속성값 주면, 특정 프로젝트 "텍스트 어셋 삭제"만 선택해서 삭제하도록 변경
    cy.reload()
    cy.projectAllRemoveExec()
});




//   이미지 어셋 업로드   //
//////////////////////////
// TODO : 이미지 어셋, 로고 어셋, 텍스트 어셋 업로드시 각각 어셋 라이브러리에 프로젝트 볼때 업로드 전과 후 표시되는 숫자값 모두 맞게 표시되는지 확인하기.
Cypress.Commands.add("uploadImageAssetReady", (project_name) => {
    cy.projectCreateExec(project_name)
});


Cypress.Commands.add("uploadImageAssetAfter", (type) =>{
    // TODO : 프론트에서 어셋라이브러리에서 프로젝트별로 속성값 주면, 특정 프로젝트 "이미지 어셋 삭제(성공 예상)"만 선택해서 삭제하도록 변경
    cy.reload()
    if(type == "이미지 어셋")
        cy.imageAssetRemove(0)
    else if(type == "브랜드 로고")
        cy.logoAssetRemove(0)
    cy.projectAllRemoveExec()
});


// TODO : 이미지 어셋, 로고 어셋, 텍스트 어셋 업로드시 각각 어셋 라이브러리에 프로젝트 볼때 업로드 전과 후 표시되는 숫자값 모두 맞게 표시되는지 확인하기.
Cypress.Commands.add("uploadImageAssetFailReady", (project_name) => {
    cy.projectCreateExec(project_name)
});


Cypress.Commands.add("uploadImageAssetFailAfter", () =>{
    // TODO : 프론트에서 어셋라이브러리에서 프로젝트별로 속성값 주면, 특정 프로젝트 "이미지 어셋 삭제(실패 예상)"만 선택해서 삭제하도록 변경
    cy.reload()
    cy.projectAllRemoveExec()
});



//   텍스트 어셋 업로드   //
//////////////////////////
// TODO : 이미지 어셋, 로고 어셋, 텍스트 어셋 업로드시 각각 어셋 라이브러리에 프로젝트 볼때 업로드 전과 후 표시되는 숫자값 모두 맞게 표시되는지 확인하기.
Cypress.Commands.add("enterTextAssetReady", (project_name) => {
    cy.projectCreateExec(project_name)
});


Cypress.Commands.add("enterTextAssetAfter", () =>{
    // TODO : 프론트에서 어셋라이브러리에서 프로젝트별로 속성값 주면, 특정 프로젝트 "텍스트 어셋 업로드 (영어) 또는 텍스트 어셋 업로드 (한글)"만 선택해서 삭제하도록 변경
    cy.reload()
    cy.textAssetRemove(0)
    cy.projectAllRemoveExec()
});



//   배너 생성   //
//////////////////
Cypress.Commands.add("createBannerReady", (project_name) =>{
    // cy.projectCreateExec(project_name)
    
    var image_names = ["맥북 프로.jpg", "에어팟 프로.png"] // transparent
    var logo_names =  ['애플 로고.png', '애플 로고2.png']
    cy.uploadImageAssetExec(project_name, image_names, "banner_asset/", "이미지 어셋")
    cy.uploadImageAssetExec(project_name, logo_names, "banner_asset/", "브랜드 로고")

    var lang = "kor"
    var very_small_text = "MacBook", small_text = "MacBook Pro", intermediate_text = "MacBook Pro 어떤일이든 어디에서든",
    long_text = "MacBook Pro 프로를 위해 프로가 만든 프로 노트북", very_long_text = "13인치 15인치 16인치 MacBook Pro 프로를 위해 프로가 만든 프로 노트북";
    cy.enterTextAssetExec(project_name, lang, very_small_text, small_text, intermediate_text, long_text, very_long_text);

    // 어셋들이 모두 업로드 되기를 기다림.
    cy.wait(50000)
});



//   배너 저장   //
//////////////////
Cypress.Commands.add("saveBannerAfter", (project_name) =>{
    cy.imageAssetRemove(0)
    cy.logoAssetRemove(0)
    cy.textAssetRemove(0)
});



//   카탈로그 어셋 정보 다운로드   //
//////////////////////////////
Cypress.Commands.add("catalogAssetDownloadReady", (project_name) =>{
    cy.projectCreateExec(project_name)
    
    var image_names = ['500x333.png', '700x466.png', '900x600.png'] // transparent
    cy.uploadImageAssetExec(project_name, image_names, "transparent/", "이미지 어셋")

    // 이미지가 모두 업로드 되기를 기다림.
    cy.wait(25000)
});


//   카탈로그 어셋 정보 다운로드   //
//////////////////////////////////
Cypress.Commands.add("catalogAssetDownloadAfter", (project_name) =>{
    const YAML = require('yamljs')
    cy.log("실행")
    cy.readFile('cypress/config/config_crolo_test.yml')
    .then((str) => {
        // parse the string into object literal
        var yml_obj = YAML.parse(str)
        var download_folder_path = yml_obj.crolo["download_folder_path"]
        var main_url = yml_obj.crolo["main_url"]
        
        cy.task('unlinkFs', download_folder_path + "CROLO Catalog Input Form.xlsx").then(
            success =>{
                expect(success).to.equal("success");
            }
        );
    })

    
});

Cypress.Commands.add("catalogAssetUploadAfter", (project_name, upload_file_path, upload_file_name_after) =>{
    const YAML = require('yamljs')
    cy.log("실행")
    cy.catalogAssetUploadExec(project_name, upload_file_path, upload_file_name_after)

    // 엑셀 읽어서 어셋 업로드 검사하게 바꾸면, 
    // 위의 cy.catalogAssetUploadExec(project_name, upload_file_path, upload_file_name_after) 대신 아래의 코드로 대체.
    // cy.readFile('cypress/config/config_crolo_test.yml')
    // .then((str) => {
    //     // parse the string into object literal
    //     var yml_obj = YAML.parse(str)
    //     var download_folder_path = yml_obj.crolo["download_folder_path"]
    //     var main_url = yml_obj.crolo["main_url"]
        
    //     cy.catalogAssetUploadExec(project_name, upload_file_path, upload_file_name_after)

    //     /*
    //     cy.visit(main_url)
    //     cy.wait(1000)
    //     cy.imageAssetRemove(0)
    //     cy.projectAllRemoveExec()
    //     */
    // })
   
});

