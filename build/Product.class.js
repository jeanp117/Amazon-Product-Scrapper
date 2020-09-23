"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getASINByText = exports.Product = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const jsdom_1 = require("jsdom");
/**  */
class Product {
    constructor(url) {
        this.url = url;
    }
    init() {
        return (async () => {
            return node_fetch_1.default(this.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
                },
            })
                .then((e) => e.text())
                .then((html) => {
                this.document = new jsdom_1.JSDOM(html, {
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
        var _a;
        return (_a = this.document.getElementById('productTitle')) === null || _a === void 0 ? void 0 : _a.textContent.trim();
    }
    /** Price of the product bought as new  */
    getPrice() {
        var _a;
        return (_a = this.document
            .getElementById('priceblock_ourprice')) === null || _a === void 0 ? void 0 : _a.textContent.trim();
    }
    getDescription() {
        var _a, _b;
        return (_b = (_a = this.document
            .getElementById('productDescription')) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('p')[0]) === null || _b === void 0 ? void 0 : _b.textContent.trim();
    }
    /** Product description in list mode  */
    getAbout() {
        var _a;
        return Array.from((_a = this.document
            .getElementsByClassName('a-unordered-list a-vertical a-spacing-mini')[0]) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('li')).map((li) => li === null || li === void 0 ? void 0 : li.textContent.trim());
    }
    /** Returns the product gallery images
     * @param width: Optional: Width of the  resulting image
     */
    getImages(width) {
        var _a, _b;
        return (_b = (_a = Array.from(this.document.getElementsByClassName('a-spacing-small item'))) === null || _a === void 0 ? void 0 : _a.map((e) => { var _a; return (_a = e === null || e === void 0 ? void 0 : e.getElementsByTagName('img')[0]) === null || _a === void 0 ? void 0 : _a.src.replace('._AC_US40_.', width ? `._AC_US${width}_.` : '' + '.'); })) === null || _b === void 0 ? void 0 : _b.filter((img) => !(img === null || img === void 0 ? void 0 : img.includes('play-icon-overlay')));
    }
    getMainImage() {
        return Array.from(this.document
            .getElementsByClassName('a-unordered-list a-nostyle a-horizontal list maintain-height')[0]
            .getElementsByClassName('image')).map((e) => { var _a; return (_a = e === null || e === void 0 ? void 0 : e.getElementsByTagName('img')[0]) === null || _a === void 0 ? void 0 : _a.attributes['data-old-hires'].value; });
    }
    getSKU() {
        var _a, _b;
        return (_b = (_a = this.getDetailedSpecs()) === null || _a === void 0 ? void 0 : _a.filter((e) => e.name == 'Item model number')[0]) === null || _b === void 0 ? void 0 : _b.value;
    }
    getDetailedSpecs() {
        var _a, _b;
        try {
            return Array.from((_b = (_a = this.document.getElementById('productDetails_techSpec_section_2')) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.children).map((tr) => {
                return {
                    name: tr.children[0].textContent.trim(),
                    value: tr.children[1].textContent.trim(),
                };
            });
        }
        catch (error) {
            return undefined;
        }
    }
}
exports.Product = Product;
async function getASINByText(text, language = 'en_US') {
    return await node_fetch_1.default(`https://www.amazon.com/s?k=${text}&language=${language}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36',
        },
    })
        .then((e) => e.text())
        .then((html) => {
        var _a, _b;
        const document = new jsdom_1.JSDOM(html, {
            includeNodeLocations: true,
            pretendToBeVisual: true,
        }).window.document;
        return (_b = Array.from((_a = document.getElementsByClassName('s-main-slot s-result-list s-search-results sg-row')[0]) === null || _a === void 0 ? void 0 : _a.children)
            .filter((e) => {
            var _a;
            return ((_a = e === null || e === void 0 ? void 0 : e.getElementsByClassName('a-section a-spacing-none')[1]) === null || _a === void 0 ? void 0 : _a.children.length) !== 2;
        })[0]) === null || _b === void 0 ? void 0 : _b.getElementsByTagName('a')[0].href.match(/(dp\/)(\w.*)(\/)/)[2];
    });
}
exports.getASINByText = getASINByText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9kdWN0LmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDREQUErQjtBQUMvQixpQ0FBOEI7QUFFOUIsT0FBTztBQUNQLE1BQWEsT0FBTztJQUduQixZQUFZLEdBQUc7UUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSTtRQUNILE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNsQixPQUFPLG9CQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsT0FBTyxFQUFFO29CQUNSLFlBQVksRUFDWCwwR0FBMEc7aUJBQzNHO2FBQ0QsQ0FBQztpQkFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDckIsSUFBSSxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFO29CQUMvQixvQkFBb0IsRUFBRSxJQUFJO29CQUMxQixpQkFBaUIsRUFBRSxJQUFJO2lCQUN2QixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFFbkIsT0FBTyxJQUFJLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDTixDQUFDO0lBQ0Qsc0NBQXNDO0lBQ3RDLEdBQUc7UUFDRixPQUFPO1lBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdEIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdEIsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN4QixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMxQixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNsQixXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtTQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUVELFFBQVE7O1FBQ1AsYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsMENBQUUsV0FBVyxDQUFDLElBQUksR0FBRztJQUN6RSxDQUFDO0lBQ0QsMENBQTBDO0lBQzFDLFFBQVE7O1FBQ1AsYUFBTyxJQUFJLENBQUMsUUFBUTthQUNsQixjQUFjLENBQUMscUJBQXFCLENBQUMsMENBQ3BDLFdBQVcsQ0FBQyxJQUFJLEdBQUc7SUFDdkIsQ0FBQztJQUVELGNBQWM7O1FBQ2IsbUJBQU8sSUFBSSxDQUFDLFFBQVE7YUFDbEIsY0FBYyxDQUFDLG9CQUFvQixDQUFDLDBDQUNuQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQywyQ0FDM0IsV0FBVyxDQUFDLElBQUksR0FBRztJQUN2QixDQUFDO0lBQ0Qsd0NBQXdDO0lBQ3hDLFFBQVE7O1FBQ1AsT0FBTyxLQUFLLENBQUMsSUFBSSxPQUNoQixJQUFJLENBQUMsUUFBUTthQUNYLHNCQUFzQixDQUN0Qiw0Q0FBNEMsQ0FDNUMsQ0FBQyxDQUFDLENBQUMsMENBQ0Ysb0JBQW9CLENBQUMsSUFBSSxFQUM1QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsQ0FBQyxLQUFjOztRQUN2QixtQkFBTyxLQUFLLENBQUMsSUFBSSxDQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDLENBQzVELDBDQUNFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLHdCQUNYLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FDRSxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQywyQ0FDN0IsR0FBRyxDQUFDLE9BQU8sQ0FDWixhQUFhLEVBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUN0QywyQ0FFRCxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUMsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFFBQVEsQ0FBQyxtQkFBbUIsRUFBQyxFQUFFO0lBQ3pELENBQUM7SUFFRCxZQUFZO1FBQ1gsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUNoQixJQUFJLENBQUMsUUFBUTthQUNYLHNCQUFzQixDQUN0Qiw4REFBOEQsQ0FDOUQsQ0FBQyxDQUFDLENBQUM7YUFDSCxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FDakMsQ0FBQyxHQUFHLENBQ0osQ0FBQyxDQUFNLEVBQUUsRUFBRSx3QkFDVixDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUMsMkNBQUcsVUFBVSxDQUFDLGdCQUFnQixFQUM1RCxLQUFLLEdBQUEsQ0FDUixDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU07O1FBQ0wsbUJBQU8sSUFBSSxDQUFDLGdCQUFnQixFQUFFLDBDQUFFLE1BQU0sQ0FDckMsQ0FBQyxDQUFrQyxFQUFFLEVBQUUsQ0FDdEMsQ0FBQyxDQUFDLElBQUksSUFBSSxtQkFBbUIsRUFDN0IsQ0FBQywyQ0FBRyxLQUFLLENBQUM7SUFDYixDQUFDO0lBQ0QsZ0JBQWdCOztRQUNmLElBQUk7WUFDSCxPQUFPLEtBQUssQ0FBQyxJQUFJLGFBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUMzQixtQ0FBbUMsQ0FDbkMsMENBQUUsUUFBUSxDQUFDLENBQUMsMkNBQUcsUUFBUSxDQUN4QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFO2dCQUNqQixPQUFPO29CQUNOLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7b0JBQ3ZDLEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7aUJBQ3hDLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZixPQUFPLFNBQVMsQ0FBQztTQUNqQjtJQUNGLENBQUM7Q0FDRDtBQXhIRCwwQkF3SEM7QUFFTSxLQUFLLFVBQVUsYUFBYSxDQUNsQyxJQUFZLEVBQ1osV0FBOEIsT0FBTztJQUVyQyxPQUFPLE1BQU0sb0JBQUssQ0FDakIsOEJBQThCLElBQUksYUFBYSxRQUFRLEVBQUUsRUFDekQ7UUFDQyxPQUFPLEVBQUU7WUFDUixZQUFZLEVBQ1gsMEdBQTBHO1NBQzNHO0tBQ0QsQ0FDRDtTQUNDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCLElBQUksQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFOztRQUN0QixNQUFNLFFBQVEsR0FBYSxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUU7WUFDMUMsb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixpQkFBaUIsRUFBRSxJQUFJO1NBQ3ZCLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRW5CLGFBQU8sS0FBSyxDQUFDLElBQUksT0FDaEIsUUFBUSxDQUFDLHNCQUFzQixDQUM5QixtREFBbUQsQ0FDbkQsQ0FBQyxDQUFDLENBQUMsMENBQUUsUUFBUSxDQUNkO2FBQ0MsTUFBTSxDQUNOLENBQUMsQ0FBVSxFQUFFLEVBQUU7O1lBQ2QsT0FBQSxPQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxzQkFBc0IsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLDJDQUNwRCxRQUFRLENBQUMsTUFBTSxNQUFLLENBQUMsQ0FBQTtTQUFBLENBQ3pCLENBQUMsQ0FBQyxDQUFDLDBDQUNGLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxFQUFFO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpDRCxzQ0FpQ0MifQ==