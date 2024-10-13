import { View } from '../../base/View';

import {
	HeaderData,
	HeaderSettings,
} from './../../../types/components/view/common/Header';

/**
 * Шапка с заголовком
 */
export class HeaderView extends View<HeaderData, HeaderSettings> {
	init() {}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}
}
