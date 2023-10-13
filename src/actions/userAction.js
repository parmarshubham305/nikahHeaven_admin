import * as UserActionTypes from "./userActionTypes";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth, messaging } from "src/firebase/firebase";
import { orderBy, setDoc, doc, getDoc, updateDoc, collection, query, where, onSnapshot, getDocs, deleteDoc } from "firebase/firestore";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import configureStore from "src/store/configureStore";
import { conversationCollection, matchesCollection, meetingCollection, notificationCollection, seekerRequestCollection, swipeCardCollection, userCollection } from "../firebase/firebaseCollection";
import { getMessaging, getToken } from "firebase/messaging";
import { VAPID_KEY } from "src/config/config";

// Auth state observer. This is triggered only on sign-in or sign-out.
export const authObserver = () => (dispatch) => {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            getUserInfo(user)
                .then((userInfo) => {
                    // User has signed in
                    dispatch({
                        type: UserActionTypes.SIGNIN_USER_SUCCESS,
                        payload: userInfo,
                    });
                })
                .catch((err) => {
                    // User has signed out
                    dispatch({
                        type: UserActionTypes.SIGNOUT_USER_SUCCESS,
                        payload: null,
                    });
                });
        } else {
            // User has signed out
            dispatch({
                type: UserActionTypes.SIGNOUT_USER_SUCCESS,
                payload: null,
            });
        }
    });
};

export const signUpAction = (newUser) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        dispatch({ type: UserActionTypes.SIGNUP_USER_REQUEST });
        createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                let data = {
                    uid: user.uid,
                    name: newUser.name,
                    email: user.email,
                    DoB: "02 / 16 / 1997",
                    age: 24,
                    gender: "Man",
                    role: "superadmin",
                    profilePic: "",
                    stepCompleted: 9,
                    socialType: "email",
                    status: "Active",
                };
                saveUserInfo(data);
                getFCMTokenAndStore(user.uid);
            })
            .catch((err) => {
                reject(err);
                dispatch({
                    type: UserActionTypes.SIGNUP_USER_ERROR,
                    err,
                });
            });
    });
};

const saveUserInfo = async (data) => {
    const userDocRef = doc(db, userCollection, data.uid);
    await setDoc(userDocRef, data);
};

function storeFCMTokenInFirestore(token, userId) {

    const userDocRef = doc(db, "Users", userId);

    setDoc(userDocRef, { fcmToken: token }, { merge: true })
        .then(() => {
            console.log("FCM token stored in Firestore successfully.");
        })
        .catch((error) => {
            console.error("Error storing FCM token in Firestore:", error);
        });
}

export const getFCMTokenAndStore = async (userId) => {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            // console.log("Notification permission granted");
            // console.log("userIdmesg---", userId);
            try {
                getToken(messaging, { vapidKey: VAPID_KEY })
                    .then((currentToken) => {
                        console.log("currentToken==>", currentToken);
                        if (currentToken) {
                            storeFCMTokenInFirestore(currentToken, userId);
                        } else {
                            console.log("No FCM token available. Request permission.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error retrieving FCM token:", error);
                    });
            } catch (error) {
                console.log("error==>", error);
            }
        } else {
            console.log("Notification permission denied");
            return;
        }
    });
    // const messaging = getMessaging();
};

export const signInAction = (user) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        dispatch({ type: UserActionTypes.SIGNIN_USER_REQUEST });
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                resolve(userCredential)
                return userCredential
            })
            .catch((err) => {
                reject(err);
                dispatch({
                    type: UserActionTypes.SIGNIN_USER_ERROR,
                    err,
                });
            });
    });
};

export const signOutAction = () => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        dispatch({ type: UserActionTypes.SIGNOUT_USER_REQUEST });
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((err) => {
                reject(err);
                dispatch({
                    type: UserActionTypes.SIGNOUT_USER_ERROR,
                    err,
                });
            });
    });
};

const getUserInfo = (data) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, userCollection, data.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            resolve(docSnap.data());
        } else {
            reject(null);
        }
    });
};

export const updateUserInfoAction = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, userCollection, data.uid);
        await updateDoc(docRef, data);
        resolve();
    });
};

export const getUpdateUserInfoAction = (user) => (dispatch) => {
    getUserInfo(user)
        .then((userInfo) => {
            dispatch({
                type: UserActionTypes.GET_USER_SUCCESS,
                payload: userInfo,
            });
        })
        .catch((err) => {});
};

export const getAllUsersAction = () => (dispatch) => {
    const q = query(collection(db, userCollection), where("email", "!=", ""));
    // const q = query(collection(db, userCollection));
    return onSnapshot(q, (querySnapshot) => {
        const users = [];
        const paidUsers = [];
        querySnapshot.forEach((doc) => {
            var user = doc.data();
            user["status"] = user["status"] === undefined ? "Active" : user.status;
            user["role"] = user["role"] === undefined ? "normal" : user.role;
            if (user.status !== "Delete") {
                users.push(user);
                if (user.packageEndDate) {
                    paidUsers.push(user);
                }
            }
        });
        dispatch({
            type: UserActionTypes.GET_ALL_USER_SUCCESS,
            payload: { users, paidUsers },
        });
    });
};

const getAllUsersInfo = () => {
    return new Promise(async (resolve, reject) => {
        const q = query(collection(db, userCollection), where("email", "!=", ""));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
            var user = doc.data();
            user["status"] = user["status"] === undefined ? "Active" : user.status;
            user["role"] = user["role"] === undefined ? "normal" : user.role;
            if (user.status !== "Delete") {
                users.push(user);
            }
        });
        resolve(users);
    });
};

export const getAllMeetingsInfo = () => (dispatch) => {
    const q = query(collection(db, meetingCollection), orderBy("createdAt", "desc"));
    return onSnapshot(q, (querySnapshot) => {
        let allUsers = configureStore.getState().auth.allUsers;
        if (allUsers.length > 0) {
            saveAllMeetings(querySnapshot, allUsers, dispatch);
        } else {
            getAllUsersInfo().then((allUsers) => {
                saveAllMeetings(querySnapshot, allUsers, dispatch);
            });
        }
    });
};
const saveAllMeetings = (querySnapshot, allUsers, dispatch) => {
    const meetings = [];
    querySnapshot.forEach((doc) => {
        var meet = doc.data();
        // let userInfo = allUsers.find((o) => o.uid === swipe.request_by);
        // let otherInfo = allUsers.find((o) => o.uid === swipe.request_to);
        // swipe.userInfo = userInfo;
        // swipe.otherInfo = otherInfo;
        // swipe.id = doc.id;
        if (meet.status !== "Delete") {
            meetings.push(meet);
        }
    });
    dispatch({
        type: UserActionTypes.GET_ALL_MEETINGS,
        payload: { meetings, allUsers },
    });
};

export const getAllSwipUsersAction = () => (dispatch) => {
    const q = query(collection(db, swipeCardCollection));
    return onSnapshot(q, (querySnapshot) => {
        let allUsers = configureStore.getState().auth.allUsers;
        if (allUsers.length > 0) {
            saveSwipes(querySnapshot, allUsers, dispatch);
        } else {
            getAllUsersInfo().then((allUsers) => {
                saveSwipes(querySnapshot, allUsers, dispatch);
            });
        }
    });
};

const saveSwipes = (querySnapshot, allUsers, dispatch) => {
    const swipes = [];
    querySnapshot.forEach((doc) => {
        var swipe = doc.data();
        let userInfo = allUsers.find((o) => o.uid === swipe.uid);
        let otherInfo = allUsers.find((o) => o.uid === swipe.other_uid);
        swipe.userInfo = userInfo;
        swipe.otherInfo = otherInfo;
        swipes.push(swipe);
    });
    dispatch({
        type: UserActionTypes.GET_ALL_SWIPE_USER_SUCCESS,
        payload: { swipes, allUsers },
    });
};

export const getAllMatchUsersAction = () => (dispatch) => {
    const q = query(collection(db, matchesCollection));
    return onSnapshot(q, (querySnapshot) => {
        let allUsers = configureStore.getState().auth.allUsers;
        if (allUsers.length > 0) {
            saveMatches(querySnapshot, allUsers, dispatch);
        } else {
            getAllUsersInfo().then((allUsers) => {
                saveMatches(querySnapshot, allUsers, dispatch);
            });
        }
    });
};

const saveMatches = (querySnapshot, allUsers, dispatch) => {
    const matches = [];
    querySnapshot.forEach((doc) => {
        var swipe = doc.data();
        let userInfo = allUsers.find((o) => o.uid === swipe.uid);
        let otherInfo = allUsers.find((o) => o.uid === swipe.other_uid);
        swipe.userInfo = userInfo;
        swipe.otherInfo = otherInfo;
        matches.push(swipe);
    });
    dispatch({
        type: UserActionTypes.GET_ALL_MATCH_USER_SUCCESS,
        payload: { matches, allUsers },
    });
};

export const getAllSeekerRequestsAction = () => (dispatch) => {
    const q = query(collection(db, seekerRequestCollection));
    return onSnapshot(q, (querySnapshot) => {
        let allUsers = configureStore.getState().auth.allUsers;
        if (allUsers.length > 0) {
            saveSeekerRequests(querySnapshot, allUsers, dispatch);
        } else {
            getAllUsersInfo().then((allUsers) => {
                saveSeekerRequests(querySnapshot, allUsers, dispatch);
            });
        }
    });
};

const saveSeekerRequests = (querySnapshot, allUsers, dispatch) => {
    const seekers = [];
    querySnapshot.forEach((doc) => {
        var swipe = doc.data();
        let userInfo = allUsers.find((o) => o.uid === swipe.request_by);
        let otherInfo = allUsers.find((o) => o.uid === swipe.request_to);
        swipe.userInfo = userInfo;
        swipe.otherInfo = otherInfo;
        swipe.id = doc.id;
        if (swipe.status !== "Delete") {
            seekers.push(swipe);
        }
    });
    dispatch({
        type: UserActionTypes.GET_ALL_SEEKER_REQUEST_SUCCESS,
        payload: { seekers, allUsers },
    });
};

const checkSwipeCardExitForOther = (uid, other_uid) => {
    return new Promise(async (resolve, reject) => {
        const q = query(collection(db, swipeCardCollection), where("uid", "==", other_uid), where("other_uid", "==", uid), where("action", "in", ["like", "superLike"]));
        const q1 = query(collection(db, swipeCardCollection), where("uid", "==", uid), where("other_uid", "==", other_uid));

        let swipedcards = [];

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            swipedcards.push(data);
        });

        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            swipedcards.push(data);
        });

        if (swipedcards.length > 0) resolve(swipedcards);
        else reject(false);
    });
};

const checkMatchesExit = (uid, other_uid) => {
    return new Promise((resolve, reject) => {
        const q = query(
            collection(db, matchesCollection),
            where("members", "in", [
                [uid, other_uid],
                [other_uid, uid],
            ])
        );

        return onSnapshot(q, (querySnapshot) => {
            let matches = [];
            querySnapshot.forEach((doc) => {
                let matche = doc.data();
                matche.id = doc.id;
                matches.push(matche);
            });
            resolve(matches);
        });
    });
};

const checkConversationExit = (uid, other_uid) => {
    return new Promise((resolve, reject) => {
        const q = query(
            collection(db, conversationCollection),
            where("members", "in", [
                [uid, other_uid],
                [other_uid, uid],
            ])
        );

        return onSnapshot(q, (querySnapshot) => {
            let conversations = [];
            querySnapshot.forEach((doc) => {
                let conversation = doc.data();
                conversation.id = doc.id;
                conversations.push(conversation);
            });
            resolve(conversations);
        });
    });
};

export const deleteSwipeCard = (uid, other_uid) => {
    return new Promise((resolve, reject) => {
        checkSwipeCardExitForOther(uid, other_uid)
            .then((response) => {
                if (response.length > 1) {
                    checkMatchesExit(uid, other_uid).then((matches) => {
                        if (matches.length > 0) {
                            checkConversationExit(uid, other_uid).then((conversations) => {
                                if (conversations.length > 0) {
                                    deleteSwipe(response[1]).then((xy) => {
                                        deleteMatch(matches[0]).then((yz) => {
                                            deleteConversation(conversations[0]).then((response) => {
                                                resolve(response);
                                            });
                                        });
                                    });
                                } else {
                                    deleteSwipe(response[1]).then((xy) => {
                                        deleteMatch(matches[0]).then((response) => {
                                            resolve(response);
                                        });
                                    });
                                }
                            });
                        } else {
                            deleteSwipe(response[1]).then((response) => {
                                resolve(response);
                            });
                        }
                    });
                } else if (response > 0) {
                    deleteSwipe(response[0]).then((response) => {
                        resolve(response);
                    });
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const deleteSwipe = (swipe) => {
    return new Promise(async (resolve, reject) => {
        let res = await deleteDoc(doc(db, swipeCardCollection, swipe.id));
        resolve(true);
    });
};

const deleteMatch = async (match) => {
    return new Promise(async (resolve, reject) => {
        let res = await deleteDoc(doc(db, matchesCollection, match.id));
        resolve(true);
    });
};

const deleteConversation = async (conversation) => {
    return new Promise(async (resolve, reject) => {
        let res = await deleteDoc(doc(db, conversationCollection, conversation.id));
        resolve(true);
    });
};

// For User Delete
export const deleteUserRecord = (uid) => {
    return new Promise((resolve, reject) => {
        getUserRecord(uid).then(async (response) => {
            if (response.length > 0) {
                let res = await deleteDoc(doc(db, userCollection, response[0].id));
                resolve(true);
            } else {
                reject("Not found");
            }
        });
    });
};

const getUserRecord = (uid) => {
    return new Promise((resolve, reject) => {
        const q = query(collection(db, userCollection), where("uid", "==", uid));

        onSnapshot(q, (querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                let user = doc.data();
                user.id = doc.id;
                users.push(user);
            });
            resolve(users);
        });
    });
};

// For Match Delete
export const deleteMatchRecord = (uid, other_uid) => {
    return new Promise((resolve, reject) => {
        checkMatchesExit(uid, other_uid).then((matches) => {
            if (matches.length > 0) {
                checkConversationExit(uid, other_uid).then((conversations) => {
                    if (conversations.length > 0) {
                        deleteMatch(matches[0]).then((yz) => {
                            deleteConversation(conversations[0]).then((response) => {
                                resolve(response);
                            });
                        });
                    } else {
                        deleteMatch(matches[0]).then((yz) => {
                            resolve(yz);
                        });
                    }
                });
            }
        });
    });
};

// For Seeker Request
export const updateSeekerRequestStatusAction = (id, data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, seekerRequestCollection, id);
        await updateDoc(docRef, data);
        resolve();
    });
};

export const updateSeekerRequestNotificationStatusAction = (relationship_id, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const q = query(collection(db, notificationCollection), where("relationship_id", "==", relationship_id));

        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                const docRef = doc(db, notificationCollection, doc.id);
                await updateDoc(docRef, data);
            });
            resolve();
        });
    });
};
