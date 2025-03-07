import React, { useEffect, useState } from "react";
import QuizCart from "./QuizCart/quizCart";
import "./quiz.css";
import axios from "axios";
import Quiz from "./Quiz";

interface Skill {
  skillName: string;
  skillLevel: number;
}

const SelectQuiz: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [verified, setVerified] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  console.log(selectedSkill);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:3000/api/user/${userId}`
          );
          if (response.data.skills) {
            setVerified(response.data.isVerified);

            setSkills(
              response.data.skills.map((skill: any) => ({
                skillName: skill.skillName,
                skillLevel: skill.skillLevel,
              }))
            );
          }
        } catch (error) {}
      };
      fetchData();
    }
  }, []);

  return (
    <>
      {selectedSkill ? (
        <Quiz program={selectedSkill} level={selectedLevel} />
      ) : (
        <div style={{ width: "90%" }}>
          {skills.length > 0 ? (
            <>
              <div style={{ width: "45%", margin: "auto" }}>
                <h3
                  data-text="Select which skill you want to test"
                  className="preLoadText"
                >
                  Select which skill you want to test
                </h3>
              </div>
              <div className="quiz-grid">
                {skills.map((skill, index) => (
                  <QuizCart
                    key={index}
                    skillName={skill.skillName}
                    isVerified={verified}
                    skillLevel={skill.skillLevel}
                    setSkillsName={setSelectedSkill}
                    setSkillsLevel={setSelectedLevel}
                  />
                ))}
              </div>
            </>
          ) : (
            <div style={{ width: "100%", height: "46vh", margin: "auto" }}>
              <h3 style={{ textAlign: "center", marginTop: "20%" }}>
                No skills found, Please add skills to test
              </h3>{" "}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SelectQuiz;
