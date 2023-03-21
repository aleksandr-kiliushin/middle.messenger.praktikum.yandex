export const template = `
<label
  class="button button__primary"
  for="{{name}}"
  onkeypress="if (event.key === 'Enter') { event.target.click() }"
  tabindex="0"
>
  <span class="material-icons">attach_file</span>
</label>
<input id="{{name}}" name="{{name}}" type="file" />
`