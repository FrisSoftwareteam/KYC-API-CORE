import { Types } from 'mongoose';
import { endOfDay, subDays, startOfDay } from 'date-fns';
const { ObjectId } = Types;

export default class BusinessCandidateDataAccess {
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

  async fetchLimitedCandidates(businessId: string, limit: number) {
    const { BusinessCandidateModel } = this;

    return BusinessCandidateModel.aggregate([
      {
        $match: {
          business: businessId,
        },
      },
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $unwind: {
          path: '$candidate',
        },
      },
      {
        $limit: limit,
      },
    ]);
  }

  async fetchCandidateBusinesses(candidateId: string) {
    const { BusinessCandidateModel } = this;

    return BusinessCandidateModel.aggregate([
      {
        $match: {
          candidate: new ObjectId(candidateId),
        },
      },
      {
        $lookup: {
          from: 'businesses',
          localField: 'business',
          foreignField: '_id',
          as: 'business',
        },
      },
      {
        $unwind: {
          path: '$business',
        },
      },
    ]);
  }

  async fetchBusinessCandidates(businessId: string) {
    const { BusinessCandidateModel } = this;

    return BusinessCandidateModel.aggregate([
      {
        $match: {
          business: businessId,
        },
      },
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $unwind: {
          path: '$candidate',
        },
      },
    ]);
  }

  async allPaginatedBusinessCandidates(
    businessId: string,
    {
      period,
      status,
      type,
      search,
      customStartDate,
      customEndDate,
    }: {
      period: number;
      status: string;
      type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { BusinessCandidateModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);

    return BusinessCandidateModel.aggregate([
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $match: {
          business: businessId,
          ...(search
            ? {
                $or: [
                  { 'candidate.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'candidate.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          ...(type
            ? {
                verifications: type,
              }
            : undefined),
          ...(status ? { status } : undefined),
          ...(period && (!customStartDate || !customEndDate)
            ? {
                createdAt: {
                  $gte: startDate,
                  $lte: new Date(),
                },
              }
            : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ]);
  }

  async allAdminCandidates(
    {
      period,
      status,
      type,
      search,
      customStartDate,
      customEndDate,
    }: {
      period: number;
      status: string;
      type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { BusinessCandidateModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);

    return BusinessCandidateModel.aggregate([
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $match: {
          ...(search
            ? {
                $or: [
                  { 'candidate.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'candidate.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          ...(type
            ? {
                verifications: type,
              }
            : undefined),
          ...(status ? { status } : undefined),
          ...(period && (!customStartDate || !customEndDate)
            ? {
                createdAt: {
                  $gte: startDate,
                  $lte: new Date(),
                },
              }
            : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }, { $addFields: { page: 1 } }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ]);
  }

  async fetchBusinessCandidateById(businessId: string, candidateId: string) {
    const { BusinessCandidateModel } = this;

    return BusinessCandidateModel.findOne({
      business: businessId,
      candidate: candidateId,
    })
      .populate('candidate')
      .lean()
      .exec();
  }

  async countBusinessCandidates(businessId: string) {
    const { BusinessCandidateModel } = this;

    return BusinessCandidateModel.countDocuments({
      business: businessId,
    });
  }
}
