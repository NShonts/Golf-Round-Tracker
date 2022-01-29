// Round Class: Represents a Round
class Round {
    constructor(course, score, date) {
        this.course = course;
        this.score = score;
        this.date = date;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayRounds() {
        const rounds = Store.getRounds();

        rounds.forEach((round) => UI.addRoundToList(round));
    }

    static addRoundToList(round) {
        const list = document.querySelector('#round-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${round.course}</td>
            <td>${round.score}</td>
            <td>${round.date}</td>
            <td><a href="#" class="btn-delete">X</td>
        `;

        list.appendChild(row);
    }

    static deleteRound(el) {
        if(el.classList.contains('btn-delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#course').value = '';
        document.querySelector('#score').value = '';
        document.querySelector('#date').value = '';
    }
}

// Storage Class: Local Storage
class Store {
    static getRounds() {
        let rounds;
        if(localStorage.getItem('rounds') === null) {
            rounds = [];
        } else {
            rounds = JSON.parse(localStorage.getItem('rounds'));
        }
        return rounds;
    }

    static addRound(round) {
        const rounds = Store.getRounds();
        rounds.push(round);
        localStorage.setItem('rounds', JSON.stringify(rounds));
    }

    static removeRound(date) {
        const rounds = Store.getRounds();
        rounds.forEach((round, index) => {
            if(round.date === date) {
                rounds.splice(index, 1);
            }
        });

        localStorage.setItem('rounds', JSON.stringify(rounds));
    }
}

// Event: Display Rounds
document.addEventListener('DOMContentLoaded', UI.displayRounds);

// Event: Add a Round
document.querySelector('#round-form').addEventListener('submit', (e) => {
    // Prevent submit
    e.preventDefault();

    // Get form values
    const course = document.querySelector('#course').value;
    const score = document.querySelector('#score').value;
    const date = document.querySelector('#date').value;

    // Validate
    if(course == '' || score == '' || date == '') {
        alert('Please fill in all fields');
    } else {

      // Instantiate Round
      const round = new Round(course, score, date);

      // Add round to UI
      UI.addRoundToList(round);

      // Add round to store
      Store.addRound(round);

      // Clear fields
      UI.clearFields();
    }
});

// Event: Remove a Round
document.querySelector('#round-list').addEventListener('click', (e) => {
    // Remove round from UI
    UI.deleteRound(e.target);

    // Remove round from store
    Store.removeRound(e.target.parentElement.previousElementSibling.textContent);
});

