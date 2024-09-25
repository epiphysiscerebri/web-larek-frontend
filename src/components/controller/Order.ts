import { Controller } from './../base/Controller';
import {
	AppState,
	AppStateModals,
} from './../../types/components/model/AppState';
import { OrderData } from './../../types/components/view/partial/Order';

export class OrderController extends Controller<AppState> {
	onChange = (value: OrderData) => {
		this.model.fillContacts(value);
	};
	onNext = async () => {
		const productAmount = this.model.basket.size;
		if (this.model.isValidContacts()) {
			this.model.openModal(AppStateModals.payment);
			if (this.model.isValidPayment()) {
				const result = await this.model.postOrder();
				if (result.length === productAmount) {
					this.model.openModal(AppStateModals.success);
				}
			}
		}
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
