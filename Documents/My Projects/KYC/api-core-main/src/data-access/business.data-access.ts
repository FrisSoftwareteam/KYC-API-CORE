import * as mongoose from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { BadRequestError } from '../errors/api.error';
import { UserType, COUNTRY_CODES_NAMES_LOOKUP } from '../constants';
import { UserStatus } from '../models/user.model';

const {
  Types: { ObjectId },
} = mongoose;

export default class BusinessDataAccess {
  private readonly logger;
  private readonly fillable;
  private readonly BusinessModel;
  private readonly UserModel;
  private readonly InviteModel;
  private readonly mongooseConnection;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ logger, BusinessModel, InviteModel, UserModel, mongooseConnection }: any) {
    this.logger = logger;
    this.fillable = [
      'name',
      'email',
      'cacNumber',
      'directorNin',
      'address',
      'countryCode',
      'active',
      'user',
      'users',
      'tat',
      'wallet',
      'createdAt',
    ].join(' ');
    this.BusinessModel = BusinessModel;
    this.InviteModel = InviteModel;
    this.UserModel = UserModel;
    this.mongooseConnection = mongooseConnection;
  }

  async inviteBusiness(payload: Record<string, unknown>, inviteObject: Record<string, unknown>) {
    const { logger, InviteModel, BusinessModel, mongooseConnection } = this;

    const session = await mongooseConnection.startSession();

    session.startTransaction();

    try {
      const [business] = await BusinessModel.create([payload], { session });

      const [invite] = await InviteModel.create(
        [
          {
            email: payload.email,
            requestPayload: payload,
            inviteToken: inviteObject.inviteToken,
            inviteTokenExpiry: inviteObject.inviteTokenExpiry,
            type: UserType.BUSINESS,
            modelId: business._id,
          },
        ],
        session,
      );

      await session.commitTransaction();

      return { ...business._doc, inviteId: invite._id };
    } catch (error) {
      logger.error('abort transaction', error);
      await session.abortTransaction();

      throw new BadRequestError(error as string);
    } finally {
      session.endSession();
    }
  }

  async inviteBusinessUser(
    payload: Record<string, unknown>,
    inviteObject: Record<string, unknown>,
  ) {
    const { logger, InviteModel, BusinessModel, mongooseConnection } = this;

    const session = await mongooseConnection.startSession();

    session.startTransaction();

    try {
      const business = await BusinessModel.find([payload], { session });

      const invite = await InviteModel.create(
        [
          {
            email: payload.email,
            requestPayload: payload,
            inviteToken: inviteObject.inviteToken,
            inviteTokenExpiry: inviteObject.inviteTokenExpiry,
            type: UserType.BUSINESS,
            modelId: business[0]._id,
          },
        ],
        session,
      );

      await session.commitTransaction();

      return { ...business[0]._doc, inviteId: invite[0]._id };
    } catch (error) {
      logger.error('abort transaction', error);
      await session.abortTransaction();

      throw new BadRequestError(error as string);
    } finally {
      session.endSession();
    }
  }

  async completeBusinessSignup(payload: Record<string, unknown>) {
    const { logger, InviteModel, BusinessModel, UserModel, mongooseConnection } = this;

    const session = await mongooseConnection.startSession();

    session.startTransaction();

    try {
      const invite = await InviteModel.findOne({
        inviteToken: payload.inviteToken,
        inviteTokenExpiry: {
          $gte: new Date(),
        },
      });

      if (!invite) {
        throw new BadRequestError('Invalid Invite Token', {
          code: 'INVALID_INVITE_TOKEN',
        });
      }

      const user = await UserModel.create(
        [
          {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phoneNumber: payload.phoneNumber,
            password: payload.password,
            userType: UserType.BUSINESS,
            country: {
              code: invite.requestPayload.get('countryCode'),
              name: COUNTRY_CODES_NAMES_LOOKUP.get(invite.requestPayload.get('countryCode')),
            },
          },
        ],
        { session },
      );

      await BusinessModel.findByIdAndUpdate(
        invite.modelId,
        {
          $set: {
            user: user[0]._id,
          },
          $addToSet: {
            users: {
              user: user[0]?._id,
              role: payload.role,
              status: UserStatus.ACTIVE,
            },
          },
        },
        { new: true },
        { session },
      );

      await InviteModel.findByIdAndDelete(invite._id);

      await session.commitTransaction();

      return { ...user[0]._doc };
    } catch (error) {
      logger.error('abort transaction', error);
      await session.abortTransaction();

      throw new BadRequestError(error as string);
    } finally {
      session.endSession();
    }
  }

  async findUserBusinessByUserId(userId: string) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findOne({
      $or: [
        { user: new ObjectId(userId) },
        { 'users.user': new ObjectId(userId), 'users.status': UserStatus.ACTIVE },
      ],
    })
      .populate({
        path: 'user',
      })
      .select(fillable)
      .lean()
      .exec();
  }

  async findBusinessById(id: string) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findById(id)
      .select(fillable)
      .populate('user')
      .populate('users.user')
      .populate('users.role')
      .lean()
      .exec();
  }

  async updateBusinessById(
    id: string,
    setData: Record<string, unknown>,
    unsetData: Record<string, unknown>,
  ) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findByIdAndUpdate(
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

  async all(
    {
      status,
    }: {
      status: string;
    },
    { offset, limit }: { offset: number; limit: number },
  ) {
    const { BusinessModel } = this;

    return BusinessModel.aggregate([
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

  async pushAdminUsers(id: string, setData: Record<string, unknown>) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findByIdAndUpdate(
      id,
      {
        ...(setData
          ? {
              $push: setData,
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

  async findBusinessByBusinessUserId(businessUserId: string) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findOne({
      'users._id': businessUserId,
    })
      .select(fillable)
      .lean()
      .exec();
  }

  async findByApiKey(apiKey: string) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findOne({
      'api.key': apiKey,
    })
      .select(fillable)
      .populate('user')
      .lean()
      .exec();
  }

  async updateUserStatus(businessId: string, businessUserId: string) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findOneAndUpdate(
      {
        _id: businessId,
        'users._id': businessUserId,
      },
      {
        $set: {
          'users.$.status': UserStatus.ACTIVE,
        },
      },
    )
      .select(fillable)
      .lean()
      .exec();
  }

  async updateBusinessUserRole(businessId: string, userId: string, role: string) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findOneAndUpdate(
      {
        _id: businessId,
        'users.user': userId,
      },
      {
        $set: {
          'users.$.role': role,
        },
      },
    )
      .select(fillable)
      .lean()
      .exec();
  }

  async suspendBusinessUser(businessId: string, userId: string) {
    const { BusinessModel } = this;

    return BusinessModel.findOneAndUpdate(
      {
        _id: businessId,
        'users.user': userId,
      },
      {
        $set: {
          'users.$.status': UserStatus.SUSPENDED,
        },
      },
    );
  }

  async restoreBusinessUser(businessId: string, userId: string) {
    const { BusinessModel } = this;

    return BusinessModel.findOneAndUpdate(
      {
        _id: businessId,
        'users.user': userId,
      },
      {
        $set: {
          'users.$.status': UserStatus.ACTIVE,
        },
      },
    );
  }

  async disableBusiness(businessId: string) {
    const { BusinessModel } = this;

    return BusinessModel.findOneAndUpdate(
      {
        _id: businessId,
      },
      {
        $set: {
          active: false,
        },
      },
    );
  }

  async restoreBusiness(businessId: string) {
    const { BusinessModel } = this;

    return BusinessModel.findOneAndUpdate(
      {
        _id: businessId,
      },
      {
        $set: {
          active: true,
        },
      },
    );
  }

  countAllBusinesses(query: Record<string, unknown>) {
    const { BusinessModel } = this;

    const { customEndDate, customStartDate } = query;

    return BusinessModel.countDocuments({
      ...(customEndDate && customStartDate
        ? {
            createdAt: {
              $gte: startOfDay(String(customStartDate)),
              $lte: endOfDay(String(customEndDate)),
            },
          }
        : undefined),
    });
  }

  async updateBusinessWallet(businessId: string, amount: number) {
    const { BusinessModel, fillable } = this;

    return BusinessModel.findByIdAndUpdate(businessId, {
      $inc: {
        'wallet.bookBalance': +amount,
        'wallet.balance': +amount,
      },
    })
      .select(fillable)
      .lean()
      .exec();
  }
}
