import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { UserRepositories } from "../repositories/userRepositories";

interface IComplimentRequest{
  tag_id: string,
  user_sender: string,
  user_receiver: string,
  message: string
}

class CreateComplimentService {
  async execute({tag_id, user_sender, user_receiver, message} : IComplimentRequest) {

    const complimentRepository = getCustomRepository(ComplimentRepositories);

    const userRepositories = getCustomRepository(UserRepositories);

    if(user_sender === user_receiver){
      throw new Error("Incorrect User Receiver");
    }

    const userReceiveExists = await userRepositories.findOne(user_receiver);

    if(!userReceiveExists) {
      throw new Error("user Receiver does not exists!")
    }

    const compliment = complimentRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await complimentRepository.save(compliment);

    return compliment;
  }

}

export { CreateComplimentService }