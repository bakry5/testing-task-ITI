
describe("lab testing:", () => {

    describe("users routes:", () => {
        it("(GET /user/search) should respond with the user and the name ",  () => { 
        })
        it("GET /user/search with invalid name should respond error with status 404",  () => { })

    })


    describe("todos routes:", () => {
        it("(PATCH /todo) without title with id should respond with res status 400 and ",  () => { })
        it("(PATCH /todo) with id and title should respond with status 200 and the new todo",  () => { })

        it("(GET /todo/user) should respond with the user's all todos",  () => { })
        it("(GET /todo/user) for the user that don;t do any thing, should respond with status 200 ",  () => { })

    })



})