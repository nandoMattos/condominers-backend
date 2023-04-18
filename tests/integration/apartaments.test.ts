import supertest from "supertest";
import app, { init } from "../../src/app";
import { cleanDb } from "../helpers";

const api = supertest(app);

beforeAll(async ()=> {
  await init();
  await cleanDb();
});

beforeEach(async ()=> {
  await cleanDb();
});
