const path = require("path");
module.exports = {
    root: true,
    extends: ["@gregros/eslint-config"],
    parserOptions: {
        project: [
            path.join(__dirname, "src", "tsconfig.cjs.json"),

            path.join(__dirname, "test", "tsconfig.cjs.json")

        ]
    }
};
