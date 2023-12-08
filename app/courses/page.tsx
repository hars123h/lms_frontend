"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader/PageHeader";
import CourseContent from "../components/Course/CourseContent";
import Protected from "../hooks/useProtected";
interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [route, setRoute] = useState("courses");

  return (
    <>
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
        <PageHeader />
        <CourseContent />
      </Protected>
    </>
  );
};
export default Page;
