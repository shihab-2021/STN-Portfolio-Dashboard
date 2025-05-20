import { baseApi } from "@/redux/api/baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation({
      query: (skillData) => ({
        url: "/skills",
        method: "POST",
        body: skillData,
      }),
      invalidatesTags: ["skills"],
    }),
    getAllSkill: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
      providesTags: ["skills"],
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skills"],
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useGetAllSkillQuery,
  useDeleteSkillMutation,
} = skillApi;
