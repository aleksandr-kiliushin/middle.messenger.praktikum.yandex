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
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
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
    <form class="chat_form">
      {{{ FileInput }}}
      {{{ MessageField }}}
      {{{ SendMessageButton }}}
    </form>
  </div>
</div>
`
