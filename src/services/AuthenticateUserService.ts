import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepositories } from "../repositories/userRepositories";


interface IAuthenticateUserService{
  email, 
  password
}


class AuthenticateUserService {
  async execute({email, password} : IAuthenticateUserService ) {
    const userRepositories = getCustomRepository(UserRepositories); 

    const user = await userRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Email/User incorrect")
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email/User incorrect")
      
    }

    const token = sign({
      email: user.email,
    }, "75d07f2b1a60315cbe07829ef7d0fc70",{
      subject: user.id,
      expiresIn: "1d"
    });

    return token;

  }
}

export { AuthenticateUserService }