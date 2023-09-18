import './signin.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Signin() {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [backendMessage, setbackendMessage] = useState('');
    const [userDetails, setUserDetails] = useState([
        {
            username: '',
            password: ''
        }
    ]);
    const [errorClass, seterrorClass] = useState([
        {
            username: 'userName-input',
            password: 'password-input'
        }
    ]);
    const handleUsernameError = () => {
        const error = [...errorClass];
        if (userDetails[0].username.length < 4) {
            error[0].username = 'userName-input error'
            seterrorClass(error);
        }
        else {
            error[0].username = 'userName-input success';
            seterrorClass(error);
        }
    }
    const handlePasswordError = () => {
        const error = [...errorClass];
        if (userDetails[0].password.length < 8) {
            error[0].password = 'password-input error'
            seterrorClass(error);
        }
        else {
            error[0].password = 'password-input success';
            seterrorClass(error);
        }
    }
    const handleUsername = (e) => {
        const inputData = [...userDetails];
        inputData[0].username = e.target.value;
        setUserDetails(inputData);
        handleUsernameError();
    }
    const handlePassword = (e) => {
        const inputData = [...userDetails];
        inputData[0].password = e.target.value;
        setUserDetails(inputData);
        handlePasswordError();
    }
    const submit = async () => {
        setisLoading(true)
        try {
            await axios.post(
                `${url}/signin`,
                userDetails[0],
                { headers: { "Content-type": "application/json; charset=UTF-8", } }
            ).then((user) => {
                console.log(user)
                localStorage.setItem('token', user.data.token)
                navigate("/");
            })
        } catch (error) {
            console.log(error)
            let error_message = error.response.data
            if (typeof (error_message) === 'object') {
                setbackendMessage(error_message.error[0].msg);
            }
            else {
                setbackendMessage(error_message)
            }
            setisLoading(false);
        }
    }
    const url = 'https://instagram-api-t4i9.onrender.com/instagram-clone';
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input name='username' min='4' className={errorClass[0].username} placeholder='username' value={userDetails[0].username} onChange={handleUsername} />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input name='password' min='8' className={errorClass[0].password} type='password' placeholder='password' value={userDetails[0].password} onChange={handlePassword} />
                </div>
                <button type='submit' onClick={submit} >{isLoading ? <span className="loader"></span> : 'Sign up'}</button>
            </form>
            <div className='backend-message'>{backendMessage}</div>
        </>
    )
}

export default Signin