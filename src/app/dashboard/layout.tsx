"use client";
import Link from "next/link";
import { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { FaBlog, FaLaptopCode, FaMessage } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggleButton, setToggleButton] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    setToggleButton(!toggleButton);
  };
  return (
    <div>
      <div>
        <div className=" font-sansita">
          <div className="bg-gray-100 border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <Link href={"/"} className="_o6689fn mx-2">
                  <span className="font-oleo_script text-2xl text-[var(--primaryColor1)]">
                    Shihab
                  </span>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    id="toggleSidebarMobile"
                    // ariaExpanded="true"
                    // ariaControls="sidebar"
                    className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                    onClick={handleClick}
                  >
                    <HiMenuAlt3
                      className={`w-6 h-6 ${toggleButton ? "" : "hidden"}`}
                    />
                    <RxCross2
                      className={`w-6 h-6 ${toggleButton ? "hidden" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex overflow-hidden">
            <div
              id="sidebar"
              className={`fixed ${
                toggleButton ? "hidden" : ""
              } z-20 pt-16 h-full top-0 bg-gray-100 shadow-lg left-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`}
              //   aria-label="Sidebar"
            >
              <div className=" flex-1 flex flex-col min-h-0 pt-0">
                <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
                  <div className="flex-1  divide-y space-y-1">
                    <ul className="space-y-2 px-3 py-2 text-gray-500">
                      <li>
                        <Link
                          href="/dashboard"
                          className="text-base hover:text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-200 group"
                        >
                          <RiDashboardFill className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                          <span className="ml-3">Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/manageBlog"
                          className="text-base hover:text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-200 group"
                        >
                          <FaBlog className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                          <span className="ml-3">Manage Blog</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/manageProject"
                          className="text-base hover:text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-200 group"
                        >
                          <FaLaptopCode className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                          <span className="ml-3">Manage Project</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard/manageMessage"
                          className="text-base hover:text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-200 group"
                        >
                          <FaMessage className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" />
                          <span className="ml-3">Manage Message</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          className="block p-2 mb-2 cursor-pointer leading-loose text-xs text-center text-white font-semibold bg-[#e61d4f] hover:bg-red-700  rounded-xl w-full"
                          onClick={() => {
                            dispatch(logout());
                            router.push("/");
                          }}
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
              id="sidebarBackdrop"
            ></div>
            <div
              id="main-content"
              className="h-full w-full relative overflow-y-auto lg:ml-64"
            >
              <div className="min-h-screen">
                <div className=" pt-16 px-2 sm:px-4">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
