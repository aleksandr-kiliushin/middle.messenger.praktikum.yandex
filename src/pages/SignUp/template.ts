export const template = `
<form class="rows">
  <h1>Регистрация</h1>
  <div class="row">
    <label class="row-label" for="email">Почта</label>
    <input id="email" name="email" type="text" />
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="login">Логин</label>
    <input id="login" name="login" type="text" />
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="first_name">Имя</label>
    <input id="first_name" name="first_name" type="text" />
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="second_name">Фамилия</label>
    <input id="second_name" name="second_name" type="text" />
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="phone">Телефон</label>
    <input id="phone" name="phone" type="text" />
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="password">Пароль</label>
    <input id="password" name="password" type="password" />
    <p class="row-error"></p>
  </div>
  <div class="row">
    <label class="row-label" for="passwordConfirmation">Пароль (ещё раз)</label>
    <input id="passwordConfirmation" name="passwordConfirmation" type="password" />
    <p class="row-error"></p>
  </div>
  {{{ SubmitButton }}}
  <a href="/sign-in">Войти</a>
</form>
`
