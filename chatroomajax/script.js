$(document).ready(function () {
    $("#message-form").submit(function (event) {
        event.preventDefault();
        let message = $("#message").val();
        let timestamp = new Date().toLocaleString();
        let formattedMessage = timestamp + "\n" + message + "\n";

        $.ajax({
            url: 'https://api.github.com/repos/safranek2/safranek2.github.io/chatroomajax/messages.txt',
            type: 'PUT',
            headers: {
                Authorization: 'Bearer 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'
            },
            data: JSON.stringify({
                message: formattedMessage
            }),
            success: function (data) {
                console.log('Zpráva byla uložena na GitHubu.');
                $("#message").val('');
            },
            error: function (error) {
                console.error('Chyba při ukládání zprávy na GitHub:', error);
            }
        });
    });

    function loadMessages() {
        $("#chat").html("");
        $.ajax({
            url: 'https://api.github.com/repos/safranek2/safranek2.github.io/chatroomajax/messages.txt',
            type: 'GET',
            success: function (data) {
                let lines = data.split('\n');
                let formattedMessages = '';
                let messageClass = '';
                for (let i = 0; i < lines.length; i += 2) {
                    if (lines[i] && lines[i + 1]) {
                        let timestamp = lines[i];
                        let messageText = lines[i + 1];
                        formattedMessages += `<div class="${messageClass}">`;
                        formattedMessages += formatDate(timestamp) + "<br>" + messageText + "<br>";
                        formattedMessages += '</div>';
                        messageClass = (messageClass === '') ? '' : 'bg-dark';
                    }
                }
                $("#chat").html(formattedMessages);
            },
            error: function (error) {
                console.error('Chyba při načítání zpráv z GitHub:', error);
            }
        });
    }
    
    function formatDate(timestamp) {
        let date = new Date(parseInt(timestamp));
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
    
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
    
        return `${day}. ${month}. ${year} ${hours}:${minutes}:${seconds}`;
    }

    setInterval(loadMessages, 1000);
    
});