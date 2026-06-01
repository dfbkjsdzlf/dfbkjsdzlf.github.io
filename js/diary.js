document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('diary-form');
  const list = document.getElementById('diary-list');

  function renderEntries() {
    list.innerHTML = '';
    const entries = JSON.parse(localStorage.getItem('riceDiary') || '[]');
    entries.forEach((entry, index) => {
      const card = document.createElement('div');
      card.className = 'diary-card';
      card.innerHTML = `
        <h4>${escapeHTML(entry.title)}</h4>
        <small>${entry.date}</small>
        <p>${escapeHTML(entry.text)}</p>
        <button class="btn-delete" data-index="${index}">Удалить</button>
      `;
      list.appendChild(card);
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.dataset.index;
        const entries = JSON.parse(localStorage.getItem('riceDiary') || '[]');
        entries.splice(idx, 1);
        localStorage.setItem('riceDiary', JSON.stringify(entries));
        renderEntries();
      });
    });
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('entry-title').value.trim();
    const date = document.getElementById('entry-date').value;
    const text = document.getElementById('entry-text').value.trim();
    if (!title || !date) return;
    const entries = JSON.parse(localStorage.getItem('riceDiary') || '[]');
    entries.push({ title, date, text });
    localStorage.setItem('riceDiary', JSON.stringify(entries));
    form.reset();
    renderEntries();
  });

  renderEntries();
});