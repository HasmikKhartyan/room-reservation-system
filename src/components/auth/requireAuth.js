import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

export default function (ComposedComponent) {
    class Authentication extends Component {
    // static contextTypes = {
    //     router: PropTypes.object,
    // };

    componentDidMount() {
        const {history, authenticated} = this.props;
        if (authenticated === null) {
           history.push('/');
        }
    }

    componentDidUpdate(nextProps) {
        const {history} = this.props;
        if (!nextProps.authenticated) {
            history.push('/');
        }
    }

    render() {
        const {authenticated} = this.props;
        if (authenticated) {
            return <ComposedComponent {...this.props} />;
        }
        return null;
    }
    }

    function mapStateToProps({auth}) {
        // const { details = {} } = state;
        return { authenticated: auth };
    }

    return connect(mapStateToProps)(Authentication);
}
