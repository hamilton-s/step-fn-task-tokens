# Step Functions with Task Tokens

An example repo to show the use of a task token in a step function. There are 2 services, order-processing and vendor-mediator.

The purpose is to show how we can use Step Functions to call asychronous operations in other services and wait for the response before continuing.

## What the services do

- In the example the order-processing houses a step functions. In the first step the step function puts an event onto the EventBridge with a Task Token.
- This triggers the step function in the vendor-mediator service.
- This step function in the vendor-mediator updates a DynamoDB table with the user's points. It then puts an event onto the EventBridge with the task token.
- This event triggers and lambda in order-processing which sends a success or failure command to the step function to inform the step function whether or not to continue.
- The order-processing step function then proceeds to update the order-processing DynamoDB table with the status

## Prerequisites

- Do a search all for `xxx` and replace with your AWS accountId. I didn't have time to implement this in IaC so this manual method is required until then.
- Deploy the event-bridge service first with `serverless deploy --aws-profile <profile>`
- Deploy order-processing and vendor-mediator with `serverless deploy --aws-profile <profile>`
