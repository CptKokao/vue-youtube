export default function dateFilter(value, format = "datetime") {
  // опции для DateTimeFormat
  const options = {}

  // если format содержит date, то выводит дату
  if (format.includes('date')) {
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric";
  }

  // если format содержит time, то выводит время
  if (format.includes('time')) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }

  return Intl.DateTimeFormat("ru-RU", options).format(new Date(value))
}
