"use client";
import React, { FC, useState, useEffect } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader/PageHeader";
import Link from "next/link";
import { useSelector } from "react-redux";
import InviteMember from "../components/Invite/InviteMember";

interface Props {}
const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
 
  
  return (
    <div>
      {/* <Protected> */}
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
      
      <InviteMember />
      {/* </Protected> */}
    </div>
  );
};

export default Page;
