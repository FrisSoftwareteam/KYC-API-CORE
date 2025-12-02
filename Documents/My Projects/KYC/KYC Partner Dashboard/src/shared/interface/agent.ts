import { ICandidate } from './candidate';
import { IUser } from './user';

export interface IAgent {
  _id: string;
  status: string;
  onlineStatus: string;
  realtimeStatus: string;
  eventId: string;
  imageUrl: string;
  createdAt: string;
  state?: string;
  user: IUser;
  partner: {
    _id: string;
    country: any;
  };
  wallet: {
    outstanding: number;
    totalPaidOut: number;
    withrawable: number;
    formatted: {
      outstanding: string;
      totalPaidOut: string;
      withrawable: string;
    };
  };
}

export interface IAgentVerification {
  position: {
    latitude: number;
    longitude: number;
  };
  submissionLocation: {
    latitude: number;
    longitude: number;
  };
  category: string;
  candidate: ICandidate;
  formatAddress: string;
  details: {
    buildingName: string;
    buildingNumber: string;
    subStreet: string;
    street: string;
    landmark: string;
    state: string;
    country: string;
    lga: string;
  };
  status: string;
  submittedAt: string;
  notes: Array<string>;
  isFlagged: boolean;
  signature: string;
  images: Array<string>;
  createdAt: string;
  _id: string;
  googleMapUrl: string;
  agentLocationGoogleMapUrl: string;
  distanceBetweenLocation: number;
  addressGoogleMapUrl: string;
  cost: number;
  agentReports: {
    gatePresent: boolean;
    buildingColor: string;
    buildingType: string;
    closestLandmark: string;
    gateColor: string;
    audioUrl: string;
    videoUrl: string;
  };
  agent: IAgent;
  task?: string;
  timelines: {
    acceptedAt: string;
    completedAt: string;
  };
}
