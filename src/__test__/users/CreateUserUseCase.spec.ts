import { InMemoryUsersRepository } from "../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "../../modules/users/useCases/createUser/CreateUserError";
import { CreateUserUseCase } from "../../modules/users/useCases/createUser/CreateUserUseCase";


let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {

 beforeEach(() => {
  inMemoryUsersRepository = new InMemoryUsersRepository();
  createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
 })

 it("Should be able create new user", async () => {

  const user = await createUserUseCase.execute({
   name: "New User",
   email: "test@test.com",
   password: "12345"
  });

  expect(user).toHaveProperty("id")
 });

 it("Should not be possible to create a new user with an existing email", () => {
  expect(async () => {
   await createUserUseCase.execute({
    name: "New User",
    email: "test@test.com",
    password: "12345"
   });
   await createUserUseCase.execute({
    name: "New User",
    email: "test@test.com",
    password: "12345"
   });
  }).rejects.toBeInstanceOf(CreateUserError)
 });
})
