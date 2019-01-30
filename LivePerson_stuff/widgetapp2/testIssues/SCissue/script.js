(function(){
  window.onload = function() {
    lpTag.agentSDK.init({});

    lpTag.agentSDK.command(
      lpTag.agentSDK.cmdNames.writeSC, 
      {}, 
      function(){}
      );
  }
})();

var quickReplies = 
{
	"json": {
		"type": "text",
		"text": "product name",
		"tooltip": "text tooltip",
		"style": {
			"bold": true,
			"size": "large"
		}
	},
	"quickReplies": {
		"type": "quickReplies",
		"itemsPerRow": 8,
		"replies": [{
				"type": "button",
				"tooltip": "yes i do",
				"title": "yes",
				"click": {
					"actions": [{
						"type": "publishText",
						"text": "yep"
					}],
					"metadata": [{
						"type": "ExternalId",
						"id": "Yes-1234"
					}]
				}
			},
			{
				"type": "button",
				"tooltip": "No!",
				"title": "No!",
				"click": {
					"actions": [{
						"type": "publishText",
						"text": "No!"
					}],
					"metadata": [{
						"type": "ExternalId",
						"id": "No-4321"
					}]
				}
			}
		]
	}
};

var carousel = 
{
	"json": {
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
				"elements": [{
						"type": "image",
						"url": "https://cdn.zeplin.io/5aa650d695bfea607a2c9351/assets/CF63C36C-CF8E-4AA5-9376-BC89EDAE43B7.png",
						"tooltip": "Swap plan",
						"click": {
							"metadata": [{
								"type": "ExternalId",
								"id": "11114444"
							}]
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
							"actions": [{
								"type": "link",
								"name": "Add to cart",
								"uri": "http://www.google.com"
							}]
						}
					}
				]
			}
		]
	}
};

var vertical = 
{
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