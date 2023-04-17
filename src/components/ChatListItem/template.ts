export const template = `
<div
  class="
    chats-list-item
    {{#if isActive}}chats-list-item-active{{/if}}
  "
>
  <img
    alt="Chat avatar"
    class="avatar chats-list-item_avatar"
    height="48"
    src="https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
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
