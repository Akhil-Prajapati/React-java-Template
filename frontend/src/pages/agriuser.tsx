import { useStore } from "@/components/store/navigation";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";

const Agriuser = () => {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const increasePopulation = useStore.use.increasePopulation();

  useEffect(() => {
    increasePopulation(5);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:8080/agri/save-agri-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          city: data.city,
          mobile: data.mobile,
        }),
      });
      const msg = await res.json();
      if (msg.message == "data save successfully") {
        alert("data save successfully");
        setValue("name", "");
        setValue("city", "");
        setValue("mobile", "");
        setRender(!render);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/agri/get-agri-details", {
          method: "POST",
        });
        setData(await res.json());
      } catch (error) {}
    })();
  }, [render]);

  const deleteDetails = async (id: any) => {
    try {
      const res = await fetch(
        "http://localhost:8080/agri/delete-agri-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const response = await res.json();
      console.log(response);
      if (response.message == "Delete Item") {
        alert("Data Deleted Successfully");
        setRender(!render);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateDetails = async (id: any) => {
    try {
      const res = await fetch(
        "http://localhost:8080/agri/update-agri-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            name: getValues("name"),
            city: getValues("city"),
            mobile: getValues("mobile"),
          }),
        }
      );
      console.log("update", await res.json());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-100 p-5 d-flex justify-content-center align-items-center ">
      <div className="w-50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="name"
              className="block w-50 rounded-md border-4 p-2 "
              {...register("name")}
            />
          </div>
          <div>
            <label>city</label>
            <input
              type="text"
              placeholder="city"
              className="block w-50 rounded-md border-4 p-2"
              {...register("city")}
            />
          </div>
          <div>
            <label>Mobile</label>
            <input
              type="Number"
              className="block w-50 rounded-md border-4 p-2"
              {...register("mobile")}
            />
          </div>

          <button type="submit" className="bg-gray-600 p-2 rounded-md">
            submit
          </button>
        </form>
      </div>
      <div className="w-50">
        <Accordion>
          {data.map((d: any, i) => {
            return (
              <AccordionItem key={i}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {d.name}
                    </Box>
                    <MdDelete
                      size={25}
                      className="mx-3"
                      onClick={() => {
                        deleteDetails(d.id);
                      }}
                    />
                    <MdOutlineModeEditOutline
                      size={25}
                      onClick={() => {
                        updateDetails(d.id);
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

export default Agriuser;
