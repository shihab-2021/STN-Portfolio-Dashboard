"use client";
import Loading from "@/components/Shared/Loading";
import {
  useDeleteMessageMutation,
  useGetAllMessageQuery,
} from "@/redux/features/message/messageApi";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

interface IMessage {
  _id: string;
  email: string;
  name: string;
  subject: string;
  message: string;
  date: string;
  time: string;
}

export default function ManageMessage() {
  //   const [notices, setNotices] = useState<IMessage[]>([]);
  const [notice, setNotice] = useState<IMessage>();
  const {
    data: notices,
    refetch: messageRefetch,
    isLoading,
  } = useGetAllMessageQuery({
    refetchOnReconnect: true,
  });
  const [deleteMessage] = useDeleteMessageMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        setNotice(notices?.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        //   setIsLoading(false);
      }
    }

    fetchData();
  }, [notices]);

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
        const res = await deleteMessage(id).unwrap();
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Message has been deleted.",
            icon: "success",
          });
          messageRefetch();
        }
      }
    });
  };
  return (
    <div>
      {!notices?.data[0] && isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loading></Loading>
        </div>
      )}
      {!notices?.data[0] && !isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <h1>No message found!</h1>
        </div>
      )}
      {notices?.data[0] && (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
          <div className="bg-gray-50 shadow-lg rounded-lg p-4 sm:p-6 xl:p-8  md:col-span-2">
            <h1 className="text-3xl mb-4 font-bold underline">
              {notice?.subject}
            </h1>
            <h1>{notice?.name}</h1>
            <h1>{notice?.email}</h1>
            <p className="mt-8">{notice?.message}</p>
            <h1 className="mt-10 text-sm">{notice?.date}</h1>
            <h1 className=" text-sm">{notice?.time}</h1>
          </div>
          <div className="bg-gray-50 shadow-lg rounded-lg p-4 sm:p-6 xl:p-8 ">
            <h1 className="text-2xl font-bold mb-4 underline">Messages</h1>
            {notices?.data?.map((note: IMessage) => {
              return (
                <div
                  onClick={() => setNotice(note)}
                  className={`${
                    note?._id === notice?._id
                      ? "p-2 bg-gray-100 shadow-lg rounded-lg mb-2 border border-orange-400 cursor-pointer"
                      : "p-2 bg-gray-100 shadow-lg rounded-lg mb-2 border border-[#36393e82] cursor-pointer"
                  }`}
                  // className="  p-2 bg-[#36393e82] shadow-lg rounded-lg mb-1"
                  key={note?._id}
                >
                  <div className="w-full grid grid-cols-3 gap-4">
                    <h1 className="col-span-2">{note?.subject}</h1>
                    <h1 className="col-span-1 text-sm text-right">
                      {note?.date} <br />
                      {note?.time} <br />
                      <button
                        onClick={() => deleteItem(note?._id)}
                        className="p-2 bg-red-300 text-red-700 rounded-md"
                      >
                        <FaTrash />
                      </button>
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
