//HTML tags creation in DOM
//header code
var headerPoke = document.createElement("h1");
headerPoke.innerHTML = "POKEMON BLOG";
document.body.appendChild(headerPoke);

//pokemon display div
var pokeContent = document.createElement("div");
pokeContent.id = "content_div";
document.body.appendChild(pokeContent);

//pageNumbers div,ul and li creation using DOM
var pokePageNums = document.createElement("div");
pokePageNums.id = "page_div";
var pokeUL = document.createElement("ul");
for (let k = 0; k <= 8; k++) {
    var pokeLI = document.createElement("li");
    pokeUL.appendChild(pokeLI);
}
pokePageNums.appendChild(pokeUL);
document.body.appendChild(pokePageNums);


let numList = document.querySelectorAll("li");
numList[0].id = "Begin";
numList[0].innerHTML = "Begin";
numList[1].id = "prev";
numList[1].innerHTML = "Prev";
numList[2].id = "firstbutton";
numList[3].id = "secondbutton";
numList[4].id = "thirdbutton";
numList[5].id = "fourthbutton";
numList[6].id = "fifthbutton";
numList[7].id = "next";
numList[7].innerHTML = "Next";
numList[8].id = "end";
numList[8].innerHTML = "End";
var PageN = 1;
for (let i = 2; i < numList.length - 2; i++) {
    numList[i].innerHTML = PageN;
    PageN++;
}

for (let k = 0; k <= 8; k++) {
    numList[k].setAttribute("onclick", "pagenum(this.id);");
}

//initial Page
window.onload = getPokeData(1, 5);

//API fetch using async await
async function getPokeData(first, Sec) {
    let pokeTable = document.createElement("table");
    let content_div = document.getElementById("content_div");
    content_div.innerHTML = "";
    content_div.appendChild(pokeTable);

    try {
        for (let i = first; i <= Sec; i++) {
            let pokeCharsJson = await fetch('https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/pokemon/' + i, {
                method: "GET",
                mode: "cors"
            });
            const pokeChars = await pokeCharsJson.json();
            var pokeImg = document.createElement("img");
            pokeImg.src = pokeChars.sprites.other.dream_world.front_default;
            let pokeTabRow = document.createElement("tr");
            let pokePicCol = document.createElement("td");
            pokePicCol.appendChild(pokeImg);
            pokeTabRow.appendChild(pokePicCol);
            let pokeCharCol = document.createElement("td");
            pokeTabRow.appendChild(pokeCharCol);

            //Pokemon Name
            let pokeCharName = document.createElement("b");
            pokeCharName.appendChild(document.createTextNode("Name"));
            let pokeCharNameSpan = document.createElement("span");
            pokeCharNameSpan.appendChild(document.createTextNode(pokeChars.name));
            pokeCharCol.appendChild(pokeCharName);
            pokeCharCol.appendChild(pokeCharNameSpan);

            //Pokemon Ability display
            let pokeAbilit = [];
            for (abilities of pokeChars.abilities)
                pokeAbilit.push(abilities.ability.name);

            let pokeCharAbility = document.createElement("b");
            pokeCharAbility.appendChild(document.createTextNode("Abilities"));
            let pokeCharAbilitySpan = document.createElement("span");
            pokeCharAbilitySpan.appendChild(document.createTextNode(pokeAbilit.join(", ")));
            pokeCharCol.appendChild(pokeCharAbility);
            pokeCharCol.appendChild(pokeCharAbilitySpan);

            //pokemon Move display
            let pokeMove = [];
            for (pokeMoves of pokeChars.moves) {
                pokeMove.push(pokeMoves.move.name);
            }

            let pokeCharMove = document.createElement("b");
            pokeCharMove.appendChild(document.createTextNode("Move"));
            let pokeCharMoveSpan = document.createElement("span");
            pokeCharMoveSpan.appendChild(document.createTextNode(pokeMove.join(", ")));
            pokeCharCol.appendChild(pokeCharMove);
            pokeCharCol.appendChild(pokeCharMoveSpan);

            //Pokemon Weight
            let pokeCharWight = document.createElement("b");
            pokeCharWight.appendChild(document.createTextNode("Weight"));
            let pokeCharWeightSpan = document.createElement("span");
            pokeCharWeightSpan.appendChild(document.createTextNode(pokeChars.weight));
            pokeCharCol.appendChild(pokeCharWight);
            pokeCharCol.appendChild(pokeCharWeightSpan);

            var boldtags = pokeCharCol.getElementsByTagName("b");
            for (var j = 1; j < boldtags.length; j++) {
                var breakTag = document.createElement("BR");
                pokeCharCol.insertBefore(breakTag, boldtags[j]);
            }
            pokeTabRow.appendChild(pokeCharCol);
            pokeTable.appendChild(pokeTabRow);

        }
    }


    //exception handle
    catch (e) {
        console.log(e);
        let error_msg = document.createElement("h4");
        error_msg.innerHTML = `Sorry Can't Fetch Any Pokemons right now <br/>
        Kindly access the URL : https://cors-anywhere.herokuapp.com/corsdemo   ,<br/>
        then click on the button <i>'request temporary access to the demo server'</i> button, then again try accessing the site`;
        document.body.appendChild(error_msg);

    }
}

//Page num handle code
function pagenum(num) {
    if (num == "prev")
        prev();
    else if (num == "next")
        next();
    else if (num == "end")
        end();
    else if (num == "Begin")
        begin();
    else
        getPokeData(parseInt(document.getElementById(num).innerHTML) * 5 - 4, parseInt(document.getElementById(num).innerHTML) * 5);
}

function begin() {
    if (parseInt(document.getElementById("fifthbutton").innerHTML) != 1) {
        var all_li = document.getElementsByTagName("li");
        var count = 1
        for (let i = 2; i < all_li.length - 2; i++) {
            all_li[i].innerHTML = count;
            count++;
        }
    }
}

function end() {
    if (parseInt(document.getElementById("fifthbutton").innerHTML) != 10) {
        var all_li = document.getElementsByTagName("li");
        var count = 6;
        for (let i = 2; i < all_li.length - 2; i++) {
            all_li[i].innerHTML = count;
            count++;
        }
    }
}

function prev() {
    if (parseInt(document.getElementById("firstbutton").innerHTML) != 1) {
        var all_li = document.getElementsByTagName("li");
        for (let i = 2; i < all_li.length - 2; i++) {
            all_li[i].innerHTML = all_li[i].innerHTML - 1;
        }
    }
}

function next() {
    if (parseInt(document.getElementById("fifthbutton").innerHTML) != 10) {
        var all_li = document.getElementsByTagName("li");
        for (let i = 2; i < all_li.length - 2; i++) {
            all_li[i].innerHTML = parseInt(all_li[i].innerHTML) + 1;
        }
    }
}
