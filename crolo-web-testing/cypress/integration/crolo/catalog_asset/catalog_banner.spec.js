
describe("카탈로그 배너 테스트", () => {
    beforeEach(() => {
        cy.login_post_first()
    })

    it("카탈로그 어셋 정보 입력 후 다운로드", () => {
        var project_name = "카탈로그 테스트"
        // cy.catalogAssetDownloadReady(project_name)
        cy.catalogAssetDownload()
        cy.catalogAssetDownloadAfter(project_name)
    });

    it("카탈로그 어셋 - 엑셀 업로드", () => {
        var project_name = "카탈로그 테스트"
        const upload_file_path = "catalog/"
        const upload_file_name = "CROLO Catalog Input Form - 업로드.xlsx"
        const upload_file_name_after = "CROLO Catalog Input Form - 업로드 - temp.xlsx"
        // const upload_file_path = "C:\\Users\\louis\\Downloads\\"
        // const upload_file_name = "CROLO Catalog Input Form.xlsx"
    
        cy.catalogAssetUpload(project_name, upload_file_path, upload_file_name)
        cy.catalogAssetUploadAfter(project_name, upload_file_path, upload_file_name_after)
    });
})