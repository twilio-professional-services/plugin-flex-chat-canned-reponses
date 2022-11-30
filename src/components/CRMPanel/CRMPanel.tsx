import React from "react";

import { Text } from '@twilio-paste/text'
import {SkeletonLoader} from '@twilio-paste/core/skeleton-loader';
import {Column, Grid} from '@twilio-paste/core/grid';
import {Box} from '@twilio-paste/core/box';

import Section from "./components/Section";
import { useResponses } from "../../api";

// It is recommended to keep components stateless and use redux for managing states
const CRMPanel: React.FunctionComponent = () => {
  const { status, data } = useResponses();

  return (
    <Box as="div" padding="space50">
        <Text as="h1" fontSize="fontSize80" fontWeight="fontWeightSemibold" marginBottom="space40" marginTop="space30">
          Pre-canned Chat Responses
        </Text>
      {status === "loading" ? (
        <SkeletonLoader />
      ) : status === "success" ? (
        <>
          {data.data.map((q: any) => (
            <Grid gutter="space30" vertical>
              <Column>
                <Section {...q} />
              </Column>
            </Grid>
          ))}
        </>
      ) : (
        <Text as="p">
          There was an error fetching responses -- please reload the page.
        </Text>
      )}
    </Box>
  );
};

export default CRMPanel;
