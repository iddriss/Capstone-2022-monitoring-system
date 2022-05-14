const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.mqttdashboard.com");
const firebase = require("firebase");

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function reportError(err) {
  if (!err) {
    client.publish("inverter/err", "Hello mqtt");
  }
}

client.on("connect", function () {
  client.subscribe("inverter/t", reportError);

  client.subscribe("inverter/v", reportError);

  client.subscribe("inverter/i", reportError);

  client.subscribe("inverter/b", reportError);
});

client.on("message", function (topic, message) {
  // message is Buffer

  if (topic === "inverter/t") {
    console.log("Temperature: " + message.toString());
    db.collection("inverter").doc("temperature").set({
      temp: message.toString(),
    });
  }

  if (topic === "inverter/v") {
    console.log("AC Voltage: " + message.toString());
    db.collection("inverter").doc("ac-voltage").set({
      "ac-voltage": message.toString(),
    });
  }

  if (topic === "inverter/i") {
    console.log("AC Current: " + message.toString());
    db.collection("inverter").doc("current").set({
      current: message.toString(),
    });
  }

  if (topic === "inverter/b") {
    console.log("Battery Voltage: " + message.toString());
    db.collection("inverter").doc("battery-voltage").set({
      "bat-voltage": message.toString(),
    });
  }

  //   client.end();
});
