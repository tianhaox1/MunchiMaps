

 //initializes the map
    function initMap() {
      const map = L.map('map').setView([42.72941085967446, -73.6792590320996], 17);


      var currentMarker = null;  // Variable to keep track of the current marker

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  detectRetina: true,
   maxZoom: 50

      }).addTo(map);

        var locationDot = L.divIcon({
            className: 'custom-icon',
            html: '<div class="location-circle"></div><div class="location-dot"></div>',
            iconSize: [40, 40],
            iconAnchor: [1, 3]  // Center the icon
        });

        // Function to handle location found
            function onLocationFound(e) {
                console.log("Location found: ", e.latlng);

                // Remove the old marker if it exists
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }

                // Add a new marker
                currentMarker = L.marker(e.latlng, {icon: locationDot}).addTo(map).bindPopup('<div class="location-text">You are here</div>').openPopup();
                map.setView(e.latlng, 18); // Center the map on the user's location
            }

            // Function to handle location errors
            function onLocationError(e) {
                console.log("Location error: ", e.message);
                alert(e.message);
            }

            // Initial location finding
            map.locate({
                setView: true,
                maxZoom: 18,
                watch: false
            }).on('locationfound', onLocationFound).on('locationerror', onLocationError);

            // Define the centerMap function
            function centerMap(){
                map.locate({
                    setView: true,
                    maxZoom: 18,
                    watch: false
                }).on('locationfound', onLocationFound).on('locationerror', onLocationError);
            }

            var button = document.getElementById("Location");
            if (button) {
                console.log("Button found, adding event listener");
                button.addEventListener("click", centerMap);
            } else {
                console.log("Button not found");
            }

            var mapKeyButton = document.getElementById("MapKey");
            if (mapKeyButton) {
              console.log("MapKey button found, adding event listener");
              mapKeyButton.addEventListener("click", openMapKey);  // Call the openMapKey function
            } else {
              console.log("MapKey button not found");
            }
      //Puts the zoom in bottom left corner
      map.zoomControl.setPosition('bottomleft');

      //Gets the icon for vending machines available from github.
      const foodanddrink = L.icon({
        iconUrl: 'https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/Food&Drink.png?raw=true',
        iconSize: [80, 50],
        iconAnchor: [50, 25]
        
      });

      const food = L.icon({
        iconUrl: 'https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/Food.png?raw=true',
        iconSize: [50, 50],
        iconAnchor: [50, 25]
        
      });

      const drink = L.icon({
        iconUrl: 'https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/Drink.png?raw=true',
        iconSize: [50, 50],
        iconAnchor: [50, 25]
        
      });
      
      // Test area ------------------------------------------- 

      options = [foodanddrink, food, drink];
      
       //generating the description based on image that it is given
       function generatedescription(image1, image2, image3) {
        let results = ["This vending machine accepts: "];
        
        if (image1 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditCheck.png?raw=true") {
            results.push("card");
        } else if (image1 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditX.png?raw=true") {
            results.push("");
        }
        
        if (image2 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CashCheck.png?raw=true") {
            if (image1 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditX.png?raw=true") {
                results.push("cash");
            } else {
                results.push(", cash");
            }
        } else if (image2 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CashX.png?raw=true") {
            results.push("");
        }
        
        if (image3 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/PhoneCheck.png?raw=true") {
            if (image1 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditX.png?raw=true" && image2 === "https://github.com/mike-cautela/MunchiMaps/blob/main/MunchiMaps%20Assets/Map%20Icons/CashX.png?raw=true") {
                results.push("wireless payments");
            } else {
                results.push(", wireless payments");
            }
        } else if (image3 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/PhoneX.png?raw=true.png") {
            results.push("");
        }
        return results.join("");
      }

      // generate images for payment.
      function paymentOptions(images, hasCash, hasCard, hasTap) {

      }
      
      function vendingOffered(numSnack, numDrinks) {
        let img_icon;
        if(numSnack > 0 && numDrinks > 0) {
          img_icon = 0;
        } else if(numSnack > 0) {
          img_icon = 1;
        } else if(numDrinks > 0) {
          img_icon = 2;
        }
        return img_icon;
      }

      function setImages(name, numSnack, numDrinks) {
        console.log("Welcome to setImages");
        let images;
        let image = name.split(" ").join("");
        let active = false;
        if(numSnack >= 1) {
          images = "<img src='../MunchiMaps Assets/" + name + "/" + image + "Snack1.jpg'?raw=true\" alt=\"Logo 1\" class=\"active\">";
          active = true;
          
          for(let i = 2; i <= numSnack; i++) {
            
            images += "<img src='../MunchiMaps Assets/" + name + "/" + image + "Snack" + i + ".jpg'?raw=true\" alt=\"Logo " + i + "\">";
            console.log(images);
          }
        }
        //console.log(images);
        
        if(numDrinks >= 1) {
          if(!active) {
            images = "<img src='../MunchiMaps Assets/" + name + "/"+image+"Drink1.jpg'?raw=true\" alt=\"Logo 1\" class=\"active\">";
            active = true;
          } else {
            images += "<img src='../MunchiMaps Assets/" + name + "/" + image + "Drink1.jpg'?raw=true\" alt=\"Logo 1\">";
          }
          for(let i = 2; i <= numDrinks; i++) {
            images += "<img src='../MunchiMaps Assets/" + name + "/" + image + "Drink" +i + ".jpg'?raw=true\" alt=\"Logo " + i + "\">";
          }
        }
        
        //console.log(images);
        return images;
      }
      //draft version of clean language filter
      const inappropriateWords = ["badword1", "badword2", "badword3"];

      // Function to check for inappropriate language
      function checkReview() {
        const reviewText = document.getElementById("review-text").value.toLowerCase();
        const errorMessage = document.getElementById("error-message");
    
        for (let word of inappropriateWords) {
          if (reviewText.includes(word)) {
            errorMessage.style.display = "block";
            return false; 
          }
        }
        // Hide error if no inappropriate words
        errorMessage.style.display = "none"; 
        return true; 
      }

      class EventEmitter {
        constructor() {
          this.events = {};
        }
        
        on(event, listener) {
          if (!this.events[event]) {
            this.events[event] = [];
          }
          this.events[event].push(listener);
        }
      }

      // Icons for vending machines object class ========================================================================================================
      
      class icon extends EventEmitter {
      constructor(name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service) {
        super();
        this.name = name;
        this.x_coord = x_coord;
        this.y_coord= y_coord;
        this.time_opens = time_opens;
        this.time_closes = time_closes;
        this.num_snack_machines =  num_snack_machines;
        this.num_drink_machines = num_drink_machines;
        this.num_ratings = num_ratings;
        this.average_ratings = average_ratings;
        this.needs_service = needs_service;

        this.image1 = "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditCheck.png?raw=true";
        this.image2 = "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CashCheck.png?raw=true";
        this.image3 = "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/PhoneX.png?raw=true";

        this.description = generatedescription(this.image1, this.image2, this.image3);
        //this.payments = paymentOptions(images, 1, 1, 1);
        this.img_icon = vendingOffered(this.num_snack_machines, this.num_drink_machines);

        this.images = setImages(this.name, this.num_snack_machines, this.num_drink_machines);

        this.infoWindowContent = `
        <div class="info-window-content">
          <div class="info-window-image">
            ${this.images}
              <div class="carousel-controls">
                  <button class="prev">&lt;</button>
                  <button class="next">&gt;</button>
              </div>
          </div>
          <div class="info-window-text">
            <div class="info-window-title">${this.name}</div>
            <div class="info-window-icons">
                <img src="${this.image1}">
                <img src="${this.image2}" alt="Image 2">
                <img src="${this.image3}" alt="Image 3">
            </div>
            <div class="info-window-subtitle">${this.description}</div>
            <div class="review-section">
              <div class="reviews">
                <!-- Existing reviews will be appended here -->
              </div>
              <h4>Write a Review</h4>
              <div class="rating_block">
                <form class="submit-review" onsubmit="return checkReview()">
                <textarea id="review-text" placeholder="Write your review here..." required></textarea>
                <div class="rating">
                  <span rating-star="5"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 5" width="30" height="30"></span>
                  <span rating-star="4"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 4" width="30" height="30"></span>
                  <span rating-star="3"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 3" width="30" height="30"></span>
                  <span rating-star="2"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 2" width="30" height="30"></span>
                  <span rating-star="1"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 1" width="30" height="30"></span>
                </div>
                <div id="error-message" style="color: red; display: none;">Please remove inappropriate language</div>
                <button type="submit">Submit</button>
                </form>
              </div>
            </div>
        </div>
        </div>`;
        this.infoWindow;
      }
        plot() {
          const marker = L.marker([this.x_coord, this.y_coord], {icon: options[this.img_icon] }).addTo(map);
          marker.on('click', () => {
                   this.infoWindow = L.popup({maxWidth: 500})
          .setLatLng([this.x_coord, this.y_coord])
          .setContent(this.infoWindowContent)
          .openOn(map);

          //Handles image selector for Location
          const images = document.querySelectorAll('.info-window-image img');
          const prevButton = document.querySelector('.prev');
          const nextButton = document.querySelector('.next');
          let currentIndex = 0;

          function showImage(index) {
            images.forEach((img, i) => {
              img.classList.toggle('active', i === index);
            });
          } // End showImage
              prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                showImage(currentIndex);
              }); // End prev

              nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                showImage(currentIndex);
              }); // end next
          });
        }
      } // Icon object declaration ending.
        
      const sharp = new icon("Sharp Hall", 42.72711006590162, -73.67448712656643, 0.00, 24.00, 0, 1, 0, 0, "N");
      const union = new icon("Union", 42.730159761978896,-73.67663391678252, 7.00, 24.00, 1, 1, 0, 0, "N");
      const quad = new icon("Quad",42.730706041764584,-73.67756264747236, 0.00, 24.00, 0, 2, 0, 0, "N");
      const dcc = new icon("DCC", 42.72934781129576, -73.67895862471251, 7.00, 21.00, 1, 1, 0, 0, "N");
      const vcc = new icon("Vorhees Computing Center", 42.72931448709032, -73.68164350143745, 7.00, 23.00, 1, 2, 0, 0, "N");
      const amos = new icon("Amos Eaton Hall", 42.730287323346445, -73.68258918979996, 7.00, 22.00, 0, 1, 0, 0, "N");
      const mueller = new icon("Mueller Center", 42.72891902003062, -73.67684441122128, 8.00, 10.00, 1, 2, 0, 0,"N");
      const jec = new icon("JEC", 42.729847677153444, -73.68020218979997,6.00, 22.00, 1, 1,0, 0, "N");
      const sage = new icon("Sage Labs",42.73097906477598, -73.68164141863616, 7.00, 24.00, 1, 1, 0, 0, "N");
      const jrowl = new icon("JROWL", 42.72900301770575, -73.68045377630875, 6.00, 22.00, 1, 1, 0, 0, "N");
      const pittsburgh = new icon("Pittsburgh Building",42.73125174093247, -73.68330210329108, 7.00, 21.00, 1, 1, 0, 0, "N");
      const warren =  new icon("Warren Hall", 42.72809422047715, -73.67536297260132, 7.00, 21.00, 0, 1, 0, 0, "N");
      const greene = new icon("Greene Building", 42.73022009495838, -73.68115317445492, 7.00, 21.00, 1, 1, 0, 0, "N");
      const davison = new icon("Davison Hall", 42.72731130298223, -73.67414636096385, 0.00, 24.00, 0, 1,0, 0, "N");
      const pub_safe = new icon("Pub Safe",42.72930295751444, -73.67676008238502, 0.00, 24.00, 0, 1, 0, 0, "N");
      const north_hall = new icon("North Hall", 42.73142413669011, -73.67987080514486, 7.00, 24.00, 1, 2, 0, 0,"N");
      const west_hall = new icon("West Hall", 42.731807801585866, -73.68320404747236, 0.00, 24.00, 0, 1, 0, 0, "N");
      const folsom = new icon("Folsom Library", 42.72954131606436, -73.68250278794625, 8.00, 11.00, 1, 2, 0, 0, "N");

      sharp.plot();
      union.plot();
      quad.plot();
      dcc.plot();
      vcc.plot();
      amos.plot();
      mueller.plot();
      amos.plot();
      jec.plot();
      amos.plot();
      sage.plot();
      jrowl.plot();
      pittsburgh.plot();
      warren.plot();
      greene.plot();
      davison.plot();
      pub_safe.plot();
      north_hall.plot();
      west_hall.plot();
      folsom.plot();

      // Toggle between dark mode and light mode CSS sheets.
      let darkMode = false;
      function toggleDarkMode() {
        darkMode = !darkMode;
        const light = document.getElementById('light-mode');
        const dark = document.getElementById('dark-mode');
        if (darkMode){
          dark.disabled = false;
          setTimeout(() => {
            light.disabled = true;
          }, 200); //Delay for smooth transition
        } else {
          light.disabled = false;
          setTimeout(() => {
            dark.disabled = true;
          }, 200);
        }
      }

      //Toggles dark mode when user presses 'd' or 'D.'
      document.addEventListener('keydown', function(event) {
        if ((event.key === 'd' || event.key === 'D') && 
        (document.activeElement.tagName !== 'INPUT' && 
          document.activeElement.tagName !== 'TEXTAREA' && 
          document.activeElement.contentEditable !== 'true')){
          toggleDarkMode();
        }
      });
    } // init map ending bracket here

    function openHelp() {
      closeAllPopups('Report');
      document.getElementById("help-popup").style.display = "block";
    }

    function closeHelp() {
      document.getElementById("help-popup").style.display = "none";
    }

    // Close the help popup if the user clicks outside of the help content
    window.onclick = function(event) {
      const popup = document.getElementById("help-popup");
      if (event.target === popup) {
        popup.style.display = "none";
      }
    }

    function openMapKey(){
      closeAllPopups('Report');
      document.getElementById("map-key-popup").style.display = "block";
    }
    function closeMapKey(){
        document.getElementById("map-key-popup").style.display = "none";
    }


function openSearch() {
    closeAllPopups('Report');
    const searchPopup = document.getElementById("popup-search");
    searchPopup.style.display = "block";
    setTimeout(() => {
        searchPopup.classList.add("show");
    }, 10); // Slight delay to trigger the CSS transition
}

function closeSearch() {
    const searchPopup = document.getElementById("popup-search");
    searchPopup.classList.remove("show");
    setTimeout(() => {
        searchPopup.style.display = "none";
    }, 500); // Match the delay to the transition duration
}

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector(".button[onclick='openSearch()']");
    if (searchButton) {
        searchButton.addEventListener("click", openSearch);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector(".button[onclick='openSearch()']");
    if (searchButton) {
        searchButton.addEventListener("click", openSearch);
    }
});


    window.onclick = function(event) {
      const popup = document.getElementById("mapKeyPopup");
      if (event.target === popup) {
        popup.style.display = "none";
      }
    }

    function openPopup(id) {
      closeAllPopups(id);
      document.getElementById('popup-' + id.toLowerCase()).style.display = 'block';
    }

    function closePopup(id) {
  document.getElementById('popup-' + id.toLowerCase()).style.display = 'none';
}
  //Closes all popups when user clicks on second popup. 
  function closeAllPopups(id) {
    document.getElementById("map-key-popup").style.display = "none";
    document.getElementById("help-popup").style.display = "none";
    document.getElementById("popup-search").style.display = "none";
    document.getElementById('popup-' + id.toLowerCase()).style.display = 'none';
}

   document.addEventListener('DOMContentLoaded', function () {
      initMap();
    });
// Handle report form submission
document.addEventListener('DOMContentLoaded', function () {
    initMap();

    const reportForm = document.getElementById('reportForm');
    reportForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const reportTitle = document.getElementById('reportTitle').value;
        const reportDescription = document.getElementById('reportDescription').value;

        // Handle the form data (e.g., send it to a server or display it)
        console.log('Report Title:', reportTitle);
        console.log('Report Description:', reportDescription);

        // Display a confirmation message or handle the submission
        alert('Report submitted successfully!');

        // Close the popup
        closePopup('Report');

        // Clear the form
        reportForm.reset();
    });
});

document.querySelector(".btn-fixx").onclick = function () {
    window.location.href = "https://www.google.com";
};
