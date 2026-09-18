const yieldForm =
    document.getElementById(
        "yieldForm"
    );


if (yieldForm) {

    yieldForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                document.getElementById(
                    "yieldButton"
                );


            const result =
                document.getElementById(
                    "yieldResult"
                );


            const data = {

                crop:
                    document.getElementById(
                        "yieldCrop"
                    ).value,

                area:
                    Number(
                        document.getElementById(
                            "area"
                        ).value
                    ),

                rainfall:
                    Number(
                        document.getElementById(
                            "yieldRainfall"
                        ).value
                    ),

                temperature:
                    Number(
                        document.getElementById(
                            "yieldTemperature"
                        ).value
                    ),

                humidity:
                    Number(
                        document.getElementById(
                            "yieldHumidity"
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
                        "/yield-prediction",
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


                const prediction =
                    response.predicted_yield ??
                    response.yield ??
                    response.prediction ??
                    0;


                result.innerHTML = `

                    <div class="result-success">

                        <span class="result-label">
                            AI YIELD FORECAST
                        </span>

                        <div class="result-value">
                            📈
                            ${escapeHTML(
                                prediction
                            )}
                        </div>

                        <p class="result-description">
                            Estimated crop production
                        </p>

                        <div class="result-details">

                            <div class="result-detail">

                                <span>
                                    Crop
                                </span>

                                <strong>
                                    ${escapeHTML(
                                        data.crop
                                    )}
                                </strong>

                            </div>


                            <div class="result-detail">

                                <span>
                                    Area
                                </span>

                                <strong>
                                    ${data.area} ha
                                </strong>

                            </div>


                            <div class="result-detail">

                                <span>
                                    Rainfall
                                </span>

                                <strong>
                                    ${data.rainfall} mm
                                </strong>

                            </div>


                            <div class="result-detail">

                                <span>
                                    Temperature
                                </span>

                                <strong>
                                    ${data.temperature} °C
                                </strong>

                            </div>


                            <div class="result-detail">

                                <span>
                                    Humidity
                                </span>

                                <strong>
                                    ${data.humidity} %
                                </strong>

                            </div>

                        </div>

                    </div>

                `;


                showToast(
                    "Yield prediction generated!"
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