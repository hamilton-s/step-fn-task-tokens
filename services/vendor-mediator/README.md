## vendor-mediator

This service houses a step function which updates a 'third-party' DynamoDB table with rewards points. The step function then puts and event onto the EventBridge to allow order-processing to continue with its step function.
