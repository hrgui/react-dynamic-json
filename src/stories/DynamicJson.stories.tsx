import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DynamicJson, DynamicJsonProps } from '..';

const meta: Meta<typeof DynamicJson> = {
  title: 'Dynamic Json',
  component: DynamicJson,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

export const Default: StoryObj<DynamicJsonProps> = {
  args: {
    component: 'div',
    props: {
      children: ['Hello World'],
    },
  },
};

type ArrayDemoProps = { config: DynamicJsonProps[] };

const ArrayDemoComponent = ({ config }: ArrayDemoProps) => (
  <>
    {config.map((config, i) => (
      <DynamicJson key={i} {...config} />
    ))}
  </>
);

export const ArrayDemo: StoryObj<ArrayDemoProps> = {
  render: (args) => <ArrayDemoComponent {...args} />,
  args: {
    config: [
      {
        component: 'div',
        props: {
          children: ['Hello World'],
        },
      },
      {
        component: 'h1',
        props: {
          children: ['This is the next line'],
        },
      },
      {
        component: 'h2',
        props: {
          children: ['This is the next line ok'],
        },
      },
    ],
  },
};
