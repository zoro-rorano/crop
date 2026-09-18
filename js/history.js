async function loadHistory() {

    const table =
        document.getElementById(
            "historyTable"
        );


    if (!table) return;


    table.innerHTML = `

        <tr>

            <td colspan="4"
                class="loading-cell">

                Loading predictions...

            </td>

        </tr>

    `;


    try {

        const response =
            await apiRequest(
                "/history"
            );


        const records =
            Array.isArray(response)
                ? response
                : response.records || [];


        if (!records.length) {

            table.innerHTML = `

                <tr>

                    <td colspan="4"
                        class="loading-cell">

                        No predictions found.

                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            records.map(item => {

                const type =
                    item.type ||
                    item.prediction_type ||
                    "Prediction";


                const input =
                    item.input ||
                    item.crop ||
                    item.details ||
                    "-";


                const result =
                    item.result ||
                    item.prediction ||
                    item.disease ||
                    item.crop ||
                    "-";


                const date =
                    item.created_at ||
                    item.date ||
                    "-";


                return `

                    <tr>

                        <td>
                            ${escapeHTML(type)}
                        </td>

                        <td>
                            ${escapeHTML(input)}
                        </td>

                        <td>
                            <strong>
                                ${escapeHTML(result)}
                            </strong>
                        </td>

                        <td>
                            ${escapeHTML(date)}
                        </td>

                    </tr>

                `;

            }).join("");


    } catch (error) {

        table.innerHTML = `

            <tr>

                <td colspan="4"
                    class="loading-cell">

                    Unable to load history.

                </td>

            </tr>

        `;

    }

}


document.addEventListener(
    "DOMContentLoaded",
    loadHistory
);