export const template = `
<form class="rows">
  <h1>Вход</h1>
  <div class="row">
    <label class="row-label" for="login">Логин</label>
    <input id="login" name="login" type="text" />
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="password">Пароль</label>
    <input id="password" name="password" type="password" />
    <p class="row-error"></p>
  </div>
  {{{ SubmitButton }}}
  <a href="/sign-up">Нет аккаунта?</a>
</form>
`
