import supertest from "supertest";
import app, { init } from "../../src/app";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { createUserOwner } from "../factories/user-factory";
import { faker } from "@faker-js/faker";

const api = supertest(app);

beforeAll(async ()=> {
  await init();
  await cleanDb();
});

beforeEach(async ()=> {
  await cleanDb();
});


describe("POST /auth/sign-up", ()=> {
  it("Should respond with status 500 when body is invalid", async ()=> {
    const res = await api.post("/auth/sign-up");
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("When body is valid", ()=> {
    const body = {
      name: faker.name.fullName(),
      email: "user@user.com",
      password: faker.random.word()
    };
    it("Shoud return with status 409 if email is already registered.", async ()=> {
      await createUserOwner({email: "user@user.com", password:"test"});
      const body = {
        name: faker.name.fullName(),
        email: "user@user.com",
        password: "111111"
      };
      const res = await api.post("/auth/sign-up").send(body);
        
      expect(res.status).toBe(httpStatus.CONFLICT);
    });
    it("Should return with status 201 otherwise", async ()=> {
      const res = await api.post("/auth/sign-up").send(body);
        
      expect(res.status).toBe(httpStatus.CREATED);
    });
  });
});

describe("POST /auth/sign-in", ()=> {
  it("Should respond with status 400 when body is not valid", async ()=> {
    const res = await api.post("/auth/sign-in");
    expect(res.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("When body is valid", () => {
    it("Should return with staus code 401 if email is not registered", async ()=>{
      const body = {
        email: "user@user.com",
        password: "000000",
      };
      const res = await api.post("/auth/sign-in").send(body);
      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("Should return with staus code 401 if given credentials does not match", async ()=>{
      const user = await createUserOwner({
        name: faker.name.fullName(), 
        email: "user@user.com",
        password: "123123"
      });
      const body = {
        email: user.email,
        password: "123456",
      };
      const res = await api.post("/auth/sign-in").send(body);
      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("Should return with status code 200 and token otherwise", async ()=> {
      const user = await createUserOwner({
        name: faker.name.fullName(), 
        email: "user@user.com",
        password: "123123"
      });
      const body = {
        email: user.email,
        password: "123123",
      };
      const res = await api.post("/auth/sign-in").send(body);
      expect(res.status).toBe(httpStatus.OK);
    });
  });

});
