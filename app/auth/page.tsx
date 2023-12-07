"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Auth from "../components/Route/Auth";

interface Props {}
const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("Login");
  const [authVerify, setAuthVerify] =useState(false)
  const [authActive, setAuthActive] = useState(true);
  const [authLogin, setAuthLogin] = useState(false);
  return (
    <>
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Auth 
       authVerify={authVerify}
       setAuthVerify={setAuthVerify}
       authActive={authActive}
       setAuthActive={setAuthActive}
       authLogin={authLogin}
       setAuthLogin={setAuthLogin}
      
      />
      {/* <Hero /> */}
    </>
  );
};

export default Page;
