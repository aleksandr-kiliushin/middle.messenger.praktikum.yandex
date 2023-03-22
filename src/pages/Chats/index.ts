import Handlebars from "handlebars"
import { Button } from "../../components/Button"
import { PageWrapper } from "../../components/PageWrapper"
import { ChatListItem } from "../../components/ChatListItem"
import { Message } from "../../components/Message"
import { FileInput } from "../../components/FileInput"
import { template } from "./template"

import "./script"
import "./index.css"

export const Chats = () => {
  return new PageWrapper({
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

      ChatListItem1: new ChatListItem({
        datetime: "15:30",
        message: "Круто!",
        name: "Андрей",
        unreadMessagesCount: 4,
      }).markup,
      ChatListItem2: new ChatListItem({
        datetime: "12:00",
        message:
          "Здравствуй! Я надеюсь, у тебя всё хорошо. Я только что закончил свой экзамен и чувствую себя облегченным.",
        name: "Киноклуб",
        unreadMessagesCount: 0,
      }).markup,
      ChatListItem3: new ChatListItem({
        datetime: "12:00",
        message:
          "Здравствуй! Я надеюсь, у тебя всё хорошо. Я только что закончил свой экзамен и чувствую себя облегченным.",
        name: "Константинопольский Константин Константинович",
        unreadMessagesCount: 0,
      }).markup,
      ChatListItem4: new ChatListItem({
        datetime: "ср",
        message: "Привет! Как ты? Как прошло твое выходное? У нас была забавная вечеринка вчера.",
        name: "Вадим",
        unreadMessagesCount: 0,
      }).markup,
      ChatListItem5: new ChatListItem({
        datetime: "вт",
        message: "Хей! Давно не общались. Что нового в твоей жизни? У меня на прошлой неделе была интересная поездка.",
        name: "тет-а-теты",
        unreadMessagesCount: 21,
      }).markup,
      ChatListItem6: new ChatListItem({
        datetime: "12:00",
        message:
          "Здравствуй! Я надеюсь, у тебя всё хорошо. Я только что закончил свой экзамен и чувствую себя облегченным.",
        name: "Киноклуб 2",
        unreadMessagesCount: 0,
      }).markup,
      ChatListItem7: new ChatListItem({
        datetime: "21 фев",
        message: "Мда.",
        name: "Design destroyer",
        unreadMessagesCount: 0,
      }).markup,

      Message1: Message({
        text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        time: "11:56",
      }),
      Message2: Message({
        imageSrc:
          "https://images.unsplash.com/photo-1610826340363-4b13a6fb6e01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2132&q=80",
        time: "11:56",
      }),
      Message3: Message({
        isMessageByAuthorizedUser: true,
        text: "Привет,<br>Я думал о NASA недавно и решил поделиться с тобой своими мыслями. Космические исследования всегда вызывали у меня восторг, и NASA является ярким примером того, что человеческий разум способен на достижения, кажущиеся невозможными.<br>А фотографии космоса и Луны просто ошеломляющие! Они заставляют задуматься о нашем месте во Вселенной и о том, насколько малы мы на фоне ее бесконечности.<br>Для меня NASA является символом науки, исследований и прогресса. Я уверен, что они продолжат работать над технологиями, которые помогут нам лучше понимать нашу Вселенную и наше место в ней.<br>Как тебе такая тема? А как тебе космос и Луна? Расскажи мне о своих мыслях!",
        time: "11:59",
      }),
      Message4: Message({
        isMessageByAuthorizedUser: true,
        text: "Круто!",
        time: "12:00",
      }),
      Message5: Message({
        isMessageByAuthorizedUser: true,
        text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        time: "08:02",
      }),
      Message6: Message({
        imageSrc:
          "https://images.unsplash.com/photo-1598945768336-8d34de50056e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
        isMessageByAuthorizedUser: true,
        time: "08:05",
      }),
      Message7: Message({
        text: "Круто!",
        time: "08:31",
      }),
    }),
  }).markup
}
