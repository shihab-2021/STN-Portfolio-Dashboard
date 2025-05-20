"use client";
import Loading from "@/components/Shared/Loading";
import { useGetSingleBlogDetailsQuery } from "@/redux/features/blog/blogApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
interface BlogData {
  title: string;
  category: string;
  documentation: string;
  image: string;
  tags: string[];
  uploadTime?: string;
  uploadDate?: string;
}

export default function BlogDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogId, setBlogId] = useState<string>("");
  const { data: blog, refetch: refetchBlog } = useGetSingleBlogDetailsQuery(
    blogId,
    {
      skip: !blogId,
      refetchOnReconnect: true,
    }
  );
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { id } = await params;
        setBlogId(id);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (blog?.data) {
      setBlogData(blog?.data);
      setIsLoading(false);
    }
  }, [blog]);
  return (
    <div>
      {isLoading && (
        <div
          style={{ height: "30vh" }}
          className="flex justify-center items-center"
        >
          <Loading />
        </div>
      )}
      {!isLoading && (
        <div>
          {blogData?.image && (
            <Image
              className="w-full object-cover max-h-[40vh]"
              src={blogData?.image}
              alt="Blog image"
              width={500}
              height={300}
            />
          )}
          <div className="flex justify-between items-center">
            <p className="text-2xl line-clamp-2 font-semibold capitalize text-sky-900">
              {blogData?.title}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="line-clamp-3 text-slate-500 my-2 text-sm">
              {/* {lastCommitData?.commit?.message} */}
              {blogData?.category}
            </p>
            <p className="flex items-center gap-2 text-[var(--primaryColor1)] font-semibold ">
              <MdOutlineDateRange className="text-green-600" />
              {blogData?.uploadDate} {blogData?.uploadTime}
            </p>
          </div>
          {blogData?.documentation && (
            <div
              dangerouslySetInnerHTML={{ __html: blogData?.documentation }}
            />
          )}
          <h1 className="text-xl mt5">Tags</h1>
          <p className="line-clamp-1 text-slate-500 py-2 text-sm mb-5">
            {blogData?.tags?.length === 0 && "Tags not added!"}
            {blogData?.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-xl bg-[var(--primaryColor3)] text-[var(--primaryColor4)] mr-1"
              >
                {tag}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
