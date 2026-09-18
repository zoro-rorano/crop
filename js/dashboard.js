async function loadDashboardStats() {

    try {

        const history =
            await apiRequest("/history");

        const records =
            Array.isArray(history)
                ? history
                : history.records || [];

        let crop = 0;
        let disease = 0;
        let yieldCount = 0;

        records.forEach(item => {

            const type =
                String(
                    item.type ||
                    item.prediction_type ||
                    ""
                ).toLowerCase();

            if (type.includes("crop")) {
                crop++;
            }

            if (type.includes("disease")) {
                disease++;
            }

            if (type.includes("yield")) {
                yieldCount++;
            }

        });


        const cropElement =
            document.getElementById("cropCount");

        const diseaseElement =
            document.getElementById("diseaseCount");

        const yieldElement =
            document.getElementById("yieldCount");


        if (cropElement)
            cropElement.textContent = crop;

        if (diseaseElement)
            diseaseElement.textContent = disease;

        if (yieldElement)
            yieldElement.textContent = yieldCount;


    } catch (error) {

        console.log(
            "Dashboard statistics unavailable."
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    loadDashboardStats
);