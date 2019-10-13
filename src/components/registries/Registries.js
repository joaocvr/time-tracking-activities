import React from "react";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import DataTable from "../common/DataTable";
import AddRegistryDialog from "./AddRegistryDialog";

const useStyles = makeStyles(() => ({
  expansionPanel: {
    paddingTop: 10,
    width: "40%"
  },
  expansionPanelDetails: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  buttonAddRegistry: {
    width: "100%",
    textTransform: "none"
  }
}));

const ControlledExpansionTable = ({ category, categoryId, activities }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const toggleExpand = () => setExpanded(!expanded);

  const [openAddRegistry, setOpenAddRegistry] = React.useState(false);
  const handleClickAddARegistry = () => setOpenAddRegistry(true);

  return (
    <ExpansionPanel
      className={classes.expansionPanel}
      expanded={expanded}
      onChange={() => toggleExpand()}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{category}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <Grid container>
          <Grid item xs={12}>
            <Button
              className={classes.buttonAddRegistry}
              onClick={handleClickAddARegistry}
            >
              <Typography>Register an activity</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DataTable
              columns={["Activity", "Start", "Finish", "Total (minutes)"]}
              rows={[
                { c1: "React", c2: "11:13", c3: "12:27", c4: "74" },
                { c1: "Redux", c2: "12:30", c3: "13:30", c4: "60" }
              ]}
            />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <AddRegistryDialog
        open={openAddRegistry}
        handleClose={() => setOpenAddRegistry(false)}
        categoryName={category}
        categoryId={categoryId}
      />
    </ExpansionPanel>
  );
};

const Registries = ({ activities, categories }) => {
  const categoriesNames = activities ? Object.keys(activities) : <div />;

  return (
    <div>
      {categoriesNames &&
        categoriesNames.map(category => (
          <ControlledExpansionTable
            key={category}
            category={category}
            categoryId={categories[category].id}
            activities={Object.values(activities[category])}
          />
        ))}
      <ol>
        <ul>
          <u>
            <b>Backlog</b>
          </u>
        </ul>
        <li>
          Na tabela de atividades, cada linha precisa ter o nome da atividade,
          total de minutos estudados um botão para iniciar um cronômetro, outro
          para pará-lo, outro para remover a atividade e um para editá-la.{" "}
        </li>
        <li>Enviar e-mail com relatório diário</li>
        <li>
          Listar atividades por dia selecionado (inicia a tela com o dia atual)
        </li>
      </ol>
      <br />
    </div>
  );
};

const mapStateToProps = ({ activities, categories }) => ({
  activities: { ...activities },
  categories: { ...categories }
});

export default connect(mapStateToProps)(Registries);
