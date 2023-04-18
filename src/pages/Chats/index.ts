import { TCreateChatPayload } from "@api/ChatsApi"
import { DEFUALT_AVATAR_SRC, RESOURCES_BASE_URL } from "@constants"
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

import { messagesByDate } from "./data"
import "./index.css"

const fieldsRulesConfig = {
  message: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

type TChatOwnProps = TBlockBaseProps
type TChatPropsFromStore = Pick<
  TStoreState,
  | "activeChatId"
  | "activeChatParticipants"
  | "chats"
  | "isAddingUserToChatDialogOpen"
  | "isChatCreationDialogOpen"
  | "isChatParticipantsDialogOpen"
>
type TChatProps = TChatOwnProps & TChatPropsFromStore

class _Chats extends Block<TChatProps> {
  constructor(props: TChatProps) {
    super({ props })
  }

  async componentDidMount() {
    await chatsController.fetchAndSetChats()
  }

  async componentDidUpdate(prevProps: TChatProps) {
    if (this.props.activeChatId !== null && this.props.activeChatId !== prevProps.activeChatId) {
      await chatsController.fetchAndSetChatParticipants({ chatId: this.props.activeChatId })
    }

    const chatMessagesBlock = document.querySelector(".chat_messages")
    if (chatMessagesBlock instanceof HTMLDivElement) {
      chatMessagesBlock.scrollTo({ top: chatMessagesBlock.scrollHeight })
    }
  }

  render() {
    const {
      activeChatId,
      activeChatParticipants,
      chats,
      isAddingUserToChatDialogOpen,
      isChatCreationDialogOpen,
      isChatParticipantsDialogOpen,
    } = this.props

    const activeChat = chats.find((chat) => chat.id === activeChatId)

    const children: TBlockBaseProps["children"] = [
      new PageWrapper({
        mainClass: "chats",
        children: [
          new Box({
            className: "chats-pane",
            children: [
              new Box({
                className: "chats-pane_header",
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
                children: chats.map((chat) => {
                  return new ChatListItem({
                    ...chat,
                    isActive: store.getState().activeChatId === chat.id,
                    eventsListeners: { click: () => store.setState("activeChatId", chat.id) },
                  })
                }),
              }),
            ],
          }),
          new Box({
            className: "chat",
            children: [
              new Box({
                className: "chat_header",
                children: [
                  new Box({
                    className: "currently-open-chat",
                    children: [
                      new Image({
                        alt: "Chat avatar",
                        className: "avatar",
                        height: 36,
                        src: activeChat?.avatar ? RESOURCES_BASE_URL + activeChat.avatar : DEFUALT_AVATAR_SRC,
                        width: 36,
                      }),
                      new Box({
                        tag: "span",
                        content: activeChat?.title ?? "Чат не выбран",
                        className: "currently-open-chat_name",
                      }),
                    ],
                  }),
                  new Box({
                    className: "chat_header-controls",
                    children: [
                      new Button({
                        startIconName: "group",
                        type: "button",
                        className: activeChatId === null ? "display_none" : "",
                        eventsListeners: { click: () => store.setState("isChatParticipantsDialogOpen", true) },
                      }),
                      new Button({
                        startIconName: "person_add",
                        type: "button",
                        className: activeChatId === null ? "display_none" : "",
                        eventsListeners: { click: () => store.setState("isAddingUserToChatDialogOpen", true) },
                      }),
                    ],
                  }),
                ],
              }),
              new Box({
                className: "chat_messages",
                children: messagesByDate.map(({ date, messages }) => {
                  return new Box({
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

    if (isChatCreationDialogOpen) {
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

    if (isAddingUserToChatDialogOpen) {
      const addUserToChat = createFormSubmitter({
        fieldsRulesConfig: {},
        onValidationSuccess: async ({ formValues }) => {
          if (activeChatId === null) return
          await chatsController.addUserToChat({
            payload: { users: [Number(formValues.userId)], chatId: activeChatId },
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

    if (isChatParticipantsDialogOpen) {
      children.push(
        new Dialog({
          heading: "Участники чата",
          onClose: () => store.setState("isChatParticipantsDialogOpen", false),
          children: [
            new Box({
              className: "rows",
              children: activeChatParticipants.map((participant) => {
                return new Box({ content: participant.display_name })
              }),
            }),
          ],
        })
      )
    }

    return { children }
  }
}

export const Chats = withStore([
  "activeChatParticipants",
  "activeChatId",
  "chats",
  "isAddingUserToChatDialogOpen",
  "isChatCreationDialogOpen",
  "isChatParticipantsDialogOpen",
])(_Chats)
