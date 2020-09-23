import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

/**  */
export class Product {
	document: Document;
	url: string;
	constructor(url) {
		this.url = url;
	}

	init() {
		return (async () => {
			return fetch(this.url, {
				headers: {
					'User-Agent':
						'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
				},
			})
				.then((e) => e.text())
				.then((html: string) => {
					this.document = new JSDOM(html, {
						includeNodeLocations: true,
						pretendToBeVisual: true,
					}).window.document;

					return this;
				});
		})();
	}
	/** Returns all the possible fields */
	get() {
		return {
			title: this.getTitle(),
			price: this.getPrice(),
			specs: this.getDetailedSpecs(),
			images: this.getImages(),
			aboutThis: this.getAbout(),
			SKU: this.getSKU(),
			description: this.getDescription(),
		};
	}

	getTitle() {
		return this.document.getElementById('productTitle')?.textContent.trim();
	}
	/** Price of the product bought as new  */
	getPrice() {
		return this.document
			.getElementById('priceblock_ourprice')
			?.textContent.trim();
	}

	getDescription() {
		return this.document
			.getElementById('productDescription')
			?.getElementsByTagName('p')[0]
			?.textContent.trim();
	}
	/** Product description in list mode  */
	getAbout() {
		return Array.from(
			this.document
				.getElementsByClassName(
					'a-unordered-list a-vertical a-spacing-mini'
				)[0]
				?.getElementsByTagName('li')
		).map((li) => li?.textContent.trim());
	}

	/** Returns the product gallery images
	 * @param width: Optional: Width of the  resulting image
	 */
	getImages(width?: number) {
		return Array.from(
			this.document.getElementsByClassName('a-spacing-small item')
		)
			?.map((e) =>
				e
					?.getElementsByTagName('img')[0]
					?.src.replace(
						'._AC_US40_.',
						width ? `._AC_US${width}_.` : '' + '.'
					)
			)
			?.filter((img) => !img?.includes('play-icon-overlay'));
	}

	getMainImage() {
		return Array.from(
			this.document
				.getElementsByClassName(
					'a-unordered-list a-nostyle a-horizontal list maintain-height'
				)[0]
				.getElementsByClassName('image')
		).map(
			(e: any) =>
				e?.getElementsByTagName('img')[0]?.attributes['data-old-hires']
					.value
		);
	}

	getSKU() {
		return this.getDetailedSpecs()?.filter(
			(e: { name: string; value: string }) =>
				e.name == 'Item model number'
		)[0]?.value;
	}
	getDetailedSpecs() {
		try {
			return Array.from(
				this.document.getElementById(
					'productDetails_techSpec_section_2'
				)?.children[0]?.children
			).map((tr: any) => {
				return {
					name: tr.children[0].textContent.trim(),
					value: tr.children[1].textContent.trim(),
				};
			});
		} catch (error) {
			return undefined;
		}
	}
}

export async function getASINByText(
	text: string,
	language: 'en_US' | 'es_ES' = 'en_US'
) {
	return await fetch(
		`https://www.amazon.com/s?k=${text}&language=${language}`,
		{
			headers: {
				'User-Agent':
					'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
			},
		}
	)
		.then((e) => e.text())
		.then((html: string) => {
			const document: Document = new JSDOM(html, {
				includeNodeLocations: true,
				pretendToBeVisual: true,
			}).window.document;

			return Array.from(
				document.getElementsByClassName(
					's-main-slot s-result-list s-search-results sg-row'
				)[0]?.children
			)
				.filter(
					(e: Element) =>
						e?.getElementsByClassName('a-section a-spacing-none')[1]
							?.children.length !== 2
				)[0]
				?.getElementsByTagName('a')[0]
				.href.match(/(dp\/)(\w.*)(\/)/)[2];
		});
}
