import { route, before, POST, GET, PUT } from 'awilix-express';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';
import { IAwilixBusinessController } from '../types/containers/business.container';
import {
  inviteBusinessSchema,
  InviteBusinessInput,
  completeInviteSignup,
  CompleteInviteSignupInput,
  reInviteBusinessSchema,
  ReInviteBusinessInput,
  updateBusinessSchema,
  UpdateBusinessInput,
  inviteBusinessUserSchema,
  InviteBusinessUserInput,
  firstTimeBusinessUserChangePasswordSchema,
  FirstTimeBusinessUserChangePasswordInput,
  CreateBusinessVerificationsInput,
  changeBusinesPasswordSchema,
  ChangeBusinessPasswordInput,
  attachRolesSchema,
  AttachRolesInput,
  suspendUserSchema,
  SuspendUserInput,
  uploadBulkIdentitySchema,
  UploadBulkIdentityInput,
  uploadBulkAddressSchema,
  UploadBulkAddressInput,
  findBusinessByApiKeySchema,
  FindBusinessByApiKeyInput,
  restoreUserSchema,
  RestoreUserInput,
  removeBusinessCardSchema,
  RemoveBusinessCardInput,
  TaskExistsInput,
  taskExistsSchema,
  submitConsumerIdentitySchema,
  SubmitConsomerIdentityInput,
  createBusinessVerificatonsSchema,
} from '../schemas/business.schema';

@route('/businesses')
export default class BusinessController {
  private readonly BusinessService;
  private readonly RabbitMqService;

  constructor({ BusinessService, RabbitMqService }: IAwilixBusinessController) {
    this.RabbitMqService = RabbitMqService;
    this.BusinessService = BusinessService;
  }

  @GET()
  @route('/')
  async all(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.all(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId')
  async getBussinessById(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.getBussinessById(req.params.businessId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/roles')
  async getBussinessRoles(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.getBussinessRoles(req.params.businessId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/metrics')
  async getBussinessMetrics(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.getBussinessMetrics(req.params.businessId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/candidates')
  async allCandidates(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.allCandidates(req.params.businessId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/candidates-paginated')
  async allPaginatedCandidates(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.allPaginatedCandidates(req.params.businessId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/recent-candidates')
  async recentCandidates(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.recentCandidates(
      req.params.businessId,
      req.query.limit as string,
    );

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/recent-verifications')
  async recentVerifications(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.recentVerifications(
      req.params.businessId,
      req.query.limit as string,
    );

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/verifications')
  async allVerifications(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.allVerifications(req.params.businessId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/export-address-verifications')
  async exportVerifications(req: Request, res: Response) {
    const { RabbitMqService } = this;

    RabbitMqService.publishToExportAddressQueue({
      businessId: req.params.businessId,
      query: req.query,
    });

    ResponseTransformer.success({
      res,
      data: 'Request Recieved Successfully, an attachment will be sent to your email',
    });
  }

  @GET()
  @route('/:businessId/transactions')
  async allTransactions(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.allTransactions(req.params.businessId, req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/cards')
  async allCards(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.allCards(req.params.businessId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/services')
  async allServices(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.allServices(req.params.businessId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/wallet-balance')
  async walletBalance(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.walletBalance(req.params.businessId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/users')
  async businessUsers(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.businessUsers(req.params.businessId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/candidates/:candidateId/verifications')
  async getCandidateBusinessVerifications(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.getCandidateBusinessVerifications(
      req.params.businessId,
      req.params.candidateId,
      req.query,
    );

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/candidates/:candidateId')
  async findVerificationByID(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.findVerificationByID(req.params);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/users/:userId')
  async getBusinessUserByID(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.getBusinessUserByID(
      req.params as { businessId: string; userId: string },
    );

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:businessId/candidates/:candidateId/profile')
  async getBusinessCandidateById(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.getBusinessCandidateById(req.params);

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/:businessId/update')
  @before([validate(updateBusinessSchema)])
  async updateBusinessById(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.updateBusinessById(
      req.params.businessId,
      req.body as UpdateBusinessInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @PUT()
  @route('/change-password')
  @before([validate(changeBusinesPasswordSchema)])
  async changeBusinessUserPassword(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.changeBusinessUserPassword(
      req.body as ChangeBusinessPasswordInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/invite')
  @before([validate(inviteBusinessSchema)])
  async inviteBusiness(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.invite(req.body as InviteBusinessInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/invite-user')
  @before([validate(inviteBusinessUserSchema)])
  async inviteBusinessUser(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.createBusinessUser(req.body as InviteBusinessUserInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/re-invite')
  @before([validate(reInviteBusinessSchema)])
  async reInviteBusiness(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.reInvite(req.body as ReInviteBusinessInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/complete-signup')
  @before([validate(completeInviteSignup)])
  async completeInviteSignup(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.completeInviteSignup(req.body as CompleteInviteSignupInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/change-password/first-time')
  @before([validate(firstTimeBusinessUserChangePasswordSchema)])
  async firstTimeChangePassword(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.firstTimeChangePassword(
      req.body as FirstTimeBusinessUserChangePasswordInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/verifications/exists')
  @before([validate(taskExistsSchema)])
  async checkCandidateTaskExists(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.checkCandidateTaskExists(req.body as TaskExistsInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/verifications')
  @before([validate(createBusinessVerificatonsSchema)])
  async createVerifications(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.createVerifications(
      req.body as CreateBusinessVerificationsInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/upsert-roles')
  @before([validate(attachRolesSchema)])
  async attachRole(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.attachRole(req.body as AttachRolesInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/suspend-user')
  @before([validate(suspendUserSchema)])
  async suspendBusinessUser(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.suspendBusinessUser(req.body as SuspendUserInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/restore-user')
  @before([validate(restoreUserSchema)])
  async restorePartnerUser(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.restoreBusinessUser(req.body as RestoreUserInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/find-by-key')
  @before([validate(findBusinessByApiKeySchema)])
  async findBusinessByApiKey(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.findBusinessByApiKey(req.body as FindBusinessByApiKeyInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/identities/bulk-upload')
  @before([validate(uploadBulkIdentitySchema)])
  async uploadIdentityBulkUpload(req: Request, res: Response) {
    const { RabbitMqService } = this;

    RabbitMqService.publishToBulkIdentityUploadQueue(req.body as UploadBulkIdentityInput);

    ResponseTransformer.success({ res, data: 'Identity File Uploaded Successfully' });
  }

  @POST()
  @route('/addresses/bulk-upload')
  @before([validate(uploadBulkAddressSchema)])
  async uploadAddressBulkUpload(req: Request, res: Response) {
    const { RabbitMqService } = this;

    RabbitMqService.publishToBulkAddressUploadQueue(req.body as UploadBulkAddressInput);

    ResponseTransformer.success({ res, data: 'Address File Uploaded Successfully' });
  }

  @POST()
  @route('/cards/remove')
  @before([validate(removeBusinessCardSchema)])
  async removeBusinessCard(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.removeBusinessCard(req.body as RemoveBusinessCardInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/consumer/identity')
  @before([validate(submitConsumerIdentitySchema)])
  async submitConsumerIdentity(req: Request, res: Response) {
    const { BusinessService } = this;

    const data = await BusinessService.submitConsumerIdentity(
      req.body as SubmitConsomerIdentityInput,
    );

    ResponseTransformer.success({ res, data });
  }
}
