const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;

// إعداد الاتصال بـ MongoDB
const uri = "mongodb+srv://mongodb1765:Azoxmozx123@yansu.lqxy1cs.mongodb.net/?retryWrites=true&w=majority&appName=YanSu";
const client = new MongoClient(uri);
let db;

(async () => {
    try {
        await client.connect();
        db = client.db("automation");
        console.log("تم الاتصال بـ MongoDB");
    } catch (err) {
        console.error("خطأ في الاتصال بـ MongoDB:", err);
    }
})();

// إعداد الميدل وير
app.use(cors());
app.use(express.json());

// نقطة نهاية لإضافة أوامر
app.post("/commands", async (req, res) => {
    try {
        const command = req.body;
        const result = await db.collection("shutdown").insertOne(command);
        res.status(200).json({ message: "تم إضافة الأمر بنجاح", result });
    } catch (err) {
        console.error("خطأ أثناء إضافة الأمر:", err);
        res.status(500).json({ message: "حدث خطأ أثناء إضافة الأمر" });
    }
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`الخادم يعمل على: http://localhost:${port}`);
});
