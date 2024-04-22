import "./signupinputfield.css";
import Input from './Input'

function SignupInputField(props) {
    return (
        <div className="full-input-field">
            <div className='input-name'>{props.fieldHeading}</div>
            <Input
                className='input-field'
                name={props.fieldName}
                type={props.fieldType}
                placeholder={props.fieldPlaceholder}
                onChange={props.fieldOnchange}
                value={props.value}
            />
        </div>
    );
}

export default SignupInputField;
