import { TStoreState, store, withStore } from "@store"

import { chatsController } from "@controllers/chatsController"

import { TCreateChatPayload } from "@api/ChatsApi"

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
import { User } from "@components/User"

import { Block, TBlockBaseProps } from "@utils/Block"
import { createFieldValidator } from "@utils/createFieldValidator"
import { createFormSubmitter } from "@utils/createFormSubmitter"
import { FieldConfig } from "@utils/form-validator"
import { formatDatetime } from "@utils/formatDatetime"

import { DEFUALT_AVATAR_SRC, RESOURCES_BASE_URL } from "@constants"

import "./index.css"

const fieldsRulesConfig = {
  message: new FieldConfig({ type: "string" }).isRequired({ value: true }),
}

const validateField = createFieldValidator({ fieldsRulesConfig })

type TChatOwnProps = TBlockBaseProps
type TChatPropsFromStore = Pick<
  TStoreState,
  | "activeChatId"
  | "activeChatMessages"
  | "activeChatParticipants"
  | "authorizedUserData"
  | "chats"
  | "isAddingUserToChatDialogOpen"
  | "isChatCreationDialogOpen"
  | "isChatDeletionDialogOpen"
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
    const { activeChatId } = this.props

    if (activeChatId !== null && activeChatId !== prevProps.activeChatId) {
      store.setState("activeChatMessages", [])
      await chatsController.fetchAndSetChatParticipants()
      await chatsController.setupChatConnection()
    }
  }

  render() {
    const {
      activeChatId,
      activeChatMessages,
      activeChatParticipants,
      authorizedUserData,
      chats,
      isAddingUserToChatDialogOpen,
      isChatCreationDialogOpen,
      isChatDeletionDialogOpen,
      isChatParticipantsDialogOpen,
    } = this.props

    if (authorizedUserData === null) return { children: [] }

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
                    text: "Создать чат",
                    className: "cleate_chat_button",
                    eventsListeners: { click: () => store.setState("isChatCreationDialogOpen", true) },
                  }),
                  new Anchor({ content: "Профиль", href: "/profile", className: "profile_anchor" }),
                ],
              }),
              new Input({ name: "search", placeholder: "Поиск ..." }),
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
            className: `chat ${activeChatId === null ? " display_none" : ""}`,
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
                      new Box({ tag: "span", content: activeChat?.title ?? "Чат не выбран" }),
                    ],
                  }),
                  new Box({
                    className: "chat_header-controls",
                    children: [
                      new Button({
                        startIconName: "group",
                        eventsListeners: { click: () => store.setState("isChatParticipantsDialogOpen", true) },
                      }),
                      new Button({
                        startIconName: "person_add",
                        eventsListeners: { click: () => store.setState("isAddingUserToChatDialogOpen", true) },
                      }),
                      new Button({
                        startIconName: "close",
                        eventsListeners: { click: () => store.setState("isChatDeletionDialogOpen", true) },
                      }),
                    ],
                  }),
                ],
              }),
              new Box({
                className: "chat_messages",
                children: activeChatMessages.map((message) => {
                  return new Message({
                    isMessageByAuthorizedUser: message.user_id === authorizedUserData.id,
                    time: formatDatetime(new Date(message.time)),
                    text: message.content.replaceAll("\n", "<br>"),
                  })
                }),
              }),
              new Box({
                className: "chat_form",
                tag: "form",
                eventsListeners: {
                  submit: createFormSubmitter<{ message: string }>({
                    fieldsRulesConfig,
                    onValidationSuccess: ({ formValues }) => {
                      chatsController.sendMessage({ content: formValues.message })
                    },
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
                      keypress: (event) => {
                        if (!(event instanceof KeyboardEvent)) return
                        if (!(event.target instanceof HTMLTextAreaElement)) return

                        if (event && event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault()
                          chatsController.sendMessage({ content: event.target.value })
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
                new Input({ name: "title", placeholder: "Имя чата ..." }),
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
                new Input({ name: "userId", type: "number", placeholder: "ID пользователя ..." }),
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
                return new Box({
                  className: "chat_participant",
                  children: [
                    new User(participant),
                    new Button({
                      text: "Удалить",
                      className: participant.id === authorizedUserData.id ? "display_none" : "",
                      eventsListeners: { click: () => chatsController.deleteChatParticipant({ participantId: participant.id }) },
                    }),
                  ],
                })
              }),
            }),
          ],
        })
      )
    }

    if (isChatDeletionDialogOpen) {
      children.push(
        new Dialog({
          heading: "Удаление чата",
          onClose: () => store.setState("isChatDeletionDialogOpen", false),
          children: [
            new Box({
              className: "rows",
              children: [
                new Box({ content: `Вы уверены, что хотите удалить чат "${activeChat?.title}"?` }),
                new Button({
                  text: "Удалить",
                  eventsListeners: {
                    click: async () => {
                      if (activeChatId === null) return
                      await chatsController.deleteChat({ chatId: activeChatId })
                      store.setState("isChatDeletionDialogOpen", false)
                      store.setState("activeChatId", null)
                    },
                  },
                }),
              ],
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
  "activeChatMessages",
  "authorizedUserData",
  "chats",
  "isAddingUserToChatDialogOpen",
  "isChatCreationDialogOpen",
  "isChatDeletionDialogOpen",
  "isChatParticipantsDialogOpen",
])(_Chats)
