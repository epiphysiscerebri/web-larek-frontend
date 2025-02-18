import { Screen } from './../../base/Screen';
import { IClickableEvent } from './../../../types/components/base/View';
import { cloneTemplate, ensureElement } from './../../../utils/html';
import { SETTINGS } from './../../../utils/constants';

import {
	MainData,
	MainSettings,
} from './../../../types/components/view/screen/Main';
import { ListView } from '../common/List';
import { CardView } from '../partial/Card';
import { PageView } from '../partial/Page';
import { CardData } from './../../../types/components/view/partial/Card';

/**
 * Экран главной страницы
 */
export class MainScreen extends Screen<MainData, MainSettings> {
	protected declare gallery: ListView<CardData>;
	public declare page: PageView;
	element: HTMLElement;
	settings: MainSettings;

	constructor(settings: MainSettings) {
		super(settings);
	}

	protected init(): void {
		this.page = new PageView(ensureElement(SETTINGS.pageSelector), {
			...SETTINGS.pageSettings,
			onClick: this.settings.onOpenBasket,
		});

		this.gallery = new ListView<CardData>(
			ensureElement(SETTINGS.gallerySelector),
			{
				...SETTINGS.gallerySettings,
				item: new CardView(cloneTemplate(SETTINGS.cardTemplate), {
					...SETTINGS.cardSettings,
					onClick: this.onOpenProductHandler.bind(this),
				}),
			}
		);

		this.element = this.page.element;
	}

	protected onOpenProductHandler({ item }: IClickableEvent<string>): void {
		this.settings.onOpenProduct(item);
	}

	set counter(value: number) {
		this.page.counter = value;
	}

	set items(value: CardData[]) {
		this.gallery.items = value;
	}

	set selected(value: CardData) {
		this.gallery.setActiveItem(value.id);
	}
}
