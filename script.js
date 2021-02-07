const getFoodList = () => {
  let searchInputTxt = document.getElementById("search-input").value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
        displayFood(data.meals);
    });
};

const displayFood = (foods) =>{
    let foodContainer = document.getElementById("food-container");
    // let foods = data.meals;
    if(foods === null || foods.length <0){
      const foodDiv = document.createElement("div");
      const foodInfo = `
          <h3 class="nothing"> Sorry, we didn't find any food!,Please search again.</h3>
      `;
      foodDiv.innerHTML = foodInfo;
      foodContainer.appendChild(foodDiv);
    }else{
      foods.forEach((food) => {
          // console.log(food);
          const foodDiv = document.createElement("div");
          foodDiv.className = "col-md-4 my-3 foodDiv";
          const foodInfo = `
                  <div onclick="displayCountryDetail('${food.idMeal}')" class="card" style="width: 18rem;">
                      <img  class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
                      <div class="card-body">
                          <p class="card-text"><h4>${food.strMeal}</h4></p>
                      </div>
                  </div>
              `;
          foodDiv.innerHTML = foodInfo;
          foodContainer.appendChild(foodDiv);
        });
    }
    document.getElementById("search-input").value = "";
}

const displayCountryDetail = foodDetails => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodDetails}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        getFoodInfo(data.meals[0]);
    });
}

const getFoodInfo = food => {
    const foodDetail = document.getElementById('food-details');
    const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		if (food[`strIngredient${i}`]) {
			ingredients.push(`${food[`strMeasure${i}`]}-${food[`strIngredient${i}`]}`);
		} else {
			break;
		}
	}
    foodDetail.innerHTML = `
        <div class="card card-custom">
            <img class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
            <div class="card-body">
                <p class="card-text"><h4>${food.strMeal}</h4></p>
                <h5>Ingredients:</h5>
                <ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
            </div>
        </div>
         `;
    }


