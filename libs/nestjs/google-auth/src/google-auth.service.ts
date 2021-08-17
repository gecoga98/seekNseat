import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserDto } from '@seekNseat/contracts/user';
import {
  CreateUserCommand,
  GetUserByUsernameQuery,
} from '@seekNseat/nestjs/user';
import { OAuth2Client } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleAuthService {
  client;
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    const clientId = process.env.GOOGLE_AUTH_CLIENT_ID;
    this.client = new OAuth2Client(clientId);
  }

  async authenticate(token: string): Promise<UserDto> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const user = await this.queryBus.execute<GetUserByUsernameQuery>(
      new GetUserByUsernameQuery(payload.email)
    );

    if (!user) {
      return await this.commandBus.execute(
        new CreateUserCommand(uuidv4(), payload.email, uuidv4(), ['ROLE_USER'])
      );
    }

    return user;
  }
}