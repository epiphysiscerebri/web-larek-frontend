import { Controller } from '../base/Controller';
import {
	AppState,
	AppStateModals,
} from '../../types/components/model/AppState';
import { ProductData } from './../../types/components/view/partial/Product';

export class ProductController extends Controller<AppState> {
	model: AppState;

	constructor(model: AppState) {
		super(model);
	}

	onClick = (item: ProductData): void => {
		this.model.addToBasket(item);
		this.onNext();
	};
	onNext = (): void => {
		this.model.openModal(AppStateModals.basket);
	};
	onClose = (): void => {
		this.model.openModal(AppStateModals.none);
	};
}
