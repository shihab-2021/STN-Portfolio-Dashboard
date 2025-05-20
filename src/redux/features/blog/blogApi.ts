import { baseApi } from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blogs",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: ["blogs"],
    }),
    getAllBlog: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    getSingleBlogDetails: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: (blogData) => ({
        url: `/blogs/${blogData?.id}`,
        method: "PATCH",
        body: blogData?.data,
      }),
      invalidatesTags: ["blogs", "blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogQuery,
  useGetSingleBlogDetailsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
