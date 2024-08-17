import request from "supertest";
import { app, server } from "..";
import { Client } from "pg";

jest.mock("pg", () => {
  const mockClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };

  return { Client: jest.fn(() => mockClient) };
});

describe("Cats", () => {
  const client: Client = new Client();
  afterAll(() => {
    server.close();
  });

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
        });

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
        });
      });
    });

    it("should create a cat", async () => {
      (client.query as jest.Mock).mockResolvedValue({
        rows: [{ id: 1 }],
      });

      const response = await request(app).post("/cats").send({
        name: "test name",
        breed: "test breed",
        age: 1,
      });
      expect(response.statusCode).toEqual(201);

      expect(response.body.id).toEqual(1);
      expect(response.body.name).toEqual("test name");
      expect(response.body.breed).toEqual("test breed");
      expect(response.body.age).toEqual(1);
    });
  });
});
