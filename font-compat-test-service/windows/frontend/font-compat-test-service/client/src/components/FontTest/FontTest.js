import React, { Component } from 'react';
import Font from '../Font'
import EnterStatement from '../EnterStatement'
import '../../App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import FontCheckbox from './FontCheckbox'
import WrongResultSave from './WrongResultSave'

import Button from '@material-ui/core/Button';

/* ### global variables ### */
// var statement_g;


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2 
  },
});


// const fonts=[
//   {
//     'name': '나눔고딕',
//     'renderimage': 'https://placeimg.com/64/64/1'
//   },
//   {
//     'name': '나눔고딕',
//     'renderimage': 'https://placeimg.com/64/64/2'
//   },
//   {
//     'name': '나눔고딕',
//     'renderimage': 'https://placeimg.com/64/64/3'
//   }
// ]


class FontTest extends Component{

  state = {
    fonts:'',
    current_stmt:'',
    current_stmt_array: null,
    completed: 0,
    options:{}
    // options:[]
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      // .then(res => this.setState({fonts: res, current_stmt: res[0]['statement'], current_stmt_array : res[0]['statement'].split("")}))
      .then(res => this.setState({fonts: res, current_stmt: res[0]['statement'], options : res[res.length-1]['failed'], current_stmt_array : res[0]['statement'].split("")}))
      .catch(err => console.log(err));

    //   document.querySelector(".checkbox").innerHTML += `
    //   <input
    //     type="checkbox"
    //     value = {c.name}
    //     defaultChecked = {!c.success}
    //     onChange={this.handleChange.bind(this)} />
    // `;
  }

  callApi = async() => {
    const response = await fetch('/api/fonts');
    // console.log(response)
    // if(response == "null")
    //   alert("[python shell error] 다시 시도해주세요 ")
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  deleteItem(i) {
    // const options = this.state.options;
    // options.splice(index, 1);
    // this.setState({ options: options });

    const { fonts } = this.state;
    fonts.splice(i, 1);
    this.setState({ fonts });
  }

  handleChange(e){
    const options = this.state.options;
    const each_option = (options[e.target.className] == undefined ? [] : options[e.target.className]);
    let index;
    console.log(each_option)
    console.log(e.target.id)
    console.log(e.target.className)

    if(e.target.checked){
      each_option.push(e.target.value)
    }else{
      index = each_option.indexOf(e.target.value)
      each_option.splice(index, 1)
    }

    each_option.sort()
    options[e.target.className] = each_option

    this.setState({ options: options })
    console.log(this.state.options[e.target.className]);
    console.log(this.state.options);
    console.log(this.state.current_stmt);
  }
  
  render(){ 
    const {classes} = this.props;
    return (
      <div>
        <EnterStatement/>
        <WrongResultSave statement={this.state.current_stmt} options={this.state.options}/>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>폰트 이름</TableCell>
                <TableCell>입력 문구</TableCell>
                <TableCell>렌더링 결과</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fonts ? this.state.fonts.map((c,i)=>{
              return (<TableRow>
                {/* <Font key={c.name} name={c.name} statement={c.statement} renderimage={c.renderimage} /> */}
                <TableCell>{c.name.slice(0,-4)}</TableCell>
                <TableCell >{c.statement}</TableCell>
                {/* <TableCell >{c.successbin[0]}</TableCell> */}
                <TableCell><img src={c.renderimage} alt="result"/></TableCell>
                <TableCell>
                  <Button
                    onClick={this.deleteItem.bind(this, i)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell class="checkbox">
                  {this.state.current_stmt_array ? this.state.current_stmt_array.map((char, i)=>{
                  return (<input
                    // id = {char}
                    class = {char}
                    type="checkbox"
                    value = {c.name}
                    // checked={this.state.checked}
                    // defaultChecked = {!c.success}
                    defaultChecked = {(c.successbin[i]) == 0 ? true : false}
                    onChange={this.handleChange.bind(this)}
                     />
                  )
                  }) :  <p></p> }
                </TableCell>
            </TableRow>)
              }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} color="secondary"/>
                </TableCell>  
              </TableRow>
              }

            </TableBody>
          </Table>
        </Paper>  
      </div>
    );
  }
}

export default withStyles(styles)(FontTest);
