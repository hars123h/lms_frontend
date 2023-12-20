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
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useGetAllRechargesQuery,
  useUpdateRechargeStatusMutation,
} from "@/redux/features/recharge/rechargeApi";
import axios from "axios";
import { getCookie } from "@/app/helper/auth";

type Props = {};

const AllRecharges: FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  const [rechargeData, setRechargeData] = useState<any>();
  const [rechargeGet, setRechargeGet] = useState<any>(null);
  const { isLoading, data, refetch } = useGetAllRechargesQuery({});
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [updateRechargeStatus, { isLoading: updateLoad, isSuccess, error }] =
    useUpdateRechargeStatusMutation();
  const token = getCookie("token");

  useEffect(() => {
    rechargelAll();
  }, [toggle]);

  const rechargelAll = () => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}get-recharge-all`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Get Recharge All Success", response);
        setRechargeGet(response.data.recharge);
      })
      .catch((error) => {
        console.log("Get Recharge All  ERROR", error.response.data.message);
      });
  };

  useEffect(() => {
    setRechargeData(data?.recharge);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Recharge Status Updated");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleConfirm = async (params: any) => {
    const data = {
      recharge_id: params?.row?.id,
      new_status: "Confirmed",
      recharge_value: params?.row?.amount,
    };

    const updateWithdraw = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}update-recharge-status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then((response) => {
        console.log("Update Recharge Status", response);
        toast.success("Recharge Request Updated");
        setToggle(!toggle);
      })
      .catch((error) => {
        console.log(
          "Update Recharge Status ERROR",
          error.response.data.message
        );
        toast.error(error.response.data.message);
      });

    // if (!updateLoad) {
    //   await updateRechargeStatus(data);
    // }
  };

  const handleReject = async (params: any) => {
    const data = {
      recharge_id: params?.row?.id,
      new_status: "Declined",
      recharge_value: params?.row?.amount,
    };

    const updateWithdraw = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URI}update-recharge-status`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then((response) => {
        console.log("Update Recharge Status", response);
        toast.success("Recharge Request Updated");
        setToggle(!toggle);
      })
      .catch((error) => {
        console.log(
          "Update Recharge Status ERROR",
          error.response.data.message
        );
        toast.error(error.response.data.message);
      });
    // if (!updateLoad) {
    //   await updateRechargeStatus(data);
    // }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "mobile", headerName: "Mobile No.", flex: 0.5 },
    { field: "refno", headerName: "Refrence Id", flex: 0.5 },
    { field: "amount", headerName: "Amount", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.5 },
  ];
  if (status === "Pending") {
    columns.push({
      field: " ",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                handleConfirm(params);
              }}
            >
              <IoCheckmarkCircle
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
            <Button
              onClick={() => {
                handleReject(params);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    });
  }

  const rows: any = [];
  const newData =
    rechargeGet && rechargeGet?.filter((item: any) => item.status == status);

  console.log("New Data", newData);

  newData &&
    newData?.forEach((item: any, index: any) => {
      rows.push({
        id: item?._id,
        mobile: "6387522891",
        refno: item.refno,
        amount: item.recharge_value,
        date: format(item.createdAt),
        action: "action",
      });
    });

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-[150px] ml-[60px]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Declined">Declined</MenuItem>
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
                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid rows={rows} columns={columns} />
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default AllRecharges;
