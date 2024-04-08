import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Table from '@/components/Table/table';
import React, { useEffect, useState } from 'react';

function Home() {

  const [selectedusersdata, setSelectedUsersData] = useState<any>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userdata, setUserData] = useState<any>([]);
  const [userupdeted, setUserUpdeted] = useState(false);

  const [isopen, setIsOpen] = useState(false);

  //get data
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/get-user-data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUserData(await response.json());


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }


      } catch (error) {
        console.log("error", error);
      }
    })()

  }, [userupdeted])
  //set data
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      setUserUpdeted(!userupdeted);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUserUpdeted(true);

    } catch (error) {
      console.log("error", error);
    }
  };
  //upadte data
  const openUpdateModel = async (userdata: any) => {
    setIsOpen(true);
    setSelectedUsersData(userdata);
    //updateduser set here
    setEmail(userdata.email)
    setPassword(userdata.password)

  };
  const handleUpdate = async () => {

    try {
      const response = await fetch('http://localhost:8080/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedusersdata.id, email: email, password: password }),
      });
      setUserUpdeted(!userupdeted);
      setIsOpen(false);
      alert("user updated successfully");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  //delete data
  const handleDelete = async (id: any) => {
    console.log(id)
    try {
      const response = await fetch('http://localhost:8080/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      setUserUpdeted(!userupdeted);
      alert("user deleted successfully");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <Header />
      <div className="border border-gray-950 border-solid">
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => { setEmail(e.target.value) }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a className="font-semibold text-indigo-600 hover:text-indigo-500" >
                    {/* Forgot password? */}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => { setPassword(e.target.value) }}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

        </div>
      </div>

      <div className="border border-gray-950 border-solid">
      </div>
      <div className="bg-gray-700 py-2 px-4">
        <h1 className="text-white text-lg font-bold">User Table</h1>
      </div>

      <Table data={userdata} openUpdateModel={openUpdateModel} handleDelete={handleDelete} />

      {/* edit */}
      <div className={`fixed inset-0 flex items-center justify-center  ${isopen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg z-10">
          <h2 className="text-xl font-semibold mb-4">Update User Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              type="password"
              id="password"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="ml-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            onClick={() => { setIsOpen(false) }}
          >
            Cancel
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
