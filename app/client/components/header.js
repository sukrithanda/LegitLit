import React, {Component} from 'react';
import Accounts from './accounts';
import { Link, browserHistory } from 'react-router';


class Header extends Component{

    //Meteor.call('bins.insert', (error, binId) => {
    //  browserHistory.push(`/bins/${binId}`);
  //  });

  render(){
    return(
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand"> LegitLit </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Accounts />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
