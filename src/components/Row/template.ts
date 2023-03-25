export const template = `
{{#if label}}
  <div class="row">
    <label class="row-label" for={{name}}>{{label}}</label>
    {{{ field }}}
    <p class="row-error"></p>
  </div>
{{else}}
  <div>
    {{{ field }}}
  </div>
{{/if}}
`
