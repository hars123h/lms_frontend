import { styles } from "@/app/style/style";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { getCookie } from "@/app/helper/auth";

type Props = {
  isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: Props) {

  const [orderData, setOrderData] = useState<any>(null);
  const token = getCookie("token");

  useEffect(() => {
    orderAnalytics()
  }, [])

  const orderAnalytics = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-orders-analytics`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get Order Analytics", response);
        setOrderData(response.data);
      })
      .catch((error) => {
        console.log("Get Order Analytics  ERROR", error.response.data.message);
      });
  };


  const analyticsData: any = [];

  orderData &&
  orderData?.orders?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item.name, Count: item.count });
    });

  return (
    <>
      {!orderData ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
