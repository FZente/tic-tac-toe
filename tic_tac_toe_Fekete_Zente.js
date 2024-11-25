const TicTac = {
  jatekos: "X",                    // Az X játékost követi
  allapot: Array(9).fill(null),   // Minden üres cellának null az értéke
  jatekvege: false,              // Ha véget ér a játék, akkor hamis lesz a kimeneti adat

  
  init() {
      this.Tabla();
      document
          .getElementById("reset")
          .addEventListener("click", () => this.reset());
  },

  oneinit(){
    this.Tabla();
      document
          .getElementById("one-player")
          .addEventListener("click", () => this.egyjatekos());
  },

  twoinit(){
      document
          .getElementById("two-player")
          .addEventListener("click", () => this.ketjatekos());
  },
  
  Tabla() {
      const board = document.getElementById("board");
      board.innerHTML = "";                                // Ez mindegyik elemet üresre állítja
      this.allapot.forEach((_, i) => {                    //Ezek jelenítik meg a négyzeteket
          const cell = document.createElement("div"); 
          cell.classList.add("cell");
          cell.dataset.index = i;
          board.appendChild(cell);
      });
      board.addEventListener("click", (e) => this.kattintas(e)); // Ha clikkelést érzékel
      
      message.textContent = "X következik";
      this.jatekvege = false;
  },

  kattintas(e) {
      const cell = e.target;
      const i = cell.dataset.index;

      // Nem számítja be a kattintásokat, ha a négyzeten van már karakter vagy, hogy véget ért a játék
      if (this.jatekvege || !cell.classList.contains("cell") || this.allapot[i])
          return;

      this.allapot[i] = this.jatekos;
      cell.textContent = this.jatekos;
      cell.classList.add("taken");

      const gyozteskombo = this.Gyoztes();
      if (gyozteskombo) {
          this.kiemeles(gyozteskombo);
          this.Visszajelzes(`${this.jatekos} játékos nyert!`);
          this.jatekvege = true;
      } else if (this.allapot.every((i) => i)) {
          this.Visszajelzes("Döntetlen!");
          this.jatekvege = true;
      } else {
          this.jatekos = this.jatekos === "X" ? "O" : "X";    // Ez a rész felel azért, hogy az X és az O váltsák egymást
      }
      
      if (this.jatekmode === "one-player" && this.jatekos === "O") {
        setTimeout(computerMove, 500);
      }
  },

  Gyoztes() {
      const gyoz = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], 
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8], 
          [0, 4, 8],
          [2, 4, 6], 
      ];
      return gyoz.find((i) => i.every((i) => this.allapot[i] == this.jatekos)
      );
  },

  kiemeles(combo) {
      combo.forEach((i) => {
          document.getElementById("board").children[i].style.color = "red";
      });
  },

  reset() {
      this.allapot = Array(9).fill(null);
      this.jatekos = "X";
      this.jatekvege = false;
      this.Tabla();
  },

  Visszajelzes(msg) {
      document.getElementById("message").textContent = msg;
  },

  gameMode: "two-player", 

  computerMove() {
    const emptyCells = this.allapot.map((i, idx) => (i === null ? idx : null)).filter((i) => i !== null);
    let mozgas = this.legjobbLepesKereses("O") || this.legjobbLepesKereses("X") || emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    this.allapot[mozgas] = "O";
    const cell = document.querySelector(`.cell[data-index="${mozgas}"]`);
    cell.textContent = "O";
    cell.classList.add("taken");

    if (Gyoztes("O")) {
        message.textContent = "A számítógép nyert!";
        this.jatekvege = true;
    } else if (cells.every((cell) => cell)) {
        message.textContent = "A játék döntetlen.";
        this.jatekvege = true;
    } else {
        this.jatekos = "X";
        message.textContent = `${jatekos} következik`;
    }
  },
  
  legjobbLepesKereses(jatekos) {
      const gyozvezkom = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];

      for (const pattern of gyozvezkom) {
          const values = pattern.map((index) => cells[index]);
          if (values.filter((i) => i === jatekos).length === 2 && values.includes(null)) {
              return pattern[values.indexOf(null)];
          }
      }
      return null;
  },

  egyjatekos() {
    this.allapot = Array(9).fill(null);
    this.jatekos = "X";
    this.jatekvege = false;
    this.Tabla();
    this.gameMode = "one-player";
  },

  ketjatekos() {
    this.allapot = Array(9).fill(null);
    this.jatekos = "X";
    this.jatekvege = false;
    this.Tabla();
    this.gameMode = "two-player";
  },

};

TicTac.init();
TicTac.oneinit();
TicTac.twoinit();