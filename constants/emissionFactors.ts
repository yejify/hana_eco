import { ActivityType } from '@/types/activity';

export const EMISSION_FACTORS: Record<ActivityType, number> = {
  electricity: 0.456,
  material: 2.3,
  transport: 0.35,
  waste: 1.2,
};
