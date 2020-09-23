/**  */
export declare class Product {
    document: Document;
    url: string;
    constructor(url: any);
    init(): Promise<this>;
    /** Returns all the possible fields */
    get(): {
        title: string;
        price: string;
        specs: {
            name: any;
            value: any;
        }[];
        images: string[];
        aboutThis: string[];
        SKU: any;
        description: string;
    };
    getTitle(): string;
    /** Price of the product bought as new  */
    getPrice(): string;
    getDescription(): string;
    /** Product description in list mode  */
    getAbout(): string[];
    /** Returns the product gallery images
     * @param width: Optional: Width of the  resulting image
     */
    getImages(width?: number): string[];
    getMainImage(): any[];
    getSKU(): any;
    getDetailedSpecs(): {
        name: any;
        value: any;
    }[];
}
export declare function getASINByText(text: string, language?: 'en_US' | 'es_ES'): Promise<string>;
