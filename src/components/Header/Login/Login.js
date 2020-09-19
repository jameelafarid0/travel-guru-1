import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../../firebase.config';
import { InfoOutlined } from '@material-ui/icons';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const {displayName, photoUrl, email} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoUrl,
            };
            setUser(signedInUser);
            console.log(res)
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                photo: '',
                email: '',
                password: '',
                error: '',
                success: false,
            };
            setUser(signedOutUser)
        })
        .catch(err => {

        })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        };
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordNeedNum = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordNeedNum 
        };
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        console.log(user.email, user.password)
        if(user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
            })
            .catch(error => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
              });
        };

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
            })
            .catch(function(error) {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
              });
        }

        e.preventDefault();
    }
 
    return (
        <div>
            <h1>this is login</h1>
            {user.isSignedIn ? <button onClick={handleSignOut} >Sign out</button> :
                <button onClick={handleSignIn} >Sign in</button>}
            {
                user.isSignedIn && <p>Welcome, {user.name}</p>
            }

            <div>
                <p>Email: {user.email}</p>
                <p>Name: {user.name}</p>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
                <label htmlFor="newUser">New user sign up</label>
                <form onSubmit={handleSubmit}>
                    {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Username" required/>}
                    <br/>
                    <input type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
                    <br/>
                    <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
                    <br/>
                    <input type="submit" value="Create an account"/>
                </form>
            </div>
            <p style={{color: 'red'}}>{user.error}</p>
            {user.success && <p style={{color: 'green'}}>user {newUser ? 'created' : 'logged in'} successfully</p>}
        </div>
    );
};

export default Login;