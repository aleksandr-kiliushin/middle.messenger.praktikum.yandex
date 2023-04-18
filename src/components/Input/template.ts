export const template = `
<input
  id="{{name}}"
  name="{{name}}"

  {{#if type}}
    type="{{type}}"
  {{else}}
    type="text"
  {{/if}}

  {{#if placeholder}}
    placeholder="{{placeholder}}"
  {{/if}}

  {{#if className}}
    class="{{className}}"
  {{/if}}
/>
`
