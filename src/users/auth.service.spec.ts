import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];

        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 999999), email, password } as User;
                users.push(user);
                return Promise.resolve(user);
            }

        }
        
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService);
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup('some@gmail.com', 'somePassword');

        expect(user.password).not.toEqual('somePassword');

        const [salt, hash] = user.password.split('.');

        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signes up with email that is already in use', async () => {
        await service.signup('my@gmail.com', '123myPass');
        
        await expect(service.signup('my@gmail.com', '123myPass')).rejects.toThrow(BadRequestException);
    });

    it('throws if signin is called with an unused email', async () => {
        await expect(
            service.signin('exmaple@gmail.com', 'pass'),
        ).rejects.toThrow(NotFoundException);
    });

    it('throws if invalid password is provided', async () => {
        await service.signup('my@gmail.com', 'correctPass');

        await expect(service.signin('my@gmail.com', 'invalidPass')).rejects.toThrow(BadRequestException);
    });

    it('return a user if correct password is provided', async () => {
        await service.signup('myemail@gmail.com', 'myPass');

        const user = await service.signin('myemail@gmail.com', 'myPass');
        expect(user).toBeDefined();
    });
});