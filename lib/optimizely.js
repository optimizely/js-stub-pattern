// npm install
// then run node lib/optimizely.js

// Add your unique env check here
const environment = "development";

import optimizelyClient from "@optimizely/optimizely-sdk";
import optimizelyStubs from "../config/optimizelyStubs.js";

class Optimizely {
  constructor(initParams) {
    this.optimizelyClient = optimizelyClient.createInstance({
      initParams,
    });
    this.stubs = optimizelyStubs;
  }
  createUserContext(userId, userAttributes) {
    if (environment != "production") {
      return new OptimizelyStubUser(this.stubs);
    } else {
      return this.optimizelyClient.createUserContext(userId, userAttributes);
    }
  }
}

// This only stubs `.decide`, but can be extended to include other attributes
// as required
class OptimizelyStubUser {
  constructor(stubs) {
    this.stubs = stubs;
  }
  decide(featureKey) {
    if (this.stubs) {
      return this.stubs[featureKey];
    } else {
      return this.optimizelyClient.decide(featureKey);
    }
  }
}

const opti = new Optimizely({ sdkKey: "<YOUR_SDK_KEY>" });
console.log(opti.createUserContext("123", {}).decide("videoPlayer"));

// Returns when environment != "production"
// {
//     variationKey: 'videoPlayerV1',
//     enabled: true,
//     variables: { autoPlay: true },
//     ruleKey: 'someRuleKey',
//     flagKey: 'someFlagKey'
//   }
