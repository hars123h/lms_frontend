"use client";
import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { SelectChangeEvent } from "@mui/material/Select";
import { IoCheckmarkCircle } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes";
import Loader from "@/app/components/Loader/Loader";
import { format } from "timeago.js";
import axios from "axios";
import { getCookie } from "@/app/helper/auth";

type Props = {
  id: string;
};
const RechargeComponent: FC<Props> = ({ id }) => {
  const [userRecharge, setUserRecharge] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const token = getCookie("token");
  useEffect(() => {
    loadUserRecharge();
  }, []);

  const loadUserRecharge = () => {
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-recharge-admin`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { userId: id },
    })
      .then((response) => {
        console.log("Get User Success", response);
        setUserRecharge(response.data.recharge);
      })
      .catch((error) => {
        console.log("Get Recharge All  ERROR", error.response.data.message);
      });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "refno", headerName: "Refrence Id", flex: 0.5 },
    { field: "amount", headerName: "Amount", flex: 0.5 },
    { field: "status", headerName: "Status", flex: 0.5 },

    { field: "date", headerName: "Date", flex: 0.5 },
  ];
  const rows: any = [];
  console.log("User Data", userRecharge);

  userRecharge &&
    userRecharge?.forEach((item: any, index: any) => {
      rows.push({
        id: index + 1,
        refno: item.refno,
        amount: item.recharge_value,
        status: item.status,

        date: new Date(item?.createdAt).toLocaleString(undefined, {
          timeZone: "Asia/Kolkata",
        }),
      });
    });
  return (
    <>
      <div className="mt-[5px]">
        {!userRecharge ? (
          <Loader />
        ) : (
          <>
            <Box m="20px">
              <Box
                m="40px 0 0 0"
                height="80vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                    outline: "none",
                  },
                  "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-row": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderBottom:
                      theme === "dark"
                        ? "1px solid #ffffff30!important"
                        : "1px solid #ccc!important",
                  },
                  "& .MuiTablePagination-root": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none!important",
                  },
                  "& .name-column--cell": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                    borderBottom: "none",
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderTop: "none",
                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  },
                  "& .MuiCheckbox-root": {
                    color:
                      theme === "dark"
                        ? `#b7ebde !important`
                        : `#000 !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `#fff !important`,
                  },
                }}
              >
                <DataGrid rows={rows} columns={columns} className="pl-[25px]" />
              </Box>
            </Box>
          </>
        )}
      </div>
    </>
  );
};

export default RechargeComponent;
