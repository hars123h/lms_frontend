"use client";
import React, { FC, useState, useEffect } from "react";
import { styles } from "@/app/style/style";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assests/avatar.png";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "react-hot-toast";

import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user?.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
  useEditProfileMutation();
  

  const [loadUser, setLoadUser] = useState(false);

  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  // const {data:userData,isLoading,refetch} = useLoadUserQuery(undefined,{});


  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      // refetch();
      console.log("Userrr");
      
    }
    if (error) {
      console.log(error);
    }
    if (success) {
      // refetch();

      toast.success("Profile updated successfully!");
      setLoadUser(true);
    }
  }, [isSuccess, success, error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-center">
          <div className="relative">
            <Image
              src={
                user.avatar || avatar ? user.avatar.url || avatar : avatarIcon
              }
              alt=""
              width={120}
              height={120}
              className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#1cab94] rounded-full"
            />
            <input
              type="file"
              name=""
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png,image/jpg,image/jpeg,image/webp"
            />
            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                <AiOutlineCamera size={20} className="z-1" color="white" />
              </div>
            </label>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
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
          <button className={`${styles.button} mt-[30px]`} type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
