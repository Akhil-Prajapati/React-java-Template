import React, { useState } from "react";

const Incident = () => {
  const [fname, setFname] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      "http://localhost:8080/incident/save-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName: fname, city, mobile }),
      }
    );

    console.log("response", response);
  };
  return (
    <div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          placeholder="name"
          className="block w-50 rounded-md border-4 p-2 "
          value={fname}
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          placeholder="city"
          className="block w-50 rounded-md border-4 p-2"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Mobile</label>
        <input
          type="Number"
          className="block w-50 rounded-md border-4 p-2"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
      </div>
      <button
        className="bg-gray-600 p-2 rounded-md"
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Incident;
