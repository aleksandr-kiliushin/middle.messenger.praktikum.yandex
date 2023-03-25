export const template = `
<div class="chats-list-item">
  <img
    alt="Chat avatar"
    class="avatar chats-list-item_avatar"
    height="48"
    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
    width="48"
  />
  <p class="chats-list-item_name">{{name}}</p>
  <p class="chats-list-item_message">{{message}}</p>
  <p class="chats-list-item_datetime">{{datetime}}</p>
  {{#if unreadMessagesCount}}
    <p class="chats-list-item_unread-messages-count">{{unreadMessagesCount}}</p>
  {{/if}}
</div>
`
