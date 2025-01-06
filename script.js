document.body.innerHTML = `
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      font-family: Arial, sans-serif;
      background: url('https://example.com/nebula-background.jpg') no-repeat center center fixed;
      background-size: cover;
      overflow: hidden;
    }
    .snow {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: transparent url('snowflake.png') repeat center center;
      animation: snowfall 10s linear infinite;
    }
    @keyframes snowfall {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }

    .header {
      font-size: 2rem;
      color: #fff;
      margin-bottom: 20px;
      opacity: 0;
      animation: typing 3s steps(15) forwards, blink 0.5s step-end infinite;
    }
    @keyframes typing {
      from { width: 0; opacity: 1; }
      to { width: 14ch; }
    }
    @keyframes blink {
      50% { border-color: transparent; }
    }
    .header:after {
      content: '|';
      border-right: 2px solid;
      display: inline-block;
      animation: blink 0.5s step-end infinite;
    }
    div {
      text-align: center;
      opacity: 0;
      animation: slideIn 1s ease-out forwards;
    }
    #urlInput {
      width: 300px;
      height: 40px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 10px;
      font-size: 16px;
      margin: 10px 0;
      background-color: #d3d3d3;
    }
    #fetchButton {
      width: 100px;
      height: 40px;
      background-color: #1e3d58;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      cursor: pointer;
    }
    #fetchButton:hover {
      background-color: #16344a;
    }
    #resultOutput {
      width: 80%;
      max-width: 600px;
      height: 200px;
      margin-top: 20px;
      padding: 10px;
      background: #d3d3d3;
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow-y: auto;
      white-space: pre-wrap;
      opacity: 0;
      animation: slideInBottom 1.5s ease-out forwards;
    }
    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideInBottom {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  </style>
  <div class="snow"></div>
  <div class="header">orion is cool</div>
  <div>
    <label for="urlInput" style="color: white;">enter a url (e.g., example.com):</label>
    <input type="text" id="urlInput" placeholder="example.com">
    <button id="fetchButton">fetch</button>
  </div>
  <div id="resultContainer">
    <pre id="resultOutput"></pre>
  </div>
`;

document.getElementById("fetchButton").addEventListener("click", () => {
  const userUrl = document.getElementById("urlInput").value;

  if (userUrl) {
    const apiUrl = `https://getwebsiteclones.vercel.app/api?url=${userUrl}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`api error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        document.getElementById("resultOutput").textContent = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error("error fetching the api:", error);
        document.getElementById("resultOutput").textContent = `error: ${error.message}`;
      });
  } else {
    alert("please enter a url.");
  }
});
