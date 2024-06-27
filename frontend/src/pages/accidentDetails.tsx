import React, { useEffect, useState } from "react";

const AccidentDetails = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/accidentDetails/save-accident-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, address, pincode }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(
          "http://localhost:8080/accidentDetails/get-accident-details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("res", await res.json());
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="w-100 p-5 d-flex justify-content-center align-items-center">
      <div className="w-50">
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            className="block w-50 rounded-md border-4 p-2 "
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            placeholder="city"
            className="block w-50 rounded-md border-4 p-2"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Pincode</label>
          <input
            type="Number"
            className="block w-50 rounded-md border-4 p-2"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-gray-600 p-2 rounded-md"
          onClick={() => {
            handleSubmit();
          }}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default AccidentDetails;
