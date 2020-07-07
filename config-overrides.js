const { override, addLessLoader, fixBabelImports } = require("customize-cra");

module.exports = override(
  //按需加载
  fixBabelImports("antd", { libraryDirectory: "es", style: "css" }),
  //配置less preprocessor
  addLessLoader({ lessOptions: { javascriptEnabled: true } })
);
