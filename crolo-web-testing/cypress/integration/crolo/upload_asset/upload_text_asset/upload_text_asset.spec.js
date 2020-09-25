
describe("텍스트 어셋 업로드 테스트", () => {
    beforeEach(() => {
        cy.login_post_first()
    })
    it("텍스트 어셋 업로드 (한글)", ()=>{
        var project_name = "텍스트 어셋 업로드 (한글)"
        var lang = "kor"
        var accumulate_text_num = 1
        var very_small_text = "가나다", small_text = "가나다라마바", intermediate_text = "가나다라마바사아자차카타파",
        long_text = "가나다라마바사아자차카타파하가나다라마바사", very_long_text = "가나다라마바사아자차카타파하가나다라마바사아자차카타파하바나다";
        
        cy.enterTextAssetReady(project_name);
        cy.enterTextAsset(project_name, lang, very_small_text, small_text, intermediate_text, long_text, very_long_text, accumulate_text_num);
        cy.enterTextAssetAfter();
    });
    
    it("텍스트 어셋 업로드 (영어)", ()=>{
        var project_name = "텍스트 어셋 업로드 (영어)"
        var lang = "eng"
        var accumulate_text_num = 1
        var very_small_text = "abcd", small_text = "abcdefghijk", intermediate_text = "abcdefghijklmnopqrstuv",
        long_text = "abcdefghijklmnopqrstuvwxyzabcdefghi", very_long_text = "abcdefghijklmnopqrstuvwxyzabcdefghiabcdefghijklmnopq";

        cy.enterTextAssetReady(project_name);
        cy.enterTextAsset(project_name, lang, very_small_text, small_text, intermediate_text, long_text, very_long_text, accumulate_text_num);
        cy.enterTextAssetAfter();
    });
})