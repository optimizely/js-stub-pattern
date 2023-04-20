// I'm only stubbing commonly used key/values on our OptimizelyDecision object
// See https://docs.developers.optimizely.com/feature-experimentation/docs/optimizelydecision-javascript
// for full OptimizelyDecision interface
const optimizelyStubs = {
  videoPlayer: {
    variationKey: "videoPlayerV1",
    enabled: true,
    variables: {
      autoPlay: true,
    },
    ruleKey: "someRuleKey",
    flagKey: "someFlagKey",
  },
};

export default optimizelyStubs;
