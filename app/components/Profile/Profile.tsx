"use client";
import React, { FC, useState } from "react";
import { styles } from "@/app/style/style";
import ProfileInfo from "./ProfileInfo";
import ProfileUpdate from "./ProfileUpdate";
import { AiOutlineLogout } from "react-icons/ai";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [profileNav, setProfileNav] = useState("profile");
  const [logout, setLogout] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
  };

  return (
    <>
      <div>
        <div className=" mt-[40px] 1200px:px-[120px]">
          <div className="flex justify-between items-center">
            <h2 className="text-[35px] font-[700] font-Josefin text-[#0d0c0c] mb-[20px]">
              Profile & Setting
            </h2>
            <div
              className="flex items-center px-3 py-4 cursor-pointer"
              onClick={() => logOutHandler()}
            >
              <AiOutlineLogout size={20} className=" text-black" />
              <h5 className=" pl-2 text-[20px] font-[700] font-Josefin text-[#0d0c0c]">
                Log Out
              </h5>
            </div>
          </div>

          <div>
            <ul className="border-b border-[#eee] flex">
              <li
                className={`${
                  profileNav == "profile" ? "border-b-2 border-[#1cab94] " : ""
                } inline-block mr-[20px] pb-[10px]`}
              >
                <button
                  className={`${
                    profileNav == "profile"
                      ? "text-[#1cab94] "
                      : "text-[#646464]"
                  } text-[16px] font-[700] font-Josefin`}
                  onClick={() => setProfileNav("profile")}
                >
                  Profile
                </button>
              </li>
              <li
                className={`${
                  profileNav == "profileUpdate"
                    ? "border-b-2 border-[#1cab94] "
                    : ""
                } inline-block mr-[20px] pb-[10px]`}
              >
                <button
                  className={`${
                    profileNav == "profileUpdate"
                      ? "text-[#1cab94] "
                      : "text-[#646464]"
                  } text-[16px] font-[700] font-Josefin`}
                  onClick={() => setProfileNav("profileUpdate")}
                >
                  Profile Update
                </button>
              </li>
              <li
                className={`${
                  profileNav == "admin"
                    ? "border-b-2 border-[#1cab94] "
                    : ""
                } inline-block mr-[20px] pb-[10px]`}
              >
                <Link
                href={"/admin"}
                  className={`${
                    profileNav == "admin"
                      ? "text-[#1cab94] "
                      : "text-[#646464]"
                  } text-[16px] font-[700] font-Josefin`}
                  
                >
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {profileNav === "profile" && (
            <>
              <ProfileInfo avatar={avatar} user={user} />
            </>
          )}

          {profileNav === "profileUpdate" && <ProfileUpdate />}
        </div>
      </div>
    </>
  );
};

export default Profile;
