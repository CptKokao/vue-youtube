export default function currencyFilter(value, currency = 'RUB') {
  // Объект Intl.NumberFormat является конструктором объектов, включающих языко-зависимое форматирование чисел.
  return new Intl.NumberFormat ('ru-RU', {
    style: 'currency',
    currency
  }).format(value)
}
