import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import FontTest from './FontTest/FontTest'

class Font extends React.Component{
    
    render(){
        return (
            <TableRow>
                <TableCell>{this.props.name}</TableCell>
                <TableCell >{this.props.statement}</TableCell>
                <TableCell><img src={this.props.renderimage} alt="result"/></TableCell>
            </TableRow>
            // <div>
            //     <CustomerProfile id={this.props.id} image={this.props.image} name={this.props.name}/>
            //     <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
            // </div>

            // <div>
            //     <h2>{this.props.name}</h2>
            //     <p>{this.props.birthday}</p>
            //     <p>{this.props.gender}</p>
            //     <p>{this.props.job}</p>
            // </div>
            // <div>
            //     <h2>홍길동</h2>
            //     <p>961222</p>
            //     <p>남자</p>
            //     <p>대학생</p>
            // </div>
        )
    }
}

// class CustomerProfile extends React.Component{
//     render(){
//         return(
//             <div>
//                 <img src={this.props.image} alt="profile"/>
//                 <h2>{this.props.name}({this.props.id})</h2>
//             </div>
//         )
//     }
// }

// class CustomerInfo extends React.Component{
//     render(){
//         return(
//             <div>
//                 <p>{this.props.birthday}</p>
//                 <p>{this.props.gender}</p>
//                 <p>{this.props.job}</p>
//             </div>
//         )
//     }
// }

export default Font;

