import { baseApi } from "@/redux/api/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (messageData) => ({
        url: "/messages",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: ["messages"],
    }),
    getAllMessage: builder.query({
      query: () => ({
        url: "/messages",
        method: "GET",
      }),
      providesTags: ["messages"],
    }),
    getSingleMessageDetails: builder.query({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    updateMessage: builder.mutation({
      query: (messageData) => ({
        url: `/messages/${messageData?.id}`,
        method: "PATCH",
        body: messageData?.data,
      }),
      invalidatesTags: ["messages", "message"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["messages"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetAllMessageQuery,
  useGetSingleMessageDetailsQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
