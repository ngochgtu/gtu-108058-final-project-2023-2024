import React from "react";

const Skills = ({ skill, points }) => {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateRows: "1fr 1fr",
			}}
		>
			<p>
				<strong>Skill: </strong>
				{skill[0]}
			</p>
			<p>
				<strong>Points: </strong>
				{points}
			</p>
		</div>
	);
};

export default Skills;
