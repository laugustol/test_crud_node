const request = require("supertest");
const app = require("../src/index.js");

describe("Prueba users/login", () => {
    it("Debería responder con un código 200", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: "augustoalvarez05@gmail.com", password: "1234" })
            .set("Accept", "application/json");

        expect(response.statusCode).toBe(200);
    });
});
