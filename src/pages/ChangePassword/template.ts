export const template = `
<div class="rows">
  <h1>Изменить пароль</h1>
  <div class="row">
    <label class="row-label">Аватар</label>
    <img
      alt="Avatar"
      class="avatar"
      height="200"
      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
      width="200"
    />
  </div>
  <form class="rows">
    <div class="row">
      <label class="row-label" for="oldPassword">Старый пароль</label>
      <input id="oldPassword" name="oldPassword" type="password" value="old-password" />
    </div>
    <div class="row">
      <label class="row-label" for="newPassword">Новый пароль</label>
      <input id="newPassword" name="newPassword" type="password" value="new-password" />
    </div>
    <div class="row">
      <label class="row-label" for="newPasswordConfirmation">Повторите новый пароль</label>
      <input id="newPasswordConfirmation" name="newPasswordConfirmation" type="password" value="new-password" />
    </div>
    {{{ SubmitButton }}}
  </form>
</div>
`
