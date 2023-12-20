"use client";
import React, { FC, useState, useEffect } from "react";
import Heading from "../../utils/Heading";
import Header from "../../components/Header";
import Profile from "../../components/Profile/Profile";
import Protected from "../../hooks/useProtected";
import PageHeader from "../../components/PageHeader/PageHeader";
import Link from "next/link";
import DepositRecord from "@/app/components/Deposit/DepositRecord";
import WithdrawalRecords from "@/app/components/Withdrawal/WithdrawalRecords";

interface Props {}
const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");

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
        <WithdrawalRecords />
      {/* </Protected> */}
    </div>
  );
};

export default Page;
