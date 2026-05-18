const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "portfolio",
  });

  try {
    const hashedPassword = await bcrypt.hash("hafizur@443", 10);

    await connection.execute(
      "INSERT INTO Admin (email, password, createdAt) VALUES (?, ?, NOW())",
      ["hafizur", hashedPassword]
    );

    console.log("Admin created successfully");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("Admin already exists");
    } else {
      console.error("Error:", error.message);
    }
  } finally {
    await connection.end();
  }
}

main();
