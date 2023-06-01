/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Форматирование списка категорий с учетом вложенности
 *  - Предполагается что вложенные элементы идут после своего родителя
 *
 *@return {{ value: String, title: String }}
 */
export function nestedList(list, firstElement) {
  const output = [];
  const dash = '- ';
  const parents = new Map();
  const handledIds = new Set();

  if (firstElement) {
    output.push(firstElement);
  }

  // первый проход по массиву O(n)
  // формирование родителей с массивом детей
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const { _id: id, parent } = item;

    if (parents.get(id)) {
      parents.get(id).item = item;
    } else {
      parents.set(id, { item, children: [] });
    }

    if (parent) {
      if (parents.get(parent._id)) {
        parents.get(parent._id).children.push(item);
      } else {
        parents.set(parent._id, { item: {}, children: [item] });
      }
    }
  }

  // вспомогательная функция для обработки цепочки родитель -> дети
  const handleItem = ([id, value], level = 0) => {
    output.push({ value: id, title: dash.repeat(level) + value.item.title });
    handledIds.add(id);
    value.children.forEach((child) => {
      handleItem([child._id, parents.get(child._id)], level + 1);
    });
  };

  // обработаем мапу
  for (let item of parents) {
    // пропускаем уже обработанные элементы
    if (handledIds.has(item[0])) {
      console.log('skip');
      continue;
    }

    // выйдем из цикла если обработали все элементы
    if (handledIds.size === list.length) {
      console.log('break');
      break;
    }

    handleItem(item);
  }

  return output;
}
