import request from "supertest";
import { app } from ".";

describe("Cats", () => {
  describe("POST /cats", () => {
    describe("data validation", () => {
      it("should validate name", async () => {
        const response = await request(app).post("/cats").send({});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Missing name",
        });
      });

      it("should validate breed", async () => {
        const response = await request(app).post("/cats").send({
          name: "test",
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          error: "Missing breed",
        });
      });

      describe("age validation", () => {
        it("should have an age", async () => {
          const response = await request(app).post("/cats").send({
            name: "test",
            breed: "test",
          });

          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            error: "Missing age",
          });
        })

        it("age should be a number", async () => {
          const response = await request(app).post("/cats").send({
            name: "test",
            breed: "test",
            age: "test",
          });

          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            error: "Age must be a number",
          });
        })
      })
    });
  });
});
