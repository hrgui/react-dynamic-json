import React from 'react';
import mustache from 'mustache';
import { compileExpression } from 'filtrex';

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
  /** If provided, the component is rendered only when the condition evaluates truthy */
  condition?: string | boolean;
  /** Variables used for Mustache interpolation */
  variables?: { [name: string]: any };
}

function isPlainObject(value: any): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getPathValue(source: any, path: string): any {
  return path.split('.').reduce((current, segment) => {
    if (current === null || current === undefined) {
      return undefined;
    }
    return typeof current === 'object' ? current[segment] : undefined;
  }, source);
}

function resolveExactMatch(
  value: string,
  variables?: Record<string, any>
): {
  matched: boolean;
  value: any;
} {
  if (!variables) {
    return { matched: false, value };
  }

  const match = value.match(/^\s*\{\{\s*([^\s{}][^{}]*?)\s*\}\}\s*$/);
  if (!match) {
    return { matched: false, value };
  }

  return { matched: true, value: getPathValue(variables, match[1]) };
}

function evaluateCondition(
  condition: string | boolean | undefined,
  variables?: Record<string, any>
): boolean {
  if (condition === undefined) {
    return true;
  }

  if (typeof condition === 'boolean') {
    return condition;
  }

  if (!condition.trim()) {
    return false;
  }

  try {
    const evaluator = compileExpression(condition, {
      customProp(name, getter, obj) {
        if (name.includes('.')) {
          return getPathValue(obj, name);
        }
        return getter(name);
      },
    });
    return Boolean(evaluator(variables || {}));
  } catch {
    return false;
  }
}

function renderTemplateValue(value: any, variables?: Record<string, any>): any {
  if (typeof value === 'string') {
    const exact = resolveExactMatch(value, variables);
    if (exact.matched) {
      return exact.value;
    }

    return variables ? mustache.render(value, variables) : value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => renderTemplateValue(item, variables));
  }

  if (isPlainObject(value)) {
    const result: Record<string, any> = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] =
          key === 'condition'
            ? value[key]
            : renderTemplateValue(value[key], variables);
      }
    }
    return result;
  }

  return value;
}

export function DynamicJson({
  component,
  props,
  registry,
  allowDangerouslySetInnerHTML = false,
  variables,
  condition,
}: DynamicJsonProps) {
  if (!evaluateCondition(condition, variables)) {
    return null;
  }

  const renderedComponent = variables
    ? mustache.render(component, variables)
    : component;
  const Component = registry && registry[renderedComponent];

  if (
    !renderedComponent ||
    (!Component && isComponentStringCustom(renderedComponent))
  ) {
    console.error(
      'DynamicJson was sent an invalid component. Returning null.',
      renderedComponent,
      props,
      registry
    );
    return null;
  }

  const renderedProps = renderTemplateValue(props || {}, variables);
  let { children, dangerouslySetInnerHTML, ...otherProps } = renderedProps;

  if (allowDangerouslySetInnerHTML) {
    otherProps = { ...otherProps, dangerouslySetInnerHTML };
  }

  if (children) {
    if (!Array.isArray(children)) {
      children = [];
    }

    children = children
      .map((child: string | DynamicJsonProps, i: number) => {
        if (typeof child === 'string') {
          return child;
        }

        return (
          <DynamicJson
            key={i}
            {...child}
            allowDangerouslySetInnerHTML={allowDangerouslySetInnerHTML}
            registry={registry}
            variables={variables}
          />
        );
      })
      .filter((child) => child !== null && child !== undefined);
  }

  return React.createElement(
    Component || renderedComponent,
    otherProps,
    children
  );
}
