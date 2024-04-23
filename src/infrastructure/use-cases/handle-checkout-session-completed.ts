import type Stripe from "stripe";
import { retrieveSubscription } from "@/infrastructure/third-party-services/stripe.service";
import { createSubscription } from "@/infrastructure/data-access/subscription";
import { addMonthlySubscriptionCredit } from "@/infrastructure/use-cases/add-monthly-subscription-credit";
import { sendSubscriptionEmailConfirmation } from "@/infrastructure/third-party-services/resend.service";

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  if (!session.subscription || !session.metadata?.userID) {
    throw new Error("Missing required session data");
  }

  if (!session.customer_email) {
    throw new Error("Missing required customer email");
  }

  const subscription = await retrieveSubscription(
    session.subscription as string,
  );

  await createSubscription(session.metadata.userID, subscription.id);
  await addMonthlySubscriptionCredit(session.metadata.userID);
  await sendSubscriptionEmailConfirmation(session.customer_email);
}