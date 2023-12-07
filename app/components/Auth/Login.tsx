"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { log } from "console";
import { toast } from "react-hot-toast";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { styles } from "@/app/style/style";

type Props = {
  refetch:any;
};


const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({refetch}) => {
  const [login, { isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
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

          <button className={`${styles.button} w-full`}>
            Login Now
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
