import React, { Component } from 'react';
import { BrowserRouter, Route, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './components/List';
import SignIn from './components/SignIn';
import requireAuth from './components/auth/requireAuth';
import { fetchUser } from './actions';
import ReservationForm from './components/reservationForm';
import ReservationEditForm from './components/reservationEditForm';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
              <div className="container">
                <Route exact path="/" component={SignIn} />
                <Route path="/app" component={requireAuth(List)} />
                <Route path="/reserv" component={requireAuth(ReservationForm)} />
                <Route path="/edit/:id" component={requireAuth(ReservationEditForm)} />

              </div>

            </BrowserRouter>
        );
    }
}

export default connect(null, { fetchUser })(App);
