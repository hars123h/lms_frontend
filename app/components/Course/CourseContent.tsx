"use client";
import react, { FC, useState, useEffect } from "react";
import Image from "next/image";
import CourseOne from "../../../public/assests/course1.jpg";
import TeacherImage from "../../../public/assests/teacher.jpg";
import CourseCard from "./CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
 
};

const CourseContent: FC<Props> = ({}) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
    console.log("Courses", data?.courses);
  }, [data]);
  return (
    <>
      <div className="flex justify-center items-center flex-col font-Josefin mt-[70px] ">
        <h3 className="text-[#057fa8] text-[16px]  font-[600]">Courses</h3>
        <h2 className="text-[#0d0c0c] text-[45px]  font-[700] w-[50%] text-center">
          Expand Your Career Opportunity With Our Courses
        </h2>
      </div>

      <div className="my-[50px] px-[50px] grid grid-cols-4 gap-4">
        {courses &&
          courses.map((item: any, index: number) => (
            <CourseCard
              key={index}
              title={item?.name}
              courseImg={item?.thumbnail?.url}
              teacherImg={TeacherImage.src}
              teacherName="Harsh Tripathi"
              realPrice={item?.price}
              cutPrice={item?.estimatedPrice}
              hoverHeading={item?.name}
              hoverDesc={item?.description}
              ratings={item?.ratings}
              students= {item.purchased}
              courseLink={item?._id}
            />
          ))}
      </div>
    </>
  );
};

export default CourseContent;
