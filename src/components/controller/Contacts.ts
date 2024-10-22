import { Controller } from '../base/Controller';
import {
	AppState,
	AppStateModals,
} from '../../types/components/model/AppState';
import { ContactsData } from '../../types/components/view/partial/Contacts';

export class ContactsController extends Controller<AppState> {
	model: AppState;

	constructor(model: AppState) {
		super(model);
	}

	onChange = (value: ContactsData): void => {
		this.model.fillContacts(value);
	};
	onNext = async (): Promise<void> => {
		if (this.model.isValidContacts()) {
			await this.model.postOrder().then(() => {
				this.model.openModal(AppStateModals.success);
			});
		}
	};
	onClose = (): void => {
		this.model.openModal(AppStateModals.none);
	};
}
