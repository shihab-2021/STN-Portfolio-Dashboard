"use client";

import React, { useState, useEffect, JSX } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as LuIcons from "react-icons/lu";
import * as MdIcons from "react-icons/md";
import SectionTitle from "../Shared/SectionTitle";
import { useGetAllSkillQuery } from "@/redux/features/skill/skillApi";

// Define Skill type
interface Skill {
  _id: string;
  name: string;
  iconName: string;
  iconLibrary: string;
  iconColor: string;
  skillType: "technical" | "soft";
}

type IconLibrary = {
  [key: string]: { [key: string]: React.ComponentType<{ className?: string }> };
};

export default function ShowSkills({ skills }: { skills: { data: Skill[] } }) {
  const [technicalSkills, setTechnicalSkills] = useState<Skill[]>([]);
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Icon libraries mapping
  const iconLibraries: IconLibrary = {
    fa: FaIcons,
    si: SiIcons,
    lu: LuIcons,
    md: MdIcons,
  };

  useEffect(() => {
    const fetchSkills = () => {
      try {
        const data: Skill[] = skills?.data || [];

        setTechnicalSkills(
          data.filter((skill) => skill.skillType === "technical")
        );
        setSoftSkills(data.filter((skill) => skill.skillType === "soft"));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    };

    fetchSkills();
  }, [skills]);

  const renderIcon = (
    iconName: string,
    iconLibrary: string,
    iconColor: string
  ): JSX.Element | null => {
    const IconLibrary = iconLibraries[iconLibrary.toLowerCase()];
    if (!IconLibrary) {
      console.error(`Icon library "${iconLibrary}" not found`);
      return null;
    }

    const IconComponent = IconLibrary[iconName];
    if (!IconComponent) {
      console.error(`Icon "${iconName}" not found in "${iconLibrary}" library`);
      return null;
    }

    return <IconComponent className={iconColor} />;
  };

  if (loading) {
    return <div className="py-16 text-center">Loading skills...</div>;
  }

  return (
    <section className="py-16" id="skills">
      <div className="mb-12">
        <SectionTitle title="Skills" />
      </div>

      {/* Technical Skills */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Technical Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {technicalSkills.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg bg-white transition-transform hover:-translate-y-1"
            >
              <span className="text-xl">
                {renderIcon(skill.iconName, skill.iconLibrary, skill.iconColor)}
              </span>
              <p className="font-medium text-gray-700">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Soft Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {softSkills.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg bg-white transition-transform hover:-translate-y-1"
            >
              <span className="text-xl">
                {renderIcon(skill.iconName, skill.iconLibrary, skill.iconColor)}
              </span>
              <p className="font-medium text-gray-700">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
