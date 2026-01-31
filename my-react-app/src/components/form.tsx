import React from "react";
import type { ResumeData, Education, Experience } from "../types";
import PreviewResume from "./PreviewResume";
import "./Form.css";

interface FormProps {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const Form: React.FC<FormProps> = ({ resume, setResume }) => {
  /* ---------------- PERSONAL INFO ---------------- */
  const updatePersonalInfo = (
    field: keyof ResumeData["personalInfo"],
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  /* ---------------- EDUCATION ---------------- */
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
    };

    setResume((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  /* ---------------- EXPERIENCE ---------------- */
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      role: "",
      description: "",
      startDate: "",
      endDate: "",
    };

    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  /* ---------------- SKILLS ---------------- */
  const addSkill = (skill: string) => {
    if (!skill.trim()) return;

    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const deleteSkill = (index: number) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* -------- LEFT FORM -------- */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <h2>Resume Form</h2>

        {/* PERSONAL INFO */}
        <section>
          <h3>Personal Information</h3>

          <input
            placeholder="Full Name"
            value={resume.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          />
          <input
            placeholder="Email"
            value={resume.personalInfo.email}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
          />
          <input
            placeholder="Phone"
            value={resume.personalInfo.phone}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
          />
          <input
            placeholder="Location"
            value={resume.personalInfo.location}
            onChange={(e) => updatePersonalInfo("location", e.target.value)}
          />
          <input
            placeholder="Website"
            value={resume.personalInfo.website}
            onChange={(e) => updatePersonalInfo("website", e.target.value)}
          />
          <input
            placeholder="LinkedIn URL"
            value={resume.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
          />
          <textarea
            placeholder="Professional Summary"
            value={resume.personalInfo.summary}
            onChange={(e) => updatePersonalInfo("summary", e.target.value)}
          />
        </section>

        {/* EDUCATION */}
        <section>
          <h3>Education</h3>
          <button onClick={addEducation}>Add Education</button>

          {resume.education.map((edu) => (
            <div key={edu.id}>
              <input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(edu.id, "institution", e.target.value)
                }
              />
              <input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(edu.id, "degree", e.target.value)
                }
              />
              <input
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) =>
                  updateEducation(edu.id, "fieldOfStudy", e.target.value)
                }
              />
              <input
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) =>
                  updateEducation(edu.id, "startYear", e.target.value)
                }
              />
              <input
                placeholder="End Year-"
                value={edu.endYear}
                onChange={(e) =>
                  updateEducation(edu.id, "endYear", e.target.value)
                }
              />
              <hr />
            </div>
          ))}
        </section>

        {/* EXPERIENCE */}
        <section>
          <h3>Experience</h3>
          <button onClick={addExperience}>Add Experience</button>

          {resume.experience.map((exp) => (
            <div key={exp.id}>
              <input
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(exp.id, "company", e.target.value)
                }
              />
              <input
                placeholder="Role"
                value={exp.role}
                onChange={(e) =>
                  updateExperience(exp.id, "role", e.target.value)
                }
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, "description", e.target.value)
                }
              />
              <hr />
            </div>
          ))}
        </section>

        {/* SKILLS */}
        <section>
          <h3>Skills</h3>
          <input
            placeholder="Enter skill and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addSkill(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </section>
      </div>

      {/* -------- RIGHT PREVIEW -------- */}
      <div
        style={{
          flex: 1,
          borderLeft: "2px solid #ddd",
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
        <PreviewResume resume={resume} onDeleteSkill={deleteSkill} />
      </div>
    </div>
  );
};

export default Form;
