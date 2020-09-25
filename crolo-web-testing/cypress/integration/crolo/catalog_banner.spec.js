
describe("카탈로그 배너 테스트", () => {

    it("카탈로그 어셋 정보 입력 후 다운로드", () => {
        cy.login_post_first()
        
        cy.catalogAssetDownload()
    });

    it("카탈로그 어셋 - 엑셀 업로드", () => {
        cy.login_post_first()
        
        cy.catalogAssetUpload()
    });
})