// Задумка интерактивные подсказки и руководства для интерфуйсов ( отвечают на вопрос что делать этой кнопкой и проводит инструктаж)
// 1 затемнение области крана
// 2 затемнение с возможностью подсветить обьект (кнопку)
// 3 окно с текстом  + если подсвечена кнопка то не перекрывают друг друга
// 4 картинка под ч4кстом может быть а может не быть
var chains = [
    // 1 действие
    {
        'step': 1,
        'element': 'button',
        'message': 'create progects of burger Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis numquam perferendis non consectetur nisi ipsa harum repudiandae porro deserunt in, cum quia autem, quos debitis possimus amet officia? Perferendis, deserunt.',
        'srcImage': './src/assets/robot.png'
    },
    // 3 действие 
    {
        'step': 3,
        'element': '.button3',
        'message': 'close burger and app closed',
        'srcImage': './src/assets/kailo.png'
    },
    // 2 действие
    {
        'step': 2,
        'element': '.button2',
        'message': 'click  burger for step 3',
        'srcImage': './src/assets/r2d2.png'
    },
    // удаление
];
var _selector_modal = 'bbrf-modal';
var _selector_highlight_element = 'bbrf-highlight-element';
var _selector_description = 'bbrf-description';
var _step = 'bbrf-step';
function guide(chains) {
    var globalContainers = []; // заполняем созданными контейнерами для глобальных операций
    return {
        queue: function () {
            return chains.sort(function (a, b) { return a.step - b.step; });
        },
        elementLight: function (selector, step) {
            var modal = document.createElement('article'); // контейнер с видимым контентом
            var holedContainer = document.createElement('div'); //    создаем блоки с шагами в контейнере
            modal.classList.add(_selector_modal);
            // holedContainer.classList.add(_selector_highlight_element)
            var dataStep = holedContainer.dataset.bbrfHighlightElement = step;
            globalContainers.push(holedContainer);
            if (holedContainer.dataset.bbrfHighlightElement !== '1')
                holedContainer.hidden = true;
            if (!selector && !document.body.querySelector(".".concat(_selector_modal))) { // если не существует модального окна для шагов
                modal.append(holedContainer);
                holedContainer.insertAdjacentHTML('afterend', this.setMessage(step, chains[step - 1].message, chains[step - 1].srcImage));
                document.body.append(modal);
                return modal;
            }
            if (document.querySelector(selector)) { // находим элемент пользователя
                var element = document.querySelector(selector);
                var elementRect = element.getBoundingClientRect();
                holedContainer.style.left = "".concat(elementRect.x + elementRect.width / 2, "px"); // Задаем позицию контейнеру с видимым контентом
                holedContainer.style.top = "".concat(elementRect.y + +elementRect.height / 2, "px");
                holedContainer.style.width = "".concat(elementRect.width, "px");
                holedContainer.style.height = "".concat(elementRect.height, "px");
                var ro = new ResizeObserver(function () { return setShain(chains); }); // адатптация
                ro.observe(document.body);
            }
            else {
                console.warn("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043E\u0431\u044C\u0435\u043A\u0442 ".concat(selector));
            }
            if (!document.body.querySelector(".".concat(_selector_modal)))
                document.body.append(modal);
            var existModal = document.body.querySelector(".".concat(_selector_modal));
            existModal.append(holedContainer);
            holedContainer.insertAdjacentHTML('afterend', this.setMessage(step, chains[step - 1].message, chains[step - 1].srcImage));
            return existModal;
        },
        setMessage: function (step, message, srcImage) {
            var containerGuide = document.createElement('div'); // создаем контейнер для рукоаодства или подсказки
            containerGuide.dataset.bbrfDescription = step.toString();
            containerGuide.innerHTML = "<div class=\"bbrf__description\">".concat(message, "</div>");
            if (srcImage)
                containerGuide.innerHTML += this.setImage(srcImage);
            return containerGuide.outerHTML;
        },
        setImage: function (srcImage) {
            return "<img class=\"bbrf__graphic\" src=\"".concat(srcImage, "\">");
        },
        stepUp: function () {
            var _a;
            try {
                var currentElement = globalContainers.shift();
                (_a = document.querySelector(".".concat(_selector_modal, " [data-").concat(_selector_description, "='").concat(currentElement.dataset.bbrfHighlightElement, "']"))) === null || _a === void 0 ? void 0 : _a.remove(); // блок с описанием
                // скрывать и добавлять видимость руководства будем в стилях для оптимизации
                currentElement.remove();
                globalContainers[0].hidden = false;
            }
            catch (e) {
                console.warn("stepUp() \u041D\u0435\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u0434\u043B\u044F \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u0448\u0430\u0433\u0430 \n        ".concat(e));
            }
        },
        end: function () {
            for (var i = 0; i < globalContainers.length; i++) {
                globalContainers[i].remove();
            }
        },
        create: function () {
            var arr = this.queue();
            for (var i = 0; i < this.queue().length; i++) {
                this.elementLight(arr[i].element, arr[i].step);
            }
        }
    };
}
function setShain(chains) {
    for (var i = 1; i <= chains.length; i++) {
        var currrentHoledContainer = document.querySelector(".".concat(_selector_modal, " [data-").concat(_selector_highlight_element, "='").concat(i, "']"));
        if (currrentHoledContainer) {
            var elements = chains[i - 1].element;
            var element = document.querySelector("".concat(elements));
            var elementRect = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
            if (elementRect) {
                currrentHoledContainer.style.left = "".concat(elementRect.x + elementRect.width / 2, "px");
                currrentHoledContainer.style.top = "".concat(elementRect.y + +elementRect.height / 2, "px");
            }
            else {
                console.warn("setShain() => elementRect undefined");
            }
        }
    }
}
var createGuid = guide(chains);
createGuid.create();
// createGuid.stepUp()
// createGuid.end()
