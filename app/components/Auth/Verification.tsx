"use client";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { FC, useRef, useState, useEffect } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import OtpInput from "react-otp-input";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";

type Props = {
  authVerify: boolean;
  setAuthVerify: (open: boolean) => void;
  authActive: boolean;
  setAuthActive: (open: boolean) => void;
  authLogin: boolean;
  setAuthLogin: (open: boolean) => void;
  token: string;
  setToken: (token: string) => void;
};

const Verification: FC<Props> = ({
  authVerify,
  setAuthVerify,
  authActive,
  setAuthActive,
  authLogin,
  setAuthLogin,
  token,
  setToken,
}) => {
  // const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [otp, setOtp] = useState("");

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Account activated successfully");
  //     setAuthActive(false);
  //     setAuthLogin(true);
  //     setAuthVerify(false);
  //   }
  //   if (error) {
  //     if ("data" in error) {
  //       const errorData = error as any;
  //       toast.error(errorData.data.message);
  //       setInvalidError(true);
  //     } else {
  //       console.log("An error occured:", error);
  //     }
  //   }
  // }, [isSuccess, error]);

  //   const verificationHandler = async () => {
  //     const verificationNumber = Object.values(verifyNumber).join("");
  //     if (verificationNumber.length !== 4) {
  //       setInvalidError(true);
  //       return;
  //     }
  //     // await activation({
  //     //   activation_token: token,
  //     //   activation_code: verificationNumber,
  //     // });
  //   };
  const verificationHandler = async () => {
    if (!token) {
      return toast.error("token is not Set Please Try Again");
    }
    if (!otp) {
      return toast.error("Please Enter the Otp");
    }
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}activate-user`,
      data: {
        activation_token: token,
        activation_code: otp,
      },
    })
      .then((response) => {
        console.log("Activation SUCCESS", response);
        toast.success("Account activated successfully");
        setAuthActive(false);
        setAuthLogin(true);
        setAuthVerify(false);
      })
      .catch((error) => {
        console.log("User Activation ERROR", error.response.data.message);
        toast.error(error.response.data.message);
      });

    // await activation({
    //     activation_token: token,
    //     activation_code: otp,
    //   });
  };

  return (
    <>
      <div className=" 1200px:w-[85%] flex items-center flex-col mt-[45px]">
        <div className="w-[80px] h-[80px] rounded-full loginbtnBg flex items-center justify-center mb-[30px]">
          <VscWorkspaceTrusted size={40} color="white" />
        </div>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          inputStyle="border-[#098b99] w-[50px] otpInputW border mx-[20px] rounded-lg bg-[#F0F0FD]  text-[16px] text-black font-Josefin focus:bg-[#fff] focus:outline-[#098b99]"
          // renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />

        <button
          className=" mt-[50px] loginbtnBg w-full text-[#fff] pt-[16px] pb-[12px] pr-[40px] pl-[40px] rounded-lg transition duration-500 font-[600] font-Josefin text-[16px]"
          onClick={verificationHandler}
        >
          Verify
        </button>
      </div>
    </>
  );
};

export default Verification;
