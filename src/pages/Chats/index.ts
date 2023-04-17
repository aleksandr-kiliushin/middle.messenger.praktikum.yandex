import { TCreateChatPayload } from "@api/ChatsApi"
import { chatsController } from "@controllers/chatsController"
import { TStoreState, store, withStore } from "@store"

import { Anchor } from "@components/Anchor"
import { Box } from "@components/Box"
import { Button } from "@components/Button"
import { ChatListItem } from "@components/ChatListItem"
import { Dialog } from "@components/Dialog"
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
import { wait } from "@utils/wait"

import { messagesByDate } from "./data"
import "./index.css"

const fieldsRulesConfig = {
  message: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

type TChatOwnProps = TBlockBaseProps
type TChatPropsFromStore = Pick<
  TStoreState,
  "activeChatId" | "chats" | "isAddingUserToChatDialogOpen" | "isChatCreationDialogOpen"
>
type TChatProps = TChatOwnProps & TChatPropsFromStore

class _Chats extends Block<TChatProps> {
  constructor(props: TChatProps) {
    super({ props })
  }

  async componentDidMount() {
    await chatsController.fetchAndSetChats()

    const chatMessagesBlock = document.querySelector(".chat_messages")
    if (chatMessagesBlock instanceof HTMLDivElement) {
      chatMessagesBlock.scrollTo({ top: chatMessagesBlock.scrollHeight })
    }
  }

  async componentDidUpdate() {
    await wait(0)
    const chatMessagesBlock = document.querySelector(".chat_messages")
    if (chatMessagesBlock instanceof HTMLDivElement) {
      chatMessagesBlock.scrollTo({ top: chatMessagesBlock.scrollHeight })
    }
  }

  render() {
    const children: TBlockBaseProps["children"] = [
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
                    eventsListeners: { click: () => store.setState("isChatCreationDialogOpen", true) },
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
                    eventsListeners: {
                      click: () => {
                        store.setState("activeChatId", chat.id)
                      },
                    },
                    isActive: store.getState().activeChatId === chat.id,
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
                      new Box({
                        tag: "span",
                        content: this.props.chats.find((chat) => chat.id === this.props.activeChatId)?.title ?? "Чат не выбран",
                        className: "currently-open-chat_name",
                      }),
                    ],
                  }),
                  new Button({
                    startIconName: "person_add",
                    type: "button",
                    isDisabled: this.props.activeChatId === null,
                    eventsListeners: { click: () => store.setState("isAddingUserToChatDialogOpen", true) },
                  }),
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
    ]

    if (this.props.isChatCreationDialogOpen) {
      const createChat = createFormSubmitter<TCreateChatPayload>({
        fieldsRulesConfig: {},
        onValidationSuccess: async ({ formValues }) => {
          await chatsController.createChat({ payload: formValues })
          store.setState("isChatCreationDialogOpen", false)
        },
      })
      children.push(
        new Dialog({
          heading: "Создать чат",
          onClose: () => store.setState("isChatCreationDialogOpen", false),
          children: [
            new Box({
              tag: "form",
              className: "rows",
              eventsListeners: { submit: createChat },
              children: [
                new Input({ initialValue: "", name: "title", type: "text", placeholder: "Имя чата ..." }),
                new Button({ type: "submit", text: "Создать" }),
              ],
            }),
          ],
        })
      )
    }

    if (this.props.isAddingUserToChatDialogOpen) {
      const addUserToChat = createFormSubmitter({
        fieldsRulesConfig: {},
        onValidationSuccess: async ({ formValues }) => {
          if (this.props.activeChatId === null) return
          await chatsController.addUserToChat({
            payload: { users: [Number(formValues.userId)], chatId: this.props.activeChatId },
          })
          store.setState("isAddingUserToChatDialogOpen", false)
        },
      })
      children.push(
        new Dialog({
          heading: "Добавить пользователя в чат",
          onClose: () => store.setState("isAddingUserToChatDialogOpen", false),
          children: [
            new Box({
              tag: "form",
              className: "rows",
              eventsListeners: { submit: addUserToChat },
              children: [
                new Input({ initialValue: "", name: "userId", type: "number", placeholder: "ID пользователя ..." }),
                new Button({ type: "submit", text: "Добавить" }),
              ],
            }),
          ],
        })
      )
    }

    return { children }
  }
}

export const Chats = withStore(["chats", "isChatCreationDialogOpen", "isAddingUserToChatDialogOpen", "activeChatId"])(_Chats)
