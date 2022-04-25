import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

import Section from "./components/Section";
import { questions } from "../../data";

interface OwnProps {
  // Props passed directly to the component
  classes: any;
}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = OwnProps;

const styles = {
  root: {
    padding: "24px",
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
  },
  section: {
    marginBottom: 12,
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
  },
};

// It is recommended to keep components stateless and use redux for managing states
const CRMPanel: React.FunctionComponent<Props> = (props: Props) => {
  const { classes } = props;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <Typography className={classes.title}>
          Pre-canned Chat Responses
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      {questions.map((q) => (
        <Grid item xs={12} className={classes.section} key={q.section}>
          <Section {...q} />
        </Grid>
      ))}
    </Grid>
  );
};

CRMPanel.displayName = "CRMPanel";

export default withStyles(styles)(CRMPanel);
