const fs = require("fs");
const path = require("path");

// Ensure the products directory exists
function ensureProductsDirectory() {
  const productsDir = path.join(process.cwd(), "public", "products");

  if (!fs.existsSync(productsDir)) {
    console.log("Creating products directory...");
    fs.mkdirSync(productsDir, { recursive: true });
    console.log("Products directory created successfully");
  } else {
    console.log("Products directory already exists");
  }
}

// Run the function
ensureProductsDirectory();
