/* eslint-disable @next/next/no-img-element */
"use client";
import Loading from "@/components/Shared/Loading";
import { useDashboardStateQuery } from "@/redux/features/auth/authApi";
import React, { useEffect, useState } from "react";
import {
  FiFolder,
  FiBook,
  FiMessageCircle,
  FiExternalLink,
  FiGithub,
  FiTag,
  FiCalendar,
  FiClock,
  FiMail,
} from "react-icons/fi";

// Define interfaces for our data types
interface Project {
  _id: string;
  title: string;
  image?: string;
  summary: string;
  live_link: string;
  git_client: string;
  tags: string[];
  uploadDate: string;
  uploadTime: string;
}

interface Blog {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  uploadDate: string;
  uploadTime: string;
}

interface Message {
  _id: string;
  email: string;
  name: string;
  subject: string;
  message: string;
  date: string;
  time: string;
}

interface Stats {
  projects: number;
  blogs: number;
  messages: number;
}

interface DashboardData {
  latest: {
    projects: Project[];
    blogs: Blog[];
    messages: Message[];
  };
  stats: Stats;
}

const DashboardOverview: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    blogs: 0,
    messages: 0,
  });
  const {
    data,
    refetch: dashboardRefetch,
    isLoading,
  } = useDashboardStateQuery({
    refetchOnReconnect: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const repositoryData: DashboardData = data?.data;
        setProjects(repositoryData.latest.projects);
        setBlogs(repositoryData.latest.blogs);
        setMessages(repositoryData.latest.messages);
        setStats(repositoryData.stats);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [data]);

  return (
    <>
      {isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loading></Loading>
        </div>
      )}
      {!isLoading && (
        <div className="min-h-screen bg-gray-50 p-8 my-2">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 ">
              Portfolio Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Overview of projects, blogs, and messages
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FiFolder className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Projects
                  </h2>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats?.projects}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <FiBook className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-700">Blogs</h2>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats?.blogs}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <FiMessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Messages
                  </h2>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats?.messages}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Projects Section */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Latest Projects
              </h2>
            </div>
            <div className="p-6">
              {projects.map((project) => (
                <div key={project._id} className="mb-6 last:mb-0">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <img
                      src={project.image || "/api/placeholder/200/150"}
                      alt={project.title}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{project.summary}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center"
                          >
                            <FiTag className="mr-1" /> {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-700"
                        >
                          <FiExternalLink className="mr-1" /> Live Demo
                        </a>
                        <a
                          href={project.git_client}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-gray-700"
                        >
                          <FiGithub className="mr-1" /> Source Code
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1" /> {project.uploadDate}
                      </div>
                      <div className="flex items-center mt-1">
                        <FiClock className="mr-1" /> {project.uploadTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Latest Blogs */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  Latest Blogs
                </h2>
              </div>
              <div className="p-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {blog.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                        {blog.category}
                      </span>
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm flex items-center"
                        >
                          <FiTag className="mr-1" /> {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-1" /> {blog.uploadDate}
                      <span className="mx-2">•</span>
                      <FiClock className="mr-1" /> {blog.uploadTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Messages */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  Latest Messages
                </h2>
              </div>
              <div className="p-6">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className="mb-6 last:mb-0 p-4 border rounded-lg hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {message.subject}
                      </h3>
                      <div className="text-sm text-gray-500">
                        {message.date} {message.time}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{message.message}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">{message.name}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <FiMail className="mr-1" /> {message.email}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardOverview;
