"use client";
import React, { FC, useState, useEffect } from "react";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import Protected from "../../hooks/useProtected";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import PersonalData from "@/app/components/Profile/PersonalData";
import PageHeader from "@/app/components/PageHeader/PageHeader";
import Link from "next/link";
import BankCard from "@/app/components/Profile/BankCard";
import ProfileUpdate from "@/app/components/Profile/ProfileUpdate";

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

        <PageHeader>
          <div className="flex items-center h-[300px] justify-center flex-col text-[#FFFFFF] font-Josefin">
            <h2 className="text-[50px]  font-[700]">Change Password</h2>
            <div className="flex">
              <Link className="mr-[13px]" href="/">
                Home
              </Link>
              <Link className="mr-[13px]" href="/profile">
                Profile
              </Link>
              <div className="flex items-center">
                <p className="h-[5px] w-[6px] rounded-full bg-[#fff] mr-[5px]"></p>
                <p>Change Password</p>
              </div>
            </div>
          </div>
        </PageHeader>
        {/* <BankCard /> */}
        <ProfileUpdate />

       
      {/* </Protected> */}
    </div>
  );
};

export default Page;
