import React from 'react';

export function isComponentStringCustom(componentStr: string) {
  const firstLetter = componentStr.charCodeAt(0);

  // a - z
  return firstLetter < 97 || firstLetter > 122;
}

export interface DynamicJsonProps {
  /**
   * Either something that is acceptable with React.createElement or a string to the registry prop.
   * If the component does not exist, it will return null.
   */
  component: string;
  /** To be passed into the props of the component. For dangerouslySetInnerHTML, the DynamicJson component must have allowDangerouslySetInnerHTML as a prop.  */
  props?: {
    [name: string]: any;
    children?: any | any[];
    dangerouslySetInnerHTML?: any;
  };
  /** If using custom components, provide a registry to lookup */
  registry?: { [name: string]: any };
  /** If true, dangerouslySetInnerHTML is allowed as a prop */
  allowDangerouslySetInnerHTML?: boolean;
}

export function DynamicJson({
  component,
  props,
  registry,
  allowDangerouslySetInnerHTML = false,
}: DynamicJsonProps) {
  const Component = registry && registry[component];

  if (!component || (!Component && isComponentStringCustom(component))) {
    console.error(
      'DynamicJson was sent an invalid component. Returning null.',
      component,
      props,
      registry
    );
    return null;
  }

  let { children, dangerouslySetInnerHTML, ...otherProps } = props || {};

  if (allowDangerouslySetInnerHTML) {
    otherProps = { ...otherProps, dangerouslySetInnerHTML };
  }

  if (children) {
    if (!Array.isArray(children)) {
      children = [];
    }

    children = children.map((child: string | DynamicJsonProps, i: number) => {
      if (typeof child === 'string') {
        return child;
      }

      return (
        <DynamicJson
          key={i}
          {...child}
          allowDangerouslySetInnerHTML={allowDangerouslySetInnerHTML}
          registry={registry}
        />
      );
    });
  }

  return React.createElement(Component || component, otherProps, children);
}
