"use client";
import { styles } from "@/app/style/style";
import React, { FC, useState, useEffect } from "react";
import { useAddBankMutation } from "@/redux/features/withdrawal/withdrawalsApi";
import { toast } from "react-hot-toast";
import BannerImage from "../../../public/assests/heroBanner.jpg";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { getCookie, isAuth, updateUser } from "@/app/helper/auth";
import axios from "axios";

type Props = {
  user: any;
};

const BankCard: FC<Props> = ({ user }) => {
  // const [bankDetails, setBankDetails] = useState({
  //   bankName:'',
  //   bankAccount:'',
  //   cardHolderName:'',
  //   ifsc:'',
  //   mobileNumber:''
  // })
  const [bankAccount, setBankAccount] = useState<number>();
  const [bankName, setBankName] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addBank, { isLoading, isSuccess, error }] = useAddBankMutation();
  const [active, setActive] = useState(false);
  const [toggleSwitch, setToggleSwitch] = useState(false);

  const [detailBank, setDetailBank] = useState<any>(null);
  
  const token = getCookie("token");


  const {
    data: userData,
    isLoading: loadUser,
    refetch,
  } = useLoadUserQuery(undefined, {});

useEffect(() => {
  setDetailBank(isAuth())
}, [toggleSwitch])

  useEffect(() => {
    console.log("User Log", user);

    if (isSuccess) {
      toast.success("Bank Added Successfully");
      refetch();
      setActive(false);

      // router.push("/deposit/records");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleAddBank = async (event: any) => {
    event.preventDefault();
    if (
      !bankAccount ||
      !bankName ||
      !cardHolderName ||
      !ifsc ||
      !mobileNumber
    ) {
      return toast.error("Please Fill All The Fields");
    }
    const data = {
      bankAccount,
      bankName,
      cardHolderName,
      ifsc,
      mobileNumber,
    };

    const updateData = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}add-bank`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data
    })
      .then((response) => {
        console.log("Add Bank Success", response);
        updateUser(response, () => {
          toast.success("Bank Added Successfully");
          setDetailBank(response.data.user);
          setActive(false);
          setToggleSwitch(!toggleSwitch)
          // setDataUser(response.data.user)
          // setCheck(!check);
        });
      }) 
      .catch((error) => {
        console.log("Add Bank  Error", error.response.data.error);
        // setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });

    // if (!isLoading) {
    //   await addBank(data);
    // }
  };

  const handleActive = () => {
    setActive(true);
  };

  return (
    <>
      <div className=" mt-[40px] 1200px:px-[120px]">
        {active ? (
          <>
            <form>
              <div className=" mt-[25px]">
                <div>
                  <label htmlFor="" className={`${styles.label}`}>
                    Bank IFSC
                  </label>
                  <input
                    type="text"
                    name=""
                    required
                    value={ifsc}
                    id="name"
                    placeholder="IFSC"
                    onChange={(e) => setIfsc(e.target.value)}
                    className={`${styles.input}`}
                  />
                </div>
                <div>
                  <label htmlFor="" className={`${styles.label}`}>
                    Bank Name
                  </label>
                  <input
                    type="string"
                    name=""
                    id="bankname"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Bank Name"
                    className={`${styles.input}`}
                  />
                </div>

                <div>
                  <label htmlFor="" className={`${styles.label}`}>
                    Card Holder
                  </label>
                  <input
                    type="text"
                    name=""
                    value={cardHolderName}
                    id="email"
                    onChange={(e) => setCardHolderName(e.target.value)}
                    placeholder="Card Holder Name"
                    className={`${styles.input}`}
                  />
                </div>

                <div>
                  <label htmlFor="" className={`${styles.label}`}>
                    Bank Account Number
                  </label>
                  <input
                    type="number"
                    name=""
                    value={bankAccount}
                    onChange={(e) => setBankAccount(Number(e.target.value))}
                    id="bankaccount"
                    placeholder="Bank Account Number"
                    className={`${styles.input}`}
                  />
                </div>

                <div>
                  <label htmlFor="" className={`${styles.label}`}>
                    Mobile Number
                  </label>
                  <input
                    type="string"
                    name=""
                    id="mobile"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Mobile Number"
                    className={`${styles.input}`}
                  />
                </div>
              </div>
              <button
                className={`${styles.button} my-[30px]`}
                type="submit"
                onClick={handleAddBank}
              >
                Add Card
              </button>
            </form>
          </>
        ) : (
          <>
            {detailBank?.bankDetails ? (
              <>
                <div className=" mb-[70px] h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
                  <img
                    className="relative object-cover w-full h-full rounded-xl"
                    src={BannerImage.src}
                  />

                  <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                      <div className="">
                        <p className="font-light">Name</p>
                        <p className="font-medium tracking-widest">
                          {detailBank?.bankDetails?.cardHolderName}
                        </p>
                      </div>
                      <img
                        className="w-14 h-14"
                        src="https://i.imgur.com/bbPHJVe.png"
                      />
                    </div>
                    <div className="pt-1">
                      <p className="font-light">Card Number</p>
                      <p className="font-medium tracking-more-wider">
                        {detailBank?.bankDetails?.bankAccount}
                      </p>
                    </div>
                    <div className="pt-6 pr-6">
                      <div className="flex justify-between">
                        <div className="">
                          <p className="font-light text-xs">IFSC CODE</p>
                          <p className="font-medium tracking-wider text-sm">
                            {detailBank?.bankDetails?.ifsc}
                          </p>
                        </div>
                        <div className="">
                          <p className="font-light text-xs text-xs">
                            Bank Name
                          </p>
                          <p className="font-medium tracking-wider text-sm">
                            {detailBank?.bankDetails?.bankName}
                          </p>
                        </div>

                        <div className="">
                          <p className="font-light text-xs">Mobile Number</p>
                          <p className="font-bold tracking-more-wider text-sm">
                            {detailBank?.bankDetails?.mobileNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className={`${styles.button} w-full mb-[25px]`}
                  onClick={handleActive}
                >
                  Add Bank Card
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${styles.button} w-full mb-[25px]`}
                  onClick={handleActive}
                >
                  Add Bank Card
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BankCard;
