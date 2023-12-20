"use client";
import React, { FC, useState, useEffect } from "react";
import Banner2 from "../../../public/assests/courseBanner2.png";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAddTradePasswordMutation } from "@/redux/features/withdrawal/withdrawalsApi";
import Image from "next/image";
import { styles } from "@/app/style/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import axios from "axios";
import { getCookie, updateUser } from "@/app/helper/auth";

type Props = {};

const TradePassword: FC<Props> = ({}) => {
  const [tradePassword, setTradePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = getCookie("token");

  const [addTradePassword, { isLoading, isSuccess, error }] =
    useAddTradePasswordMutation();
  const {
    data: userData,
    isLoading: loadUser,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Trade Password Set Successfully");
      refetch();
      router.push("/profile");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (tradePassword !== confirmPassword) {
      return toast.error("Password Not Matched");
    }
    const data = { 
      tradePassword,
      confirmPassword,
    };

    const setTrade = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}trade-password`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then((response) => {
        console.log("Trade Password SUCCESS", response);
        updateUser(response, () => {
          toast.success("Trade Password Set Successfully");
          router.push("/profile");

          // setDataUser(response.data.user)
        });
      })
      .catch((error) => {
        console.log("Trade Password Error", error.response.data.message);
        // setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.message);
      });
    // if (!isLoading) {
    //   await addTradePassword(data);
    // }
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
            Trade Password
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="" className={`${styles.label}`}>
              Trade Password
            </label>
            <input
              type="text"
              name=""
              value={tradePassword}
              id="name"
              placeholder="Trade Password"
              onChange={(e) => setTradePassword(e.target.value)}
              className={`${styles.input}`}
            />
          </div>

          <div>
            <label htmlFor="" className={`${styles.label}`}>
              Confirm Trade Password
            </label>
            <input
              type="text"
              name=""
              value={confirmPassword}
              id="name"
              placeholder="Confirm  Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input}`}
            />
          </div>

          <button
            className={`${styles.button} my-[20px]`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
export default TradePassword;
