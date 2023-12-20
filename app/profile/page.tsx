"use client";
import React, { FC, useState, useEffect } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import Protected from "../hooks/useProtected";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import axios from "axios";
import { getCookie, isAuth } from "../helper/auth";

interface Props {}
const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");
  const token = getCookie("token");

  useEffect(() => {
    if (!isAuth()) {
      redirect(`/auth`);
    }
  }, []);

  return (
    <div>
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

      <Profile />
    </div>
  );
};

export default Page;
