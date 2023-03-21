export const template = `
<button class="button button__primary" type="{{type}}">
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
