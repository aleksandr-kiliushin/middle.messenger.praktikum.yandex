export const template = `
<form class="rows">
  <h1>Настройки профиля</h1>
  <div class="row">
    <label class="row-label" for="avatar">Аватар</label>
    <label for="avatar">
      <img
        alt="Avatar"
        class="avatar"
        height="200"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
        width="200"
      />
    </label>
    <input id="avatar" name="avatar" type="file" />
  </div>
  <div class="row">
    <label class="row-label" for="email">Почта</label>
    {{{ EmailInput }}}
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="login">Логин</label>
    {{{ LoginInput }}}
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="first_name">Имя</label>
    {{{ FirstNameInput }}}
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="second_name">Фамилия</label>
    {{{ SecondNameInput }}}
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="display_name">Имя в чате</label>
    {{{ DisplayNameInput }}}
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="phone">Телефон</label>
    {{{ PhoneInput }}}
    <p class="row-error"></p>
  </div>
  {{{ SubmitButton }}}
</form>
`
