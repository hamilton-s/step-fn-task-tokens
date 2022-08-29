import {
  PutEventsCommand,
  EventBridgeClient,
} from "@aws-sdk/client-eventbridge";

export const createEventCommand = (status, taskToken) => {
  return new PutEventsCommand({
    Entries: [
      {
        Detail: JSON.stringify({
          metadata: {
            status,
            domain: "LEGO-LOYALTY",
            service: "service-loyalty-rewards",
            category: "task-status",
            type: "sendRewardsToDB",
          },
          ...(taskToken && { TaskToken: taskToken }),
        }),
        DetailType: "event",
        EventBusName:
          "arn:aws:events:eu-west-2:xxx:event-bus/loyalty-event-bus",
        Source: "sendRewardsToDB",
      },
    ],
  });
};

const eventbridge = new EventBridgeClient({
  region: "eu-west-2",
});

const handler = async (event) => {
  console.log({ event });
  const { TaskToken } = event.detail;
  const successfulEvent = createEventCommand("SUCCESS", TaskToken);
  try {
    await eventbridge.send(successfulEvent);
  } catch (error) {
    throw new Error(`failed ${JSON.stringify(error)}`);
  }
};

export default handler;
