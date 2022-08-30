# order-processing

This service houses a step function which updates a DynamoDB table after recieving the go ahead from 'third-party' service `vendor-mediator`

In the first step it passed an event onto the EventBridge with a Task Token and halts until it receives a response.
