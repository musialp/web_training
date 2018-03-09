var faker = require("faker");
for (var i = 0; i < 10; i++) {
    console.log("Product: " + faker.commerce.productName() + ", Price: " + faker.commerce.price() + "PLN");
}
