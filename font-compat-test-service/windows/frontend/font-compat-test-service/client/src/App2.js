import React, { Component } from 'react';
import Font from './components/Font'
import EnterStatement from './components/EnterStatement'
import FontUpload from './components/FontUpload'
import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


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
  }
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


class App extends Component{

  state = {
    fonts:'',
    completed: 0
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({fonts: res}))
      .catch(err => console.log(err));
  }

  callApi = async() => {
      const response = await fetch('/api/fonts');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };


  render(){ 
    const {classes} = this.props;
    return (
      <div>
        <FontUpload/>
        <EnterStatement/>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>폰트 이름</TableCell>
                <TableCell>렌더링 결과</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.fonts ? this.state.fonts.map(c=>{
              return <Font key={c.name} name={c.name} renderimage={c.renderimage} />
              }): 
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

export default withStyles(styles)(App);
