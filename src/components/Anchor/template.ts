export const template = `
<a
  href="{{href}}"

  {{#if target}}
    target="{{target}}"
  {{/if}}

  {{#if className}}
    class="{{className}}"
  {{/if}}
>
  {{content}}
</a>
`
