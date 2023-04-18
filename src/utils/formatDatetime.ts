export const formatDatetime = (datetime: Date) => {
  const today = new Date()

  if (datetime.getDate() === today.getDate()) {
    // Последнее сообщение – сегодня.
    return datetime.toLocaleString("ru-RU", { hour: "numeric", minute: "numeric" })
  }

  if (Date.parse(String(datetime)) - Date.parse(String(today)) < 1000 * 60 * 60 * 24 * 7) {
    // Последнее сообщение – в течение недели.
    return datetime.toLocaleString("ru-RU", { weekday: "short" })
  }

  if (datetime.getFullYear() === today.getFullYear()) {
    // Последнее сообщение – в этом году.
    return datetime.toLocaleString("ru-RU", { day: "2-digit", month: "short" })
  }

  // Последнее сообщение – в прошлом году или ранее.
  return datetime.toLocaleString("ru-RU", { day: "2-digit", year: "numeric", month: "short" }).replace(" г.", "")
}
