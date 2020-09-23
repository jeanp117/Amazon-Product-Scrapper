"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Product_class_1 = require("./Product.class");
(async () => {
    const producto = await new Product_class_1.Product('https://www.amazon.com/-/es/dp/' +
        (await Product_class_1.getASINByText('nvidia 2060 rtx'))).init();
    console.log(producto.get());
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXlEO0FBRXpELENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDWCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksdUJBQU8sQ0FDakMsaUNBQWlDO1FBQ2hDLENBQUMsTUFBTSw2QkFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FDekMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVULE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9