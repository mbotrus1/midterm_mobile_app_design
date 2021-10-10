import fb from "firebase/compat/app";
//require('firebase/auth').default;
//require('firebase').default;
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import 'firebase/compat/analytics';

import { FacebookAuthProvider } from "firebase/auth";
import { signInAnonymously } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";

//const phoneNumber = getPhoneNumberFromUserInput();
//const appVerifier = window.recaptchaVerifier;

fb.initializeApp({
    apiKey: "AIzaSyCSEYajMjPvJwwoRl8BcswfcpXK1uDPfp8",
    authDomain: "mobile-app-project-2-ac754.firebaseapp.com",
    projectId: "mobile-app-project-2-ac754",
    storageBucket: "mobile-app-project-2-ac754.appspot.com",
    messagingSenderId: "257288602925",
    appId: "1:257288602925:web:7c0fb27a0497c47b45bfa4",
    measurementId: "G-WRF7LPM7G8"
    }
  )
  

//const auth = getAuth();



/*
Setup for Google Authentication 
*/
const auth = fb.auth();
auth.languageCode = 'it';

/*
Setup for Email w/ password Authentication 
*/
//import { EmailAuthProvider } from "firebase/auth";

/*
Setup for Email No Password Authentication
*/

/*
Setup for Facebook Authentication
*/


/*
Setup for Phone Authentication 
*/

// Turn off phone auth app verification.
fb.auth().settings.appVerificationDisabledForTesting = true;

/*
Setup for Anon Authentication 
*/
//import { getAuth, signInAnonymously } from "firebase/auth";

let elem = null;

export default class fire 
{
    rend()
    {
        return <h1> Hello, {this.props.name} </h1>;
    }


    SignIn(props) 
    {

        const {goToRegister} = props;

        // something here is broken???
        const signInWithPhone = () => {
            
            var phoneNumber = "+14047042684";
            var testVerificationCode = "123456";
            
            window.recaptchaVerifier = new fb.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible'
            });
            fb.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
            .then(function(confirmationResult) {
                var verificationCode = window.prompt('Please enter the verification ' +
                    'code that was sent to your mobile device.');
                return confirmationResult.confirm(verificationCode);
              })
              .catch(function(error) {
                // Handle Errors here.
              });
            //signInAnonymously(auth);

        }

        const signInEmailAndPass = () => {

          if ((prompt("Give me your email or else") || '').indexOf('@')<0) {
            return;
          }
          prompt("Give me your password or else");
          signInAnonymously(auth);
        }

        const signInWithEmail = () => {
            
            
          if ((prompt("Give me your email or else") || '').indexOf('@')<0) {
            return;
          }
            signInAnonymously(auth);

        }

        const signInWithGoogle = () => {
          const provider = new fb.auth.GoogleAuthProvider();
          auth.signInWithPopup(provider);
        }

        const signInWithFacebook = () => {
            const provider = new fb.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider);
          }
      
        const signInWithAnon = () => {
            signInAnonymously(auth);
        }
        elem = (
            <div id="recaptcha-container">
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <button className="sign-in" onClick={signInWithFacebook}>Sign in with Facebook</button>
            <button className="sign-in" onClick={signInWithAnon}>Sign in Anonymously</button>
            <button className="sign-in" onClick={signInWithPhone}>Sign in Phone</button>
            <button className="sign-in" onClick={signInWithEmail}>Sign in Email</button>
            <button className="sign-in" onClick={signInEmailAndPass}>Sign in Email and Password</button>
            <p>Welcome to Maryam's Second React App Please behave!</p>
            <button className="create-account" onClick={() => goToRegister()}>Register a User Account</button> <p> </p>
          </div>
        );
        return elem;
      
    }

    Facebook(props)
    {
        const {goToRegister} = props;
        const signInWithFacebook = () => {
          const provider = new new fb.auth.FacebookAuthProvider();
          auth.signInWithPopup(provider);
        }

        return (
            <>
              <button className="sign-in" onClick={signInWithFacebook}>Sign in with Facebook</button>
              <p>Welcome to Maryam's First React App Please behave!</p>
              <button className="create-account" onClick={() => goToRegister()}>Create a User Account</button> <p> </p>
            </>
          )
    }

    Email(props)
    {
        return null;
    }

    EmailPass(props)
    {
        return null;
    }
    Phone(props)
    {
        return null; 
    }
    Anon(props)
    {
        return null; 
    }

}
