
import { IPostGoal, IGetGoal } from "../Interfaces/IGoal";
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

}

export default GoalService;