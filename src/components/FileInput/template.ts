export const template = `
<label
  class="button button__primary"
  onkeypress="if (event.key === 'Enter') { event.target.click() }"
  tabindex="0"
>
  <span class="material-icons">attach_file</span>
  <input id="{{name}}" type="file" />
</label>
`
