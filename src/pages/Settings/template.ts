export const template = `
<div class="rows">
  <h1>Настройки профиля</h1>
  <form class="row" id="avatar-form">
    <label class="row-label" for="avatar">Аватар</label>
    <label for="avatar">
      {{{ Avatar }}}
    </label>
    <input id="avatar" name="avatar" type="file" />
  </form>
  {{{ form }}}
</div>
`
