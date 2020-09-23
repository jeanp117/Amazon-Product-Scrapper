# Amazon Product Scrapper

# ✨ Demo

![](https://media.giphy.com/media/6jgTp1vjf3WO6YJwvF/giphy.gif)

**Installation**

```sh
  npm i amazonproductscraper
```

**Usage**

```js
const { Product, getASINByText } = require('amazonproductscrapper');
(async () => {
	const producto = await new Product(
		'https://www.amazon.com/-/es/dp/' +
			(await getASINByText('nvidia 2060 rtx'))
	).init();
	console.log(producto.get());
})();
```

## getASINByText(search)

Search and takes the first non-promoted result ASIN (Amazon Standard Identification Number)

### Params

-   **text** _string_

```js
await getASINByText('nvidia 2060 rtx');
//Returns: B083GH7LXW
```

## Usage

> Helpful when the product URL is not known
> https://www.amazon.com/dp/ + ASIN

```js
const ASIN = await getASINByText('nvidia 2060 rtx');
'https://www.amazon.com/dp/' + ASIN;
```

> You can add -/es/ for Spanish results as follows

```js
const ASIN = await getASINByText('nvidia 2060 rtx');
'https://www.amazon.com/-/es/dp/' + ASIN;
```

↑ Getting results in multiple languages is not very clear to me yet

##

# 🚩 Product Class

| Method                | Parameters                                                                             | Return type                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **init**              | Obtains and parses the product page DOM                                                | Promise < Product >                                                                                                                          |
| **get**               | Returns all the possible product fields                                                | { title: string; price: string; specs: { name: any; value: any; }[]; images: string[]; aboutThis: string[]; SKU: any; description: string; } |
| **getTitle**          | Returns the product title                                                              | string                                                                                                                                       |
| **getPrice**          | Returns the product price                                                              | string                                                                                                                                       |
| **getDescription**    | Returns the product description (Text only one)                                        | string                                                                                                                                       |
| **getAbout**          | Returns "About this item" list                                                         | string                                                                                                                                       |
| **getImages(width?)** | Returns the product gallery images by specified width size / max resolution by default | string[]                                                                                                                                     |
| **getDetailedSpecs**  | Returns the product detailed specifications                                            | { name:string, value:string }[]                                                                                                              |
| **getSKU**            | Returns the product SKU                                                                | string                                                                                                                                       |

## _async_ init()

Instantiate the **_Product_** object

### Example

```js
const ASIN = await getASINByText('nvidia 2060 rtx');
const producto = await new Product(`https://www.amazon.com/dp/${ASIN}`).init();
//Extract images from first non-promoted result for "nvidia 2060 rtx" search
console.log(producto.getImages());
```

### Example

```js
{
 title: 'EVGA GeForce RTX 2060 XC Ultra Gaming',
 price: 'US$ 309.99',
 specs: [
   { name: 'Brand', value: 'EVGA' },
   { name: 'Peso del producto', value: '1.8 pounds' },
   {
     name: 'Dimensiones del producto',
     value: '7.96 x 1.54 x 4.38 pulgadas'
   },
   {
     name: 'Dimensiones del artículo Largo x Ancho x Altura',
     value: '7.96 x 1.54 x 4.38 pulgadas'
   },
   { name: 'Fabricante', value: 'EVGA' },
   { name: 'ASIN', value: 'B083GH7LXW' },
   { name: 'Producto en amazon.com desde', value: 'Enero 3, 2020' }
 ],
 images: [
   'https://images-na.ssl-images-amazon.com/images/I/412cNrr8L5L.jpg',
   'https://images-na.ssl-images-amazon.com/images/I/41f-SG7CW6L.jpg',
   'https://images-na.ssl-images-amazon.com/images/I/4132axzkOUL.jpg',
   'https://images-na.ssl-images-amazon.com/images/I/31kPGH91w-L.jpg',
   'https://images-na.ssl-images-amazon.com/images/I/41G9asAucKL.jpg',
   'https://images-na.ssl-images-amazon.com/images/I/41VZ3J8M8bL.jpg',
   'https://images-na.ssl-images-amazon.com/images/I/31yxfGQymdL.jpg'
 ],
 aboutThis: [
   'Asegúrate de que esto coincide\nal ingresar tu número de modelo.',
   'Real Boost Clock: 1680 MHz; Memory detail: 6144 MB GDDR6',
   'Real-Time ray tracing in games for cutting-edge, hyper-realistic graphics',
   'Dual fans offer higher performance cooling and much quieter acoustic noise.',
   'Built for EVGA precision X1 + all-metal backplate, pre-installed',
   "3 year & EVGA's top notch technical support.",
   'Free deliver us the moon game w/ purchase, while supplies last'
 ],
 SKU: "192876216613",
 description: 'The EVGA GeForce RTX 20-Series Graphics Cards are powered by the all-New NVIDIA Turing architecture to give you incredible New levels of gaming realism, speed, power efficiency, and immersion. With the EVGA GeForce RTX 20-Series gaming cards you get the best gaming experience with next generation graphics performance, ice cold cooling, and advanced overclocking features with the all New EVGA Precision X1 software. The New NVIDIA GeForce RTX GPUs have reinvented graphics and set a New bar for perfrmance. Powered by the New NVIDIA Turing GPU architecture and the revolutionary NVIDI RTX platform, the New graphics cards bring together real-time ray tracing, artificial intelligence, and programmable shading. This is not only a whole New way to experience games - this is the ultimate PC gaming experience.'
}
```

> I am not in any way related to Amazon. This project was done for
> learning purposes. Scraping is not a practice that follows the TOS of Amazon
