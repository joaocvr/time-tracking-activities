import React from "react";
import { Add, CloseSharp } from "@material-ui/icons";
import {
  Divider,
  Grid,
  Fab,
  Box,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  IconButton,
  Typography
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  box: {
    width: "40%"
  },
  form: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "40%"
  },
  gridContainerHeader: {
    margin: theme.spacing(1)
  }
}));

const AddActivity = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    type: ""
  });

  const [isAddFormVisible, setAddFormVisible] = React.useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return !isAddFormVisible ? (
    <Fab
      className={classes.fab}
      variant="outlined"
      size="small"
      onClick={() => setAddFormVisible(true)}
    >
      <Add />
    </Fab>
  ) : (
    <Grid container>
      <Box className={classes.box} border={1}>
        <Grid container direction="row" className={classes.gridContainerHeader}>
          <Grid item xs={9}>
            <Typography>
              <b>New Activity</b>
            </Typography>
          </Grid>
          <Grid item xs={3} align={"center"}>
            <IconButton onClick={() => setAddFormVisible(false)} size="small">
              <CloseSharp />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
            <TextField
              label="Name"
              value={values.name}
              onChange={handleChange("name")}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select onChange={handleChange("type")}>
              <MenuItem value={"Study"}>Study</MenuItem>
              <MenuItem value={"Workout"}>Workout</MenuItem>
              <MenuItem value={"Rest"}>Rest</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Box>
    </Grid>
  );
};

export default AddActivity;
