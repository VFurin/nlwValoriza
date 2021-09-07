import { Request, Response } from "express";
import { ListUserSenComplimentsService } from "../services/ListUserSendComplimentsService";

class ListUserSendComplimentsController {
  async handle(request: Request, response: Response)  {
    const { user_id } = request;

    const listUserSendComplimentsService = new ListUserSenComplimentsService();

    const complements = await listUserSendComplimentsService.execute(user_id);

    return response.json(complements);
  }
}

export { ListUserSendComplimentsController }