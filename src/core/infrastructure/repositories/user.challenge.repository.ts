import { db } from "@/config/server/db";
import type { IUserChallengeRepository } from "@/core/domain/repositories/user.challenge.repository";

export const userChallengeRepository: IUserChallengeRepository = {
  startChallenge: async (userId: string, challengeId: string) => {
    return db.userChallenge.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        challenge: {
          connect: {
            id: challengeId,
          },
        },
      },
    });
  },

  hasUserStartedChallenge: async (
    userId: string,
    challengeId: string,
  ): Promise<boolean> => {
    const userChallenge = await db.userChallenge.findFirst({
      where: {
        userId,
        challengeId,
      },
    });

    return !!userChallenge;
  },
};