import React from "react";

import {Separator} from '@twilio-paste/core/separator';
import { Text } from '@twilio-paste/text'
import {Box} from '@twilio-paste/core/box';

import Question from "../Question";

interface OwnProps {
  section: string;
  questions: {
    label: string;
    text: string;
  }[];
  classes: any;
}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = OwnProps;

// It is recommended to keep components stateless and use redux for managing states
const Section: React.FunctionComponent<Props> = ({
  section,
  questions
}) => {
  return (
    <Box
      as="div"
      backgroundColor="colorBackgroundBody"
      padding="space60"
      borderRadius="borderRadius30"
    >
      <Text as="h2" color="colorText" fontWeight="fontWeightSemibold" fontSize="fontSize60">{section}</Text>
      <Separator orientation="horizontal" verticalSpacing="space40" />
      {questions.map((q) => {
        return <Question key={q.text} label={q.label} text={q.text} />;
      })}
    </Box>
  );
};

export default Section;