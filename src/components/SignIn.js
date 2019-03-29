// import '../style/css/SignIn.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import SignInForm from './signInForm';

class Signin extends Component {

  componentDidMount(){
      const {history, auth} = this.props;
      if (auth) {
          history.push('/app');
      }
  }
  componentDidUpdate(nextProps) {
      const {history, auth} = this.props;
      if (auth) {
          history.push('/app');
      }
  }

  onSignIn = (data) => {
   const {onSignIn} =this.props;
      onSignIn(data.email,data.password);
      // 'testing@mailinator.com'/123456
  }

  render() {
      return (
          <div>
              <div className="row social-signin-container">
                  <div className="col s10 offset-s1 center-align">
                      <SignInForm onHandleSubmit = {this.onSignIn.bind(this)}/>

                  </div>
              </div>
          </div>
      );
  }
}

function mapStateToProps({ auth }) {
    return { auth };
}
const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email,pass) => {
            dispatch(signIn(email,pass));
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Signin);
