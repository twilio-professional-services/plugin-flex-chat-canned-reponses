import React from "react";
import { Actions, TaskContext } from "@twilio/flex-ui";
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/text'
import { Button } from '@twilio-paste/core/button'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuGroup,
  useMenuState
} from '@twilio-paste/core/menu';
import { ChatIcon } from "@twilio-paste/icons/esm/ChatIcon";
import { useResponses } from "../../api";

const ChatDropdown: React.FunctionComponent = () => {
  const { status, data } = useResponses();

  const insertMessage = (conversationSid: string | undefined, text: any) => {
    if (!conversationSid) return;
    Actions.invokeAction("SetInputText", { body: text, conversationSid });
  };

  const menu = useMenuState();

  return (
    <Box paddingBottom="space60" margin="auto">
      <TaskContext.Consumer>
        {(context) => (
          <>
            {status === "loading" ? (
              <Button variant="primary" loading>Loading</Button>
            ) : status === "success" ? (
              <>
                <MenuButton {...menu} variant="primary" fullWidth={true}>
                  <ChatIcon decorative /> Pre-canned Chat Responses
                </MenuButton>
                <Menu {...menu} aria-label="Preferences">   
                  {data.data.map((q: any) => (
                    <div key={q.section}>
                      <MenuGroup {...menu} label={q.section}>
                      {q.questions.map((question: any) => (
                        <MenuItem {...menu}
                          key={question.text}
                          onClick={() => {
                            insertMessage(context.conversation?.source?.sid, question.text)
                            menu.hide();
                          }}
                        >
                          {question.text}
                        </MenuItem>
                      ))}
                      </MenuGroup>
                    </div>
                  ))}
                </Menu>
              </>
            ) : (
              <Text as="p">
                There was an error fetching responses -- please reload the page.
              </Text>
            )}
          </>
        )}
      </TaskContext.Consumer>
    </Box>
  );
};

export default ChatDropdown;