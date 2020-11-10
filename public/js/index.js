var ViewModel = function() {
  var self = this;
  score = ko.observable(0);
  roll = ko.observable('...');
  showResetBtn = ko.observable(false);
  self.loadSavedScore = function() {
    // get saved score from local storage
    var localScore = Number(localStorage.getItem('localScore'));
    // Update ko observable with localStorage value
    score(localScore);
  }
  // If score found in local storage
  if (localStorage.getItem('localScore')) {
    // load score from local storage
    self.loadSavedScore();
    // Display reset button
    showResetBtn(true);
  }
  self.reset = function() {
    // Reset score to 0
    score(0);
    // Clear local storage
    localStorage.clear();
    // Clear roll
    roll('...');
    // Hide reset button
    showResetBtn(false);
  }
  self.add = function(obs, n) {
    // Add n to observable
    obs(obs() + n);
  }
  self.sub = function(obs, n) {
    // Subtract n from observable
    obs(obs() - n);
  }
  self.isHigh = function() {
    if (roll() >= 7) {
      self.add(score, 2)
    } else {
      self.sub(score, 1)
    }
  }
  self.isLow = function() {
    if (roll() <= 6) {
      self.add(score, 2)
    } else {
      self.sub(score, 1)
    }
  }
  self.isSeven = function() {
    if (roll() === 7) {
      self.add(score, 6)
    } else {
      self.sub(score, 3)
    }
  }
  self.gameLogic = function(guess) {
    // Roll 12 sided dice
    var randNum = Math.floor(Math.random() * 12) + 1;
    roll(randNum);
    // game logic
    // If guess was "high" logic 
    switch (guess) {
      case 'high':
        self.isHigh();
        break;
        // If guess was "low" logic 
      case 'low':
        self.isLow();
        break;
        // If guess was "seven" logic 
      case 'seven':
        self.isSeven();
        break;
    }
    // Save score to localStorage
    localStorage.setItem('localScore', score());
    // Show score reset button
    showResetBtn(true);
  }
}
ko.applyBindings(new ViewModel())