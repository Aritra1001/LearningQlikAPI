const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const QlikEngineConnection = (req, res) => {
  try {
    console.log("QlikEngineConnection is called");
    let certPath = path.join("D:", ".Local Certificates");

    let certificates = {
      cert: fs.readFileSync(path.resolve(certPath, "client.pem")),
      root: fs.readFileSync(path.resolve(certPath, "root.pem")),
      key: fs.readFileSync(path.resolve(certPath, "client_key.pem")),
    };

    let ws = new WebSocket("wss://gycwgy2.gain-insights.in:4747/app/", {
      ca: certificates.root,
      cert: certificates.cert,
      key: certificates.key,
      headers: {
        "X-Qlik-User": "UserDirectory=GAIN-INSIGHTS; UserId=aritran",
      },
    });

    let request = {
      handle: -1,
      method: "GetDocList",
      params: [],
      outKey: -1,
      id: 1,
    };
    ws.onopen = function (e) {
      console.log({ msg: "open documents" });
      ws.send(JSON.stringify(request));

      ws.onmessage = (event) => {
        // console.log("event", event.data);
        // ws.send(event.data);
        let response = JSON.parse(event.data);
        console.log("response", response);
      };
    };
    return res.send({ msg: "Getting documents"});
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  QlikEngineConnection,
};
