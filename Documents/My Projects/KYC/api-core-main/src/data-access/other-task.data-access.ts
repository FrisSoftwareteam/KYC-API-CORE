import { Types } from 'mongoose';
import { endOfDay, subDays, startOfDay } from 'date-fns';
import { AddressStatusEnum, AdminApprovalStatusEnum } from '../models/types/address.type';

const { ObjectId } = Types;
export default class OtherTaskDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly OtherTaskModel;

  constructor({
    logger,
    OtherTaskModel, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) {
    this.logger = logger;
    this.fillable = [
      'task',
      'type',
      'status',
      'subType',
      'business',
      'candidate',
      'requestPayload',
      'responsePayload',
    ].join(' ');
    this.OtherTaskModel = OtherTaskModel;
  }

  async findOtherTaskById(id: string) {
    const { OtherTaskModel, fillable } = this;

    return OtherTaskModel.findById(id).select(fillable).populate('candidate').lean().exec();
  }

  async findOtherTaskByIdAndTask(id: string) {
    const { OtherTaskModel, fillable } = this;

    return OtherTaskModel.findById(id)
      .select(fillable)
      .populate({
        path: 'candidate',
      })
      .populate({
        path: 'task',
        populate: {
          path: 'business',
        },
      })
      .lean()
      .exec();
  }

  async findAllDataOtherTaskById(id: string) {
    const { OtherTaskModel, fillable } = this;

    return OtherTaskModel.findById(id)
      .select(fillable)
      .populate('candidate')
      .populate({
        path: 'agent',
        populate: {
          path: 'user',
        },
      })
      .lean()
      .exec();
  }

  async findOtherTaskByIds(ids: string[]) {
    const { OtherTaskModel, fillable } = this;

    return OtherTaskModel.find({
      _id: { $in: ids },
    })
      .select(fillable)
      .populate('candidate')
      .populate({
        path: 'agent',
        populate: {
          path: 'user',
        },
      })
      .lean()
      .exec();
  }
  async updateOtherTaskById(
    id: string,
    setData: Record<string, unknown>,
    unsetData?: Record<string, unknown>,
  ) {
    const { OtherTaskModel, fillable } = this;

    return OtherTaskModel.findByIdAndUpdate(
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

  async updateOtherTaskByIds(
    ids: string[],
    setData: Record<string, unknown>,
    unsetData?: Record<string, unknown>,
  ) {
    const { OtherTaskModel } = this;

    return OtherTaskModel.updateMany(
      { _id: { $in: ids } },
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
        multi: true,
      },
    )
      .lean()
      .exec();
  }

  async updateOtherTask(
    filter: Record<string, unknown>,
    setData: Record<string, unknown>,
    unsetData?: Record<string, unknown>,
  ) {
    const { OtherTaskModel, fillable } = this;

    return OtherTaskModel.findOneAndUpdate(
      filter,
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

  async allVerifications(
    {
      status,
      reviewStatus,
      type,
      search,
      customStartDate,
      customEndDate,
      phoneNumber,
      email,
      state,
      tat,
      underTat,
    }: {
      period: number;
      status: string;
      reviewStatus: string;
      type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
      phoneNumber: string;
      email: string;
      state: string;
      tat: string;
      underTat: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { OtherTaskModel } = this;

    // const tatDate = addHours(Date.now(), 24);

    return OtherTaskModel.aggregate([
      {
        $lookup: {
          from: 'candidates',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        },
      },
      {
        $lookup: {
          from: 'agents',
          localField: 'agent',
          foreignField: '_id',
          as: 'agent',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
          ],
        },
      },
      {
        $match: {
          ...(search
            ? {
                $or: [
                  { 'agent.user.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'agent.user.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          ...(type
            ? {
                category: type,
              }
            : undefined),
          ...(email ? { 'agent.user.email': email } : undefined),
          ...(phoneNumber ? { 'agent.user.phoneNumber.number': phoneNumber } : undefined),
          ...(!reviewStatus && status && !Array.isArray(status) ? { status } : undefined),
          ...(!reviewStatus && status && Array.isArray(status)
            ? { status: { $in: status } }
            : undefined),
          ...(reviewStatus
            ? {
                'approver.status': { $in: reviewStatus },
                status: { $in: [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED] },
              }
            : undefined),
          ...(tat ? { createdAt: { $in: reviewStatus } } : undefined),
          ...(underTat && underTat === 'yes'
            ? { submissionExpectedAt: { $gte: new Date() }, status: AddressStatusEnum.CREATED }
            : undefined),
          ...(underTat && underTat === 'no'
            ? { submissionExpectedAt: { $lte: new Date() }, status: AddressStatusEnum.CREATED }
            : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
          ...(state
            ? {
                'details.state': state.split(' ')[0],
              }
            : undefined),
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'task',
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

  async exportBusinessVerifications(
    businessId: string,
    {
      status,
      // type,
      search,
      customStartDate,
      customEndDate,
      phoneNumber,
      email,
      state,
    }: {
      period: number;
      status: string;
      // type: string;
      search: string;
      customStartDate: string;
      customEndDate: string;
      phoneNumber: string;
      email: string;
      state: string;
    },
  ) {
    const { OtherTaskModel } = this;

    return OtherTaskModel.aggregate([
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
                  { 'agent.user.firstName': { $regex: new RegExp(search, 'i') } },
                  { 'agent.user.lastName': { $regex: new RegExp(search, 'i') } },
                ],
              }
            : undefined),
          // ...(type
          //   ? {
          //     category: type,
          //   }
          //   : undefined),
          ...(email ? { 'agent.user.email': email } : undefined),
          ...(phoneNumber ? { 'agent.user.phoneNumber.number': phoneNumber } : undefined),
          ...(status && !Array.isArray(status) ? { status } : undefined),
          ...(status && Array.isArray(status) ? { status: { $in: status } } : undefined),
          ...(customStartDate && customEndDate
            ? {
                createdAt: {
                  $gte: new Date(customStartDate),
                  $lte: endOfDay(new Date(customEndDate)),
                },
              }
            : undefined),
          ...(state
            ? {
                'details.state': state.split(' ')[0],
              }
            : undefined),
        },
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'task',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
  }

  async adminVerificationMetrics({
    period,
    customStartDate,
    customEndDate,
  }: {
    period: number;
    customEndDate: string;
    customStartDate: string;
  }) {
    const { OtherTaskModel } = this;

    const stoppedDate = subDays(new Date(), period);
    const startDate = startOfDay(stoppedDate);
    const endDate = endOfDay(stoppedDate);

    return OtherTaskModel.aggregate([
      {
        $match: {
          ...(period
            ? {
                createdAt: {
                  $gte: startDate,
                  $lte: endDate,
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
        $group: {
          _id: null,
          totalVerifications: { $sum: 1 },
          totalCompletedVerifications: {
            $sum: {
              $cond: {
                if: {
                  $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalVerificationInProgress: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.INPROGRESS],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalPendingVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    {
                      $not: {
                        $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                      },
                    },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalUnassignVerification: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.CREATED],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalAssignedVerification: {
            $sum: {
              $cond: {
                if: {
                  $in: ['$status', [AddressStatusEnum.ACCEPTED]],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalVerifications: 1,
          totalCompletedVerifications: 1,
          totalVerificationInProgress: 1,
          totalPendingVerification: 1,
          totalUnassignVerification: 1,
          totalAssignedVerification: 1,
        },
      },
    ]);
  }

  async adminOtherTypeVerificationMetrics() {
    const { OtherTaskModel } = this;

    // const stoppedDate = subDays(new Date(), period);
    // const startDate = startOfDay(stoppedDate);
    // const endDate = endOfDay(stoppedDate);

    return OtherTaskModel.aggregate([
      // {
      //   $match: {
      //     ...(period
      //       ? {
      //         createdAt: {
      //           $gte: startDate,
      //           $lte: endDate,
      //         },
      //       }
      //       : undefined),
      //     ...(customStartDate && customEndDate
      //       ? {
      //         createdAt: {
      //           $gte: new Date(customStartDate),
      //           $lte: endOfDay(new Date(customEndDate)),
      //         },
      //       }
      //       : undefined),
      //   },
      // },
      {
        $group: {
          _id: null,
          totalVerifications: { $sum: 1 },
          totalApprovedVerifications: {
            $sum: {
              $cond: {
                if: {
                  $in: [
                    '$approver.status',
                    [AdminApprovalStatusEnum.APPROVED, AdminApprovalStatusEnum.DECLINED],
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalPendingVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    {
                      $in: ['$approver.status', [AdminApprovalStatusEnum.REVIEW]],
                    },
                    {
                      $in: ['$status', [AddressStatusEnum.VERIFIED, AddressStatusEnum.FAILED]],
                    },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalUnderTATVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ['$status', AddressStatusEnum.CREATED] },
                    { $gte: ['$submissionExpectedAt', new Date()] }, // Less than condition
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalOverTATVerification: {
            $sum: {
              $cond: {
                if: {
                  $and: [
                    { $eq: ['$status', AddressStatusEnum.CREATED] },
                    { $lte: ['$submissionExpectedAt', new Date()] }, // Less than condition
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
          totalRejectedVerification: {
            $sum: {
              $cond: {
                if: {
                  $eq: ['$status', AddressStatusEnum.REJECTED],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalVerifications: 1,
          totalApprovedVerifications: 1,
          totalPendingVerification: 1,
          totalUnderTATVerification: 1,
          totalOverTATVerification: 1,
          totalRejectedVerification: 1,
        },
      },
    ]);
  }

  async getOtherTaskById(id: string) {
    const { OtherTaskModel } = this;

    return OtherTaskModel.findById(id);
  }

  async fetchTaskForAllReassign({ state, tasks }: { state: string; tasks: string[] }) {
    const { OtherTaskModel } = this;

    return OtherTaskModel.find({
      agent: null,
      ...(state
        ? {
            'details.state': state.split(' ')[0],
          }
        : undefined),
      ...(tasks?.length
        ? {
            _id: {
              $in: tasks.map((task: string) => new ObjectId(task)),
            },
          }
        : undefined),
    })
      .populate('candidate')
      .lean()
      .exec();
  }
}
