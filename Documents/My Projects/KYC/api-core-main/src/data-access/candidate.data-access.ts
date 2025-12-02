import { Types } from 'mongoose';
import { BadRequestError } from '../errors/api.error';
import CommonLogic from '../logics/common.logic';

const { ObjectId } = Types;

export default class CandidateDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly CandidateModel;
  private readonly BusinessCandidateModel;
  private readonly mongooseConnection;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, CandidateModel, BusinessCandidateModel, mongooseConnection }: any) {
    this.logger = logger;
    this.fillable = [
      'firstName',
      'lastName',
      'middleName',
      'phoneNumber',
      'imageUrl',
      'email',
      'dateOfBirth',
    ].join(' ');
    this.CandidateModel = CandidateModel;
    this.BusinessCandidateModel = BusinessCandidateModel;
    this.mongooseConnection = mongooseConnection;
  }

  async create(payload: Record<string, unknown>) {
    const { logger, CandidateModel, BusinessCandidateModel, mongooseConnection } = this;

    const session = await mongooseConnection.startSession();

    session.startTransaction();

    try {
      const candidate = await CandidateModel.create(
        [
          {
            firstName: payload?.firstName,
            lastName: payload?.lastName,
            middleName: payload?.middleName,
            email: payload?.email,
            phoneNumber: payload?.phoneNumber,
            imageUrl: payload?.imageUrl,
            dateOfBirth: payload?.dateOfBirth,
          },
        ],
        { session },
      );

      await BusinessCandidateModel.findOneAndUpdate(
        {
          candidate: candidate[0]._id,
          business: payload?.businessId,
        },
        {
          candidate: candidate[0]._id,
          business: payload?.businessId,
        },
        {
          new: true,
          upsert: true,
        },
        { session },
      );

      await session.commitTransaction();

      return { ...candidate[0]._doc };
    } catch (error) {
      logger.error('abort transaction', error);
      await session.abortTransaction();

      throw new BadRequestError(error as string);
    } finally {
      session.endSession();
    }
  }

  async candidateExists(payload: Record<string, unknown>) {
    const { CandidateModel } = this;

    let candidate;

    const paramValues = CommonLogic.removeEmptyObjects([
      { ...(payload.email ? { email: payload.email } : undefined) },
      { ...(payload.phoneNumber ? { phoneNumber: payload.phoneNumber } : undefined) },
      { ...(payload.idNumber ? { 'ids.bvn': payload.idNumber } : undefined) },
      { ...(payload.idNumber ? { 'ids.nin': payload.idNumber } : undefined) },
      { ...(payload.idNumber ? { 'ids.driver-license': payload.idNumber } : undefined) },
      { ...(payload.idNumber ? { 'ids.international-passport': payload.idNumber } : undefined) },
    ]);

    if (paramValues.length) {
      candidate = await CandidateModel.findOne({ $or: paramValues });
      if (candidate) {
        candidate = candidate?._doc;

        return {
          candidateExits: true,
          candidate,
        };
      }
    }

    return {
      candidateExits: false,
      candidate: null,
    };
  }

  async candidatesExists(payload: Record<string, unknown>) {
    const { CandidateModel } = this;

    const paramValues = CommonLogic.removeEmptyObjects([
      { ...(payload.email ? { email: payload.email } : undefined) },
      { ...(payload.phoneNumber ? { phoneNumber: payload.phoneNumber } : undefined) },
      { ...(payload.idNumber ? { 'ids.bvn': payload.idNumber } : undefined) },
      { ...(payload.idNumber ? { 'ids.nin': payload.idNumber } : undefined) },
      { ...(payload.idNumber ? { 'ids.driver-license': payload.idNumber } : undefined) },
      { ...(payload.idNumber ? { 'ids.international-passport': payload.idNumber } : undefined) },
    ]);

    if (paramValues.length) {
      const candidates = await CandidateModel.find({ $or: paramValues }).lean().exec();
      if (candidates.length) {
        return {
          candidateExits: true,
          candidates,
        };
      }
    }

    return {
      candidateExits: false,
      candidates: [],
    };
  }

  async candidateExistsInBusiness(candidate: string, business: string) {
    const { BusinessCandidateModel } = this;

    return BusinessCandidateModel.findOne({
      candidate,
      business,
    });
  }

  async candidatesExistsInBusiness(candidates: string[], business: string) {
    const { BusinessCandidateModel } = this;

    return BusinessCandidateModel.findOne({
      business,
      candidate: {
        $in: candidates,
      },
    });
  }

  async createQueueCandidate(payload: Record<string, unknown>) {
    const { logger, CandidateModel, BusinessCandidateModel, mongooseConnection } = this;

    const session = await mongooseConnection.startSession();

    session.startTransaction();

    try {
      let candidate;

      if (!payload.firstName && !payload.lastName && !payload.phoneNumber) {
        return null;
      }

      // if (!candidate) {
      candidate = await CandidateModel.create(
        [
          {
            firstName: payload?.firstName,
            lastName: payload?.lastName,
            middleName: payload?.middleName,
            email: payload?.email,
            phoneNumber: payload?.phoneNumber,
            imageUrl: payload?.imageUrl,
            dateOfBirth: payload?.dateOfBirth,
          },
        ],
        { session },
      );

      if (!candidate) {
        return null;
      }
      // logger.info(JSON.stringify(candidate));
      candidate = candidate[0]._doc;
      // }

      await BusinessCandidateModel.findOneAndUpdate(
        {
          candidate: candidate._id,
          business: payload?.business,
        },
        {
          candidate: candidate._id,
          business: payload?.business,
        },
        {
          new: true,
          upsert: true,
        },
        { session },
      );

      await session.commitTransaction();

      return { ...candidate };
    } catch (error) {
      logger.error('abort create candidate transaction', error);
      await session.abortTransaction();

      throw new BadRequestError(error as string);
    } finally {
      session.endSession();
    }
  }

  async findCandidateById(id: string) {
    const { CandidateModel, fillable } = this;

    return CandidateModel.findById(new ObjectId(id)).select(fillable).lean().exec();
  }

  async getCandidate(identifier: string) {
    const { CandidateModel, fillable } = this;

    return CandidateModel.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }, { ids: { $in: identifier } }],
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async getCandidateWithBvn(identifier: string) {
    const { CandidateModel, fillable } = this;

    return CandidateModel.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }, { 'ids.bvn': identifier }],
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async getCandidateWithNin(identifier: string) {
    const { CandidateModel, fillable } = this;

    return CandidateModel.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }, { 'ids.nin': identifier }],
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async findCandidateByPhoneNumber(phoneNumber: string) {
    const { CandidateModel, fillable } = this;

    return CandidateModel.findOne({
      phoneNumber,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async findCandidateByBusiness({ candidate, business }: { candidate: string; business: string }) {
    const { BusinessCandidateModel, fillable } = this;

    return BusinessCandidateModel.findOne({
      candidate,
      business,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async fetchLimitedCandidate(businessId: string, limit: number) {
    const { CandidateModel, fillable } = this;

    return CandidateModel.find({
      business: businessId,
    })
      .select(fillable)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  async updateCandidateById(
    id: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { CandidateModel, fillable } = this;

    return CandidateModel.findByIdAndUpdate(
      id,
      {
        ...(setData
          ? {
              $set: setData,
            }
          : undefined),
        ...(unsetData
          ? {
              $unset: unsetData,
            }
          : undefined),
      },
      {
        new: true,
      },
    )
      .select(fillable)
      .lean()
      .exec();
  }

  async upsertBusinessCandidate(filter: Record<string, unknown>, setData: Record<string, unknown>) {
    const { BusinessCandidateModel, fillable } = this;

    return BusinessCandidateModel.findOneAndUpdate(filter, setData, {
      new: true,
      upsert: true,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async all({ status }: { status: string }, { offset, limit }: { offset: number; limit: number }) {
    const { CandidateModel } = this;

    return CandidateModel.aggregate([
      {
        $match: {
          ...(status ? { active: status } : undefined),
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ]);
  }
}
