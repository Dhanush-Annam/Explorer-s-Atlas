const API_URL = "https://explorer-s-atlas.onrender.com/api/reviews";

function submitReview() {
  const name = document.getElementById('name').value.trim();
  const comment = document.getElementById('comment').value.trim();
  const ratingEl = document.querySelector('input[name="rating"]:checked');

  if (!name || !comment || !ratingEl) {
    alert("Please fill out all fields including rating.");
    return;
  }

  const rating = parseInt(ratingEl.value);

  const reviewData = { name, rating, comment };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData)
  })
  .then(response => {
    if (!response.ok) throw new Error("Error submitting review");
    return response.json();
  })
  .then(() => {
    loadReviews();
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
    document.querySelectorAll('input[name="rating"]').forEach(el => el.checked = false);
  })
  .catch(err => alert("Failed to submit review: " + err.message));
}

function loadReviews() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const reviewList = document.getElementById('reviewList');
      reviewList.innerHTML = '<h3>Reviews</h3>';
      data.forEach(review => {
        const item = document.createElement('div');
        item.className = 'review-item';
        item.innerHTML = `
          <strong>${review.name}</strong>
          <span>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
          <p>${review.comment}</p>
        `;
        reviewList.appendChild(item);
      });
    })
    .catch(err => console.error("Error loading reviews:", err));
}

window.onload = loadReviews;


