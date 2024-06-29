import { useRouter } from "next/router";
import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/user-sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          mobile,
          email,
          username,
          password,
        }),
      });
      const ans = await res.json();
      if (ans.message) {
        alert("User Create Successfully");
        router.push("/signIn");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-100 p-5 d-flex justify-content-center align-items-center ">
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
          <label>City</label>
          <input
            type="text"
            placeholder="city"
            className="block w-50 rounded-md border-4 p-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
        <div>
          <label>UserName</label>
          <input
            type="text"
            className="block w-50 rounded-md border-4 p-2"
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
          Submit
        </button>
      </div>
    </div>
  );
};

export default Register;
