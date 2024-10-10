import { Screen } from '../../base/Screen';
import { cloneTemplate } from '../../../utils/html';
import { SETTINGS } from '../../../utils/constants';

import {
	SuccessFormData,
	SuccessFormSettings,
} from '../../../types/components/view/screen/SuccessForm';
import { ModalView } from '../common/Modal';
import { SuccessView } from '../partial/Success';
import { SuccessData } from './../../../types/components/view/partial/Success';

/**
 * Экран подтверждения успешного бронирования
 */
export class SuccessScreen extends Screen<
	SuccessFormData,
	SuccessFormSettings
> {
	protected declare modal: ModalView<never, SuccessData>;

	init() {
		this.modal = new ModalView<never, SuccessData>(
			cloneTemplate(SETTINGS.modalTemplate),
			{
				...SETTINGS.modalSettings,
				headerView: null,
				contentView: new SuccessView(cloneTemplate(SETTINGS.successTemplate), {
					...SETTINGS.successSettings,
					onClick: this.settings.onClose,
				}),
				onClose: this.settings.onClose,
				actions: [],
			}
		);

		this.element = this.modal.element;
	}

	set content(value: SuccessData) {
		this.modal.content = value;
	}

	set isActive(value: boolean) {
		this.modal.isActive = value;
	}
}
