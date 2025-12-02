import { route, before, POST, GET, PUT } from 'awilix-express';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';
import {
  invitePartnerSchema,
  InvitePartnerInput,
  completeInviteSignup,
  CompleteInviteSignupInput,
  reInvitePartnerSchema,
  ReInvitePartnerInput,
  updatePartnerSchema,
  UpdatePartnerInput,
  invitePartnerUserSchema,
  InvitePartnerUserInput,
  firstTimePartnerUserChangePasswordSchema,
  FirstTimePartnerUserChangePasswordInput,
  reAssignTaskSchema,
  ReAssignTaskInput,
  updatePartnerAgentSchema,
  UpdatePartnerAgentInput,
  changePasswordSchema,
  ChangePasswordInput,
  attachRolesSchema,
  AttachRolesInput,
  suspendUserSchema,
  SuspendUserInput,
  restoreUserSchema,
  RestoreUserInput,
  suspendAgentSchema,
  SuspendAgentInput,
  restoreAgentSchema,
  RestoreAgentInput,
  reAssignAllTaskSchema,
  ReAssignTaskAllInput,
  unflaggedVerificationSchema,
  UnflaggedVerificationInput,
  upsertBankSchema,
  withdrawPartnerFundSchema,
  WithdrawPartnerFundInput,
  UpsertBankInput,
} from '../schemas/partner.schema';

@route('/partners')
export default class PartnerController {
  private readonly PartnerService;
  private readonly RabbitMqService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ PartnerService, RabbitMqService }: any) {
    this.PartnerService = PartnerService;
    this.RabbitMqService = RabbitMqService;
  }

  @GET()
  @route('/')
  async getPartners(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.getPartners(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/all')
  async allPartners(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.allPartners(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId')
  async getPartnerById(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.getPartnerById(req.params.partnerId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/agents')
  async partnerAgents(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.partnerAgents(req.params.partnerId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/users')
  async partnerUsers(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.partnerUsers(req.params.partnerId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/agents/:agentId/last-location')
  async agentLastLocation(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.agentLastLocation(req.params.agentId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/users/:userId')
  async getPartnerUserByID(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.getPartnerUserByID(req.params);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/metrics')
  async dashboardMetrics(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.dashboardMetrics(req.params.partnerId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/trendings')
  async dashboardTrendings(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.dashboardTrendings(req.params.partnerId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/verifications')
  async partnerVerifications(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.partnerVerifications(req.params.partnerId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/verifications/:verificationId/available-agents')
  async getAvailableAgentsToAddress(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.getAvailableAgentsToAddress(req.params);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/agents/:agentId/performance')
  async getAgentPerformance(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.getAgentPerformance(req.params);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/verifications/:verificationId')
  async partnerVerificationById(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.partnerVerificationById(req.params);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/agents/:agentId')
  async partnerAgentById(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.partnerAgentById(req.params);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/agents/:agentId/verifications')
  async partnerAgentVerifications(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.partnerAgentVerifications(req.params, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/users/:userId')
  async getBusinessUserByID(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.getBusinessUserByID(req.params);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/roles')
  async getBussinessRoles(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.getPartnerRoles(req.params.partnerId);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/update-agent')
  @before([validate(updatePartnerAgentSchema)])
  async updatePartnerAgent(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.updatePartnerAgent(req.body as UpdatePartnerAgentInput);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/:partnerId/update')
  @before([validate(updatePartnerSchema)])
  async updatePartnerById(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.updatePartnerById(
      req.params.partnerId,
      req.body as UpdatePartnerInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/suspend-user')
  @before([validate(suspendUserSchema)])
  async suspendPartnerUser(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.suspendPartnerUser(req.body as SuspendUserInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/restore-user')
  @before([validate(restoreUserSchema)])
  async restorePartnerUser(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.restorePartnerUser(req.body as RestoreUserInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/suspend-agent')
  @before([validate(suspendAgentSchema)])
  async suspendPartnerAgent(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.suspendPartnerAgent(req.body as SuspendAgentInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/restore-agent')
  @before([validate(restoreAgentSchema)])
  async restorePartnerAgent(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.restorePartnerAgent(req.body as RestoreAgentInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/invite')
  @before([validate(invitePartnerSchema)])
  async invitePartner(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.invite(req.body as InvitePartnerInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/invite-user')
  @before([validate(invitePartnerUserSchema)])
  async invitePartnerUser(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.createPartnerUser(req.body as InvitePartnerUserInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/upsert-roles')
  @before([validate(attachRolesSchema)])
  async attachRole(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.attachRole(req.body as AttachRolesInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/re-invite')
  @before([validate(reInvitePartnerSchema)])
  async reInvitePartner(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.reInvite(req.body as ReInvitePartnerInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/complete-signup')
  @before([validate(completeInviteSignup)])
  async completeInviteSignup(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.completeInviteSignup(req.body as CompleteInviteSignupInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/change-password')
  @before([validate(changePasswordSchema)])
  async changePassword(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.changePassword(req.body as ChangePasswordInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/change-password/first-time')
  @before([validate(firstTimePartnerUserChangePasswordSchema)])
  async firstTimeChangePassword(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.firstTimeChangePassword(
      req.body as FirstTimePartnerUserChangePasswordInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/reassign-task')
  @before([validate(reAssignTaskSchema)])
  async reAssignTask(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.reAssignTask(req.body as ReAssignTaskInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/reassign-all-task')
  @before([validate(reAssignAllTaskSchema)])
  async reAssignAllTask(req: Request, res: Response) {
    const { RabbitMqService } = this;

    RabbitMqService.publishToTaskBroadcastQueue(req.body as ReAssignTaskAllInput);

    ResponseTransformer.success({ res, data: 'Broadcast Successfully' });
  }

  @POST()
  @route('/verifications/unflagged')
  @before([validate(unflaggedVerificationSchema)])
  async unflaggedVerification(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.unflaggedVerification(req.body as UnflaggedVerificationInput);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:partnerId/withdrawals')
  async partnerWithdrawals(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.partnerWithdrawals(req.params.partnerId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/upsert-bank')
  @before([validate(upsertBankSchema)])
  async upsertBank(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.upsertBank(req.body as UpsertBankInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/transactions/withdraw-fund')
  @before([validate(withdrawPartnerFundSchema)])
  async withdrawFund(req: Request, res: Response) {
    const { PartnerService } = this;

    const data = await PartnerService.withdrawFund(req.body as WithdrawPartnerFundInput);

    ResponseTransformer.success({ res, data });
  }
}
