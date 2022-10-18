import React from "react";
import { Actions, TaskContext } from "@twilio/flex-ui";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@material-ui/icons/Send";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { withStyles } from "@material-ui/core/styles";

interface OwnProps {
  label: string;
  text: string;
  children?: React.ReactNode;
  classes: any;
}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = OwnProps;

const styles = {
  buttonContainer: {
    marginBottom: 12,
  },
  text: {
    marginBottom: 6,
  },
  button: {
    marginRight: 8,
    backgroundColor: "rgb(5, 125, 158)",
  },
  icon: {
    marginLeft: 6,
    fontSize: 14,
  },
};

// It is recommended to keep components stateless and use redux for managing states
const Question: React.FunctionComponent<Props> = ({ text, classes }: any) => {
  const onClickSend = (conversationSid: string | undefined) => {
    if (!conversationSid) return;
    Actions.invokeAction("SendMessage", { body: text, conversationSid });
  };

  const onClickCopy = (conversationSid: string | undefined) => {
    if (!conversationSid) return;
    Actions.invokeAction("SetInputText", { body: text, conversationSid });
  };
  return (
    <TaskContext.Consumer>
      {(context: any) => (
        <>
          <Typography className={classes.text}>{text}</Typography>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onClickSend(context.conversation?.source?.sid)}
            >
              Send
              <SendIcon className={classes.icon} />
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onClickCopy(context.conversation?.source?.sid)}
            >
              Insert
              <FileCopyIcon className={classes.icon} />
            </Button>
          </div>
        </>
      )}
    </TaskContext.Consumer>
  );
};

Question.displayName = "Question";

export default withStyles(styles)(Question);
