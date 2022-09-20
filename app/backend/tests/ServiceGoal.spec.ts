/// <reference types="mocha" />
import { expect } from 'chai';
import sinon from 'sinon';
import GoalService from '../src/services/Goal';
import GoalRepository from '../src/repositories/Goal';
import { CODE_MESSAGES } from '../src/config/CodeMessages';


let sandbox: sinon.SinonSandbox;

describe('Service - Goal', async () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('SUCCESS: Post Goal', async () => {
    sandbox.stub(GoalRepository.prototype, 'save').resolves();
    const target = new GoalService();
    const data = {
      idTime: 1,
      idPartida: 1,
    }
    await target.postGoal(data);
    expect(true).to.equal(true);
  })

  it('SUCCESS: Get Goals', async () => {
    sandbox.stub(GoalRepository.prototype, 'getGoals').resolves([{ idGol: 1 }]);
    const target = new GoalService();
    const data = {
      idTime: 1,
      idPartida: 1,
    }
    const [response] = await target.getGoals(data);
    expect(response).to.equal(1);
  })

  it('SUCCESS: Get Goal', async () => {
    sandbox.stub(GoalRepository.prototype, 'getGoal').resolves({ idGol: 1, idTime: 1, idPartida: 1 });
    const target = new GoalService();
    const response = await target.getGoal(1);
    expect(response.idGol).to.equal(1);
  })

  it('ERROR: Get Goal', async () => {
    sandbox.stub(GoalRepository.prototype, 'getGoal').resolves();
    const target = new GoalService();
    try {
      await target.getGoal(1);
    } catch (error) {
      expect(error.message).to.equal(`NotFoundError: ${CODE_MESSAGES.GOAL_NOT_FOUND.message}`);
      expect(error.code).to.equal(CODE_MESSAGES.GOAL_NOT_FOUND.code);
    }
  })

  it('SUCCESS: Delete Goal', async () => {
    sandbox.stub(GoalService.prototype, 'getGoal').resolves();
    sandbox.stub(GoalRepository.prototype, 'deleteGoal').resolves();
    const target = new GoalService();
    await target.deleteGoals(1);
    expect(true).to.equal(true);
  })
})

