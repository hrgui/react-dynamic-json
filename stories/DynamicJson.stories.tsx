import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DynamicJson, DynamicJsonProps } from '../src';

const meta: Meta = {
  title: 'Dynamic Json',
  component: DynamicJson,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DynamicJsonProps> = args => <DynamicJson {...args} />;
export const Default = Template.bind({});
Default.args = {
  component: 'div',
  props: {
    children: ['Hello World'],
  },
};

const ArrayTemplate: Story<{ config: DynamicJsonProps[] }> = ({ config }) => (
  <>
    {config.map((config, i) => (
      <DynamicJson key={i} {...config} />
    ))}
  </>
);
export const ArrayDemo = ArrayTemplate.bind({});
ArrayDemo.args = {
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
  ],
};
