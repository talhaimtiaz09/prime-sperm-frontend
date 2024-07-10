window.pauseSocket = false;
document.addEventListener("DOMContentLoaded", createNumberInputFromRangeInput);
const client_api = window.client_api;
// const server_api = window.server_api
function createNumberInputFromRangeInput() {
  const rangeInputs = document.querySelectorAll('input[type="range"]');

  rangeInputs.forEach((rangeInput) => {
    const inputPair = rangeInput.parentElement;

    // Ensure the parent element has the 'relative' class
    inputPair.classList.add("relative");

    // Create and configure the number input
    const numberId = rangeInput.id.replace("Range", "Number");
    const numberInput = document.createElement("input");
    numberInput.type = "number";
    numberInput.min = rangeInput.min;
    numberInput.max = rangeInput.max;
    numberInput.step = rangeInput.step;
    numberInput.value = rangeInput.value;
    numberInput.id = numberId;
    numberInput.classList =
      "w-4 absolute -bottom-4 right-10 z-20 w-[40px] border border-black";

    // Synchronize the range and number inputs
    rangeInput.addEventListener("input", function () {
      numberInput.value = rangeInput.value;
      // saveValue(rangeInput.id, rangeInput.value);
    });

    numberInput.addEventListener("input", function () {
      rangeInput.value = numberInput.value;
      applyFiltersToVideoElement();
      // saveValue(rangeInput.id, numberInput.value);
    });

    // Append the number input to the parent element
    inputPair.appendChild(numberInput);

    // Load saved values from local storage
    const savedValue = localStorage.getItem(rangeInput.id);
    if (savedValue !== null) {
      rangeInput.value = savedValue;
      numberInput.value = savedValue;
    }
  });

  // Save all values before the page unloads
  window.addEventListener("load", function () {
    rangeInputs.forEach((rangeInput) => {
      rangeInput.value = localStorage.getItem(rangeInput.id);
    });
  });
}
function createLoader() {
  const loader = document.createElement("div");
  loader.classList.add("rounded-md");
  loader.classList.add("h-12");
  loader.classList.add("w-12");
  loader.classList.add("border-4");
  loader.classList.add("border-t-4");
  loader.classList.add("border-blue-500");
  loader.classList.add("animate-spin");
  loader.classList.add("mx-auto");
  loader.classList.add("my-52");

  loader.id = "imgLoader";

  const imgSperm = document.getElementById("imgSperm");
  imgSperm.parentElement.appendChild(loader);
}

window.onload = function () {
  createLoader();
  window.pauseSocket = false;
  const imgLoader = document.getElementById("imgLoader");
  const imgElement = document.getElementById("imgSperm");
  // document.getElementById("processBtn").disabled = false;
  function connectSocket() {
    socket = io.connect(client_api);

    socket.on("connect", function () {
      console.log("Socket connected");
      imgLoader.classList.toggle("hidden");
      // addGammaFilter()
      // createNumberInputFromRangeInput();
    });

    socket.on("disconnect", function () {
      imgLoader.classList.toggle("hidden");

      console.log("Socket disconnected. Reconnecting...");
      if (!window.pauseSocket) {
        setTimeout(connectSocket, 1000); // Try to reconnect every second
      }
    });

    socket.on("image_frame", function (data) {
      imgElement.src = "data:image/jpeg;base64," + data.image;
    });
  }

  if (!socket) {
    connectSocket();
  } else {
    socket.disconnect();
    socket = null;
  }
};

function setGamma() {
  const gammaValue = document.getElementById("gammaRange").value;

  fetch(`${client_api}/adjust-gamma`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gamma: gammaValue,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
function setWhiteBalance() {
  const whiteBalanceValue = document.getElementById("whiteBalanceRange").value;

  fetch(`${client_api}/adjust-whitebalance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      white_balance: [whiteBalanceValue, whiteBalanceValue, whiteBalanceValue],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
function setTime_ms() {
  const time_ms_value = document.getElementById("time_msRange").value;
  console.log(time_ms_value);
  fetch(`${client_api}/adjust-time_ms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time_ms: time_ms_value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

document
  .getElementById("whiteBalanceRange")
  .addEventListener("input", function () {
    setWhiteBalance();
  });

document.addEventListener("DOMContentLoaded", function () {
  const els = document.querySelectorAll("input");

  document
    .getElementById("whiteBalanceNumber")
    .addEventListener("input", function () {
      setWhiteBalance();
    });

  document.getElementById("gammaRange").addEventListener("input", function () {
    setGamma();
  });
  document.getElementById("gammaNumber").addEventListener("input", function () {
    setGamma();
  });

  document
    .getElementById("time_msRange")
    .addEventListener("input", function () {
      setTime_ms();
    });
  document
    .getElementById("time_msNumber")
    .addEventListener("input", function () {
      setTime_ms();
    });
});

// console.log('Backend IP:', window.server_api);
console.log("Client Backend:", window.client_api);
