import React from "react";
import { Actions, TaskContext } from "@twilio/flex-ui";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ChatIcon from "@material-ui/icons/ChatBubble";
import { withStyles } from "@material-ui/core/styles";

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
  icon: {
    marginRight: 6,
    fontSize: 14,
  },
  button: {
    marginRight: 8,
    backgroundColor: "rgb(5, 125, 158)",
    color: "white",
    width: "100%",
  },
};

const ChatDropdown: React.FunctionComponent<Props> = (props: Props) => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const insertMessage = (channelSid: string | undefined, text: any) => {
    if (!channelSid) return;
    Actions.invokeAction("SetInputText", { body: text, channelSid });
    handleClose();
  };

  return (
    <Grid container className={classes.root}>
      <TaskContext.Consumer>
        {(context) => (
          <>
            <Button
              variant="outlined"
              onClick={handleClick}
              className={classes.button}
            >
              <ChatIcon className={classes.icon} />
              Pre-canned Chat Responses
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {questions.map((q) => (
                <div key={q.section}>
                  <MenuItem disabled={true}>{q.section}</MenuItem>
                  {q.questions.map((question) => (
                    <MenuItem
                      key={question.text}
                      onClick={() =>
                        insertMessage(
                          context.chatChannel?.source?.sid,
                          question.text
                        )
                      }
                    >
                      {question.text}
                    </MenuItem>
                  ))}
                </div>
              ))}
            </Menu>
          </>
        )}
      </TaskContext.Consumer>
    </Grid>
  );
};

ChatDropdown.displayName = "ChatDropdown";

export default withStyles(styles)(ChatDropdown);
