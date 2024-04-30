import { challengeSolutionRepository } from "@/core/infrastructure/repositories/challenge.solution.repository";
import { ChallengeSolutionTransformer } from "@/core/infrastructure/transformers/challenge-solution-transformer";
import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";
import type { ChallengeSolution } from "@/core/domain/entities/challenge.entity";

interface IChallengeSolutionService {
  createChallengeSolution: (
    data: ChallengeSolution,
  ) => Promise<ChallengeSolutionDTO>;
  findByChallengeSlug: (slug: string) => Promise<ChallengeSolutionDTO[]>;
  findByChallengeId: (challengeId: string) => Promise<ChallengeSolutionDTO[]>;
  hasUserSubmittedSolution: (userId: string, slug: string) => Promise<boolean>;
}

export const challengeSolutionService: IChallengeSolutionService = {
  createChallengeSolution: async (data) => {
    return challengeSolutionRepository
      .createChallengeSolution(data)
      .then((challengeSolution) => {
        return ChallengeSolutionTransformer.toEntity(challengeSolution);
      });
  },

  findByChallengeSlug: async (slug) => {
    return challengeSolutionRepository
      .findByChallengeSlug(slug)
      .then((challengeSolutions) => {
        return challengeSolutions?.map(
          (challengeSolution: ChallengeSolution) => {
            return ChallengeSolutionTransformer.toEntity(challengeSolution);
          },
        );
      });
  },

  findByChallengeId: async (challengeId) => {
    return challengeSolutionRepository
      .findByChallengeId(challengeId)
      .then((challengeSolutions) => {
        return challengeSolutions?.map(
          (challengeSolution: ChallengeSolution) => {
            return ChallengeSolutionTransformer.toEntity(challengeSolution);
          },
        );
      });
  },

  hasUserSubmittedSolution: async (userId, slug) => {
    return challengeSolutionRepository.hasUserSubmittedSolution(userId, slug);
  },
};