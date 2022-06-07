import { InMemoryStatementsRepository } from "../../modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../../modules/statements/useCases/createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../../modules/statements/useCases/createStatement/ICreateStatementDTO";
import { GetStatementOperationUseCase } from "../../modules/statements/useCases/getStatementOperation/GetStatementOperationUseCase";
import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";


let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUserCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Get Statement Operation", () => {

 beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
  inMemoryStatementsRepository = new InMemoryStatementsRepository();
  createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  createStatementUserCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
 })

 it("Should be able to get operation", async () => {

  const user = await createUserUseCase.execute({
   name: "User test",
   email: "UserTeste@qualquercoisa.com",
   password: "12345"
  });

  const operation = {
   user_id: user.id!,
   type: "deposit",
   amount: 100,
   description: "descriprtion"
  } as ICreateStatementDTO

  const statement = await createStatementUserCase.execute(operation)

  const response = await getStatementOperationUseCase.execute({
   user_id: user.id!,
   statement_id: statement.id!
  })

  expect(response).toHaveProperty("id");
  expect(response.user_id).toEqual(statement.user_id)

 })
})
