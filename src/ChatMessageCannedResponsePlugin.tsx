import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import CRMPanel from './components/CRMPanel/CRMPanel';
import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'ChatMessageCannedResponsePlugin';

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

    const options: Flex.ContentFragmentProps = { sortOrder: -1 };
    //   flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="ChatMessageCannedResponsePlugin-component" />, options);
      flex.AgentDesktopView.Panel2.Content.add(<CRMPanel key="ChatMessagesCannedResponseCRMPanel" />, options)
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
