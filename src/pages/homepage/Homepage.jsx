import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Homepage = () => {
  const { theme } = useTheme();
  return (
    <div className="text-justify">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error praesentium
      vel soluta voluptate iusto! Debitis, doloremque? Itaque, et? Culpa ipsam
      autem nisi quasi odio rerum esse delectus dolor, alias quisquam? Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Illum officia saepe
      asperiores hic eum iure inventore nisi, ipsam tempora nobis quisquam ab
      numquam, quibusdam animi obcaecati quasi reprehenderit laudantium quam.
    </div>
  );
};

export default Homepage;
