import { Controller } from '../base/Controller';
import {
	AppState,
	AppStateModals,
} from '../../types/components/model/AppState';
import { PaymentData } from './../../types/components/view/partial/Payment';

export class PaymentController extends Controller<AppState> {
	model: AppState;

	constructor(model: AppState) {
		super(model);
	}

	onChange = (value: PaymentData): void => {
		this.model.fillPayment(value);
	};
	onClick = (item: PaymentData): void => {
		this.model.fillPayment(item);
	};
	onNext = (): void => {
		if (this.model.isValidPayment()) {
			this.model.openModal(AppStateModals.contacts);
		}
	};
	onClose = (): void => {
		this.model.openModal(AppStateModals.none);
	};
}
