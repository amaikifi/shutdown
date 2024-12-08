document.getElementById("sendCommandButton").addEventListener("click", async () => {
    const command = {
        commandText: "shutdown",
        status: "pending",
        timestamp: new Date()
    };

    try {
        const response = await fetch("http://localhost:3000/commands", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(command)
        });

        if (response.ok) {
            alert("تم إرسال الأمر بنجاح إلى قاعدة البيانات!");
        } else {
            alert("حدث خطأ أثناء إرسال الأمر.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("تعذر الاتصال بالخادم.");
    }
});
