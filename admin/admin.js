async function loadPending() {

    const response =
        await fetch(
            'https://YOUR-WORKER.workers.dev/api/admin/pending'
        );

    const fables =
        await response.json();

    const container =
        document.getElementById(
            'pending-list'
        );

    container.innerHTML = '';

    fables.forEach(fable => {

        container.innerHTML += `
            <div
                style="
                    border:1px solid #ddd;
                    padding:16px;
                    margin-bottom:12px;
                ">

                <h3>${fable.title}</h3>

                <p>
                    <strong>Author:</strong>
                    ${fable.author}
                </p>

                <p>
                    ${fable.body.substring(0,300)}
                </p>

                <button
                    onclick="approve(${fable.id})">
                    Approve
                </button>

                <button
                    onclick="reject(${fable.id})">
                    Reject
                </button>

            </div>
        `;
    });
}

loadPending();

async function approve(id) {

    await fetch(
        `https://YOUR-WORKER.workers.dev/api/admin/approve/${id}`,
        {
            method: 'POST'
        }
    );

    loadPending();
}

async function reject(id) {

    await fetch(
        `https://YOUR-WORKER.workers.dev/api/admin/reject/${id}`,
        {
            method: 'POST'
        }
    );

    loadPending();
}
