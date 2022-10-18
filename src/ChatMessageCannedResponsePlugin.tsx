import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import { QueryClient, QueryClientProvider } from "react-query";

import CRMPanel from "./components/CRMPanel/CRMPanel";
import reducers, { namespace } from "./states";
import ChatDropdown from "./components/ChatDropdown/ChatDropdown";

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

    const crmPanelView = false;
    const queryClient = new QueryClient();
    const options: Flex.ContentFragmentProps = {
      if: (props: any) => flex.TaskHelper.isChatBasedTask(props.task),
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
