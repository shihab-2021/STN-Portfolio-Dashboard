import { baseApi } from "@/redux/api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectData) => ({
        url: "/projects",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["projects"],
    }),
    getAllProject: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    getSingleProjectDetails: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    updateProject: builder.mutation({
      query: (projectData) => ({
        url: `/projects/${projectData?.id}`,
        method: "PATCH",
        body: projectData?.data,
      }),
      invalidatesTags: ["projects", "project"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectQuery,
  useGetSingleProjectDetailsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
