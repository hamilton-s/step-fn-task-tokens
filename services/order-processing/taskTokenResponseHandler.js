import {
  SendTaskSuccessCommand,
  SFNClient,
  SendTaskFailureCommand,
} from "@aws-sdk/client-sfn";

const sfnClient = new SFNClient({ region: "eu-west-2" });

const handler = async (event) => {
  const {
    TaskToken,
    metadata: { status },
  } = event.detail;

  try {
    if (status === "SUCCESS") {
      const successCommand = new SendTaskSuccessCommand({
        taskToken: TaskToken,
        output: JSON.stringify({
          result: "SUCCESS",
        }),
      });
      await sfnClient.send(successCommand);
    }
    if (status === "FAILURE") {
      const { error } = event.detail.data;
      const failureCommand = new SendTaskFailureCommand({
        taskToken: TaskToken,
        cause: error?.description,
        error: error?.error,
      });
      await sfnClient.send(failureCommand);
      persistentLogger.info(
        "Failure status received. Order processing failed."
      );
    }
  } catch (error) {
    console.log({ error });
  }
};

export default handler;
