const button = document.getElementById("btn");
const input = document.getElementById("input-text");
const chatBox = document.getElementById("chatbot");

// Button click
button.addEventListener("click", async function () {
  const userMessage = input.value;
  if (!userMessage) return;

  // User message
  chatBox.innerHTML += `
    <p style="
      color: white;
      background-color: #4f46e5;
      padding: 10px 15px;
      border-radius: 15px 15px 0 15px;
      align-self: flex-end;
      width: fit-content;
      margin-left:auto;
      max-width:70%;
      word-break: break-word;
    ">
      ${userMessage} 
    </p>
  `;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  const KEY =
    "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"; // ⚠️ replace with new key

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await res.json();
    const botReply = data.choices[0].message.content;

    // Bot reply
    chatBox.innerHTML += `
      <p style="
        color: #111827;
        background-color: #f5f5f5;
        width: fit-content;
        margin-right:auto;
        max-width:70%;
        padding: 10px 15px;
        border-radius: 15px 15px 15px 0;
        word-break: break-word;
      ">
        ${botReply}
      </p>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    console.log(err);
    chatBox.innerHTML += `<p style="color:red;">Error: Something went wrong!</p>`;
  }
});

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});
