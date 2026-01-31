import { useState } from "react";
import Form from "./components/form";
import type{ ResumeData } from "./types";

const App = () => {
  const [resume, setResume] = useState<ResumeData>({
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
});
  return <Form resume={resume} setResume={setResume} />;
};

export default App;
