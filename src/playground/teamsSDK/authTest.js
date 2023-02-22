import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from "react";

function callAPI(accessToken) {
  return fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
}

function callChatAPI(accessToken) {
  return fetch("https://graph.microsoft.com/v1.0/me/chats", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
}

//Chat with Prema
let chatID =
  "19:848c9bb7-36b9-46f1-af04-662a0c379c1b_9bed9874-24bb-469d-a45f-ad7ad74ffd39@unq.gbl.spaces";
//Chat with Venkat
let chatID2 =
  "19:0c57cef7-bce7-425b-9547-3fc9477ff9c3_848c9bb7-36b9-46f1-af04-662a0c379c1b@unq.gbl.spaces";

let sivaID = "848c9bb7-36b9-46f1-af04-662a0c379c1b";

function sendChatMessage(accessToken) {
  return fetch(`https://graph.microsoft.com/v1.0/chats/${chatID2}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: {
        contentType: "html",
        content:
          '<attachment id="74d20c7f34aa4a7fb74e2b30004247c5"></attachment>',
      },
      attachments: [
        {
          id: "74d20c7f34aa4a7fb74e2b30004247c5",
          contentType: "application/vnd.microsoft.card.thumbnail",
          contentUrl: null,
          content:
            '{\r\n  "title": "PreSolved App",\r\n  "subtitle": "<h3>Agent Siva is inviting you to a meeting</h3>",\r\n  "text": "Customer C is waiting on the line and asking for some help with a policy. Requesting you to join and help the customer. <br>\\r\\nAnd a <a href=\\"https://d36z7vqpuzrikl.cloudfront.net/meetings\\">Join Meeting</a>. <br>\\r\\nAnd below that is some buttons:",\r\n  "buttons": [\r\n    {\r\n      "type": "messageBack",\r\n      "title": "Login to Presolved",\r\n      "text": "login",\r\n      "displayText": "login",\r\n      "value": "login"\r\n    }\r\n  ]\r\n}',
          name: null,
          thumbnailUrl: null,
        },
      ],
    }),
  }).then((response) => response.json());
}

function createTeamsMeeting(accessToken) {
  const call = {
    "@odata.type": "#microsoft.graph.call",
    callbackUri: "https://bot.contoso.com/callback",
    targets: [
      {
        "@odata.type": "#microsoft.graph.invitationParticipantInfo",
        identity: {
          "@odata.type": "#microsoft.graph.identitySet",
          user: {
            "@odata.type": "#microsoft.graph.identity",
            displayName: "Sai",
            id: "98cf9c0c-46b4-4a68-8fc0-a6789482e068",
          },
        },
      },
    ],
    requestedModalities: ["audio"],
    callOptions: {
      "@odata.type": "#microsoft.graph.outgoingCallOptions",
      isContentSharingNotificationEnabled: true,
    },
    mediaConfig: {
      "@odata.type": "#microsoft.graph.serviceHostedMediaConfig",
    },
  };

  return fetch(`https://graph.microsoft.com/v1.0/communications/calls`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(call),
  }).then((response) => response.json());
}

/* Create Teams Online Meeting */
function createTeamsOnlineMeeting(accessToken) {
  //Get Date and time in this format 2019-07-12T14:30:34.2444915-07:00

  let date = new Date();
  let endDate = new Date();
  endDate.setHours(date.getHours() + 1);
  const call = {
    startDateTime: date.toJSON(),
    endDateTime: endDate.toJSON(),
    subject: "PreSolved App Meeting",
  };

  console.log("Call is ", call);

  return fetch(`https://graph.microsoft.com/v1.0/me/onlineMeetings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(call),
  }).then((response) => response.json());
}

/* Update Online Meeting and add Participants */
function updateTeamsOnlineMeeting(accessToken, meetingId) {
  const call = {
    participants: {
      attendees: [
        {
          identity: {
            user: {
              "@odata.type": "#microsoft.graph.identity",
              displayName: "Sai",
              id: sivaID,
            },
          },
        },
      ],
    },
  };

  console.log("Call is ", call);

  return fetch(
    `https://graph.microsoft.com/v1.0/me/onlineMeetings/${meetingId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(call),
    }
  ).then((response) => response.json());
}

/** Create Calendar Teams Meeting */
function createCalendarTeamsMeeting(accessToken) {
  //Get Date and time in this format 2019-07-12T14:30:34.2444915-07:00

  let date = new Date();
  let endDate = new Date();
  endDate.setHours(date.getHours() + 1);
  const call = {
    start: {
      dateTime: date.toISOString(),
      timeZone: "Pacific Standard Time",
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: "Pacific Standard Time",
    },
    subject: "PreSolved Customer Support #1235",
    body: {
      contentType: "HTML",
      content: "PreSolved Customer Support #1235",
    },
    location: {
      displayName: "PreSolved Customer Support #1235",
    },
    attendees: [
      {
        type: "required",
        emailAddress: {
          address: "t.siva@p3fusion.com",
        },
      },
      {
        type: "required",
        emailAddress: {
          address: "venkat.ramasamy@p3fusion.com",
        },
      },
    ],
    allowNewTimeProposals: true,
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
  };

  console.log("Call is ", call);

  return fetch(`https://graph.microsoft.com/v1.0/me/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(call),
  }).then((response) => response.json());
}

/*attendees: [
        {
          "@odata.type": "#microsoft.graph.attendeeInfo",
          identity: {
            "@odata.type": "#microsoft.graph.identitySet",
            user: {
              "@odata.type": "#microsoft.graph.identity",
              displayName: "Sai",
              id: "98cf9c0c-46b4-4a68-8fc0-a6789482e068",
            },
          },
        },
      ],*/

function ProtectedComponent() {
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (!apiData && inProgress === InteractionStatus.None) {
      const accessTokenRequest = {
        scopes: ["user.read"],
        account: accounts[0],
      };
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          // Acquire token silent success
          let accessToken = accessTokenResponse.accessToken;
          console.log("Access Token is " + accessToken);
          setAccessToken(accessToken);
          // Call your API with token

          /*createTeamsOnlineMeeting(accessToken).then((response) => {
            console.log("API response: ", response);
            let meetingId = response.id;
            console.log("Meeting Id is ", meetingId);
            updateTeamsOnlineMeeting(accessToken, meetingId).then(
              (response) => {
                console.log("API response: ", response);
              }
            );
            //setApiData(response);
          });*/
          /*createTeamsMeeting(accessToken).then((response) => {
            console.log("API response: ", response);
            //setApiData(response);
          });*/
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance
              .acquireTokenPopup(accessTokenRequest)
              .then(function (accessTokenResponse) {
                // Acquire token interactive success
                let accessToken = accessTokenResponse.accessToken;
                console.log("Access Token is " + accessToken);
                // Call your API with token
                /*callApi(accessToken).then((response) => {
                  setApiData(response);
                });*/
              })
              .catch(function (error) {
                // Acquire token interactive failure
                console.log(error);
              });
          }
          console.log(error);
        });
    }
  }, [instance, accounts, inProgress, apiData]);

  return (
    <div>
      <h1>Protected Component</h1>
      <div>
        <button
          onClick={() => {
            callAPI(accessToken).then((response) => {
              console.log("API response: ", response);
              setApiData(response);
            });
          }}
        >
          Get My Status
        </button>
        <button
          onClick={() => {
            createTeamsMeeting(accessToken).then((response) => {
              console.log("API response: ", response);
              setApiData(response);
            });
          }}
        >
          Create Non Calendar Teams Meeting
        </button>
        {/* List Chats Button */}
        <button
          onClick={() => {
            callChatAPI(accessToken).then((response) => {
              console.log("API response: ", response);
              setApiData(response);
            });
          }}
        >
          List Chats
        </button>
        {/* Send Chat Button */}
        <button
          onClick={() => {
            callChatAPI(accessToken).then((response) => {
              console.log("API response: ", response);
              setApiData(response);
            });
          }}
        >
          Send Chat
        </button>

        <button
          onClick={() => {
            createTeamsOnlineMeeting(accessToken).then((response) => {
              console.log("API response: ", response);
              let meetingId = response.id;
              console.log("Meeting Id is ", meetingId);
              updateTeamsOnlineMeeting(accessToken, meetingId).then(
                (response) => {
                  console.log("API response: ", response);
                }
              );
              setApiData(response);
            });
          }}
        >
          Create Teams Meeting
        </button>
      </div>
      <p>
        API Response:
        <pre>
          <code>{JSON.stringify(apiData, null, 2)}</code>
        </pre>
      </p>
    </div>
  );
}

function App() {
  return (
    <AuthenticatedTemplate>
      <ProtectedComponent />
    </AuthenticatedTemplate>
  );
}

export default App;
