import { Controller } from '../base/Controller';
import {
	AppState,
	AppStateModals,
} from '../../types/components/model/AppState';
import { ProductData } from './../../types/components/view/partial/Product';

export class ProductController extends Controller<AppState> {
	onClick = (item: ProductData) => {
		this.model.addToBasket(item);
		this.onNext();
	};
	onNext = async () => {
		this.model.openModal(AppStateModals.basket);
	};
	onClose = () => {
		this.model.openModal(AppStateModals.none);
	};
}
