document.addEventListener('DOMContentLoaded', function() {
  var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var dice = [0, 0];
  var selectedTiles = [];
  var soundEffects = [
    'https://s10.krakenfiles.com/uploads/23-06-2023/VZL5JaGwTs/music.m4a',
    'https://s10.krakenfiles.com/uploads/23-06-2023/700PP165iF/music.m4a',
    'https://s10.krakenfiles.com/uploads/23-06-2023/ryNQol7q6u/music.m4a'
  ];
  var currentSoundEffectIndex = 0;

  function toggleTile(tile) {
    var tileButton = document.getElementById('tile' + tile);
    var index = selectedTiles.indexOf(tile);

    if (index > -1) {
      selectedTiles.splice(index, 1);
      tileButton.classList.remove('highlighted');
    } else {
      selectedTiles.push(tile);
      tileButton.classList.add('highlighted');
    }

    playSoundEffect();
  }

  function playSoundEffect() {
    var soundEffectIndex = Math.floor(selectedTiles.length / 3);
    if (soundEffectIndex >= soundEffects.length) {
      soundEffectIndex = soundEffects.length - 1;
    }

    var audio = new Audio(soundEffects[soundEffectIndex]);
    audio.play().catch(function(error) {
      console.log('Error playing sound:', error);
    });
  }

  function rollDice() {
    disableRollButton();

    var rollButton = document.getElementById('rollButton');
    rollButton.innerText = 'Rolling...';

    var diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = '';

    var firstRollDelay = 3000; // 3 seconds
    var secondRollDelay = 1000; // 1 second

    setTimeout(function() {
      var dice1 = Math.floor(Math.random() * 6) + 1;
      updateDiceModel(1, dice1);
    }, firstRollDelay);

    setTimeout(function() {
      var dice2 = Math.floor(Math.random() * 6) + 1;
      updateDiceModel(2, dice2);
      enableRollButton();
    }, firstRollDelay + secondRollDelay);
  }

  function updateDiceModel(diceNum, diceValue) {
    var diceContainer = document.getElementById('diceContainer');
    var diceModel = document.createElement('div');
    diceModel.className = 'dice-model';
    diceModel.innerText = diceValue;
    diceContainer.appendChild(diceModel);
  }

  function disableRollButton() {
    var rollButton = document.getElementById('rollButton');
    rollButton.disabled = true;
    rollButton.classList.add('disabled');
  }

  function enableRollButton() {
    var rollButton = document.getElementById('rollButton');
    rollButton.disabled = false;
    rollButton.classList.remove('disabled');
    rollButton.innerText = 'Roll Dice';
  }

  // Event listener for each tile button
  for (var i = 0; i < tiles.length; i++) {
    var tileButton = document.getElementById('tile' + tiles[i]);
    tileButton.addEventListener('click', function() {
      var tileValue = parseInt(this.innerText);
      toggleTile(tileValue);
    });
  }

  // Event listener for roll dice button
  document.getElementById('rollButton').addEventListener('click', function() {
    rollDice();
  });

  // Event listener for reset button
  document.getElementById('resetButton').addEventListener('click', function() {
    selectedTiles.forEach(function(tile) {
      var tileButton = document.getElementById('tile' + tile);
      tileButton.classList.remove('highlighted');
    });
    selectedTiles = [];
    resetGame();
  });

  function resetGame() {
    dice = [0, 0];
    var diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = '';
    currentSoundEffectIndex = 0;
  }

});
