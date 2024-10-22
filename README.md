# Проектная работа "WebLarek"

Для сборки проекта

```
npm run build
```

или

```
yarn build
```

Для запуска

```
npm run start
```

или

```
yarn start
```

## Описание проекта

Проект "WebLarek!" реализует пример типового интернет магазина, в данном случае для специфических товаров. Пользователь может просматривать список продуктов, выбирать продукты и купить их. Проект реализован на TypeScript и представляет собой SPA (Single Page Application) с использованием API для получения данных о продуктах.

## Описание интерфейса

Интерфейс можно условно разделить на 3 процесса:

1. Просмотр галереи с продуктами (MainScreen)
2. Добавление продукта в корзину (ProductFormScreen)
3. Оформление заказа (BasketScreen, PaymentFormScreen, ContactsFormScreen, SuccessScreen)

Так как модальные окна в проекте однотипные, то их общая логика и структура вынесена в абстрактный класс ModalScreen. Все модальные окна наследуются от него и переопределяют методы для своих нужд.

## Структура проекта

.
├── src/
│ ├── common.blocks/ [Стили компонент верстки]
│ ├── components/ [Реализация]
│ │ ├── base/ [Базовый код]
│ │ ├── model/ [Модели данных и АПИ]
│ │ ├── view/ [Отображения]
│ │ │ ├── common/ [Общие]
│ │ │ ├── partial/ [Частичные]
│ │ │ ├── screen/ [Верхнеуровневые, экраны]
│ │ ├── controller/
│ ├── pages/
│ │ ├── index.html [Основная страница и шаблоны компонент]
│ ├── types/ [Типизация]
│ │ ├── components/
│ │ │ ├── base/ [Базовый код]
│ │ │ ├── model/ [Модели данных и АПИ]
│ │ │ ├── view/ [Отображения]
│ │ ├── global.d.ts [Глобальные типы, расширение окружения]
│ │ ├── settings.ts [Типизация настроек]
│ │ ├── html.ts [Типизация настроек]
│ ├── utils/
│ │ ├── constants.ts [Настройки проекта]
│ │ ├── html.ts [Утилиты для работы с DOM]

## Архитектура проекта (MVC)

Реализована единая модель данных приложения в файле `src/components/model/AppState.ts`, содержащая всю логику работы с данными и возможные действия над ними. Все изменения данных происходят через методы модели, а она в свою очередь уведомляет об изменениях через метод настроек `onChange(changes: AppStateChanges)` чтобы не зависеть от конкретного способа коммуникации между компонентами. Подключение модели к системе событий производится через обертку `src/components/model/AppStateEmitter.ts`.

Экземпляр модели передается в контроллеры, которые по факту являются обработчиками пользовательских действий и обновляют состояние модели через ее методы. Экземпляры контроллеров передаются в качестве объекта содержащего обработчики событий в верхнеуровневые отображения (экраны).

При обработке событий возникающих в AppStateEmitter производится обновление данных в верхнеуровневых отображениях. Экраны это фактически крупные сборки инкапсулирующие детали реализации интерфейса и принимающие из вне только обработчики событий и необходимые данные. Экраны внутри составлены из более мелких отображений, которые инициализируют с помощью глобальных настроек проекта и распределяют данные между вложенными отображениями через свойства и метод `render()`.

Общую цепочку взаимодействия можно представить следующим образом:

```typescript
const api = new Api(); // Инициализация API
const app = new ModelEmitter(api); // Инициализация модели и событий
const screen = new Screen( // Инициализация экрана
	// экран ждет объект с обработчиками событий, например { onClick: () => void }
	new Controller( // Инициализация контроллера
		/* { // Обработчики событий
            onClick: () => {
                app.model.value += 1;
            }
        }*/
		app.model // Передача модели в контроллер
	)
);

app.on('change:value', () => {
	screen.value = app.model.value;
});

// Screen.onClick -> Controller.onClick -> Model.value -> Screen.value
```

И таким образом соединяем между собой все компоненты приложения.

### Отображения

Отображения в проекте разделены на три типа:

- `common` — общие компоненты, не зависящие от доменной области проекта
- `partial` — частичные компоненты, реализующие доменную область проекта
- `screen` — верхнеуровневые компоненты, которые являются экранами приложения

Первые два типа (common и partial) независимо типизированы, не используют глобальных настроек напрямую и могут быть легко переносимы между проектами. Экраны (screen) же зависят от глобальных настроек и используют их для инициализации и передачи данных между вложенными отображениями, так как по факту это соединительный код для удобства вынесенные в отдельные файлы и оформленный как отображение.

Каждое отображение (кроме Screen) устроено следующим образом:

```typescript
class Component extends View<Тип_данных, Тип_настроек> {
	constructor(
		public element: HTMLElement,
		protected readonly settings: Settings
	) {
		super(element, settings);
		// Не переопределяем конструктор в своих отображениях!
	}

	protected init() {
		// Используем метод жизненного цикла, для инициализация компонента
		// Здесь вешаем события
	}

	set value(value: number) {
		// Устанавливаем поле данных "value" в верстке
	}

	render() {
		// Отрисовка компонента
		// Переопределяем только по необходимости
		return this.element;
	}
}
```

Если необходимо использовать в одном отображении другие, то передаем их через настройки, не создавая зависимость напрямую. Пример:

```typescript
interface ChildData {
	value: number;
}

interface ComponentData {
	content: ChildData;
}

interface ComponentSettings {
	contentView: IView<ChildData>; // Ждем отображение принимающее данные типа ChildData
}

class Component extends View<Тип_данных, Тип_настроек> {
	set content(data: ChildData) {
		this.settings.contentView.render(data);
		// или this.settings.contentView.value = data.value;
	}
}
```

Если нужно использовать переданное отображение как шаблон, то можно использовать метод `copy()` — копирующие конструктор, который создает новый экземпляр отображения с теми же настройками (но их можно переопределить через параметры метода).

### Модели

Модели в проекте представлены классом `AppState`, который содержит в себе все данные и логику работы с ними. Модель частично реализует паттерн "Наблюдатель", и уведомляет об изменениях через метод `onChange(changes: AppStateChanges)`. Для удобства работы с данными в модели реализованы методы для изменения данных, которые в свою очередь вызывают метод `onChange()`.

В целом типовая модель данных выглядит следующим образом:

```typescript
enum ModelChanges {
	// Изменения в модели
	value = 'change:value',
}

interface ModelSettings {
	// Настройки модели
	onChange(changes: ModelChanges): void;
}

class Model {
	constructor(
		protected api: Api, // API для работы с данными
		protected settings: ModelSettings // Настройки и обработчики событий
	) {
		// Инициализация модели
	}

	// Методы для изменения данных
	public changeValue(value: number) {
		// Изменение данных
		this.onChange(ModelChanges.value);
	}
}
```

### Контроллеры

Контроллеры в проекте представлены классами унаследованными от `Controller`, и являются обработчиками пользовательских действий и обновляют состояние модели через ее методы. Контроллеры принимают в себя экземпляр модели и обрабатывают события, вызывая методы модели для изменения данных.

Пример контроллера:

```typescript
class Controller {
	constructor(
		protected model: Model // Модель для работы с данными
	) {
		// Инициализация контроллера
	}

	public onClick = () => {
		// чтобы не потерять контекст
		// Обработка события
		this.model.changeValue(1);
	};
}
```

Обычно при использовании контроллеров бизнес-логику перераспределяют так, что в моделях не принимаются решения, а только изменяются данные с соблюдением их взаимозависимостей. В контроллерах же происходит обработка событий и принятие решений, а также обновление данных в моделях. Но это не строгое правило и в зависимости от проекта можно использовать разные подходы, например в этом проекте используется несколько реализаций архитектуры в разных ветках и чтобы не переносить много кода модель реализует практически всю логику, что несколько упрощает роль контроллеров.

### Описание классов использующихся на проекте

Каталог components/base

Класс Api.
Класс Api - это базовый класс для работы с API. Его функции: возможность делать post и get запросы, а также обрабатывать ответы от сервера.

Класс Controller.
Класс Controller выполняет функицю контроллера в паттерне MVC.

Класс EventEmitter.
Класс EventEmitter обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события.

Класс Screen.
Класс Screen является абтрактным, принимает на вход в качестве дженериков два аргумента тип и настройки, наследуется от базового класса View. Является родительским для родительского класса экранов ModalScreen, которые используются на проекте. Также является родительским для класса экана главной страницы MainScreen.

Класс View.
Класс View является абтрактным, принимает на вход в качестве дженериков два аргумента тип и настройки. Является базовым классом для отображения на проекте. Его функции: копирующий конструктор, чтобы настроить один раз и дальше использовать копии отображения везде, метод рендер, вызывается когда надо обновить отображение с данными, методы жизненного цикла, метод поиска DOM-элементов, метод замены элемента на другой или его обновлённую версию, метод поиска темплейта, метод создания DOM-элемента, метод для установки видимости, метод для универсальной установки свойств тега.

Каталог components/controller

Класс ModalController.
Класс ModalController наследуется от класса контроллера, является контроллером для сущности Success. Его функции: Нажатие на кнопку закрытия модального окна.

Класс MainController.
Класс MainController наследуется от класса контроллера, является контроллером для сущности Main. Его функции: Обращение к моделе, открытие корзины с товарами, выбор конкретного товара из галереи с последующем запросом конкретного товара через модель.

Класс BasketController.
Класс BasketController наследуется от класса контроллера, является контроллером для сущности Basket. Его функции: Обращение к моделе, в частности удаление из модели элемента корзины, нажатие на кнопку "Оформить" и дальнейший переход к модальному окну выбора способа оплаты, нажатие на кнопку закрытия модального окна.

Класс PaymentController.
Класс PaymentController наследуется от класса контроллера, является контроллером для сущности Payment. Его функции: Обращение к моделе, в частности валидация введённых данных в окно оплаты, нажатие на кнопку "Далее", переход к модальному окну контактов, нажатие на кнопку закрытия модального окна.

Класс ContactsController.
Класс ContactsController наследуется от класса контроллера, является контроллером для сущности Contacts. Его функции: Обращение к моделе, в частности валидация введённых данных в окно контактов, нажатие на кнопку "Далее", дальнейшая отправка запроса оформления заказа через обращение к моделе и переход к модальному окну завершения заказа, нажатие на кнопку закрытия модального окна.

Класс ProductController.
Класс ProductController наследуется от класса контроллера, является контроллером для сущности Product. Его функции: Обращение к моделе, в частности добавление выбраного товара в корзину, переход к модальному окну корзины, нажатие на кнопку закрытия модального окна.

Каталог components/model

Класс AppStateModel.
Класс AppStateModel является общим хранилищем состояний приложения.
Его свойства:
protected _selectedProduct - Выбраный продукт (служебное свойство),
responseOrder - Ответ сервера на запрос о совершении заказа,
products - Массив с продуктами в галерее,
basket - Корзина, payment - Данные об оплате и адресе,
contacts - Контактные данные,
openedModal - Открытое модальное окно.

Его геттеры:
get basketTotal() - Сумма всех товаров в корзине,
get isOrderReady() - Проверка на то, правильно ли оформлен заказ,
get selectedProduct() - Выбраный продукт,
get productsInBasket() - Продукты в корзине,
order() - Формирование заказа.

Его функции:
selectProduct(id: string | null): void - Выбор продукта из галереи,
addToBasket(product: IProduct) - Добавление продукта в корзину,
removeProduct(id: string): void - Удаление продукта из корзины,
fillContacts(contacts: Partial<IContacts>): void - Заполнение контактов,
isValidContacts(): boolean - Тригер на корректность заполнения контактов,
fillPayment(payment: Partial<IPayment>): void - Заполнение оплаты,
isValidPayment(): boolean - Тригер на корректность заполнения оплаты,
openModal(modal: AppStateModals): void - Открытие одального окна,
protected notifyChanged(changed: AppStateChanges): void - Обновление модели,
protected validateContacts(contacts: Partial<IContacts>): string | null - Валидация контактов,
protected validatePayment(payment: Partial<IPayment>): string | null - Валидация оплаты.

Класс AppStateEmitter.
Класс AppStateEmitter является обёрткой модели. Все изменения данных происходят через методы модели, а она в свою очередь уведомляет об изменениях через метод настроек onChange. При обработке событий возникающих в AppStateEmitter производится обновление данных в верхнеуровневых отображениях.
Его свойства:
model - Экземпляр модели,
previousModal - прошлое открытое модальоное окно.
Его функции:
protected onModelChange(changed: AppStateChanges) - оповещение верхнеуровневых компонентов при изменении модели.

Класс WebLarekAPI.
Класс WebLarekAPI является классом через который происходит взаимодействие с сервером в данном проекте, наследуется от класса API.
Его свойства:
cdn - необходимый cdn некоторых запросов.
Его функции:
async getProduct(id: string): Promise<IProduct> - Запрос на получение продукта,
async getProductList(): Promise<IProduct[]> - запрос на получение списка продуктов,
async postOrder(order: IOrder): Promise<IOrderResult> - запрос на формирование заказа.

Каталог components/view

Класс ButtonView.
Класс ButtonView - Отображение типовой кнопки. Наследуется от базового класса View.
Его функции:
onClickHandler(event: MouseEvent) - функция которая вызывается по клику на кнопку,
set label(value: string) - установка лейбла кнопки,
static make<T extends HTMLElement> - метод создания кнопки, который возвращает элемент DOM дерева.

Класс HeaderView.
Класс HeaderView - Отображение шапки с заголовком. Наследуется от базового класса View.
Его функции:
set title(value: string) - установка тайтла в заголовке,

Класс ListView.
Класс ListView - Отображение списка элементов. Наследуется от базового класса View.
Его свойства:
protected _elements - Сохраняем элементы в объекте, где ключ - id элемента
Его функции:
setActiveElement(element: HTMLElement) - установка активного элемента,
setActiveItem(id: string) - установка активного элемента по id,
set items(items: T[]) - Обновляем отображение списка элементов.
Класс ModalView.
Класс ModalView - Отображение модального окна. Наследуется от базового класса View.
Его свойства:
protected static _openedModal - Модальное окно, которое сейчас открыто, оно всегда одно.
Его функции:
protected init() - Метод инициализации,
protected onCloseHandler(event?: MouseEvent) - Функция которая вызывается при закрытии модального окна,
protected onOpenHandler() - Функция которая вызывается при открытии модального окна
set header(data: H | undefined) - Проброс header во вложенные отображения,
set content(data: C) - Проброс content во вложенные отображения,
set message(value: string | undefined) - Проброс message во вложенные отображения,
set isActive(state: boolean) - Открытие и закрытие модального окна

Класс CardView.
Класс CardView - Маленькая карточка продукта для списка в галерее. Наследуется от базового класса View.
Его свойства:
id: string - id продукта из галереи.
Его функции:
init() - Метод инициализации,
onClickHandler(event: MouseEvent) - Функция которая вызывается нажатии на карточку из галереи,
set image(value: string) - Установка image карточки в галерее,
set title(value: string) - Установка title карточки в галерее,
set category(value: string) - Установка category карточки в галерее,
set price(value: string) - Установка price карточки в галерее

Класс ContactsView.
Класс ContactsView - Форма с контактами. Наследуется от базового класса View.
Его геттеры:
get data() - поиск email и phone в DOM дереве
Его функции:
init() - Метод инициализации,
onSubmitHandler(event: SubmitEvent) - Функция которая вызывается при отправке формы и вводе данных в поля формы,
set email(value: string) - Установка поля email,
set phone(value: string) - Установка поля phone


Класс PageView.
Класс PageView - Глобальный layout страницы. Наследуется от базового класса View.
Его функции:
init() - Метод инициализации,
onClickHandler(event: MouseEvent) - Функция которая вызывается при клике на корзину,
set counter(value: number) - Метод для установки значения счетчика товаров в корзине,
set isLocked(value: boolean) - Метод для блокировки/разблокировки прокрутки страницы при открытии модального окна

Класс PaymentView.
Класс PaymentView - Форма с оплатой. Наследуется от базового класса View.
Его свойства:
protected _paymentCard: HTMLButtonElement - Кнопка "Онлайн",
protected _paymentCash: HTMLButtonElement - Кнопка "При получении",
protected _paymentButtonsContainer: HTMLElement - Контейнер кнопок из группы "Способ оплаты",
protected _addressInput: HTMLInputElement - Поле "Адресс"
Его геттеры:
get data() - поиск payment и address в DOM дереве
Его функции:
init() - Метод инициализации,
onSubmitHandler(event: SubmitEvent) - Функция которая вызывается при отправке формы и вводе данных в поля фомы,
onClickHandler(event: MouseEvent) - Функция которая вызывается при нажатии на кнопки из группы "Способ оплаты",
set payment(value: string) - Установка поля payment,
set address(value: string) - Установка поля address

Класс ProductView.
Класс ProductView - Подробное описание продукта. Наследуется от базового класса View.
Его свойства:
protected declare _item: ProductData - Выбраный продукт
Его функции:
init() - Метод инициализации,
onClickHandler(event: MouseEvent) - Функция которая вызывается при клике на кнопку добавления в корзину,
set image(value: string) - Установка image,
set category(value: string) - Установка category,
set price(value: string) - Установка price,
set title(value: string) - Установка title,
set description(value: string) - Установка description

Класс ProductInBasketView.
Класс ProductInBasketView - Описание продукта в корзине. Наследуется от базового класса View.
Его свойства:
protected _item!: ProductInBasketData - Выбраный продукт
Его функции:
init() - Метод инициализации,
onClickHandler(event: MouseEvent) - Функция которая вызывается при клике на кнопку удаления,
set index(value: string) - Установка индекса для позиций в корзине,
set price(value: string) - Установка price,
set title(value: string) - Установка title,
render(data: ProductInBasketData) - Функция рендера которая обновляет отображение товаров в корзине

Класс SuccessView.
Класс SuccessView - Успешное совершение заказа с заголовком, описанием и каким-то действием, например, кнопкой "назад". Наследуется от базового класса View.
Его функции:
init() - Метод инициализации,
onClickHandler(event: MouseEvent) - Функция которая вызывается при клике кнопку в форме успешного завершения заказа,
set title(value: string - Установка title,
set description(value: any) - Установка description,
set action(value: string) - Установка action

Класс BasketScreen.
Класс BasketScreen - Экран корзины. Подключается в корневом index.ts.
Его функции:
initHeader() - Инициализация хедера,
initContent() - Инициализация контента,
protected onRemoveProduct({ item }: IClickableEvent<ProductInBasketData>) - Функция, которая обащается к контроллеру и удаляет элемент из корзины,
set products(products: ProductInBasketData[]) - Устанавливает массив продуктов из модели,
set total(total: string) - Устанавливает итоговую цену из модели

Класс ContactsFormScreen.
Класс ContactsFormScreen - Экран формы контактов. Подключается в корневом index.ts.
Его функции:
protected init() - Переопределение инициализации,
initHeader() - Инициализация хедера,
initContent() - Инициализация контента,
protected onFormChange({ value }: IChangeableEvent<ContactsData>) - Функция, которая обащается к контроллеру для валидации данных,
set contacts(value: ContactsData) - Устанавливает значения в полях

Класс MainScreen.
Класс MainScreen - Экран главной страницы. Подключается в корневом index.ts.
Его свойства:
protected declare gallery: ListView<CardData> - Галерея
public declare page: PageView - Главная страница
Его функции:
protected init() - Переопределение инициализации,
protected onOpenProductHandler({ item }: IClickableEvent<string>) - Функция, которая обащается к контроллеру при открытии продукта,
set counter(value: number) - Устанавливает counter,
set items(value: CardData[]) - Установка содержимого галереи,
set selected(value: CardData) - Установка значения выбранного продукта

Класс ModalScreen.
Класс ModalScreen - Общая логика и структура модальных окон.
Его свойства:
protected declare modal: ModalView<H, M> - Модальное окно,
protected declare nextButton: HTMLButtonElement - Кнопка "Далее",
abstract initHeader(): IView<H> - Абстрактный метод инициализации хедера для реализации в дочернем классе,
abstract initContent(): IView<M> - Абстрактный метод инициализации контента для реализации в дочернем классе
Его функции:
protected init() - Функция инициализации,
protected getNextButton(settings: { nextLabel: string; nextSettings: ElementCreator }, onClick: () => void) - Функция создания кнопки "Далее",
protected getModalView(settings: { headerView: IView<H>; contentView: IView<M> }, onClose: () => void) - Функция создания модального окна,
set header(value: H) - Устанавливает header,
set content(value: M) - Устанавливает content,
set isActive(value: boolean) - Устанавливает флаг isActive для модального окна,
set isDisabled(state: boolean) - Устанавливает флаг isDisabled для кнопки

Класс PaymentFormScreen.
Класс PaymentFormScreen - Экран формы оплаты. Подключается в корневом index.ts.
Его функции:
protected init() - Функция инициализации,
initHeader() - Инициализация хедера,
initContent() - Инициализация контента,
protected onFormChange({ value }: IChangeableEvent<PaymentData>) - Функция, которая обащается к контроллеру для валидации данных при изменении данных в полях,
protected onFormClick({ item }: IClickableEvent<PaymentData>) - Функция, которая обащается к контроллеру для валидации данных клике на кнопки оплаты,
set payment(value: PaymentData) - Устанавливает payment

Класс ProductFormScreen.
Класс ProductFormScreen - Экран формы оплаты. Подключается в корневом index.ts.
Его свойства:
protected declare _item: ProductData - Выбраный продукт
Его функции:
initHeader() - Инициализация хедера,
initContent() - Инициализация контента,
protected onAddBasket() - Функция, которая обащается к контроллеру и добавляет товар в корзину,
set content(value: ProductData) - Устанавливает content

Класс SuccessScreen.
Класс SuccessScreen - Экран подтверждения успешного бронирования. Подключается в корневом index.ts.
Его свойства:
protected declare modal: ModalView<never, SuccessData> - Модальное окно
Его функции:
protected init() - Функция инициализации,
set content(value: SuccessData) - Устанавливает content,
set isActive(value: boolean) - Устанавливает флаг isActive для модального окна

### Описание типов и интерфейсов использующихся на проекте

enum EnumApiMethods - Енам с типами запросов

type ErrorState - Тип ошибки, которая может прийти в ответе с сервера

type EventData - Тип для описание данных которые будут приходить в EventHandler

type EventHandler = (args: EventData) => void - Тип для функий которые будут передаваться в качестве колбэка

type EventsMap = Map<string, Set<EventHandler>> - Тип для Map который будет хранить в себе функции и события

interface IView<T, S = object> - Интерфейс для отображения заданного типа данных

interface IViewConstructor<T, S> - Интерфейс для конструктора отображения

type IClickableEvent<T> - Настройки для кликабельного отображения (кнопки, карточки...)

type IChangeableEvent<T> - Настройки для изменяемого отображения (формы, переключатели...)

enum AppStateModals - Описание событий для модальных окон

enum AppStateChanges - Описание событий для изменений Модели

interface AppState - Описание Модели данных

interface AppStateSettings - Описание настройки Модели. Эта функция будет вызываться при изменении Модели

interface AppStateConstructor - Конструктор модели данных

type ModalChange - Для корректной обработки событий открытия и закрытия модальных окон нам нужно знать предыдущее и текущее состояние

type ApiListResponse<Type> - Тип для ответов с сервера, которые приходят списком

interface IProduct - Описание единицы продукта

interface IContacts - Описание контактов

interface IPayment - Описание оплаты

interface IOrder extends IContacts, IPayment - Описание заказа

interface IOrderResult - Описание результата заказа, который нам присылает сервер, когда мы совершаем заказ

interface IWebLarekApi - Описание АПИ

interface ButtonData - Описание данных кнопок

interface ButtonSettings<T> extends IClickable<T> - Описание объекта настроек для кнопок

interface HeaderData - Описание данных хедера

interface HeaderSetting - Описание объекта настроек для кнопок

type ElementsMap = Record<string, HTMLElement> - Описание Map с элементами

interface ItemData - Описание элемента данных

interface ListData<T> - Описание списка с данными

interface ListSettings<T> - Описание объекта настроек для списка

interface ModalData<H, C> - Описание данных модального окна

interface ModalSettings<H, C> - Описание объекта настроек для модального окна

interface CardData - Описание данных карточки

interface CardSettings extends IClickable<string> - Описание объекта настроек для карточки

interface ContactsData - Описание данных контактов

interface ContactsSettings extends IChangeable<ContactsData> - Описание объекта настроек для контактов

interface PageData - Описание данных страницы

interface PageSettings extends IClickable<never> - Описание объекта настроек для страницы

interface PaymentData - Описание данных оплаты

export interface PaymentSettings extends IChangeable<PaymentData>,IClickable<PaymentData> - Описание объекта настроек для оплаты

interface ProductData - Описание данных продукта

interface ProductSettings extends IClickable<ProductData> - Описание объекта настроек для продукта

interface ProductInBasketData - Описание данных продукта в корзине

interface ProductInBasketSettings extends IClickable<ProductInBasketData> - Описание объекта настроек для продукта в корзине

interface SuccessData - Описание данных успешного выполнения заказа

interface SuccessSettings extends IClickable<never> - Описание объекта настроек для успешного выполнения заказа

interface BasketData - Описание данных для модального окна корзины

interface BasketSettings - Описание настроек для модального окна корзины

interface ContactsFormData - Описание данных для модального окна контактов

interface ContactsFormSettings - Описание настроек для модального окна контактов

interface MainData - Описание данных для главного экрана

interface MainSettings - Описание настроек для главного экрана

interface ModalScreenSettings - Описание основных настроек для модального окна

interface PaymentFormData - Описание данных для модального окна оплаты

interface PaymentFormSettings - Описание настроек для модального окна оплаты

interface ProductFormData - Описание данных для модального окна продукта

interface ProductFormSettings - Описание настроек для модального окна продукта

interface SuccessFormData - Описание данных для модального окна успешного выполнения заказа

interface SuccessFormSettings - Описание настроек для модального окна успешного выполнения заказа

interface Settings - Полное описание всех насторек 



