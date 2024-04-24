var ingredientCount = 1;
var selectedIngredients = []; // Array to store selected ingredients

document.getElementById("add").addEventListener("click", function () {
   // Get the text from the div
   var searchText = document.getElementById("search_btn").textContent.trim();

   // Check if the selected ingredient is not already in the list of selected ingredients
   if (searchText !== "Search Ingredients" && !selectedIngredients.includes(searchText)) {
      selectBtn.firstElementChild.innerText = "Search Ingredients";

      // Create a new div element
      var newDiv = document.createElement("div");

      // Assign class and id to the new div
      newDiv.className = "ings";
      newDiv.id = "ing" + ingredientCount;

      // Set the text of the new div to be the same as the text in the search bar
      newDiv.innerText = searchText;

      // Add the selected ingredient to the list of selected ingredients
      selectedIngredients.push(searchText);

      ingredientCount++;

      // Append the new div to the ingredients section
      var ingredientsContainer = document.querySelector(".ingredients");
      ingredientsContainer.appendChild(newDiv);
   } else if (selectedIngredients.includes(searchText)) {
      alert("Error: Ingredient already selected.");
   } else {
      alert("Error: Ensure an ingredient is selected.");
   }
});

let ingredients; // Define ingredients in a scope accessible to both functions

fetch("./text.json")
   .then((response) => response.json())
   .then((data) => {
      console.log(data);
      ingredients = data.recipes.map((ingredient) => ingredient.name);
      populateSearchOptions(ingredients);
   })
   .catch((error) => console.error("Error loading ingredients:", error));

// Function to populate the search bar options
function populateSearchOptions(ingredients) {
   const optionsList = document.querySelector(".options");

   ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      li.addEventListener("click", () => {
         updateName(ingredient);
         document.getElementById("search_btn").style.display = "flex";
      });
      optionsList.appendChild(li);
   });
}

const wrapper = document.querySelector(".drop_down"),
   selectBtn = wrapper.querySelector(".search_ingr"),
   searchInp = wrapper.querySelector("input"),
   options = wrapper.querySelector(".options");

function updateName(selectedText) {
   searchInp.value = "";
   wrapper.classList.remove("active");
   selectBtn.firstElementChild.innerText = selectedText;
}

searchInp.addEventListener("keyup", () => {
   let searchedVal = searchInp.value.toLowerCase();
   let arr = ingredients
      .filter((data) => {
         return data.toLowerCase().startsWith(searchedVal);
      })
      .map((data) => `<li>${data}</li>`)
      .join("");

   options.innerHTML = arr ? arr : "<p>Oops! Ingredient not found.</p>";

   // Add click event listener to dynamically created options
   options.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", (event) => {
         const selectedText = event.target.textContent;
         updateName(selectedText);
         document.getElementById("search_btn").style.display = "flex";
      });
   });
});

selectBtn.addEventListener("click", () => {
   wrapper.classList.toggle("active");
   document.getElementById("search_btn").style.display = "none";
});
