const API_BASE_URL = "http://127.0.0.1:8000/api";


function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }

}


function showToast(message, type = "success") {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.className =
        `toast show ${type === "error" ? "error" : ""}`;

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


async function apiRequest(
    endpoint,
    options = {}
) {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}${endpoint}`,
                options
            );

        if (!response.ok) {

            let errorMessage =
                "Server request failed";

            try {

                const error =
                    await response.json();

                if (error.detail) {
                    errorMessage =
                        error.detail;
                }

            } catch (_) {}

            throw new Error(errorMessage);
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        throw error;

    }

}


function setButtonLoading(
    button,
    loading,
    normalText
) {

    if (!button) return;

    if (loading) {

        button.disabled = true;

        button.dataset.originalText =
            button.innerHTML;

        button.innerHTML =
            "⏳ Analyzing...";

    } else {

        button.disabled = false;

        button.innerHTML =
            button.dataset.originalText ||
            normalText;

    }

}


function escapeHTML(value) {

    if (value === null ||
        value === undefined) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
