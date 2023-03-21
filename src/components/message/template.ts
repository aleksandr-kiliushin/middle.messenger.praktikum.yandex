export const template = `
<div class="
    message
    {{#if isMessageByAuthorizedUser}}message__by-authorized-user{{else}}message__by-another-user{{/if}}
    {{#if imageSrc}}message__with-image{{else}}message__with-text{{/if}}
  "
>
  {{#if imageSrc}}
    <img alt="Message image" class="message_image" src="{{imageSrc}}">
  {{else}}
    <p class="message_text">{{{text}}}</p>
  {{/if}}
  <span class="message_time">{{time}}</span>
</div>
`
