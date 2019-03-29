// import '../style/css/List.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';

import ListItem from './ListItem';
import Preloader from './Preloader';
import { Redirect, Link } from 'react-router-dom';
// import ReservationForm from './reservationForm';

class List extends Component {
  state = {
      addFormVisible: false,
      addFormValue: '',
  };

  componentDidMount() {
      const { auth, fetchToDos } = this.props;
      fetchToDos(auth.uid);
  }


  handleInputChange = (event) => {
      this.setState({ addFormValue: event.target.value });
  };
    
  renderToDos() {
      const { data } = this.props;
      const toDos = _.map(data, (value, key) => <ListItem key={key} todoId={key} todo={value} />);
      if (!_.isEmpty(toDos)) {
          return (<div className="list">
              <ul>
                  <li data-label="email">email</li>
                  <li data-label="age">age</li>
                  <li data-label="userName">userName</li>
                  <li data-label="startDate">startDate</li>
                  <li></li>

              </ul>
              {toDos}
              </div>);
      }
      return (
          <div className="col s10 offset-s1 center-align">

              <p>Start by clicking add button </p>
          </div>
      );
  }

     onSignOut = async()=>{
        const {signOut, history} = this.props;
        await signOut();
        history.push('/');
      }
  render() {
      const { addFormVisible } = this.state;
      const {data, auth, signOut} = this.props;
      if (data === 'loading') {
          return (
              <div className="row center-align">
                  <div className="col s4 offset-s4">
                      <Preloader />
                  </div>
              </div>
          );
      }

      return (
          <div className="to-do-list-container">
              <div className="fixed-action-btn">
                  <button
                      onClick={this.onSignOut}
                      id="sign-out-button"
                      className="btn-floating btn-large teal darken-4"
                  >
                      <i className="large material-icons">exit_to_app</i>
                  </button>
                  <button
                      // onClick={() => this.setState({ addFormVisible: !addFormVisible })}
                      className="btn-floating btn-large teal darken-4"
                  >

                      {addFormVisible ? (
                          <i className="large material-icons">close</i>
                      ) : (
                          <Link to="/reserv"> <i className="large material-icons">add</i></Link>
                      )}
                  </button>
              </div>
              <div className="row">
                  {/*{this.renderAddForm()}*/}
                  {this.renderToDos()}
              </div>

              {!auth && <Redirect to={'/'}
              />}
          </div>
      );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};


export default connect(mapStateToProps, actions)(List);
