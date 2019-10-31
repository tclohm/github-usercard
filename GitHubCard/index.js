/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const userURL = "https://api.github.com/users/";

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

const cards = document.querySelector(".cards");

axios.get(userURL+"tclohm")
     .then( (response) => {
        //console.log(response);
        const data = response.data;
        // const githubFollowerFirstPageLength = response.data.length;
        // const getFollowerURLPaginationArray = response.headers.link.split(">");
        // const githubFollowerPageCount = getFollowerURLPaginationArray[1].slice(-2);
        // console.log(githubFollowerFirstPageLength * githubFollowerPageCount);
        const card = createCard(data);
        cards.appendChild(card);
      })
     .catch(error => { console.log("Error: Data was not returned", error); 
     });

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ["octocat", "mdo", "jlord", "fat", "tekkub"];


followersArray.map( (user) => {
  axios.get(userURL+user)
       .then( (response) => {
        const data = response.data;
        const card = createCard(data);
        cards.appendChild(card);
       })
       .catch(error => {
        console.log("Error: Data was not returned", error);
       });
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createCard(props) {
  const createElement = (element) => { return document.createElement(element); }
  
  // created elements
  const card = createElement("div");
  const cardImage = createElement("img");
  const cardInfo = createElement("div");
  
  const cardH3 = createElement("h3");
  const cardUserNamePara = createElement("p");
  const cardUserLocationPara = createElement("p");
  const cardProfilePara = createElement("p");

  const cardProfileLink = createElement("a");

  const cardFollowersPara = createElement("p");
  const cardFollowingPara = createElement("p");
  const cardBioPara = createElement("p");

  // append elements together to create structures
  card.appendChild(cardImage);
  card.appendChild(cardInfo);

  cardInfo.appendChild(cardH3);
  cardInfo.appendChild(cardUserNamePara);
  cardInfo.appendChild(cardUserLocationPara);
  cardInfo.appendChild(cardProfilePara);

  cardInfo.appendChild(cardFollowersPara);
  cardInfo.appendChild(cardFollowingPara);
  cardInfo.appendChild(cardBioPara);

  // add styles onto elements
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  cardH3.classList.add("name");
  cardUserNamePara.classList.add("username");

  // add content onto elements
  cardImage.src = props.avatar_url;
  cardH3.textContent = props.login;
  cardUserNamePara.textContent = (props.name == null ? "The person with no name" : props.name);
  
  cardUserLocationPara.textContent = (props.location == null ? "nowhere" : props.location);
  cardProfilePara.textContent =  "Profile: ";

  cardProfileLink.setAttribute('href', `${props.html_url}`);
  cardProfileLink.textContent = `${props.html_url}`;

  cardFollowersPara.textContent = `followers: ${props.followers}`;
  cardFollowingPara.textContent = `following: ${props.following}`;
  cardBioPara.textContent = (props.bio == null ? "We have no cool bios" : props.bio);

  // weird thing occurs if we append the link to the paragraph before we set the text content
  cardProfilePara.appendChild(cardProfileLink);

  return card
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
