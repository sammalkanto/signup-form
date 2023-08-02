import errorIcon from '../assets/icon-error.svg';
import React, {useState} from "react";

interface InputValidity {
    [key: string]: boolean
}
interface InputProps {
    name: string;
    type: string;
    placeholder: string;
    valid: InputValidity;
    setValid: React.Dispatch<React.SetStateAction<InputValidity>>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({name, type, placeholder, valid, setValid, value, setValue}: InputProps) => {

    const errorMessage = () => {
        if (name === 'email') {
            return 'Looks like this is not an email';
        }
        return `${placeholder} cannot be empty`;
    }

    const resetValidity = () => {
        setValid({...valid, [name]: true});
    }

    return(
        <div className='input'>
            <input className={valid[name] ? '' : 'invalid'} value={value} name={name} type={type} placeholder={placeholder} onChange={({target}) => setValue(target.value)} onClick={resetValidity} onFocus={resetValidity}/>
            <img className={`icon ${valid[name] ? '' : 'invalid'}`} src={errorIcon}/>
            <div className={`error ${valid[name] ? '' : 'invalid'}`}>{errorMessage()}</div>
        </div>
    )
}

const Form = () => {
    const [valid, setValid] = useState<InputValidity>({firstName: true, lastName: true, email: true, password: true})
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const validity: InputValidity = {firstName: false, lastName: false, email: false, password: false};

        if (firstName !== '') {
            validity.firstName = true;
        }

        if (lastName !== '') {
            validity.lastName = true
        }

        if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            validity.email = true;
        }

        if (password !== '') {
            validity.password = true;
        }

        setValid(validity);

        return;
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input name='firstName' type='text' placeholder='First Name' valid={valid} setValid={setValid} value={firstName}  setValue={setFirstName}/>
            <Input name='lastName' type='text' placeholder='Last Name' valid={valid} setValid={setValid} value={lastName} setValue={setLastName}/>
            <Input name='email' type='text' placeholder='Email Address' valid={valid} setValid={setValid} value={email} setValue={setEmail}/>
            <Input name='password' type='password' placeholder='Password' valid={valid} setValid={setValid} value={password} setValue={setPassword}/>
            <div className='box'>
                <button className='submit' type='submit'>Claim your free trial</button>
                <div className='terms-and-services'>By clicking the button, you are ageeing to our <span className='highlight'>Terms and Services</span></div>
            </div>
        </form>
    )
}

const SignupForm = () => {
    return(
        <div className='main'>
            <div className='content'>
                <h1 className='title'>Learn to code by watching others</h1>
                <p className='description'>See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable.</p>
            </div>
            <div className='signup'>
                <div className='try-it-free'><span className='highlight'>Try it free 7 days</span> then $20/mo. thereafter</div>
                <Form/>
            </div>
        </div>
    );
}

export default SignupForm;