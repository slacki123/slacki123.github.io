
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
    metadata: [ //metadata is optional
        {"type":"ExternalId","id":"running364"},
        {"type":"ExternalId","id":"soccer486"}
      ]
  };
