export const template = `
<label
  {{#if for}}
    for="{{for}}"
  {{/if}}

  {{#if className}}
    class="{{className}}"
  {{/if}}
>
  {{content}}
</label>
`
