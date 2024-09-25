import { Controller } from './../base/Controller';
import {
	AppState,
	AppStateModals,
} from './../../types/components/model/AppState';

export class BasketController extends Controller<AppState> {
	onRemove = (id: string) => {
		this.model.removeProduct(id);
	};
	onNext = () => {
		this.model.openModal(AppStateModals.contacts);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
