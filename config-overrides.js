const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  (config, env) => {
    config = rewireReactHotLoader(config, env);
    return config;
  },
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#ff54ae",
      "@font-family": "'Open Sans', sans-serif"
    }
  })
);
