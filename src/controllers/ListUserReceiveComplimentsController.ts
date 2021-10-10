import { Request, Response } from 'express';
import { ListUsersReceiveComplimentsService } from '../services/ListUsersReceiveComplimentsService';

export class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUsersReceiveComplimentsService =
      new ListUsersReceiveComplimentsService();

    const compliments = await listUsersReceiveComplimentsService.execute(
      user_id
    );

    return response.json(compliments);
  }
}
