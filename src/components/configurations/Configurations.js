import React from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";

import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";

import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import { addCategory, deleteCategory } from "../categories/actions";
import { addActivity, deleteActivity } from "../activities/actions";
import AddActivityDialog from "../activities/AddActivityDialog";
import AddCategoryDialog from "../categories/AddCategoryDialog";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paperHead: {
    padding: theme.spacing(1),
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
    backgroundColor: "#0d47a1",
    color: "white",
    border: 1
  },
  blueIcon: {
    backgroundColor: "white",
    color: "#0d47a1"
  },
  listItem: {
    padding: theme.spacing(-1)
  }
}));

const CategoryItem = ({
  category,
  activities,
  deleteCategory,
  deleteActivity
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [
    deleteIconButtonCategory,
    setDeleteIconButtonCategory
  ] = React.useState(<div />);
  const [
    deleteIconButtonActivity,
    setDeleteIconButtonActivity
  ] = React.useState(<div />);

  const DeleteIconButtonCategory = () => (
    <IconButton
      edge="end"
      key={category}
      id={category}
      onClick={deleteCategory}
    >
      <DeleteIcon />
    </IconButton>
  );

  const DeleteIconButtonActivity = () => (
    <IconButton edge="end" onClick={deleteActivity}>
      <DeleteIcon />
    </IconButton>
  );

  const handleOnMouseEnterCategory = () =>
    setDeleteIconButtonCategory(<DeleteIconButtonCategory />);
  const handleOnMouseLeaveCategory = () => setDeleteIconButtonCategory(<div />);

  const handleOnMouseEnterActivity = () => {
    console.log("handleOnMouseEnterActivity");
    setDeleteIconButtonActivity(<DeleteIconButtonActivity />);
  };
  const handleOnMouseLeaveActivity = () => {
    console.log("handleOnMouseLeaveActivity");
    setDeleteIconButtonActivity(<div />);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {activities && activities.length > 0 ? (
          <Collapse in={true}>
            <Grid container>
              <Grid
                item
                xs={12}
                onMouseEnter={handleOnMouseEnterCategory}
                onMouseLeave={handleOnMouseLeaveCategory}
              >
                <ListItem
                  button
                  onClick={() => setExpanded(!expanded)}
                  className={classes.listItem}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.blueIcon}>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{category}</ListItemText>
                  <ListItemSecondaryAction>
                    {deleteIconButtonCategory}
                  </ListItemSecondaryAction>
                </ListItem>
              </Grid>
              <Grid
                item
                xs={12}
                onMouseEnter={handleOnMouseEnterActivity}
                onMouseLeave={handleOnMouseLeaveActivity}
              >
                <List className={classes.listItem}>
                  {expanded &&
                    activities.map(a => (
                      <ListItem key={a}>
                        <ListItemText inset secondary={a} />
                        <ListItemSecondaryAction>
                          {deleteIconButtonActivity}
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                </List>
              </Grid>
            </Grid>
          </Collapse>
        ) : (
          <Grid container>
            <Grid
              item
              xs={12}
              onMouseEnter={handleOnMouseEnterCategory}
              onMouseLeave={handleOnMouseLeaveCategory}
            >
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.blueIcon}>
                    <FolderOpenOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={category} />
                <ListItemSecondaryAction>
                  {deleteIconButtonCategory}
                </ListItemSecondaryAction>
              </ListItem>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const Configurations = ({
  categories,
  activities,
  deleteCategory,
  deleteActivity
}) => {
  const classes = useStyles();

  const [openAddActivity, setOpenAddActivity] = React.useState(false);
  const [openAddCategory, setOpenAddCategory] = React.useState(false);

  const handleClickAddActivity = () => setOpenAddActivity(true);
  const handleClickAddCategory = () => setOpenAddCategory(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button
            onClick={handleClickAddActivity}
            className={classes.addButton}
          >
            Add a activity
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={handleClickAddCategory}
            className={classes.addButton}
          >
            Add a category
          </Button>
        </Grid>
        {categories && categories.length > 0 ? (
          <Grid container>
            <Grid item xs={3}>
              <Paper className={classes.paperHead}>
                <Typography variant={"h6"}>All Categories</Typography>
              </Paper>
              <Paper className={classes.paperBody}>
                <List>
                  {categories.map(category => (
                    <CategoryItem
                      key={category}
                      category={category}
                      activities={activities[category]}
                      deleteCategory={() => deleteCategory(category)}
                      deleteActivity={deleteActivity}
                    />
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <div />
        )}
      </Grid>
      <AddActivityDialog
        open={openAddActivity}
        handleClose={() => setOpenAddActivity(false)}
      />
      <AddCategoryDialog
        open={openAddCategory}
        handleClose={() => setOpenAddCategory(false)}
      />
    </div>
  );
};

const mapStateToProps = ({ categories, activities }) => ({
  categories,
  activities
});

export default connect(
  mapStateToProps,
  { addCategory, deleteCategory, addActivity, deleteActivity }
)(Configurations);
