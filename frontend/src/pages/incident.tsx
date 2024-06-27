import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";

const Incident = () => {
  const [fname, setFname] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(
          "http://localhost:8080/incident/get-details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(await response.json());
      })();
    } catch (error) {
      console.log(error);
    }
  }, [flag]);

  const handleSubmit = async () => {
    try {
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
      setFlag(!flag);
      setFname("");
      setCity("");
      setMobile("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteData = async (id: any) => {
    setUpdateFlag(true);
    try {
      const response = await fetch(
        "http://localhost:8080/incident/delete-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeData = async (data: any) => {
    setFname(data.first_name);
    setCity(data.city);
    setMobile(data.mobile);
    setId(data.id);
    setUpdateFlag(true);
  };

  const handleUpdateData = async () => {
    console.log(fname);
    try {
      const response = await fetch(
        "http://localhost:8080/incident/update-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, firstName: fname, city, mobile }),
        }
      );
      setUpdateFlag(false);
      setFlag(!flag);
      setFname("");
      setCity("");
      setMobile("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-100 p-5 d-flex justify-content-center align-items-center ">
      <div className="w-50">
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
            updateFlag ? handleUpdateData() : handleSubmit();
          }}
        >
          {updateFlag ? "Update" : "submit"}
        </button>
      </div>
      <div className="w-50">
        <Accordion>
          {data.map((d: any, i) => {
            return (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {d.first_name}
                    </Box>
                    <MdDelete
                      size={25}
                      className="mx-3"
                      onClick={() => {
                        handleDeleteData(d.id);
                      }}
                    />
                    <MdOutlineModeEditOutline
                      size={25}
                      onClick={() => {
                        handleChangeData(d);
                      }}
                    />
                    <AccordionIcon boxSize={25} />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div className="d-flex justify-content-evenly align-items-center">
                    <div className="d-flex">
                      <h6 className="fw-bold mt-1">City</h6>:<p>{d.city}</p>
                    </div>
                    <div className="d-flex">
                      <h6 className="fw-bold mt-1">Mobile</h6>:<p>{d.mobile}</p>
                    </div>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default Incident;
