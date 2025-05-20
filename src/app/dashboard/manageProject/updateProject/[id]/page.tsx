/* eslint-disable @next/next/no-img-element */
"use client";
import Loading from "@/components/Shared/Loading";
import SectionTitle from "@/components/Shared/SectionTitle";
import Tags from "@/components/Shared/Tags";
import TextEditor from "@/components/Shared/TextEditor";
import {
  useGetSingleProjectDetailsQuery,
  useUpdateProjectMutation,
} from "@/redux/features/project/projectApi";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Swal from "sweetalert2";

interface ProjectData {
  title: string;
  image: string;
  live_link: string;
  git_client: string;
  git_server: string;
  category: string;
  summary: string;
  documentation: string;
  tags: string[];
  uploadTime?: string;
  uploadDate?: string;
}

const UpdateProject = ({ params }: { params: Promise<{ id: string }> }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [projectId, setProjectId] = useState<string>("");
  const { data: project, refetch: refetchProject } =
    useGetSingleProjectDetailsQuery(projectId, {
      skip: !projectId,
      refetchOnReconnect: true,
    });
  const [updateProject, { isLoading: updateing }] = useUpdateProjectMutation();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { id } = await params;
        setProjectId(id);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (project?.data) {
      setTags(project?.data?.tags);
      setValue(project?.data?.documentation);
      setImage(project?.data?.image);
      setProjectData(project?.data);
      setIsLoading(false);
    }
  }, [project]);

  const allTags = (e: string[]) => {
    setTags(e);
  };

  const { handleSubmit, register, reset } = useForm();

  const dragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const dragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const dragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const imageFileDrop = async (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setImageLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
      method: "POST",
      body: data,
    });
    const file = await res.json();

    const field = "thumbnail";
    const value = file.secure_url;
    const newProjectData = { ...projectData } as ProjectData;
    newProjectData[field as keyof ProjectData] = value;
    setProjectData(newProjectData);

    setImage(file.secure_url);
    setImageLoading(false);
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setImageLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
      method: "POST",
      body: data,
    });
    const file = await res.json();
    // const field = e.target.name;
    // const value = file.secure_url;
    setImage(file.secure_url);
    setImageLoading(false);
  };

  const submitHandler: SubmitHandler<FieldValues> = async (info) => {
    setIsLoading(true);
    const data = {
      title: info?.title || projectData?.title,
      category: info?.category || projectData?.category,
      live_link: info?.live_link || projectData?.live_link,
      git_client: info?.git_client || projectData?.git_client,
      git_server: info?.git_server || projectData?.git_server,
      summary: info?.summary || projectData?.summary,
      documentation: value,
      uploadTime: projectData?.uploadTime,
      uploadDate: projectData?.uploadDate,
      image,
      tags,
    };

    try {
      const result = await updateProject({
        id: project?.data?._id,
        data: data,
      }).unwrap();
      if (!result.success) {
        Swal.fire({
          title: "Oops!",
          text: result?.data?.err,
          icon: "error",
        });
        setIsLoading(false);
      } else {
        reset();
        // router.push("/login");
        Swal.fire({
          title: "Success!",
          text: "Project Updated Successfully!",
          icon: "success",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Swal.fire({
        title: "Oops!",
        text: "Something Went Wrong!",
        icon: "error",
      });
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed top-5 ml-[-20px] mt-[-20px] z-10 bg-[#0a2025a8] w-full h-screen">
          <div className="fixed pl-[40%] top-[55%]">
            <Loading></Loading>
          </div>
        </div>
      )}
      <div className="container mx-auto px-3">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="my-5 rounded shadow-xl bg-slate-100 p-6"
        >
          <SectionTitle title={"Add Project"} />
          <div className="mt-5 grid grid-cols-12 gap-3">
            {/* Profile Photo Update Handling  */}
            <label className="col-span-12 flex flex-col md:col-span-6">
              Upload Room Photo
              <div className="rounded-lg border-2 border-dotted border-gray-400 p-3 text-center">
                <div
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={imageFileDrop}
                >
                  <div className="">
                    {imageLoading && (
                      <div>
                        <img
                          className="mx-auto animate-ping"
                          style={{ height: "50px", width: "50px" }}
                          src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                          alt=""
                        />
                        <p className="text-xl text-gray-400">Loading ...</p>
                      </div>
                    )}
                    {!imageLoading && (
                      <div>
                        <img
                          className="mx-auto animate-pulse"
                          style={{ height: "50px", width: "50px" }}
                          src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                          alt=""
                        />
                        <p className="text-md text-gray-400">
                          Drag & Drop room photo
                        </p>
                      </div>
                    )}
                    <p className="py-4">
                      <span className="rounded-lg bg-gray-400 px-2 py-2 font-semibold">
                        Browse File
                      </span>
                    </p>
                  </div>
                </div>
                <input
                  className="hidden"
                  type="file"
                  name="thumbnail"
                  placeholder="upload"
                  onChange={uploadImage}
                />
              </div>
            </label>
          </div>
          <div className="grid grid-cols-12 gap-3 py-2">
            <div className="col-span-12 flex flex-col  md:col-span-6">
              <label htmlFor="title">Title</label>
              <input
                required
                placeholder="Title"
                className="h-14 w-full rounded-md border-2 p-3 text-lg"
                type="text"
                defaultValue={projectData?.title}
                {...register("title")}
              />
            </div>
            <div className="col-span-12 flex flex-col  md:col-span-6">
              <label htmlFor="category">Category</label>
              <input
                required
                placeholder="Please enter a category"
                className="h-14 w-full rounded-md border-2 p-3 text-lg form-control"
                type="text"
                defaultValue={projectData?.category}
                {...register("category")}
              />
            </div>
            <div className="col-span-12 flex flex-col  md:col-span-6">
              <label htmlFor="live_link">Live Link</label>
              <input
                placeholder="Please enter live link"
                className="h-14 w-full rounded-md border-2 p-3 text-lg form-control"
                type="text"
                defaultValue={projectData?.live_link}
                {...register("live_link")}
              />
            </div>
            <div className="col-span-12 flex flex-col  md:col-span-6">
              <label htmlFor="git_client">Git Link Client</label>
              <input
                placeholder="Please enter git client link"
                className="h-14 w-full rounded-md border-2 p-3 text-lg form-control"
                type="text"
                defaultValue={projectData?.git_client}
                {...register("git_client")}
              />
            </div>
            <div className="col-span-12 flex flex-col  md:col-span-6">
              <label htmlFor="git_server">Git Link Server</label>
              <input
                placeholder="Please enter git server link"
                className="h-14 w-full rounded-md border-2 p-3 text-lg form-control"
                type="text"
                defaultValue={projectData?.git_server}
                {...register("git_server")}
              />
            </div>
            <div className="col-span-12 flex flex-col  md:col-span-6">
              <label htmlFor="summary">Summary</label>
              <textarea
                required
                placeholder="Please enter summary"
                className="w-full rounded-md border-2 p-3 text-lg form-control"
                rows={5}
                defaultValue={projectData?.summary}
                {...register("summary")}
              />
            </div>
          </div>
          {/* Text editor */}
          <div className="py-4">
            <h2 className="mb-2 text-xl text-gray-900">
              Write your documentation below 🌝
            </h2>
            <div className="bg-white text-black">
              <TextEditor value={value} setValue={setValue}></TextEditor>
            </div>
          </div>
          {/* Add Tags */}
          <div>
            <Tags allTags={allTags} tags={tags} setTags={setTags}></Tags>
          </div>
          <span className="">
            <input
              type="submit"
              className="bg-[var(--primaryColor4)] hover:bg-[var(--primaryColor3)] border border-[var(--primaryColor3)] hover:border-[var(--primaryColor4)] text-[var(--primaryColor2)] hover:text-[var(--primaryColor4)] font-bold py-2 px-4 rounded-lg inline-flex items-center shadow-lg transition-all duration-700 cursor-pointer"
              value="Add Project"
            />
          </span>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
