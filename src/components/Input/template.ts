export const template = `
<input
  id="{{name}}"
  name="{{name}}"
  type="{{type}}"

  {{#if placeholder}}
    placeholder="{{placeholder}}"
  {{/if}}
/>
`
