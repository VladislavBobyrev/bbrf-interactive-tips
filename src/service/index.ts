// Задумка интерактивные подсказки и руководства для интерфуйсов ( отвечают на вопрос что делать этой кнопкой и проводит инструктаж)
// 1 затемнение области крана
// 2 затемнение с возможностью подсветить обьект (кнопку)
// 3 окно с текстом  + если подсвечена кнопка то не перекрывают друг друга
// 4 картинка под ч4кстом может быть а может не быть

// функция должна вызывать цепочку действий допустим есть кнопка после ее нажатия открывается панель
//  и у нее подсвечивается  кнопка после нажатия другая происходит либо шаг и открытие другого окна с подсветкой и текстом либо завершение
// после крайнего действия удаление всех вызовов
interface IStep {
  'step': number,
  'element'?: string,
  'message': string,
  'srcImage'?: string,
  lenght?: number
}

const chains: IStep[]  = [
  // 1 действие
  {
    'step': 1,
    'element': 'button',
    'message': 'create progects of burger Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis numquam perferendis non consectetur nisi ipsa harum repudiandae porro deserunt in, cum quia autem, quos debitis possimus amet officia? Perferendis, deserunt.',
    'srcImage': './src/assets/robot.png',
  },
  // 3 действие 
  {
    'step': 3,
    'element': '.button3',
    'message': 'close burger and app closed',
    'srcImage': './src/assets/kailo.png',
  },
  // 2 действие
  {
    'step': 2,
    'element': '.button2',
    'message': 'click  burger for step 3',
    'srcImage': './src/assets/r2d2.png',
  },

  // удаление
]
const _selector_modal =  'bbrf-modal'
const _selector_highlight_element = 'bbrf-highlight-element'
const _selector_description = 'bbrf-description'
const _step = 'bbrf-step'

function guide(chains: IStep[]) {
  
  const globalContainers:any = []  // заполняем созданными контейнерами для глобальных операций
  return {
    queue() { // метод распределения очереди задчь 
      return chains.sort((a: any, b: any) => a.step - b.step)
    },
    elementLight(selector:any, step:any) { // метод создания затемнени экрана и подсветки кнопки

      const modal = document.createElement('article') // контейнер с видимым контентом
      const holedContainer = document.createElement('div')   //    создаем блоки с шагами в контейнере
      modal.classList.add(_selector_modal)
      // holedContainer.classList.add(_selector_highlight_element)
      const dataStep = holedContainer.dataset.bbrfHighlightElement = step
      
      globalContainers.push(holedContainer)

      if (holedContainer.dataset.bbrfHighlightElement !== '1') holedContainer.hidden = true
      
      if (!selector && !document.body.querySelector(`.${_selector_modal}`)) { // если не существует модального окна для шагов
          modal.append(holedContainer)
          holedContainer.insertAdjacentHTML('afterend', this.setMessage(step, chains[step - 1].message, chains[step - 1].srcImage))  
          document.body.append(modal)
          return modal
      }

      if (document.querySelector(selector) as HTMLElement) { // находим элемент пользователя
        const element: HTMLElement = document.querySelector(selector) as HTMLElement
        const elementRect = element.getBoundingClientRect() 

        holedContainer.style.left = `${elementRect.x + elementRect.width / 2}px` // Задаем позицию контейнеру с видимым контентом
        holedContainer.style.top = `${elementRect.y + + elementRect.height / 2}px`
        holedContainer.style.width = `${elementRect.width}px`
        holedContainer.style.height = `${elementRect.height}px`
        
        const ro = new ResizeObserver(() => setShain(chains)) // адатптация
        ro.observe(document.body)
      } else {
        console.warn(`Не найден обьект ${selector}`)
      }
      
      if (!document.body.querySelector(`.${_selector_modal}`)) document.body.append(modal)
      const existModal = document.body.querySelector(`.${_selector_modal}`) as Element
      existModal.append(holedContainer)
      holedContainer.insertAdjacentHTML('afterend', this.setMessage(step, chains[step - 1].message, chains[step - 1].srcImage))  
      return existModal
    },
    setMessage(step: number, message: string, srcImage:string):string { // метод создания сообщения
      
      const containerGuide = document.createElement('div') // создаем контейнер для рукоаодства или подсказки
      containerGuide.dataset.bbrfDescription= step.toString()
      containerGuide.innerHTML = `<div class="bbrf__description">${message}</div>`
      
      if(srcImage) containerGuide.innerHTML += this.setImage(srcImage)
     
      return containerGuide.outerHTML
    },
    setImage(srcImage: string) { // метод создания изображения
      return `<img class="bbrf__graphic" src="${srcImage}">`
    },
    stepUp() { // метод следующего шага
      try {
        const currentElement = globalContainers.shift()
        document.querySelector(`.${_selector_modal} [data-${_selector_description}=\'${currentElement.dataset.bbrfHighlightElement}\']`)?.remove() // блок с описанием
        // скрывать и добавлять видимость руководства будем в стилях для оптимизации
        currentElement.remove()
        globalContainers[0].hidden = false
      } catch(e) {
        console.warn(`stepUp() Нет элементов для следующего шага 
        ${e}`)
      }
    },
    end() { // метод завершения
      for (let i = 0; i < globalContainers.length; i++){
        globalContainers[i].remove()
      }
    },
    create() {
      const arr = this.queue()
      for (let i = 0; i < this.queue().length; i++){
        this.elementLight(arr[i].element, arr[i].step)
      }
    }
    ,
  }

}

function setShain(chains:any) {
  for (let i = 1; i <= chains.length; i++){
    let currrentHoledContainer = document.querySelector(`.${_selector_modal} [data-${_selector_highlight_element}='${i}']`) as HTMLDivElement
    if (currrentHoledContainer) {
      const elements = chains[i - 1].element
      const element = document.querySelector(`${elements}`)
      const elementRect = element?.getBoundingClientRect()
      if (elementRect) {
        currrentHoledContainer.style.left = `${elementRect.x + elementRect.width / 2}px`
        currrentHoledContainer.style.top = `${elementRect.y + + elementRect.height / 2}px`
      } else {
        console.warn(`setShain() => elementRect undefined`)
      }
    }
  }
}

const createGuid = guide(chains)
createGuid.create()
// createGuid.stepUp()
// createGuid.end()