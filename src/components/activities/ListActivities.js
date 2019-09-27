import React from "react";

const ListActivities = ({ activities }) => {
  const activitiesList = Object.values(activities);
  return activitiesList ? (
    <div>
      <ul>
        {activitiesList.map(a => (
          <li key={a.id}>{`${a.name} (${a.type})`}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div />
  );
};

export default ListActivities;
