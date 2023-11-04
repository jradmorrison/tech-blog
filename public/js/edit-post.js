const post_id = parseInt(window.location.pathname.split('/').pop());

const handlePostUpdate = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error updating post')
        }
    }
};

const handlePostDelete = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to delete a post.");
    }
};

document.querySelector('#update').addEventListener('click', handlePostUpdate);
document.querySelector('#delete').addEventListener('click', handlePostDelete);