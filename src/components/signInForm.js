import React,{Component} from 'react'
// import '../style/css/test.css'
import { Field, reduxForm } from 'redux-form'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from "react-widgets-moment";
import moment from 'moment'
import validation from '../helper/validation';
import 'react-widgets/dist/css/react-widgets.css'

momentLocalizer(moment)
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        {/*<label>{label}</label>*/}
        <div className={(touched && error)?'error':''}>
            <input {...input} placeholder={label}  type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)
class SignInForm extends Component{
    render() {
        const {handleSubmit, pristine, reset, submitting,onHandleSubmit} = this.props;
        const {required,email} = validation;
        return (
            <form onSubmit={handleSubmit(onHandleSubmit)}>

                <Field name="email" type="email"
                       component={renderField} label="Email"
                       validate={[required,email]}
                />
                <Field name="password" type="password"
                       component={renderField} label="Password"
                        validate={required}
                />
                <div>
                    <button type="button" className="round-button" onClick={handleSubmit(onHandleSubmit)}>
                        Sign In
                    </button>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'signIn' // a unique identifier for this form
})(SignInForm)