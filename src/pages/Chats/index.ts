import Handlebars from "handlebars"

import { Button } from "@components/Button"
import { ChatListItem } from "@components/ChatListItem"
import { FileInput } from "@components/FileInput"
import { Form } from "@components/Form"
import { Message } from "@components/Message"
import { PageWrapper } from "@components/PageWrapper"
import { Row } from "@components/Row"
import { TextArea } from "@components/TextArea"

import { Block } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { FieldConfig } from "@utils/form-validator"

import { chatListItems, messages } from "./data"
import "./index.css"
import { template } from "./template"

const fieldsRulesConfig = {
  message: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

export class Chats extends Block {
  constructor() {
    super(
      new PageWrapper({
        content: Handlebars.compile(template)({
          ChatOptionsButton: new Button({
            startIconName: "more_vert",
            type: "button",
          }).markup,
          FileInput: new FileInput({
            name: "attachment",
          }).markup,

          ChatListItem1: new ChatListItem(chatListItems.ChatListItem1).markup,
          ChatListItem2: new ChatListItem(chatListItems.ChatListItem2).markup,
          ChatListItem3: new ChatListItem(chatListItems.ChatListItem3).markup,
          ChatListItem4: new ChatListItem(chatListItems.ChatListItem4).markup,
          ChatListItem5: new ChatListItem(chatListItems.ChatListItem5).markup,
          ChatListItem6: new ChatListItem(chatListItems.ChatListItem6).markup,
          ChatListItem7: new ChatListItem(chatListItems.ChatListItem7).markup,

          Message1: new Message(messages.Message1).markup,
          Message2: new Message(messages.Message2).markup,
          Message3: new Message(messages.Message3).markup,
          Message4: new Message(messages.Message4).markup,
          Message5: new Message(messages.Message5).markup,
          Message6: new Message(messages.Message6).markup,
          Message7: new Message(messages.Message7).markup,

          form: new Form({
            rows: [
              new Row({
                field: new TextArea({
                  name: "message",
                  eventsListeners: {
                    input: (event) => {
                      validateField(event)
                      if (event.target instanceof HTMLTextAreaElement) {
                        event.target.style.height = ""
                        event.target.style.height = event.target.scrollHeight + "px"
                      }
                    },
                    blur: validateField,
                  },
                }).markup,
                name: "message",
              }).markup,
            ],
            buttons: [
              new Button({
                startIconName: "send",
                type: "submit",
              }).markup,
            ],
            eventsListeners: {
              submit: createFormSubmitter({
                fieldsRulesConfig,
                onValidationSuccess: console.log,
              }),
            },
            className: "chat_form",
          }).markup,
        }),
      }).markup,
      {}
    )
  }

  componentDidMount() {
    const chatMessagesBlock = document.querySelector(".chat_messages")
    if (chatMessagesBlock instanceof HTMLDivElement) {
      chatMessagesBlock.scrollTo(0, chatMessagesBlock.scrollHeight)
    }
  }
}
