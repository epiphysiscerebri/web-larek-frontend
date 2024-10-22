import {
	AppState,
	AppStateModals,
} from './../../types/components/model/AppState';
import { Controller } from './../../components/base/Controller';

export class MainController extends Controller<AppState> {
	model: AppState;

	constructor(model: AppState) {
		super(model);
	}

	onOpenBasket = (): void => {
		this.model.openModal(AppStateModals.basket);
	};

	onOpenProduct = async (id: string): Promise<void> => {
		await this.model.getProduct(id);
		this.model.openModal(AppStateModals.product);
	};
}
