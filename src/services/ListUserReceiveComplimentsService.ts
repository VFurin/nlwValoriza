import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from '../repositories/ComplimentRepositories';

class ListUserReceiveComplimentsService {

  async execute(user_id : string ) {
    const complimentRepository = getCustomRepository(ComplimentRepositories)

    const compliments = await complimentRepository.find({
      where: {
        user_receiver: user_id
      }
    })

    return compliments
  }
}

export { ListUserReceiveComplimentsService }