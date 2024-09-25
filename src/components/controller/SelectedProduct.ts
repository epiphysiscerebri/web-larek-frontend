import { Controller } from '../base/Controller';
import {
	AppState,
	AppStateModals,
} from '../../types/components/model/AppState';
import { ProductData } from '../../types/components/view/partial/Product';

export class ProductController extends Controller<AppState> {
	onAddBasket = (product: ProductData) => {
		this.model.addBasket(product);
	};
	onNext = () => {
		this.model.openModal(AppStateModals.product);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
