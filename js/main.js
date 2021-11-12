
Vue.config.devtools = true;

new Vue({
  el: "#app",
  data: {
        welcome: "Ciao Benvenuto nella Todolist",
        nuovaTask: "",
        coloreNuovaTask: "#ff0000",
        listaTask: [
            {
                text: "Fare la spesa",
                checked: false,
            },
            {
                text: "Andare in banca",
                checked: false,
            },
            {
                text: "Comprare il pane",
                checked: false,
            },
        ],
        filtroVisual: false,
        filtroTesto: "",
        elementoTrovato: null,
    },
  methods: {
    aggiungi() {
        if (this.nuovaTask.trim() === "") {
        return;
        }

        const elementoTrovato = this.listaTask.some((el) => {
            return el.text.toLowerCase() === this.nuovaTask.trim().toLowerCase();
        });

        if (elementoTrovato) {
        return;
        }

        this.listaTask.push({
        text: this.nuovaTask.trim(),
        checked: false,
        color: this.coloreNuovaTask,
        timestamp: Date.now(),
        });

        this.nuovaTask = "";
    },

    /**
     * Al click sulla X in corrispondenza di un elemento,
     * questo deve essere cancellato dalla lista
     */
    cancellaTask(indiceDaCancellare) {
      this.listaTask.splice(indiceDaCancellare, 1);
    },

    taskIncomplete() {
      return this.listaTask.filter((el) => {
        return !el.checked;
      });
    },

    taskFiltrate() {
      return this.listaTask.filter((el) => {
        let returnForzato = true;

        if (this.filtroVisual) {
          returnForzato = el.checked === true;
        }

        if (returnForzato && el.text.toLowerCase().includes(this.filtroTesto.toLowerCase())) {
          returnForzato = true;
        } else {
          returnForzato = false;
        }

        return returnForzato;
      });
    },
  },
});