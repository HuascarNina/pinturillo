class Scoreboard {
  constructor() {
    // get 5 best scores from local storage
    this.scores = JSON.parse(localStorage.getItem('scores')) || [];
  }

  set({ username, time, levels }) {
    // add new score to the list
    this.scores.push({ username, time, levels });
    // sort scores by time
    this.scores.sort((a, b) => a.time - b.time);
    // keep only 5 best scores
    this.scores = this.scores.slice(0, 5);
    // save scores to local storage
    localStorage.setItem('scores', JSON.stringify(this.scores));
  }
}

export const scoreboard = new Scoreboard();