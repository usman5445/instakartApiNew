const { default: axios } = require("axios");
const { json } = require("express");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(json());

app.get("/", async (req, res) => {
  res.send(
    "Please go to /orders along with date range ?from=mm-dd-yyyy&end=mm-dd-yyyy (ex: http://localhost:5000/orders?from=01-12-2022&to=07-25-2022) or without date range (ex: http://localhost:5000/orders)"
  );
});

//function that filters data by date range and returns object
function filterData(data, range) {
  const from = new Date(range.from);
  const to = new Date(range.to);

  return {
    orders: data.orders.filter((item) => {
      let date = new Date(item.created_at);
      return date >= from && date <= to;
    }),
  };
}

app.get("/orders", async (req, res) => {
  axios
    .get("https://www.instacart.com/v3/orders", {
      headers: {
        "accept-language": "en-US,en;q=0.9",
        connection: "keep-alive",
        cookie:
          "device_uuid=abd5357e-662a-4525-9ade-dea4f6e7dc0b; ahoy_visitor=CC4A4015-dd32-4ba1-bdb3-f532a98cb53a; G_ENABLED_IDPS=google; ajs_anonymous_id=a39b3cf6-590d-4f8d-9789-4f2bc4ce39d9; _gcl_au=1.1.1781055746.1652351393; G_AUTHUSER_H=0; IR_gbd=instacart.com; _scid=f462e3a9-3218-47ab-aaa6-c800756a769b; _fbp=fb.1.1652351397834.1845886706; __Host-instacart_sid=L4O63kMqCLiH_Cw2VkxIt94xRpzShbX94lcBCmKLPa0; known_visitor=%7Ccoinout.test2021%40gmail.com%7Cemail; ajs_user_id=684945840; ab.storage.userId.6f8d91cb-99e4-4ad7-ae83-652c2a2c845d=%7B%22g%22%3A%22684945840%22%2C%22c%22%3A1652447572962%2C%22l%22%3A1652447572962%7D; ab.storage.deviceId.6f8d91cb-99e4-4ad7-ae83-652c2a2c845d=%7B%22g%22%3A%22e4034eaa-da13-db23-cabd-7be9f339d7c7%22%2C%22c%22%3A1652447572964%2C%22l%22%3A1652447572964%7D; _tt_enable_cookie=1; _ttp=e9bc60ee-2078-4afd-a590-9bcfaffd5406; _instacart_logged_in=1; __stripe_mid=0781a489-9b08-4c14-b172-0542ed88df4de8de62; soft_prompt_date_684945840=1654498619099; _sctr=1|1654453800000; _gid=GA1.2.16277890.1654585043; ahoy_visit=C74A6830-5730-4f49-91b6-b9280a3286bd; forterToken=a1c3ed962c6e4d9882ef178916664184_1654602189374__UDF43_13ck; build_sha=3b94dd7f552e215c2c3fbf9c010b6b8af2c3c2e1; __stripe_sid=6ed4aab8-144c-4d67-a9ae-a3abc1d54d8cb6fc1c; _ga=GA1.2.208015085.1652351393; IR_7412=1654602209459%7C0%7C1654602209459%7C%7C; _uetsid=12879b00e62f11ec84907fb74212805d; _uetvid=76c528d0d1de11ecaf6ed7b82efdef2d; hT=eyJlbmNCdWZmZXIiOiJEZkt0KytOakx0VS9KT0YySjZNU2J4TlFqeG1SVWpGZm9BR1pvczk1Vmp4NVJnbk9XZTBOWi96cWVXdnlLdm8wdnV0TEwvcUxpeDFmMEhyYlZidnhwM0I2Rkdrd2RRRGppT1ByMjFPb3BCQjNLUHNTL0tOOGl5TUVGRG53VzVxaEdxaTY4YWVTbnlia0pQNDFtbkNNdUZlRlQvOWc1S2F3TjYzM3lkTWVRV0k5WXF6VW8vNkZERk94NlhOeVBha0hnR3hLV0tkTmxrcWVUQzZ2WkF1bkd0RDNrcHpXWkFDdlo1VmZCSlZheSt5cldUZVBoL2t2RU1CVnBpbXh3WVp2eWowWm9QdkFrSG82ZE1XQmw0WGxzaVp4QmNEdDkvdVNsZTVseTBsRlZ4OXMwbjJMN0FSSW8zL2ZoNTRCV3ZvMnJ1QTVpUi9kRkpTai9HOGp3eVU9IiwiaXYiOiJwUDVBbFFJdjlNNnNRU2hqIn0=; _gat_UA-35642030-3=1; _ga_VL5WVTXMWP=GS1.1.1654602209.25.1.1654603466.60; __cf_bm=NHbv.Ix2G5IoYLW_QFrvwpAk8s62u3IKcpoDlhTMihY-1654603464-0-AVmMPRwB2ofNr0Yi1w94Aptv9NMOQKro1mVl2u1ymU8vlbhAeS3XIZqWQnjkBmkybiZZIqUx/ka6dZMSSVNpJuw=; ab.storage.sessionId.6f8d91cb-99e4-4ad7-ae83-652c2a2c845d=%7B%22g%22%3A%22e260ed9e-9af3-b3dd-f528-e51b57eb3a70%22%2C%22e%22%3A1654605269645%2C%22c%22%3A1654603469647%2C%22l%22%3A1654603469647%7D; _dd_s=logs=0&expire=1654604367304&rum=0; _instacart_session_id=eVU1MEU4T2s2K2pwSVlwL1B4aU9GSWl5SGx5YVprekdaVlVvdXlBSlFKaUhhWW05aVVkWHE4aklza3lHRGlaeTVFRmYzckFPYVFxSFpkSllqc29jTlhSQ3Y4VGxuc2ZXSkRJZ2tnRVhwVHJXQWpacnNLdHIyU2JneFVZeldwQjgzMEkyRytPMTd6blYwNGtoaXZwMzV5WW9VRWNHdnVtUFB6YmNlclNEcHRuUGMzVStKeGZEN1FOUG9qWXVkVG1taCtLMnBjaDkvL3ZhQklPRThiNThTSUlrbzRKRG5pbmFZYWdsQ2ZkQzRwbnRtblRJbkVZQUt3aXg2eXl2Q2dRSmFtbkt6elAxZVFscTQ1Tldldi83VFVqcVBXVWlFOUcvUmJXcVJ4YS9PNjhxTDlnOU1DbWgyeXQ3SGdUallVWXpmeXJNWXMzSTd5N0VOTDd3Z3YrVDVSRndjWnJPeXNTcmpVYWRPR3Z2VldjZ2RHcC9xUlFaaDlwNTdWSDZtOW5oLS1ZVzVtUVNIeGoxcHF2bG5BTU1UbnVnPT0%3D--e5e5a6d91ff233aceeec014e7cb6d88b467e58e2",
        referer: "https://www.instacart.com/store/account/orders",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
        accept: "application/json",
        "content-type": "application/json",
        "x-client-identifier": "web",
        "x-csrf-token":
          "OSznbdcMig+dwrxazLedlpXXvUZaWdSYSD1j3d44/vb851dUBRW0YfnILtrnloRWXD3cyu7IV3Epv7zZ01st6w==",
      },
    })
    .then((resp) => {
      if (Object.keys(req.query).length) {
        console.log("queried", filterData(resp.data, req.query).orders.length);
        return res.send(filterData(resp.data, req.query));
      }
      console.log("non queried", resp.data.orders.length);
      res.send(resp.data);
    })
    .catch((err) => {
      res.status(400).send(err.response?.data);
    });
});

//lisning on port
app.listen(PORT, () =>
  console.log("Server started at http://localhost:" + PORT)
);
