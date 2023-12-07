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
      <div className="w-full flex px-[50px] my-[90px]">
        <div className=" w-[50%]">
          <h2 className="text-[40px] font-[700] font-Josefin leading-[60px] tracking-[-1px] text-[#0d0c0c] mb-[15px]">
            Transform Your Life Through Online Education
          </h2>
          <p className="text-[16px]  font-Josefin text-[#646464]">
            Instructors from around the world teach millions of students on
            Edmy. We provide the tools and skills to teach what you love. And
            you can also achieve your goal
          </p>

          <div className="mt-[40px] p-[20px]"
           style={{boxShadow:"0 0 20px 3px rgba(0,0,0,0.07)", background:"#fff",borderRadius:"7px"}}
          >
            <div className="flex items-center">
              <Image
                src={CourseImage}
                width={130}
                height={130}
                alt=""
                className="rounded"
              />
              <div className="ml-[10px]">
                <h3 className="text-[18px] font-Josefin text-[#0d0c0c] font-[700]">
                  Watch Video From the Community How Edmy Change <br />
                  Their Life
                </h3>
                <p className="text-[15px]  font-Josefin text-[#646464] font-[600]">
                  My Courses
                </p>
              </div>
            </div>
          </div>

          <button className={`mt-[25px] ${styles.button}`}>Find Out How</button>
        </div>
        <div className=" w-[50%] ml-[25px]">
          <div className="transform_image">
            <img
              className="ml-[8px]"
              src={transformImg.src}
              style={{ width: "75%", height: "auto" }}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSecond;
