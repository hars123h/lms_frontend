import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
// import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
// import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import axios from "axios";
import { getCookie } from "@/app/helper/auth";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const [singleCourse, setSingleCourse] = useState<any>(null)
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const token = getCookie("token");

//   useEffect(() => {
//     if (config) {
//       const publishablekey = config?.publishablekey;
//       setStripePromise(loadStripe(publishablekey));
//     }
//     if (data && userData?.user) {
//       const amount = Math.round(data.course.price * 100);
//       createPaymentIntent(amount);
//     }
//   }, [config, data, userData]);

//   useEffect(() => {
//     if (paymentIntentData) {
//       setClientSecret(paymentIntentData?.client_secret);
//     }
//   }, [paymentIntentData]);

useEffect(() => {
  getSingleCourse();
}, []);

const getSingleCourse = () => {
  axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-course/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("PRIVATE PROFILE UPDATE", response);
      setSingleCourse(response.data.course);
    })
    .catch((error) => {
      console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
    });
};
  return (
    <>
      {!singleCourse ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={singleCourse?.name + " - ELearning"}
            description={
              "ELearning is a programming community which is developed by shahriar sajeeb for helping programmers"
            }
            keywords={singleCourse?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {/* {stripePromise && ( */}
            <CourseDetails
              data={singleCourse}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          {/* )} */}
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
