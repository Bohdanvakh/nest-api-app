import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // check if email in use
        const users = await this.usersService.find(email);
        // hash the user password
        if(users.length) {
            throw new BadRequestException('Email in use');
        }
        // create a new user and save it

        // return the user
    }

    signin() {

    }
}