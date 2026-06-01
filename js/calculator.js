document.getElementById('calc-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const riceType = document.getElementById('rice-type').value;
  const portions = parseInt(document.getElementById('portions').value, 10);

  if (!riceType || isNaN(portions) || portions < 1) {
    alert('Выберите сорт и укажите хотя бы 1 порцию');
    return;
  }

  const ratios = {
    basmati:    { water: 150, cook: 12, rest: 5 },
    jasmine:    { water: 160, cook: 10, rest: 5 },
    round:      { water: 200, cook: 15, rest: 10 },
    arborio:    { water: 220, cook: 18, rest: 0 },
    parboiled:  { water: 180, cook: 17, rest: 5 }
  };

  const data = ratios[riceType];
  const totalWater = data.water * portions;

  document.getElementById('result-water').textContent = totalWater + ' мл';
  document.getElementById('result-cook').textContent = data.cook + ' мин';
  document.getElementById('result-rest').textContent = data.rest > 0 ? data.rest + ' мин' : 'не требуется';
  document.getElementById('result-block').style.display = 'block';
});