import { Controller } from './../../components/base/Controller';
import {
	AppState,
	AppStateModals,
} from './../../types/components/model/AppState';

export class BasketController extends Controller<AppState> {
	model: AppState;

	constructor(model: AppState) {
		super(model);
	}

	onRemove = (id: string): void => {
		this.model.removeProduct(id);
	};
	onNext = (): void => {
		this.model.openModal(AppStateModals.payment);
	};
	onClose = (): void => {
		this.model.openModal(AppStateModals.none);
	};
}
