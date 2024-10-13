import { Controller } from '../base/Controller';
import {
	AppState,
	AppStateModals,
} from '../../types/components/model/AppState';
import { PaymentData } from './../../types/components/view/partial/Payment';

export class PaymentController extends Controller<AppState> {
	onChange = (value: PaymentData) => {
		this.model.fillPayment(value);
	};
	onClick = (item: PaymentData) => {
		this.model.fillPayment(item);
	};
	onNext = async () => {
		if (this.model.isValidPayment()) {
			this.model.openModal(AppStateModals.contacts);
		}
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
