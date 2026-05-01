const request = require("supertest");
const app = require("..");
const { clearDatabase } = require("../db.connection");

describe("todo routes", () => {
  let testAgent = request(app);
  afterEach(async () => {
    await clearDatabase();
  });


///////////
  it("(GET /todo ) should respond with todo=[]", async () => {
    let res= await testAgent.get("/todo")
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveSize(0);
  });



  ///////////
  it("(POST /todo) without auth: should respond with please login first",async()=>{
    let res= await testAgent.post("/todo").send({title:"playing"})
    expect(res.status).toBe(401);
    expect(res.body.message).toContain("please login first")
  })
  it("(POST /todo) should respond with new todo",async()=>{
    let newone = { name: "bakry", email: "bakry@test.com", password: "4677y" };
    await testAgent.post("/user/signup").send(newone);

    let res1 = await testAgent.post("/user/login").send(newone);
    let token= res1.body.data

    let res= await testAgent.post("/todo").send({title:"do task"}).set({authorization:token})
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("do task")
  })

    it("(PATCH /todo) without title with id only should respond with res status 400 and a message", async () => {
      let newone = { name: "bakry", email: "bakry@test.com", password: "6568" };
      await testAgent.post("/user/signup").send(newone);

      let loginRes = await testAgent.post("/user/login").send(newone);
      let token = loginRes.body.data;

      let createRes = await testAgent.post("/todo").send({ title: "playing" }).set({ authorization: token });
      let todoId = createRes.body.data._id;
      let res = await testAgent.patch(`/todo/${todoId}`).set({ authorization: token }).send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toContain("title");
    });

    it("(PATCH /todo) with id and title should respond with status 200 and data", async () => {
      let newone = { name: "bakry", email: "bakry@test.com", password: "1234567" };
      await testAgent.post("/user/signup").send(newone);

      let loginRes = await testAgent.post("/user/login").send(newone);
      let token = loginRes.body.data;

      let createRes = await testAgent.post("/todo").send({ title: "eat" }).set({ authorization: token });
      let todoId = createRes.body.data._id;
      let res = await testAgent.patch(`/todo/${todoId}`).send({ title: "Eat Breakfast" }).set({ authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe("playing");
    });

    it("(GET /todo/user) should respond with the user's all todos", async () => {
      let newone = { name: "bakry", email: "bakry@test.com", password: "1234567" };
      await testAgent.post("/user/signup").send(newone);

      let loginRes = await testAgent.post("/user/login").send(newone);
      let token = loginRes.body.data;

      await testAgent.post("/todo").send({ title: "Task 1" }).set({ authorization: token });
      await testAgent.post("/todo").send({ title: "task2" }).set({ authorization: token });

      let res = await testAgent.get("/todo/user").set({ authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveSize(2);
    });

    it("(GET /todo/user) for a user hasn't any todo, should respond with status 200 and a message", async () => {
      let newone = { name: "bakry", email: "bakry@test.com", password: "1234567" };
      await testAgent.post("/user/signup").send(newone);

      let loginRes = await testAgent.post("/user/login").send(newone);
      let token = loginRes.body.data;

      let res = await testAgent.get("/todo/user").set({ authorization: token });
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("Couldn't find any todos");
    });
    
  });