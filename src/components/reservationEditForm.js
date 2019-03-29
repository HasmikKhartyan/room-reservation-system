import React,{Component} from 'react'
// import '../style/css/test.css'
import { Field, reduxForm } from 'redux-form'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from "react-widgets-moment";
import moment from 'moment'
import 'react-widgets/dist/css/react-widgets.css'
import validation from '../helper/validation';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
    <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={showTime}
        value={!value ? null : new Date(value)}
    />

class ReservationEditForm extends Component{
    componentDidMount() {
        const {match,data} = this.props;
        const id = match.params.id;
        console.log(data[id],55555,data);
        this.handleInitialize(data[id]);
    }
    handleInitialize(data) {console.log(data.startDate);
        const initData = {
            "username": data.username,
            "email": data.email,
             "age": data.age,
             "StartDate":new Date(data.startDate)
        };

        this.props.initialize(initData);
    }
    handleFormSubmit =  (data) => {
        const {startDate} = data;
        data.startDate = startDate.toUTCString();
        // const { addFormValue } = this.state;
        const { editToDo, auth, history ,match} = this.props;
        // event.preventDefault();
        const id = match.params.id;
        editToDo(data, id);
        history.push('/app');
        // this.setState({ addFormValue: '' });
    };
  render() {
      const {handleSubmit, pristine, reset, submitting} = this.props;
      const {required,email} = validation;
      return (
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Field name="username" type="text"
                   component={renderField} label="Username"
                   validate={[required]}
            />
            <Field name="email" type="email"
                   component={renderField} label="Email"
                   validate={email}
            />
            <Field name="age" type="number"
                   component={renderField} label="Age"
                   validate={[required]}
            />
            <Field
                name="startDate"
                showTime={false}
                component={renderDateTimePicker}
                time={false}
                validate={[required]}
            />
            <div className="form-buttons">

              <button type="submit" className="round-button" disabled={submitting}>Edit</button>
              <button type="button" className="round-button" disabled={pristine || submitting} onClick={reset}>Clear </button>
            </div>
          </form>
      )
  }
}

const mapStateToProps = ({ data, auth }) => {
    return {
        data,
        auth
    };
};

export default connect(mapStateToProps, actions)(reduxForm({
    form: 'reservationEdit' // a unique identifier for this form
})(ReservationEditForm))
// export default connect(mapStateToProps, actions)(List);

