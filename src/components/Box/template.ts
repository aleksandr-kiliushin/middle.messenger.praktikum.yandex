export const template = `
<{{#if tag}}{{tag}}{{else}}div{{/if}}

  {{#if className}}
    class="{{className}}"
  {{/if}}
>
  {{content}}
</{{#if tag}}{{tag}}{{else}}div{{/if}}>
`

// export const template = `
// <{{tag}}
//   {{#if className}}
//     class="{{className}}"
//   {{/if}}
// >
//   {{content}}
// </{{tag}}>
// `
