"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ path, functionName, err, params }) => {
    return console.error(`${err}\n    path: ${path}\n    function: ${functionName}${params ? `\n    params: ${JSON.stringify(params)}` : ``}`);
};
//# sourceMappingURL=ConsoleError.js.map