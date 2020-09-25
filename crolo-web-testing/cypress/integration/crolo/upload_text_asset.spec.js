
describe("Crolo Test", () => {
    beforeEach(() => {
        cy.login_post_first()
    })
    it("텍스트 어셋 업로드 (한글)", ()=>{
        cy.projectCreate();
        
        cy.enterTextAsset("kor", "가나다", "가나다라마바", "가나다라마바사아자차카타파", "가나다라마바사아자차카타파하가나다라마바사", "가나다라마바사아자차카타파하가나다라마바사아자차카타파하바나다");
        
    });
    
    it("텍스트 어셋 업로드 (영어)", ()=>{
        cy.projectCreate();

        cy.enterTextAsset("eng", "abcd", "abcdefghijk", "abcdefghijklmnopqrstuv", "abcdefghijklmnopqrstuvwxyzabcdefghi", "abcdefghijklmnopqrstuvwxyzabcdefghiabcdefghijklmnopq" , 2);
    });
})