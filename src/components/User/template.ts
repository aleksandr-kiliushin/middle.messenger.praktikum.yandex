import { DEFUALT_AVATAR_SRC, RESOURCES_BASE_URL } from "@constants"

export const template = `
<div class="user">
  <img
    alt="Avatar"
    class="avatar"
    height="48"
    src="{{#if avatar}}${RESOURCES_BASE_URL}{{avatar}}{{else}}${DEFUALT_AVATAR_SRC}{{/if}}"
    width="48"
  />
  {{display_name}}
</div>
`
