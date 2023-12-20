"use client";
import React, { FC, useState, useEffect } from "react";
import { styles } from "@/app/style/style";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assests/avatar.png";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getCookie, updateUser } from "@/app/helper/auth";
import { useRouter } from "next/navigation";


type Props = {
  user: any;
};

const PersonalData: FC<Props> = ({ user }) => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [dataUser, setDataUser] = useState<any>(null);
  const [check, setCheck] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const token = getCookie("token");
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, [check]);

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
        setDataUser(response.data.user);
        setName(response.data.user.name);

        // const { role, name, email } = response.data;
        // setValues({ ...values, role, name, email });
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
        // if (error.response.status === 401) {
        //     signout(() => {
        //         history.push('/');
        //     });
        // }
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Please Enter the name");
    }
    if (name !== "") {
      // await editProfile({
      //   name: name,
      // });

      const updateData = await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_SERVER_URI}update-user-info`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { name: name },
      })
        .then((response) => {
          console.log("Profile Data  UPDATE SUCCESS", response);
          updateUser(response, () => {
            toast.success("Profile  Updated Successfully");
            // setDataUser(response.data.user)
            setCheck(!check);
          });
        })
        .catch((error) => {
          console.log("Profile Image  Update Error", error.response.data.error);
          // setValues({ ...values, buttonText: "Submit" });
          toast.error(error.response.data.error);
        });
    }
  };

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;

        axios({
          method: "PUT",
          url: `${process.env.NEXT_PUBLIC_SERVER_URI}update-user-avatar`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { avatar },
        })
          .then((response) => {
            console.log("Profile Image  UPDATE SUCCESS", response);
            updateUser(response, () => {
              toast.success("Profile Image Updated Successfully");
              // setDataUser(response.data.user)
              setCheck(!check);
            });
          })
          .catch((error) => {
            console.log(
              "Profile Image  Update Error",
              error.response.data.error
            );
            // setValues({ ...values, buttonText: "Submit" });
            toast.error(error.response.data.error);
          });
        // updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  console.log("Data User", dataUser);

  return (
    <>
      <div>
        <div className=" mt-[40px] 1200px:px-[120px]">
          <div className="w-full flex justify-center">
            <div className="relative">
              <Image
                src={
                  dataUser?.avatar || avatar
                    ? dataUser?.avatar?.url || avatar
                    : avatarIcon
                }
                alt=""
                width={120}
                height={120}
                className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#1cab94] rounded-full object-cover"
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
          <h3 className="pt-[20px] text-center text-[20px] text-[#1cab94]  font-[700] font-Josefin">
            {dataUser?.name}
          </h3>
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
                  value={dataUser?.email}
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
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalData;
