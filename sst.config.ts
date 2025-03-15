/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "fluffy-memory",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "wang220",
        },
      },
    };
  },
  async run() {
    new sst.aws.Remix("splithebill");
  },
});
