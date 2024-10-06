import {
	AppState,
	AppStateModals,
} from './../../types/components/model/AppState';
import { Controller } from './../../components/base/Controller';

export class MainController extends Controller<AppState> {
	onOpenBasket = () => {
		this.model.openModal(AppStateModals.basket);
	};

	onOpenProduct = (id: string) => {
		this.model.getProduct(id);
		this.model.openModal(AppStateModals.product);
	};
}
