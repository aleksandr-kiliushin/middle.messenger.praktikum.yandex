export const template = `
<form
  {{#if className}}
    class="{{className}}"
  {{/if}}
>
  {{#rows}}
    {{{.}}}
  {{/rows}}
  {{#buttons}}
    {{{.}}}
  {{/buttons}}
</form>
`
