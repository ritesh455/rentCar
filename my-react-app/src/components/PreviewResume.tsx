import React from "react";
import type { ResumeData } from "../types";

interface PreviewResumeProps {
  resume: ResumeData;
  onDeleteSkill: (index: number) => void;
}

const PreviewResume: React.FC<PreviewResumeProps> = ({
  resume,
  onDeleteSkill,
}) => {
  const { personalInfo } = resume;

  return (
    <div style={{ padding: "20px" }}>
      {/* PERSONAL INFO */}
      <section>
        <h2>{personalInfo.fullName || "Your Name"}</h2>

        <p>
          {personalInfo.email}
          {personalInfo.phone && ` | ${personalInfo.phone}`}
        </p>

        <p>
          {personalInfo.location}
          {personalInfo.website && ` | ${personalInfo.website}`}
        </p>

        {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
        {personalInfo.summary && <p>{personalInfo.summary}</p>}
      </section>

      <hr />

      {/* EDUCATION */}
      <section>
        <h3>Education</h3>
        {resume.education.length === 0 && <p>No education added</p>}

        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "10px" }}>
            <strong>{edu.degree}</strong> in {edu.fieldOfStudy}
            <div>{edu.institution}</div>
            <small>
              {edu.startYear} - {edu.endYear}
            </small>
            <hr />
          </div>
        ))}
      </section>

    

      {/* EXPERIENCE */}
      <section>
        <h3>Experience</h3>
        {resume.experience.length === 0 && <p>No experience added</p>}

        {resume.experience.map((exp, index) => (
          <div key={exp.id} style={{ marginBottom: "15px" }}>
            <strong>{exp.role}</strong> @ {exp.company}
            <div>{exp.description}</div>
            <small>
              {exp.startDate} - {exp.endDate}
            </small>

            {index !== resume.experience.length - 1 && (
              <hr style={{ marginTop: "15px", opacity: 0.3 }} />
            )}
          </div>
        ))}
      </section>

      <hr />

      {/* SKILLS */}
      <section>
        <h3>Skills</h3>
        {resume.skills.length === 0 && <p>No skills added</p>}

        <ul>
          {resume.skills.map((skill, index) => (
            <li key={index}>
              {skill}
              <button
                onClick={() => onDeleteSkill(index)}
                style={{
                  marginLeft: "10px",
                  color: "red",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PreviewResume;
