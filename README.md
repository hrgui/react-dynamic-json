# @hrgui/react-dynamic-json

Allows JSON as an input for a React component. Useful for making react components primarily with JSON objects, just like how React works.

Note that this is really just a wrapper around `React.createElement`.

# WARNING / DISCLAIMER

**Sanitize and CHECK where your props come from before using DynamicJson in production, OR ELSE YOU MAY GET FIRED**

If you must need to use `dangerouslySetInnerHTML`, pass in `allowDangerouslySetInnerHTML` to `<DynamicJson />`.

# Usage

```
yarn install @hrgui/react-dynamic-json
```

## Hello World
```tsx
import { DynamicJson } from '@hrgui/react-dynamic-json';

export function App() {
  return <DynamicJson component="div" props={{ children: ['Hello World'] }} />;
}
```

## Nested children
```tsx
import { DynamicJson } from '@hrgui/react-dynamic-json';

export function App() {
  return (
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
}
```
