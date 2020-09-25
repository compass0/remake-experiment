import React, { Component } from 'react'
import logo from 'image/logo.png';
import { Link } from 'react-router-dom';

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class MainHome extends Component {
  render() {
    return (
      <div>
        <Header as='h2' color='teal' textAlign='center'>
            <Image src={logo} /> Font Compatibility Test
        </Header>
        <Message>
            <h1> 폰트 테스트 </h1>
            <Link to="/font-test">폰트 테스트로 바로가기</Link>
            {/* <Link to="/enter-statement">폰트 테스트로 바로가기</Link> */}
        
            <h1> 폰트 업로드 </h1>
            <Link to="/font-upload">폰트 업로드로 바로가기</Link>
        </Message>
      </div>
    )
  }
}

export default MainHome;