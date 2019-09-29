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
import { addActivity } from "../activities/actions";
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
    backgroundColor: "#29a329",
    color: "white",
    border: 1
  },
  listItemIcon: {
    backgroundColor: "white",
    color: "black"
  }
}));

const CategoryItem = ({ category, deleteCategory }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const DeleteIconButton = () => (
    <IconButton
      edge="end"
      key={category.id}
      id={category.id}
      onClick={deleteCategory}
    >
      <DeleteIcon />
    </IconButton>
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        {category.activities && category.activities.length > 0 ? (
          <Collapse in={true}>
            <ListItem button onClick={() => setExpanded(!expanded)}>
              <ListItemAvatar>
                <Avatar className={classes.listItemIcon}>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{category.name}</ListItemText>
              <ListItemSecondaryAction>
                <DeleteIconButton />
              </ListItemSecondaryAction>
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
            <ListItemAvatar>
              <Avatar className={classes.listItemIcon}>
                <FolderOpenOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <DeleteIconButton />
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </Grid>
    </Grid>
  );
};

const Categories = ({ categories, deleteCategory }) => {
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
        {categories && Object.keys(categories).length > 0 ? (
          <Grid container>
            <Grid item xs={3}>
              <Paper className={classes.paperHead}>
                <Typography variant={"h6"}>All Categories</Typography>
              </Paper>
              <Paper className={classes.paperBody}>
                <List>
                  {categories &&
                    Object.keys(categories).map(key => (
                      <CategoryItem
                        key={key}
                        category={categories[key]}
                        deleteCategory={() => deleteCategory(key)}
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

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(
  mapStateToProps,
  { addCategory, deleteCategory, addActivity }
)(Categories);
