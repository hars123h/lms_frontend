"use client";
import { styles } from "@/app/style/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type Props = {};

const ProfileUpdate: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <>
      <form onSubmit={passwordChangeHandler} className="px-[100px]">
        <div className=" mt-[25px]">
          <div>
            <label htmlFor="" className={`${styles.label}`}>
              Old Password
            </label>
            <input
              type="text"
              required
              value={oldPassword}
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
              className={`${styles.input}`}
            />
          </div>

          <div>
            <label htmlFor="" className={`${styles.label}`}>
              New Password
            </label>
            <input
              type="text"
              required
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className={`${styles.input}`}
            />
          </div>

          <div>
            <label htmlFor="" className={`${styles.label}`}>
              Confirm Password
            </label>
            <input
              type="text"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input}`}
            />
          </div>
        </div>

        <button className={`${styles.button} mt-[30px]`} type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default ProfileUpdate;
