/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, onSnapshot, serverTimestamp } = require("firebase/firestore");

const app = express();
const port = 5000; // Set the desired port number

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//firebase

// Epicbae
// const firebaseConfig = {
//     apiKey: "AIzaSyAlJSmfUC9rNzGg5CMDdv9TAgxG-WyaKcc",
//     authDomain: "nikahheaven-77.firebaseapp.com",
//     databaseURL: "https://nikahheaven-77-default-rtdb.firebaseio.com",
//     projectId: "nikahheaven-77",
//     storageBucket: "nikahheaven-77.appspot.com",
//     messagingSenderId: "602164921281",
//     appId: "1:602164921281:web:90263203b9e46391c12540",
//     measurementId: "G-15Y4P8MRKC",
// };

//jeel
// const firebaseConfig = {
//     apiKey: "AIzaSyBq2vzV2AZnVqwbZa9_iRHQNrKkS4R2WVQ",
//     authDomain: "nikahhevan.firebaseapp.com",
//     projectId: "nikahhevan",
//     databaseURL: "https://nikahhevan-default-rtdb.firebaseio.com",
//     storageBucket: "nikahhevan.appspot.com",
//     messagingSenderId: "1084152193627",
//     appId: "1:1084152193627:web:010ad836bb0cadb66cd57e",
//     measurementId: "G-BKW7M361RH",
// };

// jeel-serviceAccount
// {
//     "type": "service_account",
//     "project_id": "nikahhevan",
//     "private_key_id": "2cf9a07fd1144b4373e2f7294caaa425810823e0",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCoDpP5M+E1QM0L\nwwkv1uSqfrrTxfeHm29Dl8HGpNfy+P1YmwgwDbvvYFu/jPyewAqGtXkHjr0+mXwB\n2K7El0zm8dX7sljOu+SaSO0xSDqXawm8yAL1iY3dOcRS2LZh/7JxP6q4vO2kzyKl\nr9HyV6eTa2TgVFriWEs9QTDvduOT49UHDxQqy8KfObwtui6pMq/YI6rpNkexG4vv\n4QlBcQAqQ0cNBdYeNvFkiOqnDn28AxotZ9mGepdDRp5+1tlmSRM+tk2yyMrvCVk4\ncgN0xZS+0I9t4XQcKZvQkYUvgTvwkEH3HRPEaxojgGoavbnnLg7eZvPF4eiSiPtX\nX7VA/57dAgMBAAECggEABdNAvBvys9CyQTTEBU4jh0Jhy1q0SAiYyUT1HbBtXznT\n6qwv0wSWDbsI3k47gmz7LTl6/4qD0xJPl7vKrdWyjKdeaLCBPtc8WkAdX3HJ8CFk\nCSpj3RFxyXS8/wP0HHHLXfzcOALHRPw8dSkWDXQOD7Oin6dk4a24TyAxNOSDPAcu\nHNW1ibB/vHSuqg50mrKJmXZxsaAuT5t78OzqKMNL4qYjpdPVT3oODk222uyYef07\nVsvRR2LGuiYfs/4OlaQZKPigBmgyeyz3WXOwu0geP6x3ZOuDVO8FSbNPEoAhhBXx\n1YoPCdgR2a6chSSpEJ6AQTNq541zJ5mLrAFXba0n4QKBgQDtFo29890Uvf7LGZme\n/tjelggSk8Z4sNdiIHjZqYB7RvpZTMZ2em4/TF/TeCHGSHWIxOjpHyKJ6oy+trKG\n2QjAs+WJT3IlxScDLF2umh5GaZJjUttQ+cfwtgo8EvfIn6rTe/x/cTdLRVPU6WzP\nB9LeE74l+9XXI+vei0+qCyGpvQKBgQC1dmB9Xry1RC255NgtT9pzoHvOazB+SSPX\n0DktdeN5m5S3JLuXXZRyhHZV1LPFxVKJN8WpozHhpChEtUxkqW0yY3y3FitMifeC\nJdBpumOyoYu+JvI1DBt943635MgPoZPvYao8pjM9V00lMokOBhwUYDN3hSmtbwIT\n5O1NYFfLoQKBgB3zRm6jmt8e7UwM7NooCY981oI6Rs1CUcMkpP+iKQfpvICBcWTQ\nLJM0e7qEJ4gb6TUg4udoNn3Dson5HG5qhm+JikqhTaM116rP9Pm0oHR2q7Z+ZhRB\nqZ9f78UNBF5ExVi4Bfq3e6u3k1KHNmak7198kP3NZYMrF4XihWrOwy7lAoGAKAg3\nfTD7PJoP5GTB9C0bqkqLRZyMFDAagi/jjU3moxtZkZW+9MOmTiU+3eyQxF6luLPf\nHW9tP7QxVgcRFVvzRRyBlPqFDtuZCNNCyTBfcjcFVyvMXzuOjRU1DWihYiFpO3Q2\nVC7uOugZks01QyzB4RTgBcwQx7wnny/v0hQhCkECgYAbMKwU41Cc4gn5aKqVi9Ql\nKNpOy5aNv3ptwVuEQC7YPU71G1cEpFpr1WRjX4H+1mu+wQOkp0x/UTAp8cVDmm2R\nboss2crP+H3Qmlki798aVPvZu0MVmqexGi35iTCim9lcTJyr02H+hE/mTq/1rhmy\nTzr7ebN8WSm0azAjrnrWMg==\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-pwm9k@nikahhevan.iam.gserviceaccount.com",
//     "client_id": "104625731771390358951",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pwm9k%40nikahhevan.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com",
//     "server_key":"AAAA_GyBols:APA91bGaKSJShNEIZTF4IS07NYV3QD0UTB43Zd46dnXOBGVp2lbC9uq_M3UJs23iNAKnd6kUB4SLzAe3y9-t0MCHCCp77pZPHqABNoX85VnLLJBzWRxG9wN9j08JWpQCKOWOwzI44K-g"
//   }

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nikahhevan-default-rtdb.firebaseio.com",
    // "https://nikahhevan-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

const dbCollections = {
    Users: "Users",
    Meetings: "Meetings",
    Notifications: "Notifications",
};

app.post("/schedule-meeting", async (req, res) => {
    try {
        const payload = req.body;

        const meetingRef = db.collection(dbCollections.Meetings);
        const payloadWithDatesAndUUID = {
            ...payload, // Copy the existing payload data
            createdAt: admin.firestore.FieldValue.serverTimestamp(), // Add the createdAt field with the current server timestamp
            updatedAt: null, // Initially set updatedAt as null
            uuid: uuidv4(), // Generate a UUID
        };
        const meetingDoc = await meetingRef.add(payloadWithDatesAndUUID);
        const notification = {
            title: payload?.notification_title,
            body: payload?.notification_description,
        };
        const tokens = await getFCMTokensByCountry(payload.meeting_country);
        if (tokens.length > 0) {
            sendNotifications(tokens, notification, payload?.host_user_id).then((success) => {
                if (success) {
                    console.log("All notifications sent successfully.");
                } else {
                    console.log("Some notifications failed to send.");
                }
            });
            // const sendRes = await sendNotification(tokens, notification);
            if (meetingDoc.id) {
                res.status(201).json({ message: "Meeting scheduled successfully", id: meetingDoc.id });
            } else {
                // console.error("Error sending notifications:", error);
                res.status(500).json({ error: "Unable to send notifications" });
            }
        } else {
            res.status(400).json({ error: "No users found in the specified country" });
        }
    } catch (error) {
        console.error("Error scheduling meeting:", error);
        res.status(500).json({ error: "Unable to schedule meeting" });
    }
});

async function storeNotification(userId, notification, host_user_id) {
    const notificationsRef = db.collection(dbCollections.Notifications);

    try {
        const createdAt = admin.firestore.FieldValue.serverTimestamp();
        const uuid = uuidv4();

        const notificationData = {
            userId: userId,
            createdAt: createdAt,
            uuid: uuid,
            notification: notification,
            host_user_id,
            notificationType: "scheduleMeeting",
        };

        await notificationsRef.add(notificationData);
        console.log("Notification stored successfully.");
        return true;
    } catch (error) {
        console.error("Error storing notification:", error);
        return false;
    }
}

async function sendNotifications(tokens, notification, host_user_id) {
    try {
        const messages = tokens?.map((item) => ({
            data: {
                userId: item?.userId,
                host_user_id,
            },
            notification: notification,
            token: item?.fcmToken,
        }));

        const sendPromises = messages.map(async (message) => {
            await storeNotification(message?.data?.userId, message.notification, message?.data?.host_user_id);
            return admin.messaging().send(message);
            // if (response.successCount > 0) {
            // }
        });

        const results = await Promise.all(sendPromises);

        results.forEach((response, index) => {
            if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, respIndex) => {
                    if (!resp.success) {
                        failedTokens.push(tokens[index].fcmToken);
                    }
                });
                console.error(`Failed to send notifications to tokens: ${failedTokens.join(", ")}`);
            } else {
                console.log(`Successfully sent notification to user with userId: ${tokens[index].userId}`);
            }
        });

        return true;
    } catch (error) {
        console.error("Error sending notifications:", error);
        return false;
    }
}

async function getFCMTokensByCountry(country) {
    try {
        const tokens = [];

        // Query the Firestore collection for users in the specified country
        const db = admin.firestore();
        const usersRef = db.collection(dbCollections.Users).where("country", "==", country);
        const userSnapshot = await usersRef.get();

        userSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            const fcmToken = userData.fcmToken;
            if (fcmToken) {
                tokens.push({ fcmToken, userId: userData.uid });
            }
        });

        return tokens;
    } catch (error) {
        console.error("Error fetching FCM tokens:", error);
        throw error;
    }
}

// Sample user data (replace this with your actual data or database implementation)
const User = (props) => {
    const user = props.location.state;

    let users = [
        { id: user.uid, isApproved: false },
        { id: user.uid, isApproved: true },
    ];

    // Middleware

    // API endpoint to update multiple users' approval status
    app.put("/api/users/approve", (req, res) => {
        const { userUpdates } = req.body;

        // Update the approval status for each user
        userUpdates.forEach((update) => {
            const user = users.find((u) => u.id === update.id);

            if (user) {
                user.isApproved = update.isApproved;
            }
        });

        res.json({ message: "Users approval status updated successfully" });
    });

    // API endpoint to fetch all users
    app.get("/api/users", (req, res) => {
        res.json(users);
    });
};
