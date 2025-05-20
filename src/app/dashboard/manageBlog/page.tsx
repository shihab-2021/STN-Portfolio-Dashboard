"use client";
import Loading from "@/components/Shared/Loading";
import SectionTitle from "@/components/Shared/SectionTitle";
import Link from "next/link";
import Swal from "sweetalert2";
import { MdOutlineDateRange } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery,
} from "@/redux/features/blog/blogApi";

const ManageBlog: React.FC = () => {
  const {
    data: blogs,
    refetch: blogRefetch,
    isLoading,
  } = useGetAllBlogQuery({
    refetchOnReconnect: true,
  });
  const [deleteBlog] = useDeleteBlogMutation();

  const deleteItem = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBlog(id).unwrap();
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your blog has been deleted.",
            icon: "success",
          });
          blogRefetch();
        }
      }
    });
  };

  return (
    <div id="blogs" className="my-5">
      <div>
        <div className="flex items-center justify-between">
          <SectionTitle title="Manage Blog" />
          <Link href={`/dashboard/manageBlog/addBlog`}>
            <button className="p-2 bg-gray-700 text-white rounded-md mr-2 cursor-pointer">
              Add New Blog
            </button>
          </Link>
        </div>
        <div>
          {isLoading && (
            <div
              style={{ height: "30vh" }}
              className="flex justify-center items-center"
            >
              <Loading />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4">
            {!isLoading &&
              blogs?.data?.map((blog: any, index: number) => (
                <div
                  key={index}
                  className="h-fit transition-all duration-300  rounded-lg backdrop-blur shadow-md hover:shadow-xl  relative group overflow-hidden font-[Arima]"
                >
                  <div className="p-6 rounded-lg">
                    <div className="w-16 h-16 bg-[var(--primaryColor3)] rounded-full absolute -right-5 -top-7">
                      <p className="absolute bottom-1 left-4 text-white text-lg">
                        {index < 9 && "0"}
                        {index + 1}
                      </p>
                    </div>
                    <div className=" h-44 flex flex-col justify-between font-[Arima]">
                      <div className="mb-1">
                        <Link
                          href={`/dashboard/manageBlog/updateBlog/${blog?._id}`}
                        >
                          <button className="p-2 bg-green-300 text-green-700 rounded-md mr-2">
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteItem(blog?._id)}
                          className="p-2 bg-red-300 text-red-700 rounded-md"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <p className="text-xl line-clamp-2 font-semibold capitalize text-sky-900">
                            {/* {blog?.name?.replaceAll(".md", " ")} */}
                            {blog?.title}
                          </p>
                        </div>
                        <p className="line-clamp-3 text-slate-500 my-2 text-sm">
                          {/* {lastCommitData?.commit?.message} */}
                          {blog?.category}
                        </p>
                        <p className="line-clamp-1 text-slate-500 py-2 text-sm mb-0.5">
                          {blog?.tags?.length === 0 && "Tags not added!"}
                          {blog?.tags?.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-xl bg-[var(--primaryColor3)] text-[var(--primaryColor4)] mr-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </p>
                        <p className="flex items-center gap-2 text-[var(--primaryColor1)] font-semibold ">
                          <MdOutlineDateRange className="text-green-600" />
                          {blog?.uploadDate} {blog?.uploadTime}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/manageBlog/blogDetails/${blog?._id}`}
                      className="absolute bottom-0 right-0 bg-[var(--primaryColor4)] p-2 rounded-tl-lg rounded-br-lg flex justify-center items-center transition-colors duration-700 group-hover:bg-[var(--primaryColor3)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="15"
                        width="15"
                        className="transform transition-transform duration-200 group-hover:translate-x-1 fill-[var(--primaryColor3)] group-hover:fill-white"
                      >
                        <path
                          // fill="var(--primaryColor2)"
                          d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;
