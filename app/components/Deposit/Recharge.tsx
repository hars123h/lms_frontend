"use client";
import React, { FC, useState } from "react";
import Banner2 from "../../../public/assests/courseBanner2.png";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { styles } from "@/app/style/style";

type Props = {};

const Recharge: FC<Props> = () => {
  const [currentPaymentMode, setCurrentPaymentMode] = useState(0);
  const [amount, setAmount] = useState<number>();

  const router = useRouter();

  const handleSubmit = () => {
    if (!amount) {
      return toast.error("Enter the Amount");
    }
    router.push(`/recharge-window/${amount}`);
  };

  return (
    <>
      <div className=" mt-[40px] 1200px:px-[120px]">
        <div
          className="w-[100%] h-[200px] bg-[#000000] rounded-lg p-[20px] my-[25px]"
          style={{ backgroundImage: `url(${BannerImage.src})` }}
        >
          <Link href={"/profile"}>
            <div className="pb-[10px]">
              <IoIosArrowBack size={25} color="#ffffff" />
            </div>
          </Link>

          <div className="font-[700] font-Josefin text-[#FFF]">
            ₹ <span className="text-[35px] ml-[5px]">50.00</span>
          </div>

          <div className="-mt-[10px] font-[600] font-Josefin text-[#E8E8E8]">
            Account Balance
          </div>
          <div className="absolute bottom-[390px] left-[250px]">
            <Image
              src={Banner2.src}
              width={80}
              height={80}
              alt=""
              style={{ animation: "on-off 5s linear infinite" }}
            />
          </div>
          <div className="text-center text-[#ffffff] font-[700] text-[25px] font-Josefin -mt-[30px]">
            Deposit
          </div>
        </div>

        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Deposit Amount
          </label>
          <input
            type="number"
            name=""
            id="email"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Deposit Amoaunt"
            className={`${styles.input}`}
          />
        </div>

        <div
          className="p-[15px] bg-[#FFFFF0] w-full my-[20px] font-[600] font-Josefin text-[#818393]"
          style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
        >
          <div
            className="flex justify-between my-[20px]"
            onClick={() => setCurrentPaymentMode(0)}
          >
            <p>Ppay</p>
            {currentPaymentMode === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#63d0d7"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#63d0d7"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#99D4A6"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
          </div>

          <div
            className="flex justify-between my-[20px]"
            onClick={() => setCurrentPaymentMode(1)}
          >
            <p>Ptm-S</p>
            {currentPaymentMode === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#63d0d7"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#63d0d7"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>

          <div
            className="flex justify-between my-[20px]"
            onClick={() => setCurrentPaymentMode(2)}
          >
            <p>Ptm-pay</p>
            {currentPaymentMode === 2 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#63d0d7"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#63d0d7"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="mb-[16px] w-full">
          <button className={`${styles.button}`} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default Recharge;
