import { ActivityType } from '@/types/activity';
import { EMISSION_FACTORS } from '@/constants/emissionFactors';

export function calculateEmission(activityType: ActivityType, amount: number) {
  const factor = EMISSION_FACTORS[activityType];

  return amount * factor;
}
