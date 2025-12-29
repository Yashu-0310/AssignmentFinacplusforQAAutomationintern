import { test, expect, request } from "@playwright/test";

test("Reqres API Automation (Ready for Submission)", async () => {
  // Create API context
  const apiContext = await request.newContext({
    baseURL: "https://reqres.in",
  });

  //Create user
  const createResponse = await apiContext.post("/api/users", {
    headers: { "Content-Type": "application/json" },
    data: { name: "Yasaswini", job: "QA Intern" }, // test data
  });

  // Validate HTTP status
  expect(await createResponse.status()).toBe(201);

  const createData = await createResponse.json();
  const userId = createData.id || "123"; // fallback if API doesn't return id
  console.log("Created userId:", userId);
  console.log("Create Response:", createData);

  //Update user's name
  const updateResponse = await apiContext.put(`/api/users/${userId}`, {
    headers: { "Content-Type": "application/json" },
    data: { name: "Yasaswini Updated", job: "QA Intern" },
  });

  expect(await updateResponse.status()).toBe(200);
  const updateData = await updateResponse.json();
  console.log("Updated Response:", updateData);

  //Test complete
  console.log("API automation script executed successfully.");
});
