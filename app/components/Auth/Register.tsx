"use client";
import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { log } from "console";
import { toast } from "react-hot-toast";
import { styles } from "@/app/style/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

type Props = {
  authVerify: boolean;
  setAuthVerify: (open: boolean) => void;
  authActive: boolean;
  setAuthActive: (open: boolean) => void;
  authLogin: boolean;
  setAuthLogin: (open: boolean) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Register: FC<Props> = ({
  authVerify,
  setAuthVerify,
  authActive,
  setAuthActive,
  authLogin,
  setAuthLogin,
}) => {
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setAuthActive(false);
      setAuthLogin(false);
      setAuthVerify(true);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mt-[45px] 1200px:w-[85%]">
          <div className="my-3">
            <input
              type="text"
              name=""
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Name"
              className={`${
                errors.name && touched.name && "border-red-500 border"
              } ${styles.input}`}
            />

            {errors.name && touched.name && (
              <span className="text-red-500 pt-2 block">{errors.name}</span>
            )}
          </div>
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

          <button className={`${styles.button} w-full`} type="submit">
            Register Now
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
