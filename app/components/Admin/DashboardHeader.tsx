"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import axios from "axios";
import { getCookie } from "@/app/helper/auth";

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [noty, setNoty] = useState<any>(null);
  const [toggle, setToggle] = useState(false);

  const token = getCookie("token");

  useEffect(() => {
    notificationAll();
  }, [toggle]);

  const notificationAll = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-all-notifications`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get Notifications All Success", response);
        setNoty(response.data);
        // setRechargeGet(response.data.recharge);
      })
      .catch((error) => {
        console.log(
          "Get Notifications All  ERROR",
          error.response.data.message
        );
      });
  };

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3"
      )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (noty) {
      setNotifications(
        noty.notifications?.filter((item: any) => item.status === "unread")
      );
    }
    console.log("Audio Load");

    audio.load();
  }, [noty, audio, toggle ]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      notificationAll();
      playNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}update-notification/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Update Notifications  Success", response);
        setToggle(!toggle);
      })
      .catch((error) => {
        console.log("Update Notifications  ERROR", error.response.data.message);
      });
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed  right-0 z-[9999999]">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3  border border-[#ffffff0c] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[1000000000] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-white dark:text-white p-3 bg-[#3ccba0]">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                className="dark:bg-[#2d3a4e]  font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
                key={index}
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-[grey] font-[500] dark:text-white text-[12px]">{item.title}</p>
                  <p
                    className="text-[#3ccba0] text-[11px] font-[600] dark:text-white cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white text-[15px]">
                  {item.message}
                </p>
                <p className="p-2 text-black dark:text-white text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
