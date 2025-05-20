"use client";

import Loading from "@/components/Shared/Loading";
import ShowSkills from "@/components/Skills/ShowSkills";
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
  useGetAllSkillQuery,
} from "@/redux/features/skill/skillApi";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface Skill {
  _id: string;
  name: string;
  iconName: string;
  iconLibrary: string;
  iconColor: string;
  skillType: "technical" | "soft";
}

const ICON_LIBRARIES = [
  { name: "Font Awesome", prefix: "fa", description: "FaReact, FaJs, etc." },
  {
    name: "Simple Icons",
    prefix: "si",
    description: "SiTypescript, SiTailwindcss, etc.",
  },
  { name: "Lucide", prefix: "lu", description: "LuBicepsFlexed, etc." },
  {
    name: "Material Design",
    prefix: "md",
    description: "MdSelfImprovement, etc.",
  },
];

const COMMON_COLORS = [
  { name: "Blue", value: "text-blue-500" },
  { name: "Red", value: "text-red-500" },
  { name: "Green", value: "text-green-500" },
  { name: "Yellow", value: "text-yellow-500" },
  { name: "Purple", value: "text-purple-500" },
  { name: "Pink", value: "text-pink-500" },
  { name: "Gray", value: "text-gray-700" },
  { name: "Cyan", value: "text-cyan-500" },
  { name: "Indigo", value: "text-indigo-600" },
  { name: "Orange", value: "text-orange-600" },
];

export default function AdminSkillForm() {
  const {
    data: skills,
    refetch: skillRefetch,
    isLoading: loading,
  } = useGetAllSkillQuery(undefined, {
    refetchOnReconnect: true,
  });

  const [deleteSkill, { isLoading: deleteLoading }] = useDeleteSkillMutation();
  const [createSkill, { isLoading }] = useCreateSkillMutation();

  const [formData, setFormData] = useState({
    name: "",
    iconName: "",
    iconLibrary: "fa",
    iconColor: "text-gray-700",
    skillType: "technical" as "technical" | "soft",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createSkill(formData).unwrap();

      if (!res.success) {
        toast.error(res?.data?.err || "Failed to add skill");
        return;
      }

      setFormData({
        name: "",
        iconName: "",
        iconLibrary: "fa",
        iconColor: "text-gray-700",
        skillType: "technical",
      });

      toast.success("Skill added successfully!");
      skillRefetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSkill(id).unwrap();
      if (res.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Skill has been deleted.",
          icon: "success",
        });
        skillRefetch();
      }
    } catch (error) {
      toast.error("Failed to delete skill!");
    }
  };

  return (
    <div className="relative mb-10">
      {(isLoading || deleteLoading) && (
        <div className="absolute w-full h-full overflow-hidden bg-[#0000002d]">
          <div className="w-full h-[90vh] flex items-center justify-center">
            <Loading />
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Manage Skills</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Skill Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="skillType">
                Skill Type
              </label>
              <select
                id="skillType"
                name="skillType"
                value={formData.skillType}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="technical">Technical Skill</option>
                <option value="soft">Soft Skill</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="iconLibrary">
                Icon Library
              </label>
              <select
                id="iconLibrary"
                name="iconLibrary"
                value={formData.iconLibrary}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                {ICON_LIBRARIES.map((lib) => (
                  <option key={lib.prefix} value={lib.prefix}>
                    {lib.name} ({lib.prefix})
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <FaInfoCircle className="mr-1" />
                {
                  ICON_LIBRARIES.find(
                    (lib) => lib.prefix === formData.iconLibrary
                  )?.description
                }
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="iconName">
                Icon Name
              </label>
              <input
                type="text"
                id="iconName"
                name="iconName"
                value={formData.iconName}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder="e.g., FaReact, SiTypescript"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter exact icon component name (case-sensitive)
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="iconColor">
                Icon Color
              </label>
              <select
                id="iconColor"
                name="iconColor"
                value={formData.iconColor}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                {COMMON_COLORS.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.name} ({color.value})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Current Skills</h2>

        {loading ? (
          <p>Loading skills...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Icon</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-2 text-center">
                      No skills added yet
                    </td>
                  </tr>
                ) : (
                  skills?.data?.map((skill: Skill) => (
                    <tr key={skill._id} className="border-t">
                      <td className="px-4 py-2">{skill.name}</td>
                      <td className="px-4 py-2 capitalize">
                        {skill.skillType}
                      </td>
                      <td className="px-4 py-2">
                        {skill.iconLibrary}:{skill.iconName}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDelete(skill._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ShowSkills skills={skills} />
    </div>
  );
}
