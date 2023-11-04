const addCommentHandler = async (event) => {
    event.preventDefault();

    const newComment = document.querySelector('#comment').value.trim();
    const userId = req.session.user_id;
    const postId = parseInt(window.location.pathname.split('/').pop());

    if (newComment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ newComment, userId, postId }),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create a comment')
        }
    }
}

document
    .querySelector('#comment-form')
    .addEventListener('submit', addCommentHandler);