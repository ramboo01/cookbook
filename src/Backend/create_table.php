<?php
require 'db.php';

$sql = "CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  recipe_id VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  thumbnail TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

try {
  $pdo->exec($sql);
  echo "✅ Table created successfully!";
} catch (PDOException $e) {
  echo "❌ Error: " . $e->getMessage();
}
?>
