import React, { useState } from "react";
import Navbar from "../../../components/basic/navbar/index";

function BasicReact() {
  const data = [
    { id: 1, name: "spiderman" },
    { id: 2, name: "batman" },
    { id: 3, name: "lego" }
  ];
  const [email, setEamil] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showDate, setShowDate] = useState(false);
  const handleClick = (age, name) => {
    alert("Button clicked !");
    console.log(name, age);
  };

  const handleSubmit = (event, data) => {
    event.preventDefault();
    console.log("Submit", data);
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log("Reset");
  };
  const handleChangeEmail = (event) => {
    // console.log(event.target.value);

    setEamil(event.target.value);
  };
  const handleSearch = (event) => {
    // console.log(event.key);
    if (event.key === "Enter") {
      console.log("User Press Enter !");
      console.log("keyword : ", event.target.value);
    }
  };
  return (
    <>
      <Navbar />
      <h1>basic React Page</h1>
      <hr />
      <h3>mapping</h3>
      {data.map((item, index) => (
        <div key={item.id}>
          <button>{item.name}</button>
        </div>
      ))}
      <h3>Event</h3>
      <h5>button</h5>
      {/* Onclick */}
      <button onClick={handleClick}>clickme</button>
      {/* OnSubmit */}
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <button onClick={handleClick}>click me!</button>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
      <h5>input</h5>
      {/* onChange */}
      <input
        type="email"
        placeholder="input your email"
        onChange={(event) => setEamil(event.target.value)}
      />
      <h6>your email is {email}</h6>
      {/* onKeypress */}
      <input type="text" placeholder="search..." onKeyPress={handleSearch} />
      <h3>conditional rendering</h3>
      <h5>short logic</h5>
      <button onClick={() => setShowDate(!showDate)}>Show Date</button>
      {showDate && <h1>{new Date().toLocaleDateString()}</h1>}
      <h5>ternary operator</h5>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
          </div>
        ))
      ) : (
        <h6>data not found</h6>
      )}
      <h3>style</h3>
    </>
  );
}

export default BasicReact;
