$(document).ready(function() {
    var chat = $("#chat");
    var messageInput = $("#message");
    var sendButton = $("#send");

    function updateChat() {
        $.ajax({
            url: "messages.txt",
            type: "GET",
            success: function(data) {
                chat.html(data);
            }
        });
    }

    setInterval(updateChat, 1000);

    sendButton.click(function() {
        var message = messageInput.val();
        if (message !== "") {
            $.ajax({
                url: "send_message.php",
                type: "POST",
                data: { message: message },
                success: function() {
                    messageInput.val("");
                    updateChat();
                }
            });
        }
    });
});
