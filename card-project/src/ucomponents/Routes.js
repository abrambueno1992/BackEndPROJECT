import React from 'react';
import {Route} from 'react-router-dom';
import CreateUser from './CreateUser';
import Home from './Home';

class Routes extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
      return (
        <div>
                {/* <Route  path="/create"  component={CreateUser} /> */}
            
                <Home />
        </div>
      )
    }
};
export default Routes;