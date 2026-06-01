document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('load-recipes');
  const container = document.getElementById('recipes-container');
  const loader = document.getElementById('loader');

  if (!btn) return;

  btn.addEventListener('click', async () => {
    container.innerHTML = '';
    loader.style.display = 'block';
    btn.disabled = true;

    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=rice');
      if (!response.ok) throw new Error('Ошибка сети');
      const data = await response.json();
      if (!data.meals) {
        container.innerHTML = '<p>Рецепты не найдены.</p>';
        return;
      }
      data.meals.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${meal.strMealThumb}/preview" alt="${meal.strMeal}" loading="lazy">
          <h3>${meal.strMeal}</h3>
        `;
        container.appendChild(card);
      });
    } catch (err) {
      container.innerHTML = '<p style="color:red">Ошибка загрузки. Проверьте интернет.</p>';
      console.error(err);
    } finally {
      loader.style.display = 'none';
      btn.disabled = false;
    }
  });
});