"use client";
import react, { FC } from "react";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Link from "next/link";
import BannerBook from '../../../public/assests/courseBanner1.svg';
import Banner2 from '../../../public/assests/courseBanner2.png';

import Image from "next/image";

type Props = {};

const PageHeader: FC<Props> = () => {
  return (
    <>
      <div
        className="w-full relative"
        style={{ backgroundImage: `url(${BannerImage.src})` }}
      >
        <div className="absolute bottom-[50px] right-[40px]">
          <Image 
          src={BannerBook.src} 
          width={200}
          height={200}
          alt="" 
          style={{animation:"on-off 10s linear infinite"}}
          />
        </div>
        <div className="absolute bottom-[50px] left-[100px]">
          <Image 
          src={Banner2.src} 
          width={130}
          height={130}
          alt="" 
          style={{animation:"on-off 5s linear infinite"}}
          />
        </div>
        <div className="flex justify-center items-center">
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
        </div>
      </div>
    </>
  );
};

export default PageHeader;
