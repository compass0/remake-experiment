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

import Button from '@material-ui/core/Button';

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


class FontTest extends Component{

  state = {
    fonts:'',
    completed: 0
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => {this.setState({fonts: res}); console.log(this.state.fonts)})
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

  deleteItem(i) {
		const { fonts } = this.state;
		fonts.splice(i, 1);
		this.setState({ fonts });
	}

  render(){ 
    const {classes} = this.props;
    return (
      <div>
        <EnterStatement/>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>폰트 이름</TableCell>
								<TableCell>입력 문구</TableCell>
                <TableCell>렌더링 결과</TableCell>
								<TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
							{ /*{this.state.fonts ? this.state.fonts.map(c=>{
              return <Font key={c.name} name={c.name} statement={c.statement} renderimage={c.renderimage} /> */ }
							{this.state.fonts ? this.state.fonts.map((c,i)=>{
								return (<TableRow>
									<TableCell>{c.name}</TableCell>
									<TableCell >{c.statement}</TableCell>
									<TableCell><img src={c.renderimage} alt="result"/></TableCell>
									<TableCell>
									 <Button
											onClick={this.deleteItem.bind(this, i)}
									    color="secondary"
									 >
									 	Delete
									 </Button>
									</TableCell>
								</TableRow>)
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

export default withStyles(styles)(FontTest);
