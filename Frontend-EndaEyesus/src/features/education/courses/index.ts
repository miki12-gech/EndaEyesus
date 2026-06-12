// Phase 1: Gubae Abew
import { mistereSelassieAbew } from "./gubae_abew/mistere_selassie";


// Phase 2: Gubae Hawaryat
import { negereBeteKristiyanHaw } from "./gubae_hawaryat/negere_bete_kristiyan";


// Phase 3: Gubae Eclessia
import { negereAbawEccl } from "./gubae_eclessia/negere_abaw";

export const courseContent = {
  GUBAE_ABEW: {
    subjects: [mistereSelassieAbew],
  },
  GUBAE_HAWARYAT: {
    subjects: [ negereBeteKristiyanHaw],
  },
  GUBAE_ECCLESIAE: {
    subjects: [ negereAbawEccl],
  },
};

export function getCourseContent(phase: string) {
  return courseContent[phase as keyof typeof courseContent] || null;
}