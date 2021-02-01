import React from 'react';

export function isComponentStringCustom(componentStr: string) {
  const firstLetter = componentStr.charCodeAt(0);

  // a - z
  return firstLetter < 97 || firstLetter > 122;
}

export interface DynamicJsonProps {
  component: string;
  props?: { [name: string]: any; children: any | any[] };
  registry?: { [name: string]: any };
}

export function DynamicJson({ component, props, registry }: DynamicJsonProps) {
  const Component = registry && registry[component];

  if (!Component && isComponentStringCustom(component)) {
    console.error('Dynamic', component, props, registry);
    return null;
  }

  let { children, ...otherProps } = props || {};

  if (children) {
    if (!Array.isArray(children)) {
      children = [];
    }

    children = children.map((child: string | DynamicJsonProps, i: number) => {
      if (typeof child === 'string') {
        return child;
      }

      return <DynamicJson key={i} {...child} />;
    });
  }

  return React.createElement(Component || component, otherProps, children);
}
