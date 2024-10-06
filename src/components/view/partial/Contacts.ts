import { View } from '../../base/View';
import {
	ContactsData,
	ContactsSettings,
} from './../../../types/components/view/partial/Contacts';

/**
 * Форма с контактами
 */
export class ContactsView extends View<ContactsData, ContactsSettings> {
	init() {
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.element.addEventListener('change', this.onSubmitHandler.bind(this));
	}

	onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.settings.onChange({ event, value: this.data });
		return false;
	}

	set email(value: string) {
		this.setValue<HTMLInputElement>(this.settings.email, {
			value,
		});
	}

	set phone(value: string) {
		this.setValue<HTMLInputElement>(this.settings.phone, {
			value,
		});
	}

	get data() {
		return {
			email: this.ensure<HTMLInputElement>(this.settings.email).value,
			phone: this.ensure<HTMLInputElement>(this.settings.phone).value,
		};
	}
}
