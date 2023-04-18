import { DEFUALT_AVATAR_SRC, RESOURCES_BASE_URL } from "@constants"

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
    src="{{#if avatar}}${RESOURCES_BASE_URL}{{avatar}}{{else}}${DEFUALT_AVATAR_SRC}{{/if}}"
    width="48"
  />
  <p class="chats-list-item_name">{{title}}</p>
  <p class="chats-list-item_message">
    {{#if last_messsage}}
      {{last_messsage.content}}
    {{else}}
      Нет сообщений
    {{/if}}
  </p>
  <p class="chats-list-item_datetime">
    {{#if last_messsage}}
      {{last_messsage.time}}
    {{/if}}
  </p>
  {{#if unread_count}}
    <p class="chats-list-item_unread-messages-count">{{unread_count}}</p>
  {{/if}}
</div>
`
