import { EventEmitter } from './../../components/base/EventEmitter';
import { IWebLarekApi } from './../../types/components/model/WebLarekApi';
import {
	AppState,
	AppStateChanges,
	AppStateConstructor,
	AppStateModals,
	AppStateSettings,
} from './../../types/components/model/AppState';

export class AppStateEmitter extends EventEmitter {
	public model: AppState;
	protected previousModal: AppStateModals = AppStateModals.none;

	constructor(
		api: IWebLarekApi,
		settings: Omit<AppStateSettings, 'onChange'>,
		Model: AppStateConstructor
	) {
		super();

		this.model = new Model(api, {
			...settings,
			onChange: this.onModelChange.bind(this),
		});
	}

	protected onModelChange(changed: AppStateChanges) {
		if (changed === AppStateChanges.modal) {
			this.emit(changed, {
				previous: this.previousModal,
				current: this.model.openedModal,
			});
			this.emit(this.model.openedModal, {});
		} else {
			this.emit(changed, {});
		}
		this.previousModal = this.model.openedModal;
	}
}
