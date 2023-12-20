import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/style/style";
import axios from "axios";
import { getCookie } from "@/app/helper/auth";

type Props = {};
 
const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});
  const [dataCoaurse, setDataCourse] = useState<any>(null)
  const token = getCookie("token")

  // const analyticsData = [
  //     { name: 'Jun 2023', uv: 3 },
  //     { name: 'July 2023', uv: 2 },
  //     { name: 'August 2023', uv: 5 },
  //     { name: 'Sept 2023', uv: 7 },
  //     { name: 'October 2023', uv: 2 },
  //     { name: 'Nov 2023', uv: 5 },
  //     { name: 'December 2023', uv: 7 },
  //   ];

  useEffect(() => {
    courseAnalytics()
  }, [])

  const courseAnalytics = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-courses-analytics`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get Course Analytics", response);
        setDataCourse(response.data);
      })
      .catch((error) => {
        console.log("Get Course Analytics  ERROR", error.response.data.message);
      });
  };


  const analyticsData: any = [];

  dataCoaurse &&
  dataCoaurse?.courses?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  return (
    <>
      {!dataCoaurse ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data{" "}
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
