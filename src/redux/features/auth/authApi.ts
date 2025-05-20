import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
        credentials: "include",
      }),
      invalidatesTags: ["profile"],
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
    profile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    dashboardState: builder.query({
      query: () => ({
        url: "/auth/dashboard",
        method: "GET",
      }),
      providesTags: ["dashboardState"],
    }),
    toggleUserRole: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/user-role",
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useProfileQuery,
  useToggleUserRoleMutation,
  useDashboardStateQuery,
} = authApi;
