"use client";
import React, { FC, useState, useEffect } from "react";
type Props = {};
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Level1 from "../../../public/assests/L1.png";
import Level2 from "../../../public/assests/L2.png";
import Level3 from "../../../public/assests/L3.png";
import TeamFooter from "../../../public/assests/teamFooter.png";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";

import { styles } from "@/app/style/style";
import Image from "next/image";
import { getCookie } from "@/app/helper/auth";

const InviteMember: FC<Props> = () => {
  const [userData, setDataUser] = useState<any>(null);
  const [origin, setOrigin] = useState("")
  const token = getCookie("token");
 

  useEffect(() => {
    loadProfile();
  setOrigin(window.location.origin)
    
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
        console.log("Get Users All", response);
        setDataUser(response.data.user);
      })
      .catch((error) => {
        console.log("Get User All  ERROR", error.response.data.message);
      });
  };
  return (
    <>
      <div className="font-Josefin">
        <div
          className="w-full relative text-[#ffffff] h-[340px] p-[25px]"
          style={{ backgroundImage: `url(${BannerImage.src})` }}
        >
          <div className="flex w-[100%] items-center justify-center pl-[30px]">
            <div className="flex flex-col w-[50%] justify-center">
              <h4 className="font-[400] text-[15px]">Invite Link</h4>
              <span className="font-[700] tracking-[2px]">
                {userData?.user_invite}
              </span>

              <h4 className="font-[400] text-[15px] mt-[8px]">Invite Link</h4>
              <CopyToClipboard
                text={`${origin}/auth/?invt=${userData?.user_invite}`}
                onCopy={() => toast.success("Copied Successfully!")}
              >
                <button
                  className="py-[6px] px-[10px] rounded-md mt-[3px] w-[100px]"
                  style={{ background: "rgb(240, 191, 121)" }}
                >
                  Copy
                </button>
              </CopyToClipboard>
            </div>
            <div className="w-[50%] flex flex-col">
              <h3>Team</h3>
              <div className="flex items-center w-[100%] mb-[15px] mt-[10px]">
                <div className="h-[40px] pt-[10px] border-1 border-[#f2f0ef] px-[20px] py-[10px] bg-[#f2f0ef] rounded-lg text-[15px] font-Josefin text-[black] w-[75%]">
                  Lv1 team commission
                </div>
                <button
                  className="h-[40px] px-[10px] rounded-md  w-[150px] -ml-[20px] "
                  style={{ background: "rgb(240, 191, 121)" }}
                >
                  10%
                </button>
              </div>
              <div className="flex items-center w-[100%] mb-[15px]">
                <div className="h-[40px] pt-[10px] border-1 border-[#f2f0ef] px-[20px] py-[10px] bg-[#f2f0ef] rounded-lg text-[15px] font-Josefin text-[black] w-[75%]">
                  Lv2 team commission
                </div>
                <button
                  className="h-[40px] px-[10px] rounded-md  w-[150px] -ml-[20px] "
                  style={{ background: "rgb(240, 191, 121)" }}
                >
                  3%
                </button>
              </div>

              <div className="flex items-center w-[100%] mb-[15px]">
                <div className="h-[40px] pt-[10px] border-1 border-[#f2f0ef] px-[20px] py-[10px] bg-[#f2f0ef] rounded-lg text-[15px] font-Josefin text-[black] w-[75%]">
                  Lv3 team commission
                </div>
                <button
                  className="h-[40px] px-[10px] rounded-md  w-[150px] -ml-[20px] "
                  style={{ background: "rgb(240, 191, 121)" }}
                >
                  1%
                </button>
              </div>
            </div>
          </div>

          <p>{`${origin}/auth/?invt=${userData?.user_invite}`}</p>
        </div>
        <div className="w-[85%] mx-auto">
          <div
            className="flex  py-[35px]   bg-[#F5EBD0] rounded-md -mt-[50px] relative"
            style={{ zIndex: "1000" }}
          >
            <div
              className="flex items-center flex-col w-[50%]  "
              style={{ borderRight: "1px solid grey" }}
            >
              <div className="font-[700] text-[30px] text-[brown]">89</div>
              <div>Team Size</div>
            </div>
            <div className="flex items-center flex-col w-[50%] ">
              <div className="font-[700] text-[30px] text-[brown]">5.00</div>
              <div>Team Income</div>
            </div>
          </div>

          <div className="my-[30px]">
            <div
              className="flex justify-between py-[30px]  px-[30px] rounded-md my-[20px]"
              style={{ border: "1px solid #7CC6A5" }}
            >
              <div className="w-[33%]">
                <Image src={Level1.src} width={60} height={60} alt="" />
              </div>
              <div className="flex flex-col item-center w-[67%]">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <span>0</span>
                    <p>Income</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>12</span>
                    <p>Team Size</p>
                  </div>
                </div>
                <button className={`${styles.button}`}>
                  Team Commission Rate 10%
                </button>
              </div>
            </div>

            <div
              className="flex justify-between py-[30px]  px-[30px] rounded-md my-[20px]"
              style={{ border: "1px solid #7CC6A5" }}
            >
              <div className="w-[33%]">
                <Image src={Level2.src} width={60} height={60} alt="" />
              </div>
              <div className="flex flex-col item-center w-[67%]">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <span>0</span>
                    <p>Income</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>12</span>
                    <p>Team Size</p>
                  </div>
                </div>
                <button className={`${styles.button}`}>
                  Team Commission Rate 3%
                </button>
              </div>
            </div>

            <div
              className="flex justify-between py-[30px]  px-[30px] rounded-md my-[20px]"
              style={{ border: "1px solid #7CC6A5" }}
            >
              <div className="w-[33%]">
                <Image src={Level3.src} width={60} height={60} alt="" />
              </div>
              <div className="flex flex-col item-center w-[67%]">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <span>0</span>
                    <p>Income</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span>12</span>
                    <p>Team Size</p>
                  </div>
                </div>
                <button className={`${styles.button}`}>
                  Team Commission Rate 1%
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <img src={TeamFooter.src} alt="" className="w-[90%] h-auto" />
        </div>
      </div>
    </>
  );
};

export default InviteMember;
