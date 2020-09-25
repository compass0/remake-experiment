import React, { Component } from 'react';
import { Home, Signup, FontTestPage, FontUploadPage, EnterStatementPage } from 'pages';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {      
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/font-upload" component={FontUploadPage}/>
                <Route path="/font-test" component={FontTestPage}/>
                <Route path="/enter-statement" component={EnterStatementPage}/>
            </div>
        );
    };
};

export default App;