"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader/PageHeader";
import CourseContent from "../components/Course/CourseContent";
import Protected from "../hooks/useProtected";
import Link from "next/link";

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("courses");

  return (
    <div>
      <Protected>
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
            <h2 className="text-[50px]  font-[700]">Courses</h2>
            <div className="flex">
              <Link className="mr-[13px]" href="/">
                Home
              </Link>
              <div className="flex items-center">
                <p className="h-[5px] w-[6px] rounded-full bg-[#fff] mr-[5px]"></p>
                <p>Courses</p>
              </div>
            </div>
          </div>
        </PageHeader>
        <CourseContent />
      </Protected>
    </div>
  );
};
export default Page;
