import React, { useState, useEffect } from "react";
import { DisplayDOM } from "./components/Display";
import Header from "./components/Header";
import HeroImg from "./components/HeroImg";

// Value from local storage
const getDatafromLocalStorage = () => {
  const data = localStorage.getItem("registrations");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [registrations, setRegistrations] = useState(getDatafromLocalStorage());
  const [hours, setHours] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
     
  let timeObject = {
    id: time,
    hours: hours,
    comment: comment,
  };

    setRegistrations([...registrations, timeObject]);
    setHours("");
    setComment("");
  }

  // Id
  const date = new Date();
  const time = date.getTime();

  // Save data to local storage
  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  //Delete data from local storage
  const handleDelete = (id) => {
    const filteredHours = registrations.filter((elm) => {
      return elm.id !== id;
    });
    setRegistrations(filteredHours);
  };

  // //Calculate total hours & alert
  const alert = "Bra jobba! Du har registrert over 100 timer";
  let sum = registrations.reduce(function (hour, total) {
    return hour + +total.hours;
  }, 0);

  console.log("Totalt: ", sum);

  // Handle hours input, removing the decimal
  const handleInput = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9\b]+$/;
    if (inputValue === "" || regex.test(inputValue)) {
      setHours(inputValue);
    }
  };

  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <div className="wrapper">
        <div>
        <div className="headline--wrapper">
          <h1>Time registrering</h1>
        </div>
        <p>Her kan du som ansatt registere og holde oversikt over dine timer</p>

      <div className="form--container">
        <form onSubmit={handleSubmit}>
          <div className="form--input-wrapper">
            <label className="form--label">Antall timer</label>
            <input
              required
              type="text"
              name="hours"
              className="form--container__input"
              onChange={handleInput}
              value={hours}
            ></input>
          </div>
          <div className="form--input-wrapper">
            <label className="form--label">Kommentar</label>
            <input
              required
              type="text"
              name="comment"
              id="comment"
              className="form--container__input"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></input>
          </div>

          <button type="submit" className="btn">
            Registrer
          </button>
        </form>
      </div>

      <div className="htmlDOM">
        {registrations.length > 0 && (
          <div>
            <table className="table">
              <thead>
                <tr className="table--headline">
                  <th>Timer</th>
                  <th>Kommentarer</th>
                </tr>
              </thead>
            </table>
            <div>
              <DisplayDOM
                registrations={registrations}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        )}
        <p className="total--hours">Totalt registrerte timer: {sum}</p>
        {sum >= 100 && <h2>{alert}</h2>}
      </div>
      </div>
      <div>
        <HeroImg />
      </div>
      </div>
    </div>
  );
}

export default App;