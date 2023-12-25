"use client";
import React, { FC, useEffect, useState } from "react";
import Banner2 from "../../../public/assests/courseBanner2.png";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import QrCode from "../../../public/assests/profile/qr.jpg";
import Upis from "../../../public/assests/profile/upis.jpeg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { styles } from "@/app/style/style";
import Asset1 from "../../../public/assests/profile/asset1.png";
import Asset2 from "../../../public/assests/profile/asset2.png";
import Asset3 from "../../../public/assests/profile/asset3.png";
import Asset4 from "../../../public/assests/profile/asset4.png";
import Asset5 from "../../../public/assests/profile/asset5.png";
import Asset6 from "../../../public/assests/profile/asset6.png";
import { useCreateRechargeMutation } from "@/redux/features/recharge/rechargeApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie, updateUser, isAuth } from "@/app/helper/auth";

import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]
   });

type Props = {
  id: string;
};


const RechargeWindow = ({ id }: Props) => {
  console.log("Amount Params", typeof id);
  const [createRecharge, { isLoading, isSuccess, error }] =
    useCreateRechargeMutation();
  const [refno, setRefNo] = useState<number>();
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  console.log("USER ON dEPOSIT", user);
  const token = getCookie("token");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Recharge Placed Successfully");
      router.push("/deposit/records");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleRequest = async (params: any) => {
    if (!refno) {
      return toast.error("Please enter the UTR");
    }
    if (String(refno).length < 12) {
      return toast.error("UTR Should be atleast 12 digit");
    }
    console.log("UTR", String(refno).length);
    
    const data = {
      recharge_value: id,
      refno: refno,
      user_id: isAuth()?._id,
    };

    const updateData = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}place-recharge`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then((response) => {
        console.log("Recharge Placed  SUCCESS", response);
        updateUser(response, () => {
          toast.success("Recharge Placed Successfully");
          router.push("/deposit/records");
          socketId.emit("notification", {
            title: `New Recharge Request`,
            message: `You have a new Recharge Request  ${data?.recharge_value}`,
            userId: data?.user_id,
          });

          socketId.emit("recharge", {
            title: `New Recharge Request`,
            message: `You have a new Recharge Request  ${data?.recharge_value}`,
            userId: data?.user_id,
          });


          // setDataUser(response.data.user)
        });
      })
      .catch((error) => {
        console.log("Recharge Placed  Error", error.response.data.message);
        // setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.message);
      });


    // if (!isLoading) {
    //   await createRecharge(data);
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
            Account Payable
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
            Recharge Window
          </div>
        </div>
        <div className="flex justify-center items-center flex-col font-[700] text-[25px] font-Josefin mb-[20px]">
          <h3>Scan this QR to pay</h3>
          <br />
          <Image src={QrCode.src} width={600} height={500} alt="" />
          <br />
          <Image src={Upis.src} width={600} height={500} alt="" />
          <h3>Or Directly Transfer to under UPI</h3>
        </div>

        <div className="flex w-[100%] font-[500] ml-[20px] font-Josefin">
          <div className="w-[70%]">
            <div className={`${styles.input} pt-[15px] text-[17px]`}>
              akhisheltopa@okicici
            </div>
          </div>

          <CopyToClipboard
            text={`akhisheltopa@okicici`}
            onCopy={() => toast.success("Copied Successfully!")}
          >
            <button className="w-[30%] bg-[#f0bf79] text-[#ffffff] font-[500] ml-[20px] font-Josefin">
              Copy
            </button>
          </CopyToClipboard>
        </div>
        <br />
        <br />
        <div className="ml-[20px]">
          <label htmlFor="" className={`${styles.label}`}>
            Enter 12 Digit UTR
          </label>
          <input
            type="number"
            name=""
            id="refno"
            value={refno}
            onChange={(e) => setRefNo(Number(e.target.value))}
            placeholder="Deposit Amoaunt"
            className={`${styles.input}`}
          />
        </div>

        <br />
        <br />
        <div className="flex items-center flex-col">
          <img src={Asset1.src} className="w-[90%] h-[auto]" alt="" />
          <br />
          <img src={Asset2.src} className="w-[90%] h-[auto]" alt="" />
          <br />

          <img src={Asset3.src} className="w-[90%] h-[auto]" alt="" />
          <br />

          <img src={Asset4.src} className="w-[90%] h-[auto]" alt="" />
          <br />

          <img src={Asset5.src} className="w-[90%] h-[auto]" alt="" />
          <br />

          <img src={Asset6.src} className="w-[90%] h-[auto]" alt="" />
          <br />
        </div>

        <div className="fixed bottom-0 w-[85%]">
          <button className={`${styles.button} w-full`} onClick={handleRequest}>
            Submit Ref Number
          </button>
        </div>

        <br />
      </div>
    </>
  );
};

export default RechargeWindow;
