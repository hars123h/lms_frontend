import { apiSlice } from "../api/apiSlice";

export const withdrawalsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateWithdrawalStatus: builder.mutation({
      query: (data) => ({
        url: "update-withdrawal-status",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addBank: builder.mutation({
      query: (data) => ({
        url: "add-bank",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    createWithdrawal: builder.mutation({
      query: (data) => ({
        url: "place-withdraw",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    addTradePassword: builder.mutation({
      query: (data) => ({
        url: "trade-password",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllWithdrawals: builder.query({
      query: () => ({
        url: "get-withdraw",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUserWithdrawals: builder.query({
      query: () => ({
        url: "get-user-withdrawal",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateWithdrawalStatusMutation,
  useGetAllWithdrawalsQuery,
  useAddTradePasswordMutation,
  useAddBankMutation,
  useCreateWithdrawalMutation,
  useGetUserWithdrawalsQuery,
} = withdrawalsApi;
