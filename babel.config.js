module.exports = api => {
  const isTest = api.env("test");
  if (isTest) {
    return {
      presets: [
        [
          "@babel/env",
          {
            targets: {
              node: "current"
            }
          }
        ]
      ]
    };
  } else {
    return {
      presets: [
        [
          "@babel/env",
          {
            debug: true,
            targets: {
              ie: 11,
              browsers: "cover 99.5%",
              esmodules: false
            },
            loose: true
          }
        ]
      ],
      plugins: []
    };
  }
};
