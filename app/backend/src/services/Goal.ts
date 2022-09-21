
import { CODE_MESSAGES } from "../config/CodeMessages";
import ApiError from "../exceptions/ApiError";
import { IPostGoal, IGetGoal, IGoal } from "../Interfaces/IGoal";
import GoalRepository from '../repositories/Goal';


class GoalService {
  private repository: GoalRepository;


  constructor() {
    this.repository = new GoalRepository();
  }

  async postGoal(match: IPostGoal): Promise<void> {
    await this.repository.save(match);
  }

  async getGoals(params: IGetGoal): Promise<Array<number>> {
    const goals_ids = await this.repository.getGoals(params);
    const response = goals_ids.map((ob) => ob.idGol);
    return response;
  }

  async getGoal(id: number): Promise<IGoal> {
    const response = await this.repository.getGoal(id);
    if (!response) {
      throw new ApiError.NotFoundError(CODE_MESSAGES.GOAL_NOT_FOUND)
    }
    return response;
  }

  async deleteGoals(id: number): Promise<void> {
    await this.getGoal(id);
    await this.repository.deleteGoal(id);
  }

}

export default GoalService;