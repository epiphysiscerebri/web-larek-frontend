import { Controller } from './../base/Controller';
import {
	AppState,
	AppStateModals,
} from './../../types/components/model/AppState';
export class MainController extends Controller<AppState> {
	onOpenBasket = () => {
		this.model.openModal(AppStateModals.basket);
	};

	onOpenProduct = async (id: string) => {
		await this.model.getProduct(id);
		this.model.openModal(AppStateModals.product);
	};
}
