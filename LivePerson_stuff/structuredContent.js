
var cmdName;
var data;

function testRichContent() {

cmdName = lpTag.agentSDK.cmdNames.writeSC;	
data = 
	{"json" : 
		{
		"type": "carousel",
		"padding": 10,
		"elements": [{
			"type": "vertical",
			"elements": [{
				"type": "image",
				"url": "https://aca-static-content.eu-gb.mybluemix.net/CCC%20DEMO%20Pictures/Refrigerator%20Sales/Medium/Screen%20Shot%202018-12-20%20at%2007.45.29.png",
				"click": {
					"actions": [{
						"type": "link",
						"uri": "https://www.google.com/"
					}]
				}
			}, {
				"type": "text",
				"text": "BOWMANN KG32",
				"rtl": false,
				"style": {
					"bold": true,
					"italic": false,
					"color": "#000000"
				}
			}, {
				"type": "text",
				"text": "€405, Silver, 1430 mm",
				"rtl": false,
				"style": {
					"bold": false,
					"italic": false,
					"color": "#000000"
				}
			}, {
				"type": "button",
				"title": "Buy Now",
				"click": {
					"actions": [{
						"type": "link",
						"uri": "https://www.mediamarkt.de/de/product/_bomann-kg-322-2214622.html"
					}]
				}
			}]
		},

	{
      "type": "vertical",
      "elements": [
        {
          "type": "image",
          "url": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/CF63C36C-CF8E-4AA5-9376-BC89EDAE43B7.png",
          "tooltip": "Swap plan",
          "click": {
            "metadata": [
              {
                "type": "ExternalId",
                "id": "11114444"
              }
            ]
          }
        },
        {
          "type": "text",
          "text": "Medium plan 15GB data",
          "tooltip": "Medium plan",
          "rtl": false,
          "style": {
            "bold": true,
            "italic": false,
            "color": "#000000"
          }
        },
        {
          "type": "text",
          "text": "Unlimited national talk",
          "tooltip": "Unlimited",
          "rtl": false,
          "style": {
            "bold": true,
            "italic": false,
            "color": "#000000"
          }
        },
        {
          "type": "text",
          "text": "69$ per month",
          "tooltip": "Unlimited",
          "rtl": false,
          "style": {
            "bold": true,
            "italic": false,
            "color": "#000000"
          }
        },
        {
          "type": "button",
          "tooltip": "Buy now",
          "title": "Buy now",
          "click": {
            "actions": [
              {
                "type": "link",
                "name": "Add to cart",
                "uri": "http://www.google.com"
              }
            ]
          }
        }
      ]
    }
		]
	}
};

	var notifyWhenDone = function(err) {
	    if (err) {
	        // Do something with the error
	        console.log(err);
	    }
	};

	try {
	  	lpTag.agentSDK.command(cmdName, data, notifyWhenDone);
	} catch (e) {
	    console.log(e);
	};

};

function sendRichContent() {

   cmdName = lpTag.agentSDK.cmdNames.writeSC; // = "Write StructuredContent"
    data = {
  "json": {
    "type": "vertical",
    "elements": [{
      "type": "image",
      "url": "https://s0.geograph.org.uk/geophotos/04/17/37/4173703_d031288b.jpg",
      "tooltip": "image tooltip",
      "caption": "test caption",

      "click": {
        "actions": [{
          "type": "link",
          "name": "I play pokemon go everyday",
          "uri": "https://s0.geograph.org.uk"
        }]
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


      // var lastChatImage = document.getElementsByClassName("lp-json-pollock-element-image").length - 1; 

      // var imageContainer = document.getElementsByClassName("lp-json-pollock-element-image")[lastChatImage];

      // imageContainer.setAttribute("style", "cursor:pointer");

      //below is for a certain problem to do with the hand on hover

      // function cursor() {
      //   document.getElementsByClassName("lp-json-pollock-element-image")[document.getElementsByClassName("lp-json-pollock-element-image").length - 1].setAttribute("style","cursor:pointer");
      // }

      // setTimeout(cursor, 3000);

};

function sendQuickReplies() {

   cmdName = lpTag.agentSDK.cmdNames.write; // = "Write StructuredContent"
    data = {
      "text": "Some text",
      "quickReplies": {
        "type": "quickReplies",
        "itemsPerRow": 8,
        "replies": [
          {
            "type": "button",
            "tooltip": "yes i do",
            "title": "yes",
            "click": {
              "actions": [
                {
                  "type": "publishText",
                  "text": "yep"
                }
              ],
              "metadata": [
                {
                  "type": "ExternalId",
                  "id": "Yes-1234"
                }
              ]
            }
          },
          {
            "type": "button",
            "tooltip": "No!",
            "title": "No!",
            "click": {
              "actions": [
                {
                  "type": "publishText",
                  "text": "No!"
                }
              ],
              "metadata": [
                {
                  "type": "ExternalId",
                  "id": "No-4321"
                }
              ]
            }
          }
        ]
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

function sendQuickRepliesAsSC() {

   cmdName = lpTag.agentSDK.cmdNames.writeSC; // = "Write StructuredContent"
  data = {
      json: {
        "type": "text",
        "text": "product name",
        "tooltip": "text tooltip",
        "style": {
          "bold": true,
          "size": "large"
        }
      },
      quickReplies: {
        "type": "quickReplies",
        "itemsPerRow": 8,
        "replies": [
          {
            "type": "button",
            "tooltip": "yes i do",
            "title": "yes",
            "click": {
              "actions": [
                {
                  "type": "publishText",
                  "text": "yep"
                }
              ],
              "metadata": [
                {
                  "type": "ExternalId",
                  "id": "Yes-1234"
                }
              ]
            }
          },
          {
            "type": "button",
            "tooltip": "No!",
            "title": "No!",
            "click": {
              "actions": [
                {
                  "type": "publishText",
                  "text": "No!"
                }
              ],
              "metadata": [
                {
                  "type": "ExternalId",
                  "id": "No-4321"
                }
              ]
            }
          }
        ]
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
 };