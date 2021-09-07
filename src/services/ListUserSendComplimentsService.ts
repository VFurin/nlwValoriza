import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from '../repositories/ComplimentRepositories';

class ListUserSenComplimentsService {

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

export { ListUserSenComplimentsService }