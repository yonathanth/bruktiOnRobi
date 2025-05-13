const fs = require("fs");
const path = require("path");

// Ensure the products directory exists with proper permissions
function ensureProductsDirectory() {
  try {
    const productsDir = path.join(process.cwd(), "public", "products");

    if (!fs.existsSync(productsDir)) {
      console.log("Creating products directory...");
      fs.mkdirSync(productsDir, { recursive: true, mode: 0o755 });
      console.log("Products directory created successfully");
    } else {
      console.log("Products directory already exists");
    }

    // Ensure the directory has the correct permissions
    fs.chmodSync(productsDir, 0o755);
    console.log("Products directory permissions set to 755");

    // Create a test file to verify write permissions
    const testFilePath = path.join(productsDir, ".test-write-permission");
    fs.writeFileSync(testFilePath, "Test write permission");
    fs.unlinkSync(testFilePath);
    console.log("Write permission verified for products directory");

    return true;
  } catch (error) {
    console.error("Error ensuring products directory:", error);
    return false;
  }
}

// Run the function
const success = ensureProductsDirectory();
if (!success) {
  console.error(
    "Failed to ensure products directory exists with proper permissions"
  );
  process.exit(1);
}
