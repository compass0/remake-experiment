import React from 'react'
import { post } from 'axios';
// import { get } from 'axios';

class FontUpload extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fontFile: null,
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        // this.handleValueChange = this.handleValueChange.bind(this)
        this.uploadFont = this.uploadFont.bind(this)
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.uploadFont()
        .then((response)=>{
            alert('성공')
            console.log(response.data);
        }).catch(err =>{
            alert(err)
            alert('실패')
        })
        // this.setState({
        //     statement: ''
        // })

        // window.location.reload();
    }

    handleFileChange(e){
        this.setState({
            fontFile: e.target.files[0],
        });
    }

    // handleValueChange(e){
    //     let nextState = {};
    //     nextState[e.target.name] = e.target.value;
    //     this.setState(nextState);
    // }

    uploadFont(){
        const url = '/api/font-upload';
        const formData = new FormData();
        formData.append('file', this.state.fontFile);
        console.log(formData)
        console.log("실행")
        return post(url, formData)
    }

    render(){
        return(
            <form onSubmit = {this.handleFormSubmit}>
                <h1>폰트 업로드</h1>
                폰트 : <input type="file" name="file" file={this.state.fontFile} onChange={this.handleFileChange} />
                <button type="submit">추가하기</button><br/>
                
            </form>
        )
    }
}

export default FontUpload