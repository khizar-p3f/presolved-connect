export const initiateChatSession = async (connect) => {
    connect.ChatSession.setGlobalConfig({
        loggerConfig: { // optional, the logging configuration. If omitted, no logging occurs
            // You can provide your own logger here, otherwise this property is optional
            customizedLogger: {
                debug: (msg) => console.debug(msg), // REQUIRED, can be any function
                info: (msg) => console.info(msg), // REQUIRED, can be any function
                warn: (msg) => console.warn(msg), // REQUIRED, can be any function
                error: (msg) => console.error(msg) // REQUIRED, can be any function
            },
            // There are five levels available - DEBUG, INFO, WARN, ERROR, ADVANCED_LOG. Default is INFO
            level: connect.LogLevel.INFO,
            // Choose if you want to use the default logger
            useDefaultLogger: true
        },
        region: "us-east-1", // optional, defaults to: "us-west-2"
        //Control switch for enabling/disabling message-receipts (Read/Delivered) for messages
        //message receipts use sendEvent API for sending Read/Delivered events https://docs.aws.amazon.com/connect-participant/latest/APIReference/API_SendEvent.html
        features: {
            messageReceipts: {
                shouldSendMessageReceipts: false, // by default messageReceipts is enabled
                throttleTime: 5000 //default throttle time - time to wait before sending Read/Delivered receipt.
            }
        }
    });
}