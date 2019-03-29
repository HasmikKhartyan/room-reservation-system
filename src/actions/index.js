import { databaseRef, authRef, provider } from '../config/firebase';
import { FETCH_TODOS, FETCH_USER } from './types';


export const addToDo = (newToDo, uid) => async (dispatch) => {
    databaseRef
        .push()
        .set(newToDo);
    // dispatch({
    //     type:  FETCH_TODOS,
    //     payload: null,
    // });
};
export const editToDo = (newToDo, uid) => async (dispatch) => {
    databaseRef
         .child(uid)
        .set(newToDo);
    // dispatch({
    //     type:  FETCH_TODOS,
    //     payload: null,
    // });
};


export const completeToDo = (completeToDoId, uid) => async (dispatch) => {
    databaseRef
        .child(completeToDoId)
        .remove();
};

export const fetchToDos = uid => async (dispatch) => {
    databaseRef.once('value').then(snapshot => {

        dispatch({
            type: FETCH_TODOS,
            payload: snapshot.val(),
        });
    });
};

export const fetchUser = () => (dispatch) => {
    authRef.onAuthStateChanged((user) => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user,
            });
        } else {
            dispatch({
                type: FETCH_USER,
                payload: null,
            });
        }
    });
};

export const signIn = (email,pass) => (dispatch) => {
    authRef
        .signInWithEmailAndPassword(email,pass)
        // .signInWithPopup(provider)
        .then((result) => {})
        .catch((error) => {
            console.log(error);
        });
};

export const signOut = () => (dispatch) => {
    authRef
        .signOut()
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            console.log(error);
        });
};
