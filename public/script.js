document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const feedback = document.getElementById('feedback').value;

  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, feedback })
  });

  if (res.ok) {
    alert("Feedback submitted!");
    document.getElementById('feedbackForm').reset();
  } else {
    alert("Error submitting feedback");
  }
});
