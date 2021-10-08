import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      where: { email }
    });

    if (!user) {
      throw new Error('Email/Password Incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/Password Incorrect');
    }

    const secret = process.env.SECRET_KEY as string;

    const token = sign(
      {
        email: user.email
      },
      secret,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    return {
      user,
      token
    };
  }
}
