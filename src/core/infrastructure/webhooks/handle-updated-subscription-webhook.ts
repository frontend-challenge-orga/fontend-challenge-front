import { mailingService } from "@/core/infrastructure/services/resend.service";
import { subscriptionRepository } from "@/core/infrastructure/repositories/subscription.repository";
import { addMonthlySubscriptionCredit } from "@/core/infrastructure/use-cases/add-monthly-subscription-credit";
import type { SubscriptionDurationType } from "@/config/types";
import type Stripe from "stripe";

export async function handleUpdatedSubscriptionWebhook(
  subscription: Stripe.Subscription,
) {
  if (!subscription.metadata) {
    throw new Error("Missing required subscription metadata");
  }

  if (!subscription.metadata.userID) {
    throw new Error("Missing required user ID");
  }

  if (!subscription.metadata.customer_email) {
    throw new Error("Missing required customer email");
  }

  await subscriptionRepository.store(
    subscription.metadata.userID,
    subscription.id,
    subscription.metadata.subscription_duration as SubscriptionDurationType,
    new Date(subscription.current_period_end * 1000),
  );

  await addMonthlySubscriptionCredit(subscription.metadata.userID);

  await mailingService(
    subscription.metadata.customer_email,
  ).sendSubscriptionConfirmation();
}