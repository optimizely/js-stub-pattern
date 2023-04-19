// npm install
// then run node lib/optimizely.js

import { createInstance, OptimizelyDecideOption } from "@optimizely/optimizely-sdk";
import { getUserContext, ENV_PROD, ENV_DEV } from "./optimizely_user_context.js";

function prettyPrintDecision(decision) {
  console.log("User Id        : ", decision.userContext.getUserId());
  console.log("User Attrs     : ", decision.userContext.getAttributes());
  console.log("");
  console.log("Flags Key      : ", decision.flagKey);
  console.log("Rule Key       : ", decision.ruleKey);
  console.log("Variation Key  : ", decision.variationKey);
  console.log("Enabled        : ", decision.enabled);
  
}

const environment = ENV_DEV;

let userId = "user1";
let attributes = null;

const flag = "the_flag_we_deserve";
const client = createInstance({
  sdkKey: "AC5f6x2XVnmyJUbsL7GAE"
});

client.onReady().then(() => {
  const userContext = getUserContext(client, environment, userId, attributes);
  
  // remove this line. This is just for showing you that forced decisions are stored correctly under OptimizelyUserContext instance
  console.log(userContext.forcedDecisionsMap);

  const decision = userContext.decide(flag, [OptimizelyDecideOption.INCLUDE_REASONS]);
  prettyPrintDecision(decision);
});
