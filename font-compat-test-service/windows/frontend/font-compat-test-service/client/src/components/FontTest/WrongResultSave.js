import React from 'react'
import { post } from 'axios';
// import Button from '@material-ui/core/Button';
// import { get } from 'axios';
import { saveAs } from 'file-saver';
import { Container, Button, Link } from 'react-floating-action-button'

// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;

class WrongResultSave extends React.Component{
    constructor(props){
        super(props);
        this.onClickButton = this.onClickButton.bind(this)
    }

    /* "쌰" : ["선택한 폰트 이름", "선택한 폰트 이름", "선택한 폰트 이름", ... ] */
    onClickButton(){
        console.log(this.props.options)
        console.log(this.props.statement)

        // var download_dic = {};
        // download_dic[this.props.statement] = this.props.options;

        var download_dic = this.props.options;
        
        for(var key in download_dic){
            if(download_dic[key].length == 0){
                delete download_dic[key];
            }
        }

        console.log(download_dic);
        var downlaod_str= JSON.stringify(download_dic);
        console.log(downlaod_str)

        var FileSaver = require('file-saver');
        var blob = new Blob([downlaod_str], {type: "text/plain;charset=utf-8"});
        saveAs(blob, this.props.statement + "_faillist.txt");

        // var txtURL = window.URL.createObjectURL(blob);
        // var tempLink = document.createElement('a');
        // tempLink.href = txtURL;
        // tempLink.setAttribute('download', this.props.statement + "_faillist.txt");
        // tempLink.click();
    }

    render(){
        return(
            <Container>
                {/*<Link href="#"
                    tooltip="Create note link"
                    icon="far fa-sticky-note" />
                <Link href="#"
                    tooltip="Add user link"
                    icon="fas fa-user-plus" />
                    className="fab-item btn btn-link btn-lg text-white" */}
            
                <Button
                    tooltip="Save Button!"
                    icon="far fa-sticky-note"
                    onClick={this.onClickButton}> 저장 </Button>

                {/* <Button onClick={this.onClickButton}> 저장 </Button> */}

            </Container>
            
        )
    }
}

export default WrongResultSave;