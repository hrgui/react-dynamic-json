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

export const MustacheTemplate: StoryObj<DynamicJsonProps> = {
  args: {
    component: 'div',
    props: {
      children: [
        'Hello {{user.name}}!',
        {
          component: 'p',
          props: {
            children: ['Your role is {{user.role}}.'],
          },
        },
      ],
    },
    variables: {
      user: {
        name: 'Alice',
        role: 'developer',
      },
    },
  },
};

export const MustacheExactValue: StoryObj<DynamicJsonProps> = {
  render: () => (
    <DynamicJson
      component="ExactUser"
      props={{ userId: '{{user.id}}' }}
      variables={{ user: { id: 42 } }}
      registry={{
        ExactUser: ({ userId }: any) => (
          <div>{`userId(${typeof userId}): ${userId}`}</div>
        ),
      }}
    />
  ),
};

export const MustacheMixedValue: StoryObj<DynamicJsonProps> = {
  render: () => (
    <DynamicJson
      component="ExactUser"
      props={{
        userId: '{{user.id}}',
        children: [
          'Welcome {{user.name}}!',
          {
            component: 'span',
            props: {
              children: ['Active: {{user.active}}'],
            },
          },
        ],
      }}
      variables={{ user: { id: 42, name: 'Alice', active: true } }}
      registry={{
        ExactUser: ({ userId, children }: any) => (
          <div>
            <div>{`userId(${typeof userId}): ${userId}`}</div>
            {children}
          </div>
        ),
      }}
    />
  ),
};

export const MustacheArrayValue: StoryObj<DynamicJsonProps> = {
  render: () => (
    <DynamicJson
      component="ArrayRenderer"
      props={{ items: '{{items}}' }}
      variables={{ items: ['apple', 'banana', 'carrot'] }}
      registry={{
        ArrayRenderer: ({ items }: any) => (
          <div>
            {items.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </div>
        ),
      }}
    />
  ),
};

export const MustacheCondition: StoryObj<DynamicJsonProps> = {
  render: () => (
    <DynamicJson
      component="ExactUser"
      props={{
        userId: '{{user.id}}',
        children: [
          {
            component: 'p',
            condition: 'user.name',
            props: {
              children: ['Hello {{user.name}}!'],
            },
          },
          {
            component: 'p',
            condition: 'user.active',
            props: {
              children: ['Active user'],
            },
          },
          {
            component: 'p',
            condition: 'user.role === "developer"',
            props: {
              children: ['Developer access granted'],
            },
          },
        ],
      }}
      variables={{
        user: { id: 42, name: 'Alice', active: true, role: 'developer' },
      }}
      registry={{
        ExactUser: ({ userId, children }: any) => (
          <div>
            <div>{`userId(${typeof userId}): ${userId}`}</div>
            {children}
          </div>
        ),
      }}
    />
  ),
};
