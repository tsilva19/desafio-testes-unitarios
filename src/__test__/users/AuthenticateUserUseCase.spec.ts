import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../../modules/users/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";


let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {

 beforeEach(async () => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
  authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
  createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
 });

 it("Should be able to authorize a user", async () => {

  const user = await createUserUseCase.execute({
   name: "New User",
   email: "test@test.com",
   password: "12345"
  })
  const authorization = await authenticateUserUseCase.execute({
   email: user.email,
   password: "12345"
  })

  expect(authorization).toHaveProperty("user.id")
  expect(authorization).toHaveProperty("token")
 })
})
