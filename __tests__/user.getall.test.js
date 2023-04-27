const request = require("supertest");
const app = require("../src/index.js");

describe("Prueba users/getall", () => {
    let token = "";
    beforeAll(async () => {
        const response = await request(app)
            .post("/api/users/login")

            .send({ email: "augustoalvarez05@gmail.com", password: "1234" })
            .set("Accept", "application/json");

        token = response.body.data.token;
    });
    it("Debería responder con un código 200", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });
});
