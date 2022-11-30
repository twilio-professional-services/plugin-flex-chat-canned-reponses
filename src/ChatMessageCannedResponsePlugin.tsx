import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import { QueryClient, QueryClientProvider } from "react-query";
import { TaskHelper } from "@twilio/flex-ui";

import CRMPanel from "./components/CRMPanel/CRMPanel";
import reducers, { namespace } from "./states";
import ChatDropdown from "./components/ChatDropdown/ChatDropdown";

import { CustomizationProvider } from '@twilio-paste/core/dist/customization';

const PLUGIN_NAME = "ChatMessageCannedResponsePlugin";

export default class ChatMessageCannedResponsePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    this.registerReducers(manager);

    flex.setProviders({
      PasteThemeProvider: CustomizationProvider
    });

    const crmPanelView = false;
    const queryClient = new QueryClient();

    const options: Flex.ContentFragmentProps = {
      if: (props: any) => {
        // In the TaskCanvas, we have access to the task directly. 
        // In the AgentDesktopView, we don't, however we have access to all the tasks and the selected one that we could retrieve
        // When completing the task, selectedTaskSid still exist but the task in the map has been removed, so we have to check the size of it
        if(props.task){
          return TaskHelper.isChatBasedTask(props.task);
        } else {
          if(props.selectedTaskSid && props.tasks.size > 0) {
            return TaskHelper.isChatBasedTask(props.tasks.get(props.selectedTaskSid))
          }
          return false;
        }
      }
    };

    if (crmPanelView) {
      flex.AgentDesktopView.Panel2.Content.add(
        <QueryClientProvider
          client={queryClient}
          key="ChatMessagesCannedResponseCRMPanel"
        >
          <CRMPanel />
        </QueryClientProvider>, 
        options
      );
    } else {
      flex.TaskCanvas.Content.add(
        <QueryClientProvider
          client={queryClient}
          key="ChatMessagesCannedResponseDropdown"
        >
          <ChatDropdown />
        </QueryClientProvider>, 
        options
      );
    }
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
