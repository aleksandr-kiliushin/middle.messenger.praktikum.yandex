export const template = `
<div class="rows">
  <h1>Профиль</h1>
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
  <div class="row">
    <label class="row-label">Почта</label>
    <span class="row-value" id="email"></span>
  </div>
  <div class="row">
    <label class="row-label">Логин</label>
    <span class="row-value" id="login"></span>
  </div>
  <div class="row">
    <label class="row-label">Имя</label>
    <span class="row-value" id="first_name"></span>
  </div>
  <div class="row">
    <label class="row-label">Фамилия</label>
    <span class="row-value" id="second_name"></span>
  </div>
  <div class="row">
    <label class="row-label">Имя в чате</label>
    <span class="row-value" id="display_name"></span>
  </div>
  <div class="row">
    <label class="row-label">Телефон</label>
    <span class="row-value" id="phone"></span>
  </div>
  <a href="/settings">Изменить данные</a>
  <a href="/change-password">Изменить пароль</a>
  {{{ LogoutButton }}}
</div>
`
