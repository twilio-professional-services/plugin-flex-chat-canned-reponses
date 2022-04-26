import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

import Section from "./components/Section";
import { useResponses } from "../../api";

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
  const { status, data } = useResponses();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <Typography className={classes.title}>
          Pre-canned Chat Responses
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      {status === "loading" ? (
        <CircularProgress className={classes.progress} />
      ) : status === "success" ? (
        <>
          {data.data.map((q: any) => (
            <Grid item xs={12} className={classes.section} key={q.section}>
              <Section {...q} />
            </Grid>
          ))}
        </>
      ) : (
        <Typography>
          There was an error fetching responses -- please reload the page.
        </Typography>
      )}
    </Grid>
  );
};

CRMPanel.displayName = "CRMPanel";

export default withStyles(styles)(CRMPanel);
