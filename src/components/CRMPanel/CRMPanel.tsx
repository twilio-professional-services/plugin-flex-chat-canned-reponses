import React from 'react';

import Section from './components/Section/Section';

interface OwnProps {
  // Props passed directly to the component
}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = OwnProps;

// It is recommended to keep components stateless and use redux for managing states
const CRMPanel: React.FunctionComponent<Props> = (props: Props) => {
  const questions = [
    {
      section: 'Sales',
      questions: [
        {
          label: 'Cost',
          text: 'We have multiple billing options. You can pay yearly and save 10%'
        },
        {
          label: 'Promotion',
          text: 'We do offer discounts for our best customers.'
        }
      ]
    },
    {
      section: 'Support',
      questions: [
        { label: 'Login', text: 'You can login at https://example.com' },
        { label: 'Forgot Password', text: 'You can reset your password here at https://example.com/passwordreset' }
      ]
    }
  ];
  return (
      <>
      {questions.map((q) => {
        return <Section {...q} />
        })}
      </>
  );
};

CRMPanel.displayName = 'CRMPanel';

export default CRMPanel;
