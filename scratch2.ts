import { NOTIFICATION_DATA } from "./src/lib/notificationData.ts";

const dayOfYear = 267; // approx Sept 24
const langData = NOTIFICATION_DATA.en;
const templates = langData.morningTemplates;

const template = templates[dayOfYear % templates.length];
const celestial = langData.celestials[dayOfYear % langData.celestials.length];
const adjective = langData.adjectives[dayOfYear % langData.adjectives.length];
const action = langData.actions[dayOfYear % langData.actions.length];

const message = template
  .replace("{celestial}", celestial)
  .replace("{adjective}", adjective)
  .replace("{action}", action);

console.log(message);
