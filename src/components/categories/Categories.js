import React from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { addCategory } from "./actions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paperHead: {
    padding: theme.spacing(2),
    textAlign: "left",
    width: "100%"
  },
  paperBody: {
    textAlign: "left",
    width: "100%"
  },
  addButton: {
    width: "100%",
    variant: "contained",
    margin: theme.spacing(1),
    backgroundColor: "#29a329",
    color: "white",
    border: 1
  }
}));

const CategoryItem = ({ category }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Grid container>
      <Grid item xs={10}>
        {category.activities && category.activities.length > 0 ? (
          <Collapse in={true}>
            <ListItem button onClick={() => setExpanded(!expanded)}>
              <ListItemIcon>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
            <List>
              {expanded &&
                category.activities.map(a => (
                  <ListItem key={a}>
                    <ListItemText inset secondary={a} />
                  </ListItem>
                ))}
            </List>
          </Collapse>
        ) : (
          <ListItem>
            <ListItemText inset primary={category.name} />
          </ListItem>
        )}
      </Grid>
      <Grid item xs={2}>
        <ListItem button>
          <ListItemIcon>
            <DeleteOutlineIcon />
          </ListItemIcon>
        </ListItem>
      </Grid>
    </Grid>
  );
};

const AddCategoryDialog = ({ open, handleClose }) => {
  const [name, setName] = React.useState("");
  return (
    <Dialog open={open} onClose={handleClose}>
      <form autoComplete="off">
        <DialogTitle>New category</DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl>
            <TextField
              label="Name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={6} align="center">
              <Button onClick={handleClose}>Cancel</Button>
            </Grid>
            <Grid item xs={6} align="center">
              <Button>ADD</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Categories = ({ categories }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickAddCategory = () => setOpen(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button
            onClick={handleClickAddCategory}
            className={classes.addButton}
          >
            Add a category
          </Button>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <Paper className={classes.paperHead}>
              <Typography variant={"h6"}>All Categories</Typography>
            </Paper>
            <Paper className={classes.paperBody}>
              <List>
                {categories &&
                  Object.keys(categories).map(key => (
                    <CategoryItem key={key} category={categories[key]} />
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <AddCategoryDialog open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(
  mapStateToProps,
  { addCategory }
)(Categories);
