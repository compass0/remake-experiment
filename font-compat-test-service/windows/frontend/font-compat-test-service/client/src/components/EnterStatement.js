import React from 'react'
import { post } from 'axios';
// import { get } from 'axios';
// import { withRouter } from 'react-router-dom'

// /* ### global variable ### */
// const MAX_CURRENT_USERS = 100;
// var user_num = 0;

class EnterStatement extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            statement: '',
            selectFontLang: '',
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.enterStatement = this.enterStatement.bind(this)
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.enterStatement()
        .then((response)=>{
            console.log(response.data);
        })
        // this.setState({
        //     statement: ''
        // })

        window.location.reload();
        // user_num = (user_num + 1) % (MAX_CURRENT_USERS+1);
        // this.props.history.push('/' + user_num.toString());
        // this.props.history.push('/font-test');
        // window.location.reload();
        
    }

    handleValueChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    enterStatement(){
        // // const url = '/api/test';
        
        // // return get('/api/test?stmt='+this.state.statement)
        // // return get('/user?ID=12345')
        // // return (get(url, {
        // //     params: {
        // //         stmt: (this.state.statement)
        // //     }
        // // }))
        // const url = '/api/fonts';
        // // const params = new URLSearchParams();
        // // params.append('statement', 'testingtesting')
        // // const formData = new FormData();
        // // formData.append('statement', 'ssss')
        // // formData.append('name', 'testtest')
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //         // 'content-type': 'URLSearchParams/statement'
        //     }
        // }
        
        const url = '/api/fonts';
        // const formData = new FormData();
        // // console.log(formData)
        // formData.append('statement', this.state.statement);
        // formData.append('lang', this.state.selectFontLang);

        // // console.log(this.state.fontFile)
        // for (var key of formData.keys()) {

        //     console.log(key);
            
        // }   
          
        // for (var value of formData.values()) {
        
        //     console.log(value);
        
        // }
        // console.log(formData)
        console.log("실행")
        return post(url, {'statement' : this.state.statement, 'lang' : this.state.selectFontLang})

        
        // console.log("react 부분")
        // console.log(this.state.statement)
        // console.log({statement: this.state.statement})
        // return post(url, {statement: this.state.statement})
    }

    render(){
        return(
            <form onSubmit = {this.handleFormSubmit}>
                <h1>문구 입력</h1>
                문구 &nbsp; : &nbsp; <input type="text" name="statement" value={this.state.statement} onChange={this.handleValueChange} /> &nbsp;
                <br/> <br/>
                <label>
                    폰트 언어 &nbsp; : &nbsp;&nbsp;
                    <select name = "selectFontLang" value={this.state.selectFontLang} onChange={this.handleValueChange}>
                        <option value="" selected disabled hidden> 선택해주세요. </option>
                        <option value="KOR">korean</option>
                        <option value="ENG">english</option>
                    </select>
                </label>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                <button type="submit"> 렌더링 </button> 
            </form>
        )
    }
}

export default EnterStatement;
// export default withRouter(EnterStatement);