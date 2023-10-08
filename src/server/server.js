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
const firebaseConfig = {
    apiKey: "AIzaSyAlJSmfUC9rNzGg5CMDdv9TAgxG-WyaKcc",
    authDomain: "nikahheaven-77.firebaseapp.com",
    databaseURL: "https://nikahheaven-77-default-rtdb.firebaseio.com",
    projectId: "nikahheaven-77",
    storageBucket: "nikahheaven-77.appspot.com",
    messagingSenderId: "602164921281",
    appId: "1:602164921281:web:90263203b9e46391c12540",
    measurementId: "G-15Y4P8MRKC",
};

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

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nikahhevan-default-rtdb.firebaseio.com",
    // "https://nikahhevan-default-rtdb.firebaseio.com",
});

app.post("/schedule-meeting", async (req, res) => {
    try {
        const payload = req.body;

        // Add the meeting data to Firestore
        const meetingRef = collection(db, "Meetings");
        const payloadWithDatesAndUUID = {
            ...payload, // Copy the existing payload data
            createdAt: serverTimestamp(), // Add the createdAt field with the current server timestamp
            updatedAt: null, // Initially set updatedAt as null
            uuid: uuidv4(), // Generate a UUID
        };
        const meetingDoc = await addDoc(meetingRef, payloadWithDatesAndUUID);
        const notification = {
            title: payload?.notification_title,
            body: payload?.notification_description,
        };

        const tokens = await getFCMTokensByCountry(payload.meeting_country);
        if (tokens.length > 0) {
            sendNotifications(tokens, notification).then((success) => {
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
// function sendNotification(tokens, notification) {
//     // const femTokens=tokens?.map((item)=>item?.fcmToken)

//     tokens?.forEach((item) => {
//         try {
//             const message = {
//                 data: {
//                     userId: item?.userId,
//                 },
//                 notification: notification,
//                 // tokens: femTokens,
//                 token: item?.fcmToken,
//             };
//             admin
//                 .messaging()
//                 .sendMulticast(message)
//                 .then((response) => {
//                     console.log("Successfully sent notification to filtered users:", response);
//                     return true;
//                 })
//                 .catch((error) => {
//                     console.error("Error sending notification to filtered users:", error);
//                     return false;
//                 });
//         } catch (error) {
//             console.log("error-->", error);
//         }
//     });
// }

async function storeNotification(userId, notification) {
    const db = admin.firestore();
    const notificationsRef = db.collection("notifications");

    try {
        const createdAt = admin.firestore.FieldValue.serverTimestamp();
        const uuid = uuidv4();

        const notificationData = {
            userId: userId,
            createdAt: createdAt,
            uuid: uuid,
            notification: notification,
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

async function sendNotifications(tokens, notification) {
    try {
        const messages = tokens?.map((item) => ({
            data: {
                userId: item?.userId,
            },
            notification: notification,
            token: item?.fcmToken,
        }));

        const sendPromises = messages.map(async (message) => {
            await storeNotification(message.data.userId, message.notification);
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
    return new Promise(async (resolve, reject) => {
        const tokens = [];

        // Query the Firestore collection for users in the specified country
        const usersRef = query(collection(db, "Users"), where("country", "==", country));

        const unsubscribe = onSnapshot(usersRef, async (snap) => {
            try {
                await snap.forEach(async (doc) => {
                    const userData = doc.data();
                    const fcmToken = userData.fcmToken;
                    if (fcmToken) {
                        tokens.push({ fcmToken, userId: userData?.uid });
                    }
                });

                unsubscribe(); // Unsubscribe to prevent further updates

                resolve(tokens);
            } catch (error) {
                console.error("Error fetching FCM tokens:", error);
                reject(error);
            }
        });
    });
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
