import React from 'react';
import { render } from '@testing-library/react';
import { Default as DynamicJson } from '../stories/DynamicJson.stories';

describe('DynamicJson', () => {
  it('renders Hello World if given Hello World as props.children', () => {
    const { getByText } = render(
      <DynamicJson component="div" props={{ children: ['Hello World'] }} />
    );
    const cpt = getByText('Hello World');
    expect(cpt).not.toBeNull();
  });

  describe('Nested children', () => {
    it('renders Hello World and Hello World 2 if given Hello World as props.children and we pass in another DynamicJson one ', () => {
      const { getByText } = render(
        <DynamicJson
          component="div"
          props={{
            children: [
              'Hello World',
              {
                component: 'h1',
                props: {
                  children: ['Hello World 2'],
                },
              },
            ],
          }}
        />
      );
      const cpt = getByText('Hello World');
      expect(cpt).not.toBeNull();
      const cpt2 = getByText('Hello World 2');
      expect(cpt2).not.toBeNull();
    });
  });

  describe('Custom components', () => {
    it('renders null if the component doesnt exist', () => {
      const { queryByText } = render(
        <DynamicJson
          component="NotExist"
          props={{ children: ['Hello World'] }}
        />
      );
      expect(queryByText('Hello World')).toBeNull();
    });

    it('renders null if the component doesnt exist', () => {
      const { queryByText } = render(
        <DynamicJson
          component="Exist"
          props={{ children: ['Hello World'] }}
          registry={{
            Exist: (props: any) => <div {...props} />,
          }}
        />
      );
      expect(queryByText('Hello World')).not.toBeNull();
    });
  });
});
