import React from 'react';
import { Actions, TaskContext } from '@twilio/flex-ui';
import Button from '@material-ui/core/Button';

interface OwnProps {
    label: string;
    text: string;
    children?: React.ReactNode;
}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = OwnProps;

// It is recommended to keep components stateless and use redux for managing states
const Question: React.FunctionComponent<Props> = ({ label, text }) => {
    const onClickSend = (channelSid: string | undefined) => {
        if (!channelSid) return;
        Actions.invokeAction("SendMessage", { body: text, channelSid });
    };

    const onClickCopy = (channelSid: string | undefined) => {
        if (!channelSid) return;
        Actions.invokeAction("SetInputText", { body: text, channelSid });
    };
    return (
        <TaskContext.Consumer>
            {(context) => (
                <>
            <p>{text}</p>
            <div>
                <Button onClick={() => onClickSend(context.chatChannel?.source?.sid)}>Send</Button>
                <Button onClick={() => onClickCopy(context.chatChannel?.source?.sid)}>Copy</Button>
            </div>
                </>
                )}
                </TaskContext.Consumer>
  );
  
};

Question.displayName = 'Question';

export default Question;
