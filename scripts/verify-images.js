const fs = require("fs");
const path = require("path");
const http = require("http");

// Function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(`Error checking if file exists: ${filePath}`, error);
    return false;
  }
}

// Function to check if a URL is accessible
function isUrlAccessible(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        resolve(res.statusCode === 200);
      })
      .on("error", () => {
        resolve(false);
      });
  });
}

// Function to verify images
async function verifyImages() {
  try {
    const productsDir = path.join(process.cwd(), "public", "products");

    // Check if the products directory exists
    if (!fileExists(productsDir)) {
      console.error("Products directory does not exist");
      return false;
    }

    // Get all files in the products directory
    const files = fs.readdirSync(productsDir);
    console.log(`Found ${files.length} files in the products directory`);

    // Check each file
    for (const file of files) {
      if (file === ".test-write-permission") continue;

      const filePath = path.join(productsDir, file);
      const fileStats = fs.statSync(filePath);

      console.log(`File: ${file}`);
      console.log(`  Path: ${filePath}`);
      console.log(`  Size: ${fileStats.size} bytes`);
      console.log(`  Created: ${fileStats.birthtime}`);
      console.log(`  Modified: ${fileStats.mtime}`);

      // Check if the file is readable
      try {
        fs.accessSync(filePath, fs.constants.R_OK);
        console.log("  Readable: Yes");
      } catch (error) {
        console.error(`  Readable: No - ${error.message}`);
      }
    }

    return true;
  } catch (error) {
    console.error("Error verifying images:", error);
    return false;
  }
}

// Run the function
verifyImages().then((success) => {
  if (!success) {
    console.error("Failed to verify images");
    process.exit(1);
  }
});
