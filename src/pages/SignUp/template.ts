export const template = `
<form class="rows">
  <h1>Регистрация</h1>
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
    <label class="row-label" for="phone">Телефон</label>
    {{{ PhoneInput }}}
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="password">Пароль</label>
    {{{ PasswordInput }}}
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="passwordConfirmation">Пароль (ещё раз)</label>
    {{{ PasswordConfirmationInput }}}
    <p class="row-error"></p>
  </div>
  {{{ SubmitButton }}}
  <a href="/sign-in">Войти</a>
</form>
`
