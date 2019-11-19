var productName = "Gold Neck"
var welcomeMessage = '<div class="lp_chat_line_wrapper lp_agent agent_avatar_display conversation-starter"><div class="lp_time" title="Tina" data-lp-cust-id="transcript_time" style="color:#6D6E70;font-style:normal;font-family:Arial,Helvetica,sans-serif;font-weight:normal"><div class="lp_sender">Tina</div></div><img class="agent_avatar" data-lp-cust-id="agentAvatarUrl" alt="" aria-hidden="true" src="https://www.liveperson.com/sites/default/files/bot-avatar.png"><div class="lp_chat_line" data-lp-cust-id="transcript_bubble_agent" style="background-color:#787878;border-color:#606060"><div class="lp_title_text" data-lp-cust-id="transcript_bubble_agent_text" style="color:#FFFFFF;font-style:normal;font-family:Arial,Helvetica,sans-serif;font-weight:normal">Hey there! My name is Tina, the My Name Necklace bot here to help out I can help you with the following topics:</div></div><div class="lp_chat_arrow_border" data-lp-cust-id="transcript_bubble_agentArrowBorder" style="border-right-color:#606060"></div><div class="lp_chat_arrow" data-lp-cust-id="transcript_bubble_agentArrow" style="border-right-color:#787878"></div></div>';

var menuMessage = '<div id="iNeedAnId" class="lp_chat_line_wrapper lp_agent agent_avatar_display conversation-starter"><div class="lp_time" title="Tina" data-lp-cust-id="transcript_time" style="color:#6D6E70;font-style:normal;font-family:Arial,Helvetica,sans-serif;font-weight:normal"><div class="lp_sender">Tina</div></div><img class="agent_avatar" data-lp-cust-id="agentAvatarUrl" alt="Tina" src="https://www.liveperson.com/sites/default/files/bot-avatar.png"><div class="lp_rich_content_line" data-lp-cust-id="transcript_bubble_rich_content"><div class="lp_title_text" data-lp-cust-id="transcript_bubble_rich_content_text"><div class="lp-json-pollock"><div class="lp-json-pollock-layout lp-json-pollock-layout-vertical"><div class="lp-json-pollock-element-text"><span style="font-weight:bold;" title="" aria-label="">How can I help you today?</span></div><div class="lp-json-pollock-element-button"><button data-conv-id="0bbbb9bd-fcb1-43c7-96cd-a12ad47fbda6" onclick="sendLPButtonText(this);">I want general information about '  +productName+ '</button></div><div class="lp-json-pollock-element-button"><button data-conv-id="0bbbb9bd-fcb1-43c7-96cd-a12ad47fbda6" onclick="sendLPButtonText(this)">I\'ve got a question regarding engraving on ' +productName+ ' please </button></div><div class="lp-json-pollock-element-button"><button data-conv-id="0bbbb9bd-fcb1-43c7-96cd-a12ad47fbda6" onclick="sendLPButtonText(this)">I want to know about sizes for ' +productName+ ' please </button></div></div></div></div></div></div>';

function sendLPButtonText(target) {
    var text = $(target).html().replace(/&nbsp;/g, ' ');
    $('.lpview_form_textarea').val(text);
    $('.lp_send_button').prop('disabled', false).trigger('click');
    $('.conversation-starter').hide();
}

function showInitMenu(){
    $('body:not(.cio) #lpChat div[data-lp-point="lines_area"]').append(welcomeMessage + menuMessage);
    $('.lp_location_center').animate({
        scrollTop: $('.lp_transcript_widget').height()
    });
}