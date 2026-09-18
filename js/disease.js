const diseaseForm =
    document.getElementById("diseaseForm");

const uploadArea =
    document.getElementById("uploadArea");

const leafImage =
    document.getElementById("leafImage");

const imagePreview =
    document.getElementById("imagePreview");

const imagePreviewContainer =
    document.getElementById(
        "imagePreviewContainer"
    );

const removeImage =
    document.getElementById(
        "removeImage"
    );


if (uploadArea && leafImage) {

    uploadArea.addEventListener(
        "click",
        () => leafImage.click()
    );


    uploadArea.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

            uploadArea.style.borderColor =
                "#16834b";

        }
    );


    uploadArea.addEventListener(
        "dragleave",
        () => {

            uploadArea.style.borderColor =
                "";

        }
    );


    uploadArea.addEventListener(
        "drop",
        event => {

            event.preventDefault();

            uploadArea.style.borderColor =
                "";

            if (
                event.dataTransfer.files.length
            ) {

                leafImage.files =
                    event.dataTransfer.files;

                previewImage(
                    event.dataTransfer.files[0]
                );

            }

        }
    );


    leafImage.addEventListener(
        "change",
        () => {

            if (leafImage.files.length) {

                previewImage(
                    leafImage.files[0]
                );

            }

        }
    );

}


function previewImage(file) {

    if (!file ||
        !file.type.startsWith("image/")) {

        showToast(
            "Please select a valid image.",
            "error"
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload = event => {

        imagePreview.src =
            event.target.result;

        imagePreviewContainer.style.display =
            "block";

        uploadArea.style.display =
            "none";

    };


    reader.readAsDataURL(file);

}


if (removeImage) {

    removeImage.addEventListener(
        "click",
        () => {

            leafImage.value = "";

            imagePreview.src = "";

            imagePreviewContainer.style.display =
                "none";

            uploadArea.style.display =
                "block";

        }
    );

}


if (diseaseForm) {

    diseaseForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!leafImage.files.length) {

                showToast(
                    "Please upload a leaf image.",
                    "error"
                );

                return;

            }


            const crop =
                document.getElementById(
                    "cropType"
                ).value;


            if (!crop) {

                showToast(
                    "Please select a crop.",
                    "error"
                );

                return;

            }


            const button =
                document.getElementById(
                    "diseaseButton"
                );


            const result =
                document.getElementById(
                    "diseaseResult"
                );


            const formData =
                new FormData();


            formData.append(
                "image",
                leafImage.files[0]
            );


            formData.append(
                "crop",
                crop
            );


            setButtonLoading(
                button,
                true
            );


            try {

                const response =
                    await apiRequest(
                        "/disease-prediction",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const disease =
                    response.disease ||
                    response.prediction ||
                    response.result ||
                    "Unknown";


                const confidence =
                    Number(
                        response.confidence || 0
                    );


                const recommendation =
                    response.recommendation ||
                    response.advice ||
                    "Follow recommended crop protection practices.";


                result.innerHTML = `

                    <div class="result-success">

                        <span class="result-label">
                            AI DISEASE ANALYSIS
                        </span>

                        <div class="result-value">
                            🔬 ${escapeHTML(disease)}
                        </div>

                        <p class="result-description">
                            Crop: ${escapeHTML(crop)}
                        </p>

                        <div class="confidence">

                            <div class="confidence-header">

                                <span>
                                    Confidence
                                </span>

                                <strong>
                                    ${confidence}%
                                </strong>

                            </div>

                            <div class="progress">

                                <div
                                    class="progress-bar"
                                    style="
                                    width:${confidence}%;
                                    ">
                                </div>

                            </div>

                        </div>

                        <div class="result-details">

                            <div class="result-detail">

                                <span>
                                    Recommendation
                                </span>

                                <strong>
                                    ${escapeHTML(
                                        recommendation
                                    )}
                                </strong>

                            </div>

                        </div>

                    </div>

                `;


                showToast(
                    "Disease analysis completed!"
                );


            } catch (error) {

                result.innerHTML = `

                    <div class="result-placeholder">

                        <div class="result-placeholder-icon">
                            ⚠️
                        </div>

                        <h3>
                            Analysis Failed
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