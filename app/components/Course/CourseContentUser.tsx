import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
import axios from "axios";
import { getCookie } from "@/app/helper/auth";

type Props = {
  id: string;
  user:any;
};

const CourseContent = ({ id,user }: Props) => {
  // const { data: contentData, isLoading,refetch } = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login')
  // const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);
  const token = getCookie("token")
  const [contentCourse, setContentCourse] = useState<any>(null)
  const [fetchData, setFetchData] = useState(false)

  useEffect(() => {
    loadCoursesByUser();
  }, [fetchData]);

  const loadCoursesByUser = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}/get-course-content/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("PRIVATE PROFILE UPDATE", response);
        setContentCourse(response.data.content);
      })
      .catch((error) => {
        console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
      });
  };
console.log("User cOURSE cONTENT",  contentCourse);

  return (
    <>
      {!contentCourse ? (
        <Loader />
      ) : (
        <>
        
          <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              // title={contentCourse[activeVideo]?.title}
              title="Course itle"

              description="anything"
              keywords="Keyword for course access "
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={contentCourse}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                setFetchData={setFetchData}
                fetchData={fetchData}
                // refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
            <CourseContentList
              setActiveVideo={setActiveVideo}
              data={contentCourse}
              activeVideo={activeVideo}
            />
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
