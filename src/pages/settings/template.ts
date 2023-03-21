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
    <input id="email" name="email" type="text" value="pochta@yandex.ru" />
  </div>
  <div class="row">
    <label class="row-label" for="login">Логин</label>
    <input id="login" name="login" type="text" value="ivanivanov" />
  </div>
  <div class="row">
    <label class="row-label" for="first_name">Имя</label>
    <input id="first_name" name="first_name" type="text" value="ivan" />
  </div>
  <div class="row">
    <label class="row-label" for="second_name">Фамилия</label>
    <input id="second_name" name="second_name" type="text" value="ivanov" />
  </div>
  <div class="row">
    <label class="row-label" for="display_name">Имя в чате</label>
    <input id="display_name" name="display_name" type="text" value="Иван" />
  </div>
  <div class="row">
    <label class="row-label" for="phone">Телефон</label>
    <input id="phone" name="phone" type="text" value="+7 (909) 967 30 30" />
  </div>
  {{{ SubmitButton }}}
</form>
`