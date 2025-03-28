exports.seed = async function (knex) {
    try {
      // Clear existing data
      await knex("users").truncate(); // `truncate()` resets IDs and clears table
  
      // Insert new data
      await knex("users").insert([
        {
          id: "uuid1",
          name: "Admin",
          email: "admin@example.com",
          password: "hashedpassword",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
  
      console.log("✅ Users seeded successfully.");
    } catch (error) {
      console.error("❌ Error seeding users:", error);
    }
  };
  