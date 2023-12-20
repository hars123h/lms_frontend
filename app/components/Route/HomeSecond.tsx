"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import CourseImage from "../../../public/assests/course16.jpg";
import transformImg from "../../../public/assests/transform.png";
import { styles } from "@/app/style/style";

type Props = {};

const HomeSecond: FC<Props> = () => {
  return (
    <>
      <div className="w-full px-[25px]  1000px:pl-[80px] 1000px:pr-[30px] my-[90px] ">
        <div className="flex justify-center items-center flex-col-reverse 1000px:flex-row">
          <div className="mt-[60px] 1000px:-[0px] 1000px:w-[50%]">
            <h2 className="1200px:text-[40px] 1000px:text-[30px] text-[26px] font-[700] font-Josefin 1200px:leading-[60px] tracking-[-1px] text-[#0d0c0c] mb-[15px]">
              Transform Your Life Through Online Education
            </h2>
            <p className="text-[16px]  font-Josefin text-[#646464]">
              Instructors from around the world teach millions of students on
              Edmy. We provide the tools and skills to teach what you love. And
              you can also achieve your goal
            </p>

            <div
              className="mt-[40px] p-[20px]"
              style={{
                boxShadow: "0 0 20px 3px rgba(0,0,0,0.07)",
                background: "#fff",
                borderRadius: "7px",
              }}
            >
              <div className="flex items-center flex-col 500px:flex-row">
                <Image
                  src={CourseImage}
                  width={130}
                  height={130}
                  alt=""
                  className="rounded"
                />
                <div className="ml-[10px]">
                  <h3 className="1100px:text-[18px] font-Josefin text-[#0d0c0c] font-[700] 500px:mt-[0px] mt-[20px] 500px:text-start text-center">
                    Watch Video From the Community How Edmy Change Their Life
                  </h3>
                  <p className="text-[15px]  font-Josefin text-[#646464] font-[600] 500px:text-start text-center">
                    My Courses
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center 1000px:justify-start">
              <button
                className={` mt-[25px] ${styles.button}`}
              >
                Find Out How
              </button>
            </div>
          </div>
          <div className=" 1200px:w-[50%] ml-[20px]">
            <div className="transform_image">
              <img
                className="ml-[1px]"
                src={transformImg.src}
                style={{ width: "100%", height: "auto" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSecond;
