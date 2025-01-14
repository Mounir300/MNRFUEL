// تخزين النتائج لكل مركز
const centersData = {};

// دالة الحساب الرئيسية
function calculate() {
    const center = document.getElementById("center").value;
    const worker = document.getElementById("worker").value;

    // جلب القيم للوقود
    const fuels = [
        { name: "ديزيل 1", meterIn: "meterInDiesel1", meterOut: "meterOutDiesel1", price: "priceDiesel1" },
        { name: "ديزيل 2", meterIn: "meterInDiesel2", meterOut: "meterOutDiesel2", price: "priceDiesel2" },
        { name: "Essence", meterIn: "meterInEssence", meterOut: "meterOutEssence", price: "priceEssence" },
        { name: "EXCELLIUM V-POWER", meterIn: "meterInExcVPower", meterOut: "meterOutExcVPower", price: "priceExcVPower" }
    ];

    // حساب البيانات لكل نوع وقود
    let centerData = [];
    fuels.forEach(fuel => {
        const meterIn = parseFloat(document.getElementById(fuel.meterIn).value) || 0;
        const meterOut = parseFloat(document.getElementById(fuel.meterOut).value) || 0;
        const price = parseFloat(document.getElementById(fuel.price).value) || 0;

        const quantity = meterOut - meterIn;
        const revenue = quantity * price;

        centerData.push({
            type: fuel.name,
            meterIn,
            meterOut,
            quantity,
            price,
            revenue
        });
    });

    // تخزين بيانات المركز
    centersData[center] = { worker, data: centerData };

    // تحديث الجداول
    updateResultsTable();
}

// دالة لتحديث الجداول
function updateResultsTable() {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // تفريغ النتائج القديمة

    let totalQuantity = 0;
    let totalRevenue = 0;

    // إنشاء جدول لكل مركز
    for (const center in centersData) {
        const { worker, data } = centersData[center];

        const centerTable = document.createElement("table");
        centerTable.className = "center-table";
        centerTable.innerHTML = `
            <thead>
                <tr>
                    <th>المركز</th>
                    <th>العامل</th>
                    <th>النوع</th>
                    <th>عداد الدخول</th>
                    <th>عداد الخروج</th>
                    <th>الكمية (لتر)</th>
                    <th>السعر (MAD)</th>
                    <th>الإيرادات (MAD)</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = centerTable.querySelector("tbody");
        data.forEach(fuel => {
            tbody.innerHTML += `
                <tr>
                    <td>${center}</td>
                    <td>${worker}</td>
                    <td>${fuel.type}</td>
                    <td>${fuel.meterIn.toFixed(2)}</td>
                    <td>${fuel.meterOut.toFixed(2)}</td>
                    <td>${fuel.quantity.toFixed(2)}</td>
                    <td>${fuel.price.toFixed(2)}</td>
                    <td>${fuel.revenue.toFixed(2)}</td>
                </tr>
            `;

            // تحديث الإجماليات
            totalQuantity += fuel.quantity;
            totalRevenue += fuel.revenue;
        });

        resultsContainer.appendChild(centerTable);
    }

    // إضافة جدول الإجماليات
    const totalTable = document.createElement("table");
    totalTable.className = "total-table";
    totalTable.innerHTML = `
        <thead>
            <tr>
                <th>الإجمالي</th>
                <th>الكمية الكلية (لتر)</th>
                <th>الإيرادات الكلية (MAD)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>لكل المراكز</td>
                <td>${totalQuantity.toFixed(2)}</td>
                <td>${totalRevenue.toFixed(2)}</td>
            </tr>
        </tbody>
    `;
    resultsContainer.appendChild(totalTable);
}