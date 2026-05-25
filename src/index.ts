import { runCli } from "./cli";
import { writeError } from "./utils/output";

runCli().catch((error: Error) => {
  writeError("Error:", { message: error.message });
  process.exit(1);
});
