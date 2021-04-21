// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBWW20BNhTkMf_B_bVzmnnPHB08b_SAxag",
    authDomain: "whatsapp-clone-8e482.firebaseapp.com",
    projectId: "whatsapp-clone-8e482",
    storageBucket: "whatsapp-clone-8e482.appspot.com",
    messagingSenderId: "938771292441",
    appId: "1:938771292441:web:105961117855b0a8b52588",
    measurementId: "G-7H1M5CGEFX"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
  