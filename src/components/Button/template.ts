export const template = `
<button
  class="button button__primary {{className}}"

  {{#if type}}
    type="{{type}}"
  {{else}}
    type="button"
  {{/if}}

  {{#if isDisabled}}
    disabled
  {{/if}}
>
  {{#if startIconName}}
    <span class="material-icons">
      {{startIconName}}
    </span>
  {{/if}}
  {{text}}
  {{#if endIconName}}
    <span class="material-icons">
      {{endIconName}}
    </span>
  {{/if}}
  
</button>
`
