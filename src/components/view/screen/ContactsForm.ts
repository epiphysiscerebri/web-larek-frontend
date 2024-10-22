import { ModalView } from './../common/Modal';
import { ModalScreen } from './../../view/screen/ModalScreen';
import { cloneTemplate } from './../../../utils/html';
import { SETTINGS } from './../../../utils/constants';

import {
	ContactsFormData,
	ContactsFormSettings,
} from './../../../types/components/view/screen/ContactsForm';
import { ContactsData } from './../../../types/components/view/partial/Contacts';
import { ContactsView } from './../../view/partial/Contacts';
import { HeaderData } from './../../../types/components/view/common/Header';
import { HeaderView } from './../../../components/view/common/Header';
import { IChangeableEvent } from './../../../types/components/base/View';

/**
 * Экран формы контактов
 */
export class ContactsFormScreen extends ModalScreen<
	HeaderData,
	ContactsData,
	ContactsFormData,
	ContactsFormSettings
> {
	modal: ModalView<HeaderData, ContactsData>;
	element: HTMLElement;
	settings: ContactsFormSettings;
	nextButton: HTMLButtonElement;

	constructor(settings: ContactsFormSettings) {
		super(settings);
	}

	protected init(): void {
		this.nextButton = this.getNextButton(
			SETTINGS.contactsModal,
			this.settings.onNext
		);

		this.modal = this.getModalView(
			{
				headerView: this.initHeader(),
				contentView: this.initContent(),
			},
			this.settings.onClose
		);

		this.element = this.modal.element;
	}

	initHeader(): HeaderView {
		return new HeaderView(cloneTemplate(SETTINGS.headerTemplate), {
			...SETTINGS.headerSettings,
		});
	}

	initContent(): ContactsView {
		return new ContactsView(cloneTemplate(SETTINGS.contactsTemplate), {
			...SETTINGS.contactsSettings,
			onChange: this.onFormChange.bind(this),
		});
	}

	protected onFormChange({ value }: IChangeableEvent<ContactsData>): void {
		this.settings.onChange(value);
	}

	set contacts(value: ContactsData) {
		this.modal.content = value;
	}
}
