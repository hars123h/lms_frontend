"use client";
import React, { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import RechargeComponent from "./UserDetailComponents/RechargeComponent";
import WithdrawalComponent from "./UserDetailComponents/WithdrawalCompenent";
import ReferralHistory from "./UserDetailComponents/ReferralHistory";

type Props = {
  id: string;
};

const UserDetails: FC<Props> = ({ id }) => {
  const { theme, setTheme } = useTheme();
  const [currentActive, setCurrentActive] = useState(0);

  return (
    <>
      <div className="mt-[80px]">
        <div className="pl-[45px] flex font-[500]">
          <div
            className={`${
              currentActive === 0 ? "border-b-[green] border-[2px]" : ""
            }  py-4 px-[30px] cursor-pointer `}
            onClick={() => setCurrentActive(0)}
          >
            Recharge
          </div>
          <div
            className={`${
              currentActive === 1 ? "border-b-[green] border-[2px]" : ""
            }  py-4 px-[30px] cursor-pointer `}
            onClick={() => setCurrentActive(1)}
          >
            Withdrawal
          </div>
          <div
            className={`${
              currentActive === 2 ? "border-b-[green] border-[2px]" : ""
            }  py-4 px-[30px] cursor-pointer `}
            onClick={() => setCurrentActive(2)}
          >
            Refer History
          </div>
          <div
            className={`${
              currentActive === 3 ? "border-b-[green] border-[2px]" : ""
            }  py-4 px-[30px] cursor-pointer `}
            onClick={() => setCurrentActive(3)}
          >
            Course Purchased
          </div>
        </div>

        {currentActive === 0 && <RechargeComponent id={id} />}
        {currentActive === 1 && <WithdrawalComponent id={id} />}
        {currentActive === 2 && <ReferralHistory id={id} />}

      </div>
    </>
  );
};

export default UserDetails;
