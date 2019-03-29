import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeToDo } from '../actions';
import {Link } from 'react-router-dom';

class ListItem extends Component {
  handleCompleteClick = (completeToDoId) => {
      const { completeToDo, auth } = this.props;
      completeToDo(completeToDoId, auth.uid);
  };

  render() {
      const { todoId, todo:{email,age,username,startDate}} = this.props;
      return (
          <ul>
              <li data-label="email">{email}</li>
              <li data-label="age">{age}</li>
              <li data-label="username">{username}</li>
              <li data-label="startDate">{startDate}</li>
              <Link to={`/edit/${todoId}`}>
              <li><i className="material-icons" >
                  border_color
              </i></li>
              </Link>
          </ul>

      );
  }
}

const mapStateToProps = ({ auth }) => ({
    auth,
});

export default connect(mapStateToProps, { completeToDo })(ListItem);
