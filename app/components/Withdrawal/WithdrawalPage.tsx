"use client";
import React, { FC, useState, useEffect } from "react";
import Banner2 from "../../../public/assests/courseBanner2.png";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCreateWithdrawalMutation } from "@/redux/features/withdrawal/withdrawalsApi";
import { getCookie, isAuth, updateUser } from "@/app/helper/auth";
import axios from "axios";

import Image from "next/image";
import { styles } from "@/app/style/style";

type Props = {
  user: any;
};

const WithdrawalPage: FC<Props> = ({ user }) => {
  const [tradePassword, setTradePassword] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>();
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter();
  const [createWithdrawal, { isLoading, isSuccess, error }] =
    useCreateWithdrawalMutation();
  const token = getCookie("token");

  useEffect(() => {
    if (!isAuth()?.tradePassword) {
      router.push(`/tradePassword`);
    }
  }, []);


  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}me`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE", response);
        setUserData(response.data.user);
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
      });
  };

  const handleSumit = async () => {
    if (!withdrawalAmount || !tradePassword) {
      return toast.error("All Fields are Required");
    }
    if(!userData?.bankDetails) {
      return toast.error("Please Enter the Bank Details");
    }

    if(userData?.earning < withdrawalAmount) {
      return toast.error("Please Enter Less Than Eraning Amount");
    }
   
    const data = {
      tradePassword,
      withdrawalAmount,
      fullName: isAuth()?.bankDetails?.cardHolderName,
      bankAccount: isAuth()?.bankDetails?.bankAccount,
      ifsc: isAuth()?.bankDetails?.ifsc,
      bankName: isAuth()?.bankDetails?.bankName,
      phoneNo: isAuth()?.bankDetails?.mobileNumber,
      user: isAuth()?._id,
    };
    
       
    
    const updateData = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}place-withdraw`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then((response) => {
        console.log("Withdrawal Request SUCCESS", response);
        updateUser(response, () => {
          toast.success("Withdrawal Placed Successfully");
          router.push("/withdrawal/records");
          // setDataUser(response.data.user) 
        });
      })
      .catch((error) => {
        console.log("Profile Image  Update Error", error.response.data.message);
        // setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.message);
      });

    // if (!isLoading) {
    //   await createWithdrawal(data);
    // }
    // router.push(`/recharge-window/${amount}`);
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
            Withdrawal
          </div>
        </div>

        <div className=" mb-[70px] h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
          <img
            className="relative object-cover w-full h-full rounded-xl"
            src={BannerImage.src}
          />

          <div className="w-full px-8 absolute top-8">
            <div className="flex justify-between">
              <div className="">
                <p className="font-light">Name</p>
                <p className="font-medium tracking-widest">
                  {isAuth()?.bankDetails?.cardHolderName}
                </p>
              </div>
              <img
                className="w-14 h-14"
                src="https://i.imgur.com/bbPHJVe.png"
              />
            </div>
            <div className="pt-1">
              <p className="font-light">Card Number</p>
              <p className="font-medium tracking-more-wider">
                {isAuth()?.bankDetails?.bankAccount}
              </p>
            </div>
            <div className="pt-6 pr-6">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-light text-xs">IFSC CODE</p>
                  <p className="font-medium tracking-wider text-sm">
                    {isAuth()?.bankDetails?.ifsc}
                  </p>
                </div>
                <div className="">
                  <p className="font-light text-xs text-xs">Bank Name</p>
                  <p className="font-medium tracking-wider text-sm">
                    {isAuth()?.bankDetails?.bankName}
                  </p>
                </div>

                <div className="">
                  <p className="font-light text-xs">Mobile Number</p>
                  <p className="font-bold tracking-more-wider text-sm">
                    {isAuth()?.bankDetails?.mobileNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="" className={`${styles.label}`}>
              Withdrawal Amount
            </label>
            <input
              type="number"
              name=""
              required
              value={withdrawalAmount}
              id="name"
              placeholder="IFSC"
              onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
              className={`${styles.input}`}
            />
          </div>

          <div>
            <label htmlFor="" className={`${styles.label}`}>
              Trade Password
            </label>
            <input
              type="text"
              name=""
              required
              value={tradePassword}
              id="name"
              placeholder="IFSC"
              onChange={(e) => setTradePassword(e.target.value)}
              className={`${styles.input}`}
            />
          </div>

          <button
            className={`${styles.button} my-[20px]`}
            onClick={handleSumit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default WithdrawalPage;
