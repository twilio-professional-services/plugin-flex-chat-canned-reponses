import React from 'react';

import Question from '../Question/Question';

interface OwnProps {
    section: string
    questions: {
        label: string,
        text: string
    }[]
}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = OwnProps;

// It is recommended to keep components stateless and use redux for managing states
const Section: React.FunctionComponent<Props> = ({ section, questions }) => {
    return (
      <>
        <p>{section}</p>
            {questions.map((q) => {
                return <Question label={q.label} text={q.text} />
        })}
      </>
  );
};

Section.displayName = 'Section';

export default Section;
