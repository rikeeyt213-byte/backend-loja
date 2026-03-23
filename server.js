const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔐 SUAS CHAVES (COLOCA AQUI)
const CLIENT_ID = "ci_q623ddgws1xcaf4";
const SECRET_ID = "cs_r2qaggy37xekl1l6x1h5u4e7g";

// 🔔 DISCORD (OPCIONAL)
const DISCORD_WEBHOOK = "COLE_WEBHOOK_DISCORD_AQUI";

// 🚀 CRIAR PAGAMENTO
app.post("/criar-pagamento", async (req, res) => {

try {

const response = await axios.post("https://api.misticpay.com/v1/payment", {

amount: 120.90,
description: "Pedido Loja POD",

}, {
headers: {
"client_id": CLIENT_ID,
"secret_id": SECRET_ID
}
});

res.json({
link: response.data.payment_url
});

} catch (err) {
res.status(500).json({erro: "Erro ao gerar pagamento"});
}

});

// 🔥 WEBHOOK (CONFIRMAÇÃO AUTOMÁTICA)
app.post("/webhook", async (req, res) => {

const data = req.body;

console.log("Pagamento recebido:", data);

// verifica pagamento aprovado
if (data.status === "paid") {

console.log("✅ PAGAMENTO APROVADO");

// 🔔 NOTIFICA NO DISCORD
if(DISCORD_WEBHOOK !== ""){
await axios.post(DISCORD_WEBHOOK, {
content: "💰 Nova venda aprovada!"
});
}

}

res.sendStatus(200);

});

app.get("/", (req,res)=>{
res.send("API ONLINE 🚀");
});

app.listen(3000, () => console.log("Servidor rodando"));
