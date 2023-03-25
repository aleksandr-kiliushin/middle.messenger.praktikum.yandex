export const template = `
<form class="rows">
  <h1>Вход</h1>
  <div class="row">
    <label class="row-label" for="login">Логин</label>
    {{{ LoginInput }}}
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="password">Пароль</label>
    {{{ PasswordInput }}}
    <p class="row-error"></p>
  </div>
  {{{ SubmitButton }}}
  <a href="/sign-up">Нет аккаунта?</a>
</form>
`
