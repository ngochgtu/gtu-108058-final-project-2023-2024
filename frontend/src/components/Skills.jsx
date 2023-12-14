import React from "react";

const Skills = ({ skill, points }) => {
	return (
		<div
			style={{
				display: "flex", gap: '2rem',
			}}
		>
			<p>
				<strong>Skill: </strong>
				{skill}
			</p>
			<p>
				<strong>Points: </strong>
				{points}
			</p>
		</div>
	);
};

export default Skills;
