import { Screen } from './../../base/Screen';
import { cloneTemplate } from './../../../utils/html';
import { SETTINGS } from './../../../utils/constants';
import { ElementCreator } from './../../../types/html';
import { ModalView } from './../../view/common/Modal';
import { ButtonView } from './../../view/common/Button';
import { IView } from './../../../types/components/base/View';
import { ModalScreenSettings } from './../../../types/components/view/screen/ModalScreen';


/**
 * Общая логика и структура модальных окон
 */
export abstract class ModalScreen<
	M, // внутренние данные для контента модального окна
	C, // внешние данные для экрана
	S extends ModalScreenSettings // настройки экрана (обработчики событий
> extends Screen<C, S> {
	// модальное окно
	protected declare modal: ModalView<M>;
	// кнопка "Далее"
	protected declare nextButton: HTMLButtonElement;

	// Абстрактные методы для реализации в дочерних классах

	abstract initContent(): IView<M>;

	// Переопределенный init() для инициализации модального окна
	protected init() {
		this.nextButton = this.getNextButton(
			SETTINGS.basketModal,
			this.settings.onNext
		);

		this.modal = this.getModalView(
			{
				contentView: this.initContent(),
			},
			this.settings.onClose
		);

		this.element = this.modal.element;
	}

	// Вспомогательные методы

	protected getNextButton(
		settings: { nextLabel: string; nextSettings: ElementCreator },
		onClick: () => void
	) {
		return ButtonView.make<HTMLButtonElement>(
			settings.nextLabel,
			settings.nextSettings,
			onClick
		);
	}

	protected getModalView(
		settings: { contentView: IView<M> },
		onClose: () => void
	) {
		return new ModalView<M>(cloneTemplate(SETTINGS.modalTemplate), {
			...SETTINGS.modalSettings,
			...settings,
			actions: [this.nextButton],
			onClose,
		});
	}

	// Методы установки данных

	set content(value: M) {
		this.modal.content = value;
	}

	set isActive(value: boolean) {
		this.modal.isActive = value;
	}

	set isDisabled(state: boolean) {
		this.nextButton.disabled = state;
	}
}
