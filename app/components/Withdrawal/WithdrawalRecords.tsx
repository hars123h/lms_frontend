"use client";
import React, { FC, useState, useEffect } from "react";
import Banner2 from "../../../public/assests/courseBanner2.png";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

import { useGetUserWithdrawalsQuery } from "@/redux/features/withdrawal/withdrawalsApi";
import { getCookie } from "@/app/helper/auth";
import axios from "axios";

type Props = {};

const WithdrawalRecords: FC<Props> = () => {
  const { isLoading, data, refetch } = useGetUserWithdrawalsQuery({});
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const token = getCookie("token");

  console.log("Withdrawal Data", data);
  // useEffect(() => {
  //   refetch();
  //   setWithdrawals(data?.withdrawal);
  // }, [data, isLoading, refetch]);
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-user-withdrawal`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get Withdrawal", response);
        setWithdrawals(response.data.withdrawal);
        // setName(response.data.user.name);
        // const { role, name, email } = response.data;
        // setValues({ ...values, role, name, email });
      })
      .catch((error) => {
        console.log("Get Withdrawal ERROR", error.response.data.message);
        // if (error.response.status === 401) {
        //     signout(() => {
        //         history.push('/');
        //     });
        // }
      });
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

          {/* <div className="font-[700] font-Josefin text-[#FFF]">
            ₹ <span className="text-[35px] ml-[5px]">50.00</span>
          </div>

          <div className="-mt-[10px] font-[600] font-Josefin text-[#E8E8E8]"> 
            Account Payable
          </div> */}
          <div className="absolute bottom-[390px] left-[250px]">
            <Image
              src={Banner2.src}
              width={80}
              height={80}
              alt=""
              style={{ animation: "on-off 5s linear infinite" }}
            />
          </div>
          <div className="text-center text-[#ffffff] font-[700] text-[25px] font-Josefin mt-[30px]">
            Withdrawal Record
          </div>
        </div>

        {withdrawals &&
          withdrawals.map((item: any, index: any) => {
            return (
              <>
                <div
                  className="p-[15px] bg-[#FFFFF0] w-full my-[20px] font-[600] font-Josefin "
                  style={{ boxShadow: "10px 5px 5px #F0F0F0" }}
                >
                  <div className="flex justify-between item-center">
                    {item?.status === "Pending" ? (
                      <p className="text-[orange]">{item?.status}</p>
                    ) : (
                      ""
                    )}

                    {item?.status === "Confirmed" ? (
                      <p className="text-[green]">{item?.status}</p>
                    ) : (
                      ""
                    )}
                    {item?.status === "Declined" ? (
                      <p className="text-[red]">{item?.status}</p>
                    ) : (
                      ""
                    )}
                    <p>₹ {item?.withdrawalAmount}</p>
                  </div>

                  <div className="mt-[10px] text-[#818393]">
                    {new Date(item?.createdAt).toLocaleString(undefined, {
                      timeZone: "Asia/Kolkata",
                    })}
                  </div>
                </div>
                ;
              </>
            );
          })}
      </div>
    </>
  );
};

export default WithdrawalRecords;
