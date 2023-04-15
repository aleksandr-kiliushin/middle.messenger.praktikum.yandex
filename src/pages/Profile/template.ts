export const template = `
<div class="rows">
  <h1>Профиль</h1>
  <div class="row">
    <label class="row-label">Аватар</label>
    <img
      alt="Avatar"
      class="avatar"
      height="200"
      src="https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
      width="200"
    />
  </div>
  {{{ Details }}}
  <a href="/settings">Изменить данные</a>
  <a href="/change-password">Изменить пароль</a>
</div>
`
