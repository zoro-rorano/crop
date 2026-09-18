const cropForm =
    document.getElementById("cropForm");


if (cropForm) {

    cropForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const button =
                document.getElementById(
                    "cropButton"
                );

            const result =
                document.getElementById(
                    "cropResult"
                );


            const data = {

                nitrogen:
                    Number(
                        document.getElementById(
                            "nitrogen"
                        ).value
                    ),

                phosphorus:
                    Number(
                        document.getElementById(
                            "phosphorus"
                        ).value
                    ),

                potassium:
                    Number(
                        document.getElementById(
                            "potassium"
                        ).value
                    ),

                ph:
                    Number(
                        document.getElementById(
                            "ph"
                        ).value
                    ),

                temperature:
                    Number(
                        document.getElementById(
                            "temperature"
                        ).value
                    ),

                humidity:
                    Number(
                        document.getElementById(
                            "humidity"
                        ).value
                    ),

                rainfall:
                    Number(
                        document.getElementById(
                            "rainfall"
                        ).value
                    )

            };


            setButtonLoading(
                button,
                true
            );


            try {

                const response =
                    await apiRequest(
                        "/crop-recommendation",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)
                        }
                    );


                const crop =
                    response.crop ||
                    response.recommended_crop ||
                    response.prediction ||
                    "Unknown";


                result.innerHTML = `

                    <div class="result-success">

                        <span class="result-label">
                            AI RECOMMENDATION
                        </span>

                        <div class="result-value">
                            🌾 ${escapeHTML(crop)}
                        </div>

                        <p class="result-description">
                            Based on your soil and
                            environmental conditions.
                        </p>

                        <div class="result-details">

                            <div class="result-detail">
                                <span>Temperature</span>
                                <strong>
                                    ${data.temperature} °C
                                </strong>
                            </div>

                            <div class="result-detail">
                                <span>Humidity</span>
                                <strong>
                                    ${data.humidity} %
                                </strong>
                            </div>

                            <div class="result-detail">
                                <span>Rainfall</span>
                                <strong>
                                    ${data.rainfall} mm
                                </strong>
                            </div>

                            <div class="result-detail">
                                <span>Soil pH</span>
                                <strong>
                                    ${data.ph}
                                </strong>
                            </div>

                        </div>

                    </div>

                `;


                showToast(
                    "Crop recommendation generated!"
                );


            } catch (error) {

                result.innerHTML = `

                    <div class="result-placeholder">

                        <div class="result-placeholder-icon">
                            ⚠️
                        </div>

                        <h3>
                            Prediction Failed
                        </h3>

                        <p>
                            ${escapeHTML(
                                error.message
                            )}
                        </p>

                    </div>

                `;

                showToast(
                    error.message,
                    "error"
                );

            } finally {

                setButtonLoading(
                    button,
                    false
                );

            }

        }
    );

}