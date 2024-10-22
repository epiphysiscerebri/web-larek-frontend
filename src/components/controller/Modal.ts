import {
	AppState,
	AppStateModals,
} from './../../types/components/model/AppState';
import { Controller } from './../../components/base/Controller';

export class ModalController extends Controller<AppState> {
	model: AppState;

	constructor(model: AppState) {
		super(model);
	}

	onClose = (): void => {
		this.model.openModal(AppStateModals.none);
	};
}
