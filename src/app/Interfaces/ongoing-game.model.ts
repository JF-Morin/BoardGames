import { User } from './user.model';

export interface OngoingGame{
    libraryGameID: any,
    players: any[],
    gameLeaderID: string,
    start: any,
    end: any,
    createdAt: any,
    gameSpecific: any,
    gameParameters: any,
    maxAcceptedPlayers: number,
}