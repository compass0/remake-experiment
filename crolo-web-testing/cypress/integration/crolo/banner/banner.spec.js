
describe("크리에이티브 테스트", () => {
    beforeEach(() => {
        cy.login_post_first()
    })

    it("크리에이티브 생성", () => {
        const project_name = "배너 생성 테스트"
        var banner_type = "베이직 & 커버" // "베이직 & 커버" or "카탈로그"
        var banner_size = "1200 x 628 픽셀" // "1200 x 628 픽셀" or "1080 x 1080 픽셀"
        var banner_lang = "한국어" // "한국어" or "영어"
        var text_set = "MacBook Pro 어떤일이든 어디에서든" // "MacBook Pro 어떤일이든 어디에서든"
        var selector_CTA = "더 보기" // 
        var selector_ttst = "넓게"  // 넓게 or 보통 or 좁게  ttst(Tracking text style type) : 텍스트 자간.
        var selector_ltst = "좁게" // 넓게 or 보통 or 좁게  ttst(Leading Text Style Type) : 텍스트 행간.

        cy.createBannerReady(project_name)
        cy.createBanner(project_name, banner_type, banner_size, banner_lang, text_set, selector_CTA, selector_ttst, selector_ltst)

        cy.saveBanner()
        cy.saveBannerAfter()
    });
})