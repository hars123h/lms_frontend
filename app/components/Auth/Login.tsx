"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { styles } from "@/app/style/style";
import { useSelector } from "react-redux";
import axios from "axios";
import { authenticate } from "@/app/helper/auth";
import { useRouter } from "next/navigation";

type Props = {};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = () => {
  const [login, { data: commingData, isSuccess, error }] = useLoginMutation();
  const { data } = useSession();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URI}login`,
        data: { email, password },
      })
        .then((response) => {
          console.log("SIGNIN SUCCESS", response);
          // save the response (user, token) localstorage/cookie
          authenticate(response, () => {
            toast.success("Login Successfully!");
            router.push("/profile")
            // redirect("/profile");
          });
        })
        .catch((error) => {
          console.log("SIGNIN ERROR", error.response.data.message);
          toast.error(error.response.data.message);
        });
      // await login({ email, password });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mt-[45px] 1200px:w-[85%]">
          <div className="my-3">
            <input
              type="email"
              name=""
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="Email"
              className={`${
                errors.email && touched.email && "border-red-500 border"
              } ${styles.input}`}
            />

            {errors.email && touched.email && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
          </div>

          <div className="my-3">
            <input
              type="Password"
              name=""
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="Password"
              className={`${
                errors.password && touched.password && "border-red-500 border"
              } ${styles.input}`}
            />
            {errors.password && touched.password && (
              <span className="text-red-500 pt-2 block">{errors.password}</span>
            )}
          </div>

          <button className={`${styles.button} w-full`}>Login Now</button>
        </div>
      </form>
    </>
  );
};

export default Login;
