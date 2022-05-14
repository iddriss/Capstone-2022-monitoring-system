import React, { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase.config";

function App() {
  const [acVoltage, setACVoltage] = useState<any>({});
  const [batVoltage, setBattVoltage] = useState<any>({});
  const [current, setCurrent] = useState<any>({});
  const [temperature, setTemperature] = useState<any>({});

  const fetchBlogs = async () => {
    db.collection("inverter")
      .doc("ac-voltage")
      .onSnapshot((doc) => {
        setACVoltage(doc.data());
      });

    db.collection("inverter")
      .doc("battery-voltage")
      .onSnapshot((doc) => {
        setBattVoltage(doc.data());
      });

    db.collection("inverter")
      .doc("current")
      .onSnapshot((doc) => {
        setCurrent(doc.data());
      });

    db.collection("inverter")
      .doc("temperature")
      .onSnapshot((doc) => {
        setTemperature(doc.data());
      });
  };

  fetchBlogs();

  return (
    // <Connector brokerUrl={brokerUrl}>
    <div className="App">
      <div className="blog-container">
        <p>AC Voltage: {acVoltage["ac-voltage"]} V</p>
        <p>Battery Voltage: {batVoltage["bat-voltage"]} V</p>
        <p>Current: {current["current"]} A</p>
        <p>
          Load: {Number(acVoltage["ac-voltage"]) * Number(current["current"])} W
        </p>
        <p>Temperature: {temperature["temp"]} C</p>
      </div>
    </div>
    // </Connector>
  );
}

export default App;

// ac-voltage: "10"
// bat-voltage: "20"
// current: "10"
// frequency: "10"
// load: "5"
// temperature: "10"
