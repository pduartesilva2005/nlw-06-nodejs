import { Request, Response } from 'express';
import { ListUsersSendComplimentsService } from '../services/ListUsersSendComplimentsService';

export class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUsersSendComplimentsService =
      new ListUsersSendComplimentsService();

    const compliments = await listUsersSendComplimentsService.execute(user_id);

    return response.json(compliments);
  }
}
