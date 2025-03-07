// src/QuizCart/QuizCart.tsx
import React from "react";
import { Link } from "react-router-dom";
import { StarRating } from "../../InfoCard/InfoCard";
import Quiz from "../Quiz";
interface QuizCartProps {
  skillName: string;
  skillLevel: number;
  isVerified: boolean;
  setSkillsName:  (skillName: string) => void;
  setSkillsLevel:  (skillName: number) => void;
}

const QuizCart: React.FC<QuizCartProps> = ({
  skillName,
  skillLevel,
  isVerified,
  setSkillsName,
  setSkillsLevel,
}) => {
  var image = "notFound.jpg";
  const getImagePath = () => {
    switch (skillName) {
      case 'C/C++':
        return 'CC++.jpg';
      case 'Javascript':
        return 'Javascript.jpg';
      case 'Java':
        return 'Java.jpg';
      case 'Python':
        return 'Python.jpg';
      case 'Data Science':
        return 'DataScience.jpg';
      default:
        return 'notFound.jpg';
    }
  };

  const handleClick = () => {
    if (isVerified) {
      setSkillsLevel(skillLevel);
      setSkillsName(skillName);
    } else {
      alert("Please Verify your profile to test this skill");
    }
  };
  const imagePath = "../img/skills/";
  return (
    <>
      {
        <div
          onClick={handleClick}
          className="quiz-cart"
        >
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "10px",
              height: "335px",
            }}
          >
            <img
              src={`${imagePath + getImagePath()}`}
              style={{
                width: "100%",
                borderRadius: "10px 10px 0px 0px",
                mixBlendMode: "multiply",
              }}
              alt={""}
            />

            <h4>{skillName}</h4>
            <StarRating level={skillLevel - 1} />
          </div>
        </div>
      }
    </>
  );
};

export default QuizCart;
