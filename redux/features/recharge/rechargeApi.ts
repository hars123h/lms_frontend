import { apiSlice } from "../api/apiSlice";

export const rechargesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRecharge: builder.mutation({
      query: (data) => ({
        url: "place-recharge",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateRechargeStatus: builder.mutation({
      query: (data) => ({
        url: "update-recharge-status",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllRecharges: builder.query({
      query: () => ({
        url: "get-recharge-all", 
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUserRecharges: builder.query({
      query: () => ({
        url: "get-recharge-user", 
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {useCreateRechargeMutation, useUpdateRechargeStatusMutation,useGetAllRechargesQuery, useGetUserRechargesQuery } = rechargesApi;
