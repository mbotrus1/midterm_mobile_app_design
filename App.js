import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

//import * as firebase from '../node_modules/firebase';

import firebase from "firebase/compat/app";
//require('firebase/auth').default;
//require('firebase').default;
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import 'firebase/compat/analytics';
import fire from "./fire.js" 
import SplashScreen from './SplashScreen';


import {useAuthState, useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
//import { registerStorage } from './@firebase/storage-compat/dist/src';

firebase.initializeApp({
  apiKey: "AIzaSyCSEYajMjPvJwwoRl8BcswfcpXK1uDPfp8",
  authDomain: "mobile-app-project-2-ac754.firebaseapp.com",
  projectId: "mobile-app-project-2-ac754",
  storageBucket: "mobile-app-project-2-ac754.appspot.com",
  messagingSenderId: "257288602925",
  appId: "1:257288602925:web:7c0fb27a0497c47b45bfa4",
  measurementId: "G-WRF7LPM7G8"
  }
)

const auth = firebase.auth();
const firestore = firebase.firestore();
const MyFire = new fire().SignIn;

//const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);
  const [registering, setRegistering] = useState(false);
  const [viewingUserID, setViewingUserID] = useState(null);

  console.log("VIEWING USER" + viewingUserID);

  var displaySection;
  if (user) {
    if (viewingUserID) {
      displaySection = <ViewUserInfo userId={viewingUserID} goBack={() => setViewingUserID(null)}/>
    } else {
      displaySection = <ChatRoom setViewingUserID={setViewingUserID}/>;
    }
  } else {
    if (registering) {
      displaySection = <CreateAccount goToLogin={() => {setRegistering(false)}}/>;
    } else {
      displaySection = <MyFire goToRegister={() => {setRegistering(true)}} />;
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Maryam Fan App</h1>
        <SignOut />
      </header>
      
      <section>
        {displaySection}
      </section>

    </div>
  );
}

function ViewUserInfo(props) {
  const {userId, goBack} = props;

  const messagesRef = firestore.collection('userInfo');
  const query = messagesRef.orderBy('registerTimestamp').limit(50);

  const [messages] = useCollectionData(messagesRef, { idField: 'id' });

  if (!messages) {
    return <p>Waiting for data</p>;
  }
  const userToView = messages.filter(msg => {
    console.log('COMPARING');
    console.log(msg.id);
    console.log(userId);
    return msg.id==userId
  })[0];

  var userTimestamp = new Date((userToView.registerTimestamp || {seconds:0}).seconds*1000);
  return (<div>
    <button onClick={goBack}>I AM BORED OF THIS PERSONS PAGE AND I WANT TO GO BACK TO THE MAIN APPLICATION CHAT ROOM PLEASE</button>
    <p>{`Email: ${userToView.email}`}</p>
    <p>{`Name: ${userToView.firstName} ${userToView.lastName}`}</p>
    <p>{`Age: ${userToView.age}`}</p>
    <p>{`Bio: ${userToView.bio}`}</p>
    <p>{`Home: ${userToView.home}`}</p>
    <p>{`Join Date: ${userTimestamp.getMonth()+1}/${userTimestamp.getDate()}/${userTimestamp.getFullYear()}`}</p>
    <img src = {`${userToView.imgUrl || 'https://i.imgur.com/qFXSBDh.jpeg'}`} style={{width:'30%'}} />
  </div>);
}

function CreateAccount(props)
{

  const {goToLogin} = props;

  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regImgUrl, setImgUrl] = useState('');
  const [regBio, setBio] = useState('');
  const [regAge, setAge] = useState('');
  const [regHome, setHome] = useState('');

  const submitAction = async () => {
    const usersRef = firestore.collection('userInfo');
    await usersRef.add({
      firstName: regFirstName,
      lastName: regLastName,
      email: regEmail,
      role: 'Customer',
      password: regPassword,
      imgUrl: regImgUrl,
      registerTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      bio: regBio,
      age: regAge,
      home: regHome
    });
    auth.createUserWithEmailAndPassword(regEmail, regPassword);
  };

  return (
    <>
      <button onClick = {() => goToLogin()}>BACK TO LOGIN</button>
      <button className="sign-in" onClick={() => submitAction()}>Create a User Account</button> <p> </p>
      <label>
      User Name:
      <input type="text" name="name" value={regFirstName} onChange={evt => setRegFirstName(evt.target.value)}/> <p> </p>
      </label>
      <label>
      Last Name:
      <input type="text" name="name" value={regLastName} onChange={evt => setRegLastName(evt.target.value)}/> <p> </p>
      </label> 
      <label>
      User Picture:
      <input type="text" name="name" value={regImgUrl} onChange={evt => setImgUrl(evt.target.value)}/> <p> </p>
      </label> 
      <label>
      User Bio:
      <input type="text" name="name" value={regBio} onChange={evt => setBio(evt.target.value)}/> <p> </p>
      </label>
      <label>
      User Age:
      <input type="text" name="name" value={regAge} onChange={evt => setAge(evt.target.value)}/> <p> </p>
      </label>
      <label>
      User Hometown:
      <input type="text" name="name" value={regHome} onChange={evt => setHome(evt.target.value)}/> <p> </p>
      </label>
      <label>    
      Email:
      <input type="text" name="name" value={regEmail} onChange={evt => setRegEmail(evt.target.value)}/> <p> </p>
      </label>
      <label>
      Password:
      <input type="text" name="name" value={regPassword} onChange={evt => setRegPassword(evt.target.value)}/> <p> </p>
      </label>
    </>
  )
}

function SignOut() {

  const [showConfirmation, setShowConfirmation] = useState(false);

  return auth.currentUser && (
    showConfirmation?
    <div>
      <p> Are you sure you want to sign out? </p>
      <br></br>
      <button className="sign-out" onClick={() => {setShowConfirmation(false)}}>No Thank You, I Was Just Kidding, Keep My Signed In Please</button>
      <button className="sign-out" onClick={() => {auth.signOut()}}>Yes Please, I Am Sure I Would Like To Sign Out</button>
    </div>:
    <button className="sign-out" onClick={() => {setShowConfirmation(true)}}>Sign Out</button>
  );
}

function ChatRoom (props) {
  const {setViewingUserID} = props;
  const dummy = useRef();
  const messagesRef = firestore.collection('userInfo');
  const query = messagesRef.orderBy('registerTimestamp').limit(50);

  const [messages] = useCollectionData(messagesRef, { idField: 'id' });

  console.log('MESSAGES');
  console.log(messages);

  const [formValue, setFormValue] = useState('');
  const [posting, setPosting] = useState(false);

  
  var listOfRegisteredUsers = messages && messages.map(msg => {
    var userTimestamp = new Date((msg.registerTimestamp || {seconds:0}).seconds*1000);
    return (<div onClick={() => {
      console.log('I HAVE BEEN CLICKED');
      setViewingUserID(msg.id)
    }}>
      <p>{`Email: ${msg.email}`}</p>
      <p>{`Name: ${msg.firstName} ${msg.lastName}`}</p>
      <p>{`Join Date: ${userTimestamp.getMonth()+1}/${userTimestamp.getDate()}/${userTimestamp.getFullYear()}`}</p>
      <a onClick={() => setViewingUserID(msg.idField)}>Click me for more info!</a>
      <img src = {`${msg.imgUrl || 'https://i.imgur.com/qFXSBDh.jpeg'}`} style={{width:'30%'}} />
    </div>

    )
  })


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  const messageSubmitForm = auth.currentUser.uid=='JIJKSFbCz1XAyqP3WHo6LQHuXow1'?(<form onSubmit={sendMessage}>

    <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

    <button type="submit" disabled={!formValue}>POST MESSAGE</button>

    <button onClick={() => {setPosting(false)}}>NEVERMIND</button>

  </form>):(null);

  const messageDialogContainer = posting?messageSubmitForm:<div><button onClick={() => {setPosting(true)}}>+</button></div>;


  return (<>
    <main>

      {listOfRegisteredUsers}

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    {messageDialogContainer}
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <p>{text}</p>
    </div>
  </>)
}


export default App;
