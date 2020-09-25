import React from 'react';

class Font extends React.Component{
    
    render(){
        return (
            <div>
                <input type="button" value="page move" onclick="movepage()"/>
            </div>
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
