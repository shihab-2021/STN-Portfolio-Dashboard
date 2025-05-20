"use client";
import Loading from "@/components/Shared/Loading";
import SectionTitle from "@/components/Shared/SectionTitle";
import Link from "next/link";
import Swal from "sweetalert2";
import { MdOutlineDateRange } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import {
  useDeleteProjectMutation,
  useGetAllProjectQuery,
} from "@/redux/features/project/projectApi";

const ManageProject: React.FC = () => {
  const {
    data: projects,
    refetch: projectRefetch,
    isLoading,
  } = useGetAllProjectQuery({
    refetchOnReconnect: true,
  });
  const [deleteProject] = useDeleteProjectMutation();

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
        const res = await deleteProject(id).unwrap();
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your project has been deleted.",
            icon: "success",
          });
          projectRefetch();
        }
      }
    });
  };

  return (
    <div id="projects" className="my-5">
      <div>
        <div className="flex items-center justify-between">
          <SectionTitle title="Manage Project" />
          <Link href={`/dashboard/manageProject/addProject`}>
            <button className="p-2 bg-gray-700 text-white rounded-md mr-2">
              Add New Project
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
              projects?.data?.map((project: any) => (
                <div
                  className="rounded-lg h-fit cursor-pointer transition-all duration-300 relative backdrop-blur shadow-md hover:shadow-xl border border-gray-100"
                  key={project?._id}
                >
                  <div className="rounded-lg">
                    <div className="p-2 h-[270px] flex flex-col justify-between font-[Arima]">
                      <div className="mb-1">
                        <Link
                          href={`/dashboard/manageProject/updateProject/${project?._id}`}
                        >
                          <button className="p-2 bg-green-300 text-green-700 rounded-md mr-2">
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteItem(project?._id)}
                          className="p-2 bg-red-300 text-red-700 rounded-md"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/dashboard/manageProject/projectDetails/${project?._id}`}
                            className="text-xl line-clamp-2 font-semibold capitalize text-sky-900"
                          >
                            {project?.title}
                          </Link>
                        </div>
                        <p className="line-clamp-2 text-slate-500 mt-2 text-sm">
                          {project?.category}
                        </p>
                        <p className="line-clamp-1 text-slate-500 py-2 text-sm mb-0.5">
                          {project?.tags?.length === 0 && "Topics not added!"}
                          {project?.tags?.map((tech: string) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded-xl bg-[var(--primaryColor3)] text-[var(--primaryColor4)] mr-1"
                            >
                              {tech}
                            </span>
                          ))}
                        </p>
                      </div>
                      <p className="flex items-center gap-2 mb-1 text-[var(--primaryColor1)] font-semibold ">
                        <MdOutlineDateRange className="text-green-600" />
                        <span>
                          {project?.uploadDate} {project?.uploadTime}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProject;
