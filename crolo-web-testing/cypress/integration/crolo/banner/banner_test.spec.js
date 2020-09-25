describe("크리에이티브 테스트", () => {
    beforeEach(() => {
        cy.login_post_first()
    })

    it("크리에이티브 생성", () => {
        cy.contains("배너 갤러리").click()
        cy.get(".ant-collapse.ant-collapse-borderless.ant-collapse-icon-position-right").find(".ant-collapse-item").eq(0).click()
        cy.wait(5000)

        cy.get(".ant-collapse-content.ant-collapse-content-active").find(".ant-empty-description").should("not.exist")

        cy.get(".ant-collapse-content.ant-collapse-content-active").find(".creative-item-contents").find("img").its('length').should("be.gte", 1)

        cy.contains("배너 생성 테스트").click()

        cy.get(".ant-collapse.ant-collapse-borderless.ant-collapse-icon-position-right").find(".ant-collapse-item").eq(0).find(".ant-collapse-header").find(".ant-checkbox-input").check()
    
        // 배너 갤러리 탭에서 배너 수평 탭 선택
        cy.get("#tab-creatives").contains("배너").click()
    
        cy.get(".ant-collapse-content-box").contains("항목 없음").should("not.exist")
        // cy.get(".ant-empty-description").should("not.exist")
        cy.get(".ant-collapse-content-box").find(".ant-collapse-header").click({force : true, multiple:true})

        // cy.get(".ant-collapse-content-box").find(".ant-collapse-item.ant-collapse-item-active").find(".creative-item-contents").find("img").should("exist")
    
    });
})