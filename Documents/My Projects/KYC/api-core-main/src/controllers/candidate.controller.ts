import { route, before, POST, GET } from 'awilix-express';
import { Request, Response } from 'express';
import { validate } from '../middlewares/validate.middleware';
import ResponseTransformer from '../utils/response.transformer';
import {
  createCandidateByFormSchema,
  CreateCandidateByFormInput,
  createCandidateByIdentitySchema,
  CreateCandidateByIdentityInput,
} from '../schemas/candidate.schema';

@route('/candidates')
export default class CandidateController {
  private readonly CandidateService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ CandidateService }: any) {
    this.CandidateService = CandidateService;
  }

  @GET()
  @route('/all')
  async getAllCandidates(req: Request, res: Response) {
    const { CandidateService } = this;

    const data = await CandidateService.allCandidates(req.query);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:candidateId/verifications')
  async getAdminCandidateVerifications(req: Request, res: Response) {
    const { CandidateService } = this;

    const data = await CandidateService.allCandidates(req.query);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/create-by-form')
  @before([validate(createCandidateByFormSchema)])
  async createByForm(req: Request, res: Response) {
    const { CandidateService } = this;

    const data = await CandidateService.createByForm(req.body as CreateCandidateByFormInput);

    ResponseTransformer.success({ res, data });
  }

  @POST()
  @route('/create-by-identity')
  @before([validate(createCandidateByIdentitySchema)])
  async createByIdentity(req: Request, res: Response) {
    const { CandidateService } = this;

    const data = await CandidateService.createByIdentity(
      req.body as CreateCandidateByIdentityInput,
    );

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:candidateId/businesses')
  async getCandidateBusinesses(req: Request, res: Response) {
    const { CandidateService } = this;

    const data = await CandidateService.getCandidateBusinesses(req.params.candidateId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/:candidateId/profile')
  async getCandidateById(req: Request, res: Response) {
    const { CandidateService } = this;

    const data = await CandidateService.getCandidateById(req.params.candidateId);

    ResponseTransformer.success({ res, data });
  }

  @GET()
  @route('/businesses/:businessId/get-verifications/:taskId')
  async getCandidateVerificationById(req: Request, res: Response) {
    const { CandidateService } = this;

    const data = await CandidateService.getCandidateVerificationById(
      req.params.businessId,
      req.params.taskId,
    );

    ResponseTransformer.success({ res, data });
  }
}
