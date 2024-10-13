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
	protected init() {
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

	initHeader() {
		return new HeaderView(cloneTemplate(SETTINGS.headerTemplate), {
			...SETTINGS.headerSettings,
		});
	}

	initContent() {
		return new ContactsView(cloneTemplate(SETTINGS.contactsTemplate), {
			...SETTINGS.contactsSettings,
			onChange: this.onFormChange.bind(this),
		});
	}

	protected onFormChange({ value }: IChangeableEvent<ContactsData>) {
		this.settings.onChange(value);
	}

	set contacts(value: ContactsData) {
		this.modal.content = value;
	}
}
