export const template = `
<div class="chats">
  <div class="chats-pane">
    <div class="chats-pane_header">
      <a href="/profile">Профиль</a>
      <input name="search" placeholder="Поиск" type="text">
    </div>
    <div class="chats-pane_chats-list">
      {{{ ChatListItem1 }}}
      {{{ ChatListItem2 }}}
      {{{ ChatListItem3 }}}
      {{{ ChatListItem4 }}}
      {{{ ChatListItem5 }}}
      {{{ ChatListItem6 }}}
      {{{ ChatListItem7 }}}
    </div>
  </div>
  <div class="chat">
    <div class="chat_header">
      <div class="currently-open-chat">
        <img
          alt="Chat avatar"
          class="avatar"
          height="36"
          src="https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
          width="36"
        />
        <span class="currently-open-chat_name">Вадим</span>
      </div>
      {{{ ChatOptionsButton }}}
    </div>
    <div class="chat_messages">
      <div class="messages-date-block">
        <p class="messages-date-block_date">19 июня</p>
        {{{ Message1 }}}
        {{{ Message2 }}}
        {{{ Message3 }}}
        {{{ Message4 }}}
      </div>
      <div class="messages-date-block">
        <p class="messages-date-block_date">Сегодня</p>
        {{{ Message5 }}}
        {{{ Message6 }}}
        {{{ Message7 }}}
      </div>
    </div>
    <div class="chat_form-container">
      {{{ FileInput }}}
      {{{ form }}}
    </div>
  </div>
</div>
`
