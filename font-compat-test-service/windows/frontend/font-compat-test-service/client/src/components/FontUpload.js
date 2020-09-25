import React from 'react'
import { post } from 'axios';
// import { get } from 'axios';

class FontUpload extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fontFile: null,
            selectFontLang: '',
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        // this.handleValueChange = this.handleValueChange.bind(this)
        this.uploadFont = this.uploadFont.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({selectFontLang: e.target.value});
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.uploadFont()
        .then((response)=>{
            alert('성공')
            console.log(response);
            window.location.reload();
        }).catch(err =>{
            console.log(err.message);
            // alert(err.message);
            alert('실패');
            window.location.reload();
        })
        // this.setState({
        //     statement: ''
        // })

        
    }

    handleFileChange(e){
        this.setState({
            fontFile: e.target.files,
        });
    }

    // handleValueChange(e){
    //     let nextState = {};
    //     nextState[e.target.name] = e.target.value;
    //     this.setState(nextState);
    // }
    
    uploadFont(){
        var url_temp;
        var base_url = "/api/font-upload/";
        switch(this.state.selectFontLang){
            case "ENG":
                url_temp = base_url + this.state.selectFontLang;
                break;
            case "KOR":
                url_temp = base_url + this.state.selectFontLang;
                break;
            default:

        }
        
        const url = url_temp;
        
        const formData = new FormData();
        // console.log(formData)
        // formData.append('username', 'Chris');
        
        // formData.append('files', this.state.fontFiles);
        // formData.append('file', this.state.fontFile);
        for (let i = 0; i < this.state.fontFile.length; i++) {
            formData.append('files', this.state.fontFile[i])
        }
        formData.append('lang', this.state.selectFontLang);

        console.log(this.state.fontFile)
        // console.log(typeof(this.state.fontFile))
        // console.log(this.state.fontFile.type)

        // console.log(this.state.fontFile)

        // function iterateFiles(filesArray)
        // {
        //     for(var i=0; i<filesArray.length; i++){
        //         console.log(filesArray[i]);    
        //     }
        // }
        for (var key of formData.keys()) {

            console.log(key);
            
        }   
          
        for (var value of formData.values()) {
        
            console.log(value);
        
        }

        // for(var pair of formData.entries()){
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        // console.log(formData)

        // const config = {

        //     headers: {
        //     accept : 'font/ttf', 'font/otf'
        //     'content-type': 'multipart/form-data'
        //     }
            
        // }
        console.log("실행")
        return post(url, formData, {headers:{accept : 'font/*', enctype:'multipart/form-data'}})
    }

    render(){
        return(

            <form onSubmit = {this.handleFormSubmit}>
                <h1>폰트 업로드</h1>
                <label>
                    select language of font for you to upload &nbsp; : &nbsp;&nbsp;
                    <select value={this.state.selectFontLang} onChange={this.handleChange}>
                        <option value="" selected disabled hidden> 선택해주세요. </option>
                        <option value="KOR">korean</option>
                        <option value="ENG">english</option>
                    </select>
                </label>
                <br/>
                <br/>폰트 &nbsp;:&nbsp;&nbsp; <input type="file" multiple name="file" file={this.state.fontFile} onChange={this.handleFileChange} />
                <button type="submit">추가하기</button><br/>
                
            </form>
        )
    }
}

export default FontUpload