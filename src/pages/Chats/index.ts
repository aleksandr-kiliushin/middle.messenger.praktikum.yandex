import { chatsController } from "@controllers/chatsController"
import { TStoreState, store, withStore } from "@store"

import { Anchor } from "@components/Anchor"
import { Box } from "@components/Box"
import { Button } from "@components/Button"
import { ChatListItem } from "@components/ChatListItem"
import { FileInput } from "@components/FileInput"
import { Image } from "@components/Image"
import { Input } from "@components/Input"
import { Message } from "@components/Message"
import { PageWrapper } from "@components/PageWrapper"
import { TextArea } from "@components/TextArea"

import { Block, TBlockBaseProps } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { FieldConfig } from "@utils/form-validator"

import { messagesByDate } from "./data"
import "./index.css"

const fieldsRulesConfig = {
  message: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

type TChatOwnProps = TBlockBaseProps
type TChatPropsFromStore = Pick<TStoreState, "chats" | "isChatCreationModalOpen">
type TChatProps = TChatOwnProps & TChatPropsFromStore

class _Chats extends Block<TChatProps> {
  constructor(props: TChatProps) {
    super({ props })
  }

  render() {
    return {
      children: [
        new PageWrapper({
          mainClass: "chats",
          children: [
            new Box({
              className: "chats-pane",
              tag: "div",
              children: [
                new Box({
                  className: "chats-pane_header",
                  tag: "div",
                  children: [
                    new Button({
                      type: "button",
                      text: "Создать чат",
                      className: "cleate_chat_button",
                      eventsListeners: { click: () => store.setState("isChatCreationModalOpen", true) },
                    }),
                    new Anchor({ content: "Профиль", href: "/profile", className: "profile_anchor" }),
                  ],
                }),
                new Input({ initialValue: "", name: "search", type: "text", placeholder: "Поиск ..." }),
                new Box({
                  className: "chats-pane_chats-list",
                  tag: "div",
                  // children: chatListItems.map((item) => new ChatListItem(item)),
                  children: this.props.chats.map((chat) => {
                    return new ChatListItem({
                      datetime: chat.last_message === null ? "" : chat.last_message.time,
                      message: chat.last_message === null ? "Нет сообщений" : chat.last_message.content,
                      name: chat.title,
                      unreadMessagesCount: chat.unread_count,
                    })
                  }),
                }),
              ],
            }),
            new Box({
              tag: "div",
              className: "chat",
              children: [
                new Box({
                  className: "chat_header",
                  tag: "div",
                  children: [
                    new Box({
                      tag: "div",
                      className: "currently-open-chat",
                      children: [
                        new Image({
                          alt: "Chat avatar",
                          className: "avatar",
                          height: 36,
                          src: "https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
                          width: 36,
                        }),
                        new Box({ tag: "span", content: "Вадим", className: "currently-open-chat_name" }),
                      ],
                    }),
                    new Button({ startIconName: "more_vert", type: "button" }),
                  ],
                }),
                new Box({
                  className: "chat_messages",
                  tag: "div",
                  children: messagesByDate.map(({ date, messages }) => {
                    return new Box({
                      tag: "div",
                      className: "messages-date-block",
                      children: [
                        new Box({ tag: "p", className: "messages-date-block_date", content: date }),
                        ...messages.map((message) => new Message(message)),
                      ],
                    })
                  }),
                }),
                new Box({
                  className: "chat_form",
                  tag: "form",
                  eventsListeners: {
                    submit: createFormSubmitter({
                      fieldsRulesConfig,
                      onValidationSuccess: console.log,
                    }),
                  },
                  children: [
                    new FileInput({ name: "attachment" }),
                    new TextArea({
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
                    }),
                    new Button({ startIconName: "send", type: "submit" }),
                  ],
                }),
              ],
            }),
          ],
        }),
        // ...(this.props.isChatCreationModalOpen
        //   ? [
        //       new Box({
        //         tag: "div",
        //         content: "HER",
        //       }),
        //     ]
        //   : []),
      ],
    }
  }

  async componentDidMount() {
    await chatsController.fetchAndSetChats()

    const chatMessagesBlock = document.querySelector(".chat_messages")
    if (chatMessagesBlock instanceof HTMLDivElement) {
      chatMessagesBlock.scrollTo(0, chatMessagesBlock.scrollHeight)
    }
  }
}

export const Chats = withStore(["chats"])(_Chats)
