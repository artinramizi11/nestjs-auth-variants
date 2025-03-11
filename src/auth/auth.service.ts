import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

export const users = [
    {
        id: 1,
        email: "artin11@outlook.com",
        password: "tini1234",
        city: "gjilan",
        country: "kosovo",
        skills: ['HTML','CSS','JAVASCRIPT','REACT','NEST JS'],
        birthdayDate: '14/03/2004',
        age: 20,
        role: "admin"
    },
    {
        id: 2,
        email: "artin12@outlook.com",
        password: "tini1234",
        city: "gjilan",
        country: "kosovo",
        skills: ['HTML','CSS','JAVASCRIPT','REACT','NEST JS'],
        birthdayDate: '14/03/2004',
        age: 20,
        role: "user"
    }
]
@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ){}

    getUsers(){
        return users
    }

    validateUser(email:string,password: string){
        const user = users.find((user) => user.email === email && user.password === password)
        if(!user) {
            throw new HttpException("Wrong credentials",HttpStatus.BAD_REQUEST)
        }
        return user
    }

    async login(id: number){
        const user = users.find((user) => user.id === id)
        if(!user){
            throw new HttpException("No user found with that ID",HttpStatus.NOT_FOUND)
        }
        const payload = {sub: user.id, email: user.email} 
        const token = await this.jwtService.signAsync(payload, {secret: "secret_key"})
        return {token}
    }

     createUser(user: CreateUserDto){
        const addUser: any = {...user, id: users.length + 1}
      
         users.push(addUser)
         return {
            message: "Added the new user",
            userAdded: addUser
         }

    }


     findUserById(id: number){
        const user = users.find((user) => user.id === id)
        if(!user) {
            throw new HttpException("No user found with that id",HttpStatus.NOT_FOUND)
        }
        return user
    }

    testSomething(){
        throw new HttpException("test something function is failed",HttpStatus.BAD_REQUEST)
    }
}
