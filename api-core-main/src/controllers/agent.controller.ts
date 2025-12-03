import { route, before, POST, GET, PUT } from 'awilix-express';
import { Request, Response } from 'express';
import {
  inviteAgentSchema,
  InviteAgentInput,
  completeAgentSignupSchema,
  CompleteAgentSignupInput,
  syncAgentLocatonSchema,
  SyncAgentLocationInput,
  syncFcmTokenSchema,
  SyncFcmTokenInput,
  acceptTaskSchema,
  AcceptTaskInput,
  updateAgentAddressStatusSchema,
  UpdateAgentAddressStatusInput,
  updateAgentAddressSchema,
  UpdateAgentAddressInput,
  submitAgentAddressSchema,
  SubmitAgentAddressInput,
  changeAgentPasswordSchema,
  ChangeAgentPasswordInput,
  updateDisplayImageSchema,
  UpdateDisplayPictureInput,
  createPartnerAgentSchema,
  CreatePartnerAgentInput,
  withdrawAgentFundSchema,
  WithdrawAgentFundInput,
  upsertBankSchema,
  UpsertBankInput,
} from '../schemas/agent.schema';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';

@route('/agents')
export default class AgentController {
  private readonly AgentService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ AgentService }: any) {
    this.AgentService = AgentService;
  }

  @POST()
  @route('/invite')
  @before([validate(inviteAgentSchema)])
  async inviteAgent(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.inviteAgent(req.body as InviteAgentInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/create')
  @before([validate(createPartnerAgentSchema)])
  async createPartnerAgent(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.createPartnerAgent(req.body as CreatePartnerAgentInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/complete-signup')
  @before([validate(completeAgentSignupSchema)])
  async completeAgentSignup(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.completeAgentSignup(req.body as CompleteAgentSignupInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/sync-location')
  @before([validate(syncAgentLocatonSchema)])
  async syncAgentLocation(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.syncAgentLocation(req.body as SyncAgentLocationInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/sync-fcm-token')
  @before([validate(syncFcmTokenSchema)])
  async syncFcmToken(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.syncFcmToken(req.body as SyncFcmTokenInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/accept-task')
  @before([validate(acceptTaskSchema)])
  async acceptTask(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.acceptTask(req.body as AcceptTaskInput);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:agentId/metrics')
  async agentMetrics(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.agentMetrics(req.params.agentId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:agentId/trendings')
  async agentTrendings(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.agentTrendings(req.params.agentId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:agentId/verifications')
  async agentVerifications(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.agentVerifications(req.params.agentId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:agentId/addresses/:addressId')
  async viewAgentTaskById(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.viewAgentTaskById(req.params);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/update-address')
  @before([validate(updateAgentAddressSchema)])
  async updateAgentAddress(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.updateAgentAddress(req.body as UpdateAgentAddressInput);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/update-status')
  @before([validate(updateAgentAddressStatusSchema)])
  async updateAgentAddressStatus(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.updateAgentAddressStatus(
      req.body as UpdateAgentAddressStatusInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/change-password')
  @before([validate(changeAgentPasswordSchema)])
  async changeAgentPassword(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.changeAgentPassword(req.body as ChangeAgentPasswordInput);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/display-picture')
  @before([validate(updateDisplayImageSchema)])
  async updateDisplayImage(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.updateDisplayImage(req.body as UpdateDisplayPictureInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/submit')
  @before([validate(submitAgentAddressSchema)])
  async submitAddress(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.submitAddress(req.body as SubmitAgentAddressInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/upsert-bank')
  @before([validate(upsertBankSchema)])
  async upsertBank(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.upsertBank(req.body as UpsertBankInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/transactions/withdraw-fund')
  @before([validate(withdrawAgentFundSchema)])
  async withdrawFund(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.withdrawFund(req.body as WithdrawAgentFundInput);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:agentId/profile')
  async agentProfile(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.agentProfile(req.params.agentId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:agentId/withdrawals')
  async agentWithdrawals(req: Request, res: Response) {
    const { AgentService } = this;

    const data = await AgentService.agentWithdrawals(req.params.agentId, req.query);

    ResponseTransformer.success({ res, data });
  }
}
