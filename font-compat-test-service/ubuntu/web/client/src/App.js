import React, { Component } from 'react';
import { Home, FontTestPage, FontUploadPage } from 'pages';
import { Route } from 'react-router-dom';

class App extends Component {
    render() {      
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/font-upload" component={FontUploadPage}/>
                <Route path="/font-test" component={FontTestPage}/>
            </div>
        );
    };
};

export default App;
