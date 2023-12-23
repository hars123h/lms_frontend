"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../../../components/Admin/sidebar/AdminSidebar";
import UserDetails from "@/app/components/Admin/Users/UserDetails";
// import AllUsers from "../../components/Admin/Users/AllUsers";

type Props = {};

const page = ({params}:any) => {
  const id = params?.id;

  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          {/* <AllUsers /> */}
          <UserDetails  id={id}/>
        </div>
      </div>
    </div>
  );
};

export default page;
