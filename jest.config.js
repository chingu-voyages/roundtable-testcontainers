/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    preset: "ts-jest",
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  };
};
