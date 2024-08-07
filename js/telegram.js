function sendTelegram() {
  // Get form values
  var name = document.getElementById("name").value;
  var textMessage = document.getElementById("text").value;

  // Replace 'YOUR_BOT_TOKEN' with your actual bot token
  var botToken = "7305885633:AAGI5rP2oyWBpd-DBTOpv4kDB9j-vG1NfVY";

  // Replace 'YOUR_CHAT_IDS' with an array of your actual chat IDs
  var chatIds = [
    "905770018",
    "527662755",
    "171220950",
    "5841790517",
    "6762253294",
  ];

  // Construct the message
  var message = `Ф.И.О: ${name}

Ваши пожелания: ${textMessage}`;

  // Telegram Bot API endpoint for sending messages
  var apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  // Iterate through each chat ID and send the message
  chatIds.forEach((chatId) => {
    // Construct the data to be sent
    var data = {
      chat_id: chatId,
      text: message,
    };

    // Make a POST request to the Telegram Bot API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error(`Error sending message to ${chatId}:`, error);
      });
  });

  // Show alert
  alert("Ваша информация записана!");

  // Clear the form
  document.getElementById("name").value = "";
  document.getElementById("text").value = "";

  // Prevent the form from submitting traditionally
  return false;
}
