"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Verification from "../Auth/Verification";
import { useSession } from "next-auth/react";
import { useLogOutQuery } from "@/redux/features/auth/authApi";

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

const Auth: FC<Props> = ({
  authVerify,
  setAuthVerify,
  authActive,
  setAuthActive,
  authLogin,
  setAuthLogin,
  token,
  setToken,
}) => {
  const [logout, setLogout] = useState(false);

  const handleBtnActive = () => {
    setAuthActive(true);
    setAuthLogin(false);
    setAuthVerify(false);
  };
  const handleLoginActive = () => {
    setAuthActive(false);
    setAuthLogin(true);
    setAuthVerify(false);
  };

  return (
    <>
      <div className="container mx-auto ">
        <div className="w-full 1000px:flex items-center">
          <div className="1000px:w-[50%] flex items-center justify-end pt-[70px]  z-10">
            <div className="text-center">
              <Image
                src={require("../../../public/assests/login.png")}
                alt=""
                className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
              />
            </div>
          </div>

          <div className="1000px:w-[50%] flex flex-col items-center 1000px:items-start 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
            <h2
              className={`${
                authActive ? "animateAuth" : ""
              } text-[40px] font-[700] font-Josefin text-[#0d0c0c] mb-[20px]  `}
            >
              {authActive && <>Create your account</>}
              {authLogin && <>Sign In to Elarning</>}
            </h2>
            <div className="flex justify-between 1200px:w-[85%] text-center bg-white p-[10px] border-none rounded-full shadow-[0_0_20px_3px_rgba(0,0,0,0.07)]">
              <button
                className={` ${
                  authActive ? "btnBgActive" : ""
                } px-[70px] py-[10px] rounded-full text-[18px] font-[600] font-Josefin transition duration-500  hover:scale-110 `}
                onClick={handleBtnActive}
              >
                Register
              </button>
              <button
                className={`${
                  authLogin ? "btnBgActive" : ""
                } px-[70px] py-[10px] rounded-full text-[18px] font-[600] font-Josefin transition duration-500  hover:scale-110`}
                onClick={handleLoginActive}
              >
                Login
              </button>
            </div>
            {authVerify && (
              <Verification
                authVerify={authVerify}
                setAuthVerify={setAuthVerify}
                authActive={authActive}
                setAuthActive={setAuthActive}
                authLogin={authLogin}
                setAuthLogin={setAuthLogin}
                token={token}
                setToken={setToken}
              />
            )}
            {authActive && (
              <>
                <Register
                  authVerify={authVerify}
                  setAuthVerify={setAuthVerify}
                  authActive={authActive}
                  setAuthActive={setAuthActive}
                  authLogin={authLogin}
                  setAuthLogin={setAuthLogin}
                  token={token}
                  setToken={setToken}
                />
              </>
            )}

            {authLogin && <Login />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
