import React, { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/user-sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-100 p-5 d-flex justify-content-center align-items-center ">
      <div className="w-50">
        <div>
          <label>UserName</label>
          <input
            type="text"
            placeholder="name"
            className="block w-50 rounded-md border-4 p-2 "
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            placeholder="city"
            className="block w-50 rounded-md border-4 p-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-gray-600 p-2 rounded-md"
          onClick={() => {
            handleSubmit();
          }}
        >
          LOG IN
        </button>
      </div>
    </div>
  );
};

export default SignIn;
