import { View } from '../../base/View';
import {
	ContactsData,
	ContactsSettings,
} from './../../../types/components/view/partial/Contacts';

/**
 * Форма с контактами
 */
export class ContactsView extends View<ContactsData, ContactsSettings> {
	element: HTMLElement;
	settings: ContactsSettings;

	constructor(element: HTMLElement, settings: ContactsSettings) {
		super(element, settings);
	}

	init(): void {
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.element.addEventListener('input', this.onSubmitHandler.bind(this));
	}

	onSubmitHandler(event: SubmitEvent): boolean {
		event.preventDefault();
		this.settings.onChange({ event, value: this.data });
		this.ensure<HTMLInputElement>(
			'#' + (event.target as HTMLInputElement).id,
			this.element
		).focus();
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

	get data(): { email: string; phone: string } {
		return {
			email: this.ensure<HTMLInputElement>(this.settings.email).value,
			phone: this.ensure<HTMLInputElement>(this.settings.phone).value,
		};
	}
}
