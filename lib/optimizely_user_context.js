/**
 * @typedef {import("@optimizely/optimizely-sdk").Client} Client
 * @typedef {import("@optimizely/optimizely-sdk").UserAttributes} UserAttributes
 * @typedef {import("@optimizely/optimizely-sdk").OptimizelyUserContext} OptimizelyUserContext
 */

export const ENV_DEV = "dev";
export const ENV_PROD = "prod";

/**
 *
 * @param {Client} client
 * @param {ENV_DEV | ENV_PROD} environment
 * @param {string} userId
 * @param {import("@optimizely/optimizely-sdk").UserAttributes?} attributes
 */
export function getUserContext(client, environment, userId, attributes) {
  const userContext = client.createUserContext(userId, attributes);
  if (environment == ENV_DEV) {
    forcedDecisions.forEach(({ flagKey, ruleKey, variationKey }) =>
      userContext.setForcedDecision({ flagKey, ruleKey }, { variationKey })
    );
  }
  return userContext;
}

// you can extract this out and provide it the way you want.
// If you want to force a variation on all rules in the flag, omit the ruleKey.
const forcedDecisions = [
  {
    flagKey: "the_flag_we_deserve",
    ruleKey: "cat_people",
    variationKey: "off",
  },
  {
    flagKey: "the_flag_we_deserve",
    variationKey: "off",
  },
  {
    flagKey: "the_flag_we_need",
    ruleKey: "the_ab_test_that_we_love",
    variationKey: "variation_2",
  },
  {
    flagKey: "the_flag_we_need",
    ruleKey: "rule_that_rules",
    variationKey: "variation_2",
  },
];
