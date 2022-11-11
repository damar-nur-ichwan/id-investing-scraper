import { ConsoleError } from "../../models";

export default ({ path, functionName, err, params }: ConsoleError) => {
  console.error(
    `${err}\n    path: ${path}\n    function: ${functionName}${
      params ? `\n    params: ${JSON.stringify(params)}` : ``
    }`
  );
  return;
};
