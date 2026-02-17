import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service"; 
import { UsersService } from "./users.service";
import { User } from "./user.entity";

// Ovaj test proverava da se može kreirati instanca AuthService. To je osnovni test koji osigurava da se AuthService može instancirati bez problema, što je ključno za daljnje testiranje funkcionalnosti unutar AuthService.
it('can create an instance of auth service', async () => {

    // Kreira se fake user service koji će se koristiti u testu, jer AuthService zavisi od UserService. Ovaj fake service implementira samo metodu 'find' koja vraća praznu listu korisnika, što je dovoljno za potrebe ovog testa.
  const fakeUserService: Partial<UsersService> = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) => 
        Promise.resolve({ id: 1, email ,password } as User)
  };


  // Kreira se testing module koji uključuje AuthService i koristi fakeUserService umjesto stvarnog UserService. Ovo omogućava testiranje AuthService bez potrebe za stvarnim implementacijama UserService.
  const module = await Test.createTestingModule({
    providers: [
        AuthService, 
        { provide: UsersService, useValue: fakeUserService }],
  }).compile();

  const service = module.get(AuthService); // Dobavlja se instanca AuthService iz testnog modula. Ovo je instanca koja će se testirati.
  expect(service).toBeDefined(); // Provjerava se da je AuthService definisan, što znači da je uspješno kreiran i spreman za korištenje.

});

