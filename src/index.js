const Vue = require("./js/vendor/vue.min.js");
import {where} from "underscore";
import "./js/vendor/jPages.min.js";

// 
// ======================================================/
const store = {
  debug: true,
  state: {
    message: "",
    filteredId: ""
  },
  ajaxLoader: () => {
    const ajaxUrl = "src/js/ajax/bonsai.json";
    let request = new XMLHttpRequest();
    request.open("GET", ajaxUrl, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText);
        store.state.message = data.bonsai;
      } else {
        // console.log();
      }
    };
    request.onerror = () => {
      // console.log();
    };
    request.send();
  },

  filterId: (idToFilter) => {
    store.state.filteredId = where(store.state.message, {
      id: idToFilter
    });
    console.log(store.state.filteredId);
  }
};

// 
// ======================================================/
const vmA = new Vue({
  el: "#app",
  data: {
    privateState: {},
    sharedState: store.state
  },
  beforeCreate: () => {
    console.log("beforeCreate");
  },
  created: () => {
    console.log("created");

  },
  beforeUpdate: () => {
    console.log("beforeUpdate: destroy jPages");
  },
  updated: () => {
    console.log("updated: new jPages");
    showPages();
  },
  methods: {
    showPages: () => {
      showPages();
    }
  }
});

const vmB = new Vue({
  el: "#app2",
  data: {
    privateState: {},
    sharedState: store.state
  }
});

const vmC = new Vue({
  el: "#descriptionBox",
  data: {
    privateState: {},
    sharedState: store.state
  }
});

// 
// ======================================================/
const showPages = () => {
  // require.ensure("./js/vendor/jPages.min.js", () => {
    // resolve(require("./js/vendor/jPages.min.js"));
    $("#paginator").jPages({
      containerID: "galleryContainer",
      first: "first",
      previous: "previous",
      next: "next",
      last: "last",
      links: "numeric", // blank || title
      delay: 0, // to remove fade
      fallback: 0, // to remove fade
      startPage: 1,
      perPage: 10,
      midRange: 5,
    });
  
};

(function () {
  const start = () => {
    console.log("document ready");
    $(document.body).on("click", "img", function () {
      store.filterId(this.id);
    });
  };
  if (document.readyState !== "loading") start();
  else if (document.addEventListener) document.addEventListener("DOMContentLoaded", start);
  else document.attachEvent("onreadystatechange", function () {
    if (document.readyState === "complete") start();
  });
})();

store.ajaxLoader();