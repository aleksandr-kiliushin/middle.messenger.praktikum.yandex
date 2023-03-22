import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { ChatListItem } from "../../components/ChatListItem"
import { Message } from "../../components/Message"
import { FileInput } from "../../components/FileInput"
import { template } from "./template"
import "./script"
import "./index.css"
import { Block } from "../../utils/Block"
import { chatListItems, messages } from "./data"

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
          SendMessageButton: new Button({
            startIconName: "send",
            type: "submit",
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
        }),
      }).markup,
      {}
    )
  }
}
