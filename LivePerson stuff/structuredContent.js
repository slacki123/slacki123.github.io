
function sendRichContent() {

  var notifyWhenDone = function(err) {
      if (err) {
          // Do something with the error
      }
      // called when the command is completed successfully,
      // or when the action terminated with an error.
  };

  var cmdName = lpTag.agentSDK.cmdNames.writeSC; // = "Write StructuredContent"
  var data = {
    json: {
      "text": yourBusinessName,
      "type": "vertical",
      "elements": [
        {
          "type": "map",
          "lo": yourLongitude,
          "la": yourLatitude,
          "tooltip": "Map",
          "click": {
            "actions": [
              {
                "type": "navigate",
                "name": "navigate",
                "lo": yourLongitude,
                "la": yourLatitude
              }  
            ]
          }
        },
        {
          "type": "text",
          "text": "1234 Hollywood Boulevard, Los Angeles, CA"
        },
      ],
      "metadata": { "fallback": url_link_map_link }
    },
    metadata: [	//metadata is optional
  			{"type":"ExternalId","id":"running364"},
  			{"type":"ExternalId","id":"soccer486"}
  		]
  };

    try {
      lpTag.agentSDK.command(cmdName, data, notifyWhenDone);

      } catch (e) {
        console.log(e);
      }

}
