export const template = `
<div class="rows">
  <h1>Настройки профиля</h1>
  <form class="row" id="avatar-form">
    <label class="row-label" for="avatar">Аватар</label>
    <label for="avatar">
      <img
        alt="Avatar"
        class="avatar"
        height="200"
        src="https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
        width="200"
      />
    </label>
    <input id="avatar" name="avatar" type="file" />
  </form>
  {{{ form }}}
</div>
`
