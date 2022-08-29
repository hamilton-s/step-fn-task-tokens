import { SendTaskSuccessCommand, SFNClient } from "@aws-sdk/client-sfn";

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
  } catch (error) {
    console.log({ error });
  }
};

export default handler;
