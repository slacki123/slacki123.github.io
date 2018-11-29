
var cmdName;
var data;

function sendRichContent() {

   cmdName = lpTag.agentSDK.cmdNames.writeSC; // = "Write StructuredContent"
    data = {
      "json":  {
        "type": "vertical",
          "elements": 
          [{
            "type": "image",
            "url": "https://s0.geograph.org.uk/geophotos/04/17/37/4173703_d031288b.jpg",
            "tooltip": "image tooltip",
            "caption": "test caption",   
            "click": {
              "actions": [{
                "type": "link",
                "name": "I play pokemon go everyday",
                "uri": "https://www.liveperson.com"
              }]  
            },
            "style" : {
              "background-color": "###3E47A0",
            }  
          }, {
            "type": "text",
            "text": "product name (The picture above)",
            "tooltip": "product name (Title)"
          }, {
            "type": "text",
            "text": "product category (Any)",
            "tooltip": "product category (type)"
          }, {
            "type": "text",
            "text": "$155.99",
            "tooltip": "$155.99"
          }]
           }
                };

    // cmdName = lpTag.agentSDK.cmdNames.write; // = "Write ChatLine"
    // data = {text: "WORKS MAFAKA"};

    var notifyWhenDone = function(err) {
        if (err) {
            // Do something with the error
            console.log(err);
        }
        // called when the command is completed successfully,
        // or when the action terminated with an error.
    };

   

      try {
        lpTag.agentSDK.command(cmdName, data, notifyWhenDone);

        } catch (e) {
          console.log(e);
        }

}
