"use client";
import react, { FC } from "react";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Link from "next/link";
import BannerBook from '../../../public/assests/courseBanner1.svg';
import Banner2 from '../../../public/assests/courseBanner2.png';
import Image from "next/image";

type Props = {
  children:React.ReactNode;
};

const PageHeader: FC<Props> = ({children}) => {
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
          {children}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
