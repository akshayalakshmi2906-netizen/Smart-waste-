import React from "react";
import "./EcoChallenges.css";

const EcoChallenges = () => {
  const challenges = [
    {
      title: "Plastic Pollution",
      desc: "Plastic waste is choking oceans and harming wildlife.",
      tip: "Reduce single-use plastics and recycle whenever possible."
    },
    {
      title: "Air Pollution",
      desc: "Emissions from vehicles and industries degrade air quality.",
      tip: "Use public transport, cycle, or switch to clean energy solutions."
    },
    {
      title: "Deforestation",
      desc: "Rapid cutting of trees is reducing biodiversity and increasing CO₂.",
      tip: "Support tree planting campaigns and reduce paper usage."
    },
    {
      title: "E-Waste",
      desc: "Improper disposal of electronics releases toxic chemicals.",
      tip: "Dispose e-waste at certified recycling centers."
    },
    {
      title: "Water Waste",
      desc: "Overuse and contamination are making clean water scarce.",
      tip: "Fix leaks, use water-efficient appliances, and avoid pollution."
    },
    {
      title: "Climate Change",
      desc: "Rising global temperatures are leading to extreme weather and sea-level rise.",
      tip: "Save energy, switch to renewables, and plant more trees."
    }
  ];

  return (
    <div className="eco-wrapper">
      <div className="eco-container">
        <h2>🌍 Eco-Challenges</h2>
        <p className="eco-subheading">
          Challenges faced by the environment & how you can help
        </p>

        <div className="eco-grid">
          {challenges.map((ch, index) => (
            <div key={index} className="eco-card">
              <h3>{ch.title}</h3>
              <p>{ch.desc}</p>
              <p className="eco-tip"><strong>Tip:</strong> {ch.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoChallenges;
