"use client";
import React, { FC } from "react";
import Image from "next/image";
import TeacherImage from "../../../public/assests/teacher.jpg";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";

type Props = {
  title: string;
  courseImg: any;
  teacherImg: any;
  teacherName: string;
  cutPrice: any;
  realPrice: any;
  hoverHeading: string;
  hoverDesc: string;
  ratings: any;
  students: number;
  courseLink:any;
};

const CourseCard: FC<Props> = ({
  title,
  courseImg,
  teacherImg,
  teacherName,
  cutPrice,
  realPrice,
  hoverHeading,
  hoverDesc,
  ratings,
  students,
  courseLink
}) => {
  return (
    <>
      <div className="relative  w-[320px] mb-[70px]">
        <div className="block h-[150px]">
          <img
            src={courseImg}
            className="rounded w-[320px]"
            style={{ objectFit: "cover", height: "220px" }}
            alt=""
          />
        </div>
        <div className="block mt-[80px] px-[10px]">
          <h3 className="text-[#0d0c0c] text-[16px] font-[600] leading-[30px] mb-[10px]">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <Ratings rating={ratings} />

            <p>{students} Students</p>
          </div>
          
          <div className="flex items-center mt-[15px]">
            <p className="text-[#939393] text-[16px] font-[500] pr-[8px] line-through">
              ${cutPrice}
            </p>
            <p className="text-[#057fa8] text-[25px] font-[500]">
              ${realPrice}
            </p>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(134.32deg,#6cc17e -19.8%,#098b99)",
            transition: "all .5s ease",
            cursor: "pointer",
          }}
          className="absolute top-0 left-0 right-0 bottom-0 opacity-0 px-[15px] hover:opacity-100 rounded"
        >
          <div className="flex items-center justify-center h-[360px] flex-col">
            <h3 className="text-[#fff] text-[16px] font-[600] leading-[20px] mb-[10px] font-Josefin">
              <Link href={`courses/${courseLink}`}>
              {hoverHeading}</Link>
            </h3>
            <p className="text-[#fff] text-[14px] font-[400] leading-[20px] mt-[15px] font-Josefin">
              {hoverDesc}
            </p>

            <button
              className="px-[28px] py-[10px] rounded text-[#0d0c0c] font-[500] mt-[40px]"
              style={{ background: "#f0bf79" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
