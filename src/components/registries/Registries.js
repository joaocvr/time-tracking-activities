import React from "react";

import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

import { withRouter, Link } from "react-router-dom";

import ControlledExpansionTable from "./ControlledExpansionTable";

const Registries = ({ activities, categories, registries }) => {
  const categoriesNames = activities ? Object.keys(activities) : [];
  return (
    <div>
      {categoriesNames && categoriesNames.length > 0 ? (
        categoriesNames.map(category => {
          const registriesValues = Object.values(registries);
          const registriesByCategory =
            registriesValues && registriesValues.length > 0
              ? registriesValues.filter(r => r.categoryName === category)
              : [];
          return (
            <ControlledExpansionTable
              key={category}
              category={category}
              categoryId={categories[category].id}
              activities={Object.values(activities[category])}
              registries={registriesByCategory}
            />
          );
        })
      ) : (
        <Typography>
          Go to '<Link to="/configurations">Configurations</Link>' and add a new
          activity or categories.
        </Typography>
      )}
    </div>
  );
};

const mapStateToProps = ({ activities, categories, registries }) => ({
  activities,
  categories,
  registries
});

export default withRouter(connect(mapStateToProps)(Registries));
