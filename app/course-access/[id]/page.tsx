"use client";
import CourseContentUser from "@/app/components/Course/CourseContentUser";
import Loader from "@/app/components/Loader/Loader";
import { getCookie } from "@/app/helper/auth";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {});
  const [userData, setUserData] = useState<any>(null);
  const token = getCookie("token");
  useEffect(() => {
    loadProfile();
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
        console.log("PRIVATE PROFILE UPDATE", response);
        setUserData(response.data.user);
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
      });
  };

  //   useEffect(() => {
  //     if (data) {
  //       const isPurchased = data.user.courses.find(
  //         (item: any) => item._id === id
  //       );
  //       if (!isPurchased) {
  //         redirect("/");
  //       }
  //     }
  //     if (error) {
  //       redirect("/");
  //     }
  //   }, [data,error]);

  return (
    <>
      {!userData ? (
        <Loader />
      ) : (
        <div>
          <CourseContentUser id={id} user={userData} />
        </div>
      )}
    </>
  );
};

export default Page;
