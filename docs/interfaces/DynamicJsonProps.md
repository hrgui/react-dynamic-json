[**react-dynamic-json v0.0.0-publish-with-github-actions-please**](../README.md)

***

# Interface: DynamicJsonProps

## Properties

<a id="allowdangerouslysetinnerhtml"></a>

### allowDangerouslySetInnerHTML?

> `optional` **allowDangerouslySetInnerHTML?**: `boolean`

If true, dangerouslySetInnerHTML is allowed as a prop

***

<a id="component"></a>

### component

> **component**: `string`

Either something that is acceptable with React.createElement or a string to the registry prop.
If the component does not exist, it will return null.

***

<a id="condition"></a>

### condition?

> `optional` **condition?**: `string` \| `boolean`

If provided, the component is rendered only when the condition evaluates truthy

***

<a id="props"></a>

### props?

> `optional` **props?**: `object`

To be passed into the props of the component. For dangerouslySetInnerHTML, the DynamicJson component must have allowDangerouslySetInnerHTML as a prop.

#### Index Signature

\[`name`: `string`\]: `any`

#### children?

> `optional` **children?**: `any`

#### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML?**: `any`

***

<a id="registry"></a>

### registry?

> `optional` **registry?**: `object`

If using custom components, provide a registry to lookup

#### Index Signature

\[`name`: `string`\]: `any`

***

<a id="variables"></a>

### variables?

> `optional` **variables?**: `object`

Variables used for Mustache interpolation

#### Index Signature

\[`name`: `string`\]: `any`
