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
const ReferralHistory: FC<Props> = ({ id }) => {
  const [userWithdrawal, setUserWithdrwal] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [allUserData, setAllUserData] = useState<any>(null);
  const [levelData, setLevelData] = useState("parent_invt");

  const { theme, setTheme } = useTheme();
  const token = getCookie("token");

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = () => {
    axios({
      method: "Get",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { userId: id },
    })
      .then((response) => {
        console.log("Get All User    Success", response);
        setAllUserData(response.data.users);
      })
      .catch((error) => {
        console.log("Get All User   ERROR", error.response.data.message);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-single-user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { userId: id },
    })
      .then((response) => {
        console.log("Get User  Success", response);
        setUserData(response.data.user);
      })
      .catch((error) => {
        console.log("Get  User   ERROR", error.response.data.message);
      });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "earning", headerName: "Earning", flex: 0.5 },
    { field: "recharge_amount", headerName: "Total Recharge", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.6 },
  ];
  const rows: any = [];
  const newData =
    allUserData &&
    allUserData?.filter(
      (item: any) => item[levelData] == userData?.user_invite
    );
  console.log("Level 1 Data", newData);

  newData &&
    newData?.forEach((item: any, index: any) => {
      rows.push({
        id: index + 1,
        email: item.email,
        earning: item.earning,
        name: item.name,
        recharge_amount: item.recharge_amount,
        date: new Date(item?.createdAt).toLocaleString(undefined, {
          timeZone: "Asia/Kolkata",
        }),
      });
    });
  return (
    <>
      <div className="mt-[5px]">
        {!allUserData ? (
          <Loader />
        ) : (
          <>
            <div className="ml-[40px] w-[200px]">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={levelData}
                  label="Level"
                  onChange={(e) => setLevelData(e.target.value)}
                >
                  <MenuItem value="parent_invt">Level 1</MenuItem>
                  <MenuItem value="grand_parent_invt">Level2</MenuItem>
                  <MenuItem value="great_grand_parent_invt">Level3</MenuItem>
                </Select>
              </FormControl>
            </div>
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

export default ReferralHistory;
