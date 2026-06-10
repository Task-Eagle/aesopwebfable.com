const API_BASE =
  "https://aesop-api.taskeagle.workers.dev";

async function loadFable() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        params.get("id");

    if (!id) {

        document
            .getElementById("loading")
            .innerHTML =
            "No fable specified.";

        return;
    }

    try {

        const response =
            await fetch(
                `${API_BASE}/api/fables/${id}`
            );

        if (!response.ok) {

            document
                .getElementById(
                    "loading"
                )
                .innerHTML =
                "Fable not found.";

            return;
        }

        const fable =
            await response.json();

        document.title =
            fable.title;

        document
            .getElementById(
                "title"
            )
            .textContent =
            fable.title;

        document
            .getElementById(
                "author"
            )
            .textContent =
            `by ${fable.author}`;

        document
            .getElementById(
                "category"
            )
            .textContent =
            fable.category;

        document
            .getElementById(
                "story"
            )
            .textContent =
            fable.body;

        document
            .getElementById(
                "moral"
            )
            .textContent =
            fable.moral;

        document
            .getElementById(
                "loading"
            )
            .classList.add(
                "hidden"
            );

        document
            .getElementById(
                "fable-container"
            )
            .classList.remove(
                "hidden"
            );

    } catch (err) {

        document
            .getElementById(
                "loading"
            )
            .innerHTML =
            "Failed to load fable.";

        console.error(err);
    }
}

loadFable();
