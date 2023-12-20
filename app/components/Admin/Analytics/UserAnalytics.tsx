import { styles } from "@/app/style/style";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { FC, useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import axios from 'axios';
import { getCookie } from "@/app/helper/auth";

type Props = {
  isDashboard?: boolean;
}



const UserAnalytics = ({isDashboard}:Props) => {
  // const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const [userData, setUserData] = useState<any>(null);
  const token  = getCookie("token");

  useEffect(() => {
    userAnalytics()
  }, [])

  const userAnalytics = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-users-analytics`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get User Analytics", response);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log("Get User Analytics  ERROR", error.response.data.message);
      });
  };

 

 const analyticsData: any = [];

 userData &&
 userData?.users?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });


  return (
    <>
      {
        !userData ? (
            <Loader />
        ) : (
            <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
            <div className={`${isDashboard ? "!ml-8 mb-5" : ''}`}>
            <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
               Users Analytics
             </h1>
             {
               !isDashboard && (
                 <p className={`${styles.label} px-5`}>
                 Last 12 months analytics data{" "}
               </p>
               )
             }
            </div>

         <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
           <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? "50%" : '100%'}>
             <AreaChart
               data={analyticsData}
               margin={{
                 top: 20,
                 right: 30,
                 left: 0,
                 bottom: 0,
               }}
             >
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Area
                 type="monotone"
                 dataKey="count"
                 stroke="#4d62d9"
                 fill="#4d62d9"
               />
             </AreaChart>
           </ResponsiveContainer>
         </div>
       </div>
        )
      }
    </>
  )
}

export default UserAnalytics