import { initializeApp } from "firebase/app";
// import * as firebase from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiMsOQCVauGedSswRPPt0IYQ2H6aI-LrM",
  authDomain: "devter-d6606.firebaseapp.com",
  projectId: "devter-d6606",
  storageBucket: "devter-d6606.appspot.com",
  messagingSenderId: "827006320997",
  appId: "1:827006320997:web:61dfd673aabb9f0d21618c",
  measurementId: "G-5RSJYYS9QB",
};

initializeApp(firebaseConfig);

// !firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  // const { user: userFirebase } = user;
  const { reloadUserInfo } = user;
  const { screenName, photoUrl, email } = reloadUserInfo;

  return {
    avatar: photoUrl,
    username: screenName,
    email,
  };
};

export const onAuthStateChanged = (onChange) => {
  return getAuth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser); // retorna el usuario
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider();
  githubProvider.setCustomParameters(firebaseConfig);
  const auth = getAuth();
  return signInWithPopup(auth, githubProvider).then((user) => {
    return mapUserFromFirebaseAuthToUser(user);
  });
};
