"use client";
import React, { FC, useState, useEffect } from "react";
import { styles } from "@/app/style/style";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assests/avatar.png";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "react-hot-toast";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Banner2 from "../../../public/assests/courseBanner2.png";
import Information from "../../../public/assests/profile/Information.svg";
import BankCard from "../../../public/assests/profile/BankCard.svg";
import LoginPassword from "../../../public/assests/profile/LoginPassword.svg";
import PayPassword from "../../../public/assests/profile/PayPassword.svg";
import Logout from "../../../public/assests/profile/LogOut.svg";
import axios from "axios";
import Link from "next/link";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { getCookie, isAuth, signout } from "@/app/helper/auth";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


type Props = {};

const ProfileInfo: FC<Props> = () => {
  // const [name, setName] = useState(user && user?.name);
  const [logout, setLogout] = useState(false);
  const [loadData, setLoadData] = useState([]);
  const [loadUser, setLoadUser] = useState(false);
  const token = getCookie("token");
  const router = useRouter();


  return (
    <>
      <div>
        <div
          className="w-[100%] h-[200px] bg-[#000000] rounded-lg p-[20px] my-[25px]"
          style={{ backgroundImage: `url(${BannerImage.src})` }}
        >
          <div className="font-[700] font-Josefin text-[#FFF]">
            ₹ <span className="text-[35px] ml-[5px]">{isAuth()?.balance}</span>
          </div>

          <div className="-mt-[10px] font-[600] font-Josefin text-[#E8E8E8]">
            Balance
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

          <div className="flex justify-end items-end h-[63%]">
            <Link
              href={"/deposit"}
              className="px-[28px] py-[10px] rounded-md text-[#ffffff] font-[500] mr-[20px] font-Josefin"
              style={{ background: "#f0bf79" }}
            >
              Deposit
            </Link>
            <Link
              href={"/withdrawal"}
              className="px-[28px] py-[10px] rounded-md text-[#f0bf79] font-[500] font-Josefin"
              style={{ background: "#ffffff" }}
            >
              Withdraw
            </Link>
          </div>
        </div>

        <br />

        <br />
        <br />
        <div className="grid gap-[50px] grid-cols-2 mt-[25px]">
          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg w-full"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <Link href={"/deposit/records"}>
              <div className="font-[700] font-Josefin text-[#1f3d70]">
                ₹{" "}
                <span className="text-[20px] ml-[5px]">
                  {isAuth()?.recharge_amount}
                </span>
              </div>
              <div className=" text-sm font-[600] font-Josefin text-[#818393]">
                Total Deposits
              </div>
            </Link>
          </div>
          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <Link href={"/withdrawal/records"}>
              <div className="font-[700] font-Josefin text-[#1f3d70] w-full">
                ₹{" "}
                <span className="text-[20px] ml-[5px]">
                  {isAuth()?.withdrawal_sum}
                </span>
              </div>
              <div className=" text-sm font-[600] font-Josefin text-[#818393]">
                Total Withdrawal
              </div>
            </Link>
          </div>

          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <div className="font-[700] font-Josefin text-[#1f3d70] w-full">
              ₹ <span className="text-[20px] ml-[5px]">50.00</span>
            </div>
            <div className=" text-sm font-[600] font-Josefin text-[#818393]">
              My Order
            </div>
          </div>

          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <div className="font-[700] font-Josefin text-[#1f3d70] w-full">
              ₹ <span className="text-[20px] ml-[5px]">50.00</span>
            </div>
            <div className=" text-sm font-[600] font-Josefin text-[#818393]">
              Total Earning
            </div>
          </div>

          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <div className="font-[700] font-Josefin text-[#1f3d70] w-full">
              ₹ <span className="text-[20px] ml-[5px]">50.00</span>
            </div>
            <div className=" text-sm font-[600] font-Josefin text-[#818393]">
              Total Reward
            </div>
          </div>

          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <div className="font-[700] font-Josefin text-[#1f3d70] w-full">
              ₹ <span className="text-[20px] ml-[5px]">50.00</span>
            </div>
            <div className=" text-sm font-[600] font-Josefin text-[#818393]">
              Total Commission
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg w-full my-[10px]"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <Link href={"/profile/update"}>
              <div className=" flex items-center font-[700] font-Josefin text-[#1f3d70] w-full ">
                <Image src={Information.src} width={50} height={50} alt="" />
                <div className=" text-md font-[600] font-Josefin text-[#818393] ml-[30px]">
                  Personal Data
                </div>
              </div>
            </Link>
          </div>

          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg w-full my-[10px]"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <Link href={"/profile/bankcard"}>
              <div className=" flex items-center font-[700] font-Josefin text-[#1f3d70] w-full my-[10px]">
                <Image src={BankCard.src} width={50} height={50} alt="" />
                <div className=" text-md font-[600] font-Josefin text-[#818393] ml-[30px]">
                  Bank Card
                </div>
              </div>
            </Link>
          </div>

          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg w-full my-[10px]"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <Link href={"/profile/changePassword"}>
              <div className=" flex items-center font-[700] font-Josefin text-[#1f3d70] w-full">
                <Image src={LoginPassword.src} width={50} height={50} alt="" />
                <div className=" text-md font-[600] font-Josefin text-[#818393] ml-[30px]">
                  Change Login Password
                </div>
              </div>
            </Link>
          </div>

          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg w-full my-[10px]"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <div className=" flex items-center font-[700] font-Josefin text-[#1f3d70] w-full">
              <Image src={PayPassword.src} width={50} height={50} alt="" />
              <div className=" text-md font-[600] font-Josefin text-[#818393] ml-[30px]">
                Change Trade Password
              </div>
            </div>
          </div>

          <div
            className="bg-[#FFFFF0] h-[70px] p-[15px] rounded-lg w-full my-[10px]"
            style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
          >
            <div
              className=" flex items-center font-[700] font-Josefin text-[#1f3d70] w-full cursor-pointer"
              onClick = {() => {
                signout(() => {
                  router.push(`/`);
                })
            }}
            >
              <Image src={Logout.src} width={50} height={50} alt="" />
              <div className=" text-md font-[600] font-Josefin text-[#818393] ml-[30px]">
                Logout
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* <form onSubmit={handleSubmit}>
          <div className="grid gap-[50px] grid-cols-2 mt-[25px]">
            <div>
              <label htmlFor="" className={`${styles.label}`}>
                Name
              </label>
              <input
                type="text"
                name=""
                required
                value={name}
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input}`}
              />
            </div>

            <div>
              <label htmlFor="" className={`${styles.label}`}>
                Email
              </label>
              <input
                type="text"
                name=""
                readOnly
                value={user?.email}
                id="email"
                placeholder="Website Url"
                className={`${styles.input}`}
              />
            </div>

            <div>
              <label htmlFor="" className={`${styles.label}`}>
                LinkedIn
              </label>
              <input
                type="email"
                name=""
                id="email"
                placeholder="linkedIn"
                className={`${styles.input}`}
              />
            </div>

            <div>
              <label htmlFor="" className={`${styles.label}`}>
                Instagram
              </label>
              <input
                type="email"
                name=""
                id="email"
                placeholder="Instagram"
                className={`${styles.input}`}
              />
            </div>
          </div>
          <div className="mt-[50px]">
            <label htmlFor="" className={`${styles.label}`}>
              Biography
            </label>

            <textarea
              name="bio"
              id=""
              className="w-full h-[75px] border-1 border-[#f2f0ef] px-[20px] py-[10px] bg-[#f2f0ef] rounded-lg text-[16px] font-Josefin focus:bg-[#fff] focus:outline-[#098b99]"
            ></textarea>
          </div>
          <button className={`${styles.button} mt-[30px]`} type="submit">
            Save
          </button>
        </form> */}
      </div>
    </>
  );
};

export default ProfileInfo;
