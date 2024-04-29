import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/views//components/ui/card";
import { ButtonLink } from "@/core/views//components/ui/button-link";
import { URL } from "@/config/constants";

type Props = {
  challenges: ChallengeDTO[] | undefined;
};

export const ChallengesList = ({ challenges }: Props) => {
  return (
    <ul role="list" className="space-y-4">
      {challenges?.map((challenge) => (
        <li key={challenge.id}>
          <Card>
            <CardHeader>
              <CardTitle>{challenge.name}</CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>

            <CardFooter>
              <ButtonLink href={`${URL.DASHBOARD_CHALLENGES}/${challenge.id}`}>
                Edit
              </ButtonLink>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
};
