const request = require('supertest');
const app = require("../app");



describe("GET /books list", () => {
    test("200 success get books", async () => {
      try {
        const response = await request(app)
          .get("/api/books")
  
        const { body, status } = response;
  
        expect(status).toBe(200);
        expect(Array.isArray(body.books)).toBeTruthy();
        expect(body.books.length).toBeGreaterThan(0);
      } catch (err) {
        console.log(err);
        throw err;
      }
    });
  });


  describe("GET /members list", () => {
    test("200 success get members", async () => {
      try {
        const response = await request(app)
          .get("/api/members")
  
        const { body, status } = response;
  
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
      } catch (err) {
        console.log(err);
        throw err;
      }
    });
  });


  describe("POST /borrow book", () => {
    test("200 succes borrow book", async () => {
      try {
        const data = {
            brw_bok_code: "TW-11",
            brw_mbr_code: "M001",
            brw_borrowdate: "2024-08-17"
          }
        const response = await request(app)
            .post("/api/borrow")
            .send(data);
  
        const { body, status } = response;
        
        expect(status).toBe(200)
        expect(body).toHaveProperty("msg","Succes Borrow Book");
      } catch (error) {
        throw error
      }
    })
  })
  

describe("POST /return book", () => {
    test("200 succes borrow book", async () => {
      try {
        const data = {
            brw_bok_code: "TW-11",
            brw_mbr_code: "M001",
            brw_returndate: "2024-08-17"
          }
        const response = await request(app)
            .put("/api/borrow")
            .send(data);
  
        const { body, status } = response;
        
        expect(status).toBe(200)
        expect(body).toHaveProperty("msg","Succes Return Book");
      } catch (error) {
        throw error
      }
    })
  })
  