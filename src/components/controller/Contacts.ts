import { Controller } from '../base/Controller';
import {
	AppState,
	AppStateModals,
} from '../../types/components/model/AppState';
import { ContactsData } from '../../types/components/view/partial/Contacts';

export class ContactsController extends Controller<AppState> {
	onChange = (value: ContactsData) => {
		this.model.fillContacts(value);
	};
	onNext = async () => {
		if (this.model.isValidContacts()) {
			await this.model.postOrder().then(() => {
				this.model.openModal(AppStateModals.success);
			});
		}
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
