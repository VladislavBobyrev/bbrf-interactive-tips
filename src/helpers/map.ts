/**
 * Записываем в мапу опции
 * @param {new Мap} map элемент для которого нужно применить стили
 * @param {object} options обьект с опциями
 */
//  export function recordMap(map, options) {
//   for (const [key, value] of Object.entries(options))
//   { 
//     map.set(key, value)
//   }
// }
export function sortMinMax (array: {} | []) {
  console.log(array)
}



// let step = 1
// const SELECTOR_MODAL =  'bbrf-modal'
// const SELECTOR_DIALOG = 'bbrf-dialog'

// /**
//  * Создания интерактивных руководств и подсказок
//  * @param {className} selector имя класса
//  */
// function addGuideTip(selector)
// {
//   const elementRect = document.querySelector(selector).getBoundingClientRect() // Элемент отслежавания
//   const optionsMap = new Map()
//   recordMap(optionsMap, {'step': step})   // записываем шаг в мапу
//   step++

//   // создаем блоки в DOM
//   const modal = document.createElement('article') // контейнер с видимым контентом
//   modal.classList.add(SELECTOR_MODAL)
//   const holedContainer = document.createElement('div')
//   holedContainer.classList.add(SELECTOR_DIALOG)
//   const currentStep = holedContainer.dataset.step = optionsMap.get('step')

//   if (!document.body.querySelector(`.${SELECTOR_MODAL}`))
//   { 
//     document.body.append(modal)
//   }
  
//   // Задаем позицию контейнеру с видимым контентом
//   holedContainer.style.left = `${elementRect.x + elementRect.width / 2}px`
//   holedContainer.style.top = `${elementRect.y + + elementRect.height / 2}px`
//   holedContainer.style.width = `${elementRect.width}px`
//   holedContainer.style.height = `${elementRect.height}px`
//   document.querySelector(`.${SELECTOR_MODAL}`).append(holedContainer)

//   return {
//     setOptions: function (options = {})
//     {
//               // Сохраняем раннее полученные значения чтобы они не удалились из памяти
//       options = {
//         ...Object.fromEntries(optionsMap.entries()),
//         ...options,
//       } 

//       // тк цвет бэкграунда у нас на самом деле box-shadow перезаписываем его
//       if (options.background)
//       {
//         const background = options.background
//         options.boxShadow =`1px 0px 1000vh 1000vw  ${background}`;
//         options.background = 'transparent';
//       }

//       recordMap(optionsMap, options)
//       updateStyle(holedContainer, options)
//     },

//     getOptions: function(name)
//     {
//       return optionsMap.get(name)
//     },
//     getStep()
//     {
//       return currentStep
//     },
//     nextStep()
//     {
//       return currentStep++
//     },
//     prevStep()
//     {
//       return currentStep--
//     }

//   }
 
// }

// /**
//  * Обнавляем стили 
//  * @param {HTMLelement} container элемент для которого нужно применить стили
//  * @param {object} style обьект со стилями
//  */
// function updateStyle(container, style)
//  {
//    Object.entries(style).forEach(entry =>
//    {
//      const name = entry[0];
//      const value = entry[1];
//      container.style[name] = value; 
   
//    });
//  }
 
 
 
//  function slideTip(number)
//  {
//    const step = document.querySelector(`.${SELECTOR_DIALOG}[data-step=\'${number}\']`)
//    return step
//  }
 