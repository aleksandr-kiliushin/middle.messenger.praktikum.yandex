export const template = `
<div class="rows">
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
  {{{ form }}}
</div>
`
