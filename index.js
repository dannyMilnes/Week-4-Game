class Room {
    // whatever the default values are and what you want your objects to follow.
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._linkedRooms = {}
        this._character = "";
        this._roomItem = "";
    }

    get character() {
        return this._character;
    }
    set character(value){
        this._character = value;
    }
    get roomItem(){
        return this._roomItem;
    }
    set roomItem(value){
        this._roomItem = value;
    }
    // when called this will return the value of "name"
    get name() {
        return this._name;
    }
    // when called this will return the value of "description"
    get descripion() {
        return this._descripion
    }
    // a setter can have conditions or values. it will replace the value. It will not be replaced when called
    set name(value) {
        // this replaces the name as the value. whatever the user has inputted becomes "value"
        this._name = value;
    }

    // creating the describe function
    describe() {
        return "You've walked into the " + this._name + ", " + this._description;
    }
    // takes the "direction" and the "roomToLink" and places them in an empty array of "_linkedRooms"
    linkRoom(direction, roomToLink) {
        this._linkedRooms[direction] = roomToLink
    }
    // creating a function that the direction moved is passed in to
    move(direction) {
        // if statement that checks if the direction links to a room. If it does, it returns the room that's linked to the direction
        if (direction in this._linkedRooms) {
            return this._linkedRooms[direction];
        } else {
            // alert the user if the direction is not linked to any of the rooms
            alert("You shall not pass!");
            return this;
        }
    }
}

class Character {
    constructor(name, description, conversation) {
        this._name = name;
        this._description = description;
        this._conversation = conversation;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get conversation() {
        return this._conversation;
    }
    set name(value) {
        if (value.length < 3) {
            alert("Name is too short.");
            return;
        }
        this._name = value
    }
    set description(value) {
        this._description = value
    }
    set conversation(value) {
        this._conversation = value
    }

    describe() {
        return "Holy moly! You've run into " + this._name + " " + this._description;
    }

    talk() {
        return this._name + " says " + this._conversation;
    }
}

class Item {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    set name(value) {
        this._name = value;
    }
    set description(value) {
        this.description = value;
    }

    describe() {
        return this._name + " found! " + "Goodness gracious! You pick up " + this._description;
    }
}

// takes everything fromt he character class and adds extra
class Enemy extends Character {
    constructor(name, description, conversation, weakness) {
      super(name, description, conversation)
      this._weakness = weakness;
    }
    fight(item) {
        if (item = this._weakness) {
            return true;
        } else {
            return false;
        }
    }
}

// create a function to pick up the item
// create a function that adds item to the backpack
// access the function and check the item is in the backpack
// create a fight function to "attack" the enemy
// check if the item is in the backpack when "fighting" the enemy
// create a lose game script if item is not in backpack when fighting enemy & win game if it is

function addItem(item) {
    backpack.push(item);
}

function checkInventory(item){
    for (let i = 0; i < item.length; i++) {
        // looping through the backpack array checking for "cherries"
        if (item[i] == "Cherries") {
            document.getElementById("demo").innerHTML = "You have defeated Trevor! Congratulations!";
            // return stops the loop from running to the end of the array, which may be something other than "cherries" which would break
            return;
        }else{
            document.getElementById("demo").innerHTML = "Trevor has killed you";
        }
    } 
}

// --------------- ROOMS ---------------
// based on the constructor(name, description)
const Kitchen = new Room("Kitchen", "it smells of bacon and freshly roasted tomatoes... mhhhmm, someones cooking a full english.");
const Bathroom = new Room("Bathroom", "someones in the shower, I cant see myself in the mirror. Smells like they dropped the kids off earlier.");
const LivingRoom = new Room("Living Room", "the TV is playing Spongebob. It's the episode where Gary runs away.");
const Bedroom = new Room("Bedroom", "there's stains on the bed sheets and glass of water on the table... hmmm.");

Kitchen.linkRoom("north", LivingRoom);
LivingRoom.linkRoom("south", Kitchen);
Kitchen.linkRoom("south", Bathroom);
Bathroom.linkRoom("north", Kitchen);
Kitchen.linkRoom("west", Bedroom);
Bedroom.linkRoom("east", Kitchen);

// --------------- CHARACTERS ---------------
// based on the constructor(name, description, conversation)
const Karen = new Character("Karen", "the angry lady with high pitched voice", "\"GET ME THE MANAGER!\"");
const Alex = new Character ("Alex", "the little lad with a massive fear of skittles", "\"GET THOSE SKITTLES AWAY FROM ME!\"");
const Millie = new Character("Millie", "a mother of 6 children and 3 dogs", "\"Make me 3 Piña Coladas and a hot water bottle for bed please darling.\"");
const Dave = new Character("Dave", "the postman", "\"Goodness gracious you have a lot of post today. Take it easy with the Prime orders next week.\"");


// --------------- ITEMS ---------------
// based on the constructor(name, description)
const Mushroom = new Item("Mushroom", "a red spotted mushroom that doubles your height *BoOp BlEEp blOP*");
const Cherries = new Item("Cherries", "a pair of red shiny cherries. Now your enemies are blue and prone to being eaten *WAKa WaKA*");

// Add items to rooms
Bathroom.roomItem = Cherries;
Kitchen.roomItem = Mushroom;

// --------------- ENEMY ---------------
// based on the constructor(name, description, conversation, weakness)
const Trevor = new Enemy("Trevor", "allergic to cherries", "cherries are for fools and healthy people", "cherries");

// Add characters to rooms
Kitchen.character = Karen;
LivingRoom.character = Alex; //DUDE CMAN
Bathroom.character = Millie;
Bedroom.character = Dave;
Bedroom.character = Trevor;


// creating a function that will call the describe function
function displayRoomInfo(room) {
    // creating two variables with an emtpy string. 
    let charDisplay = "";
    let itemDisplay = "";
    // putting the decription of the item and character in the room, into the variables above
    charDisplay = room.character.describe() + ".";
    // so player can enter rooms without items. checks to see if room item equals empty.
    if(room.roomItem!=""){
        // displays the room item text
        itemDisplay = room.roomItem.describe() + ".";
        // this adds the item to the backpack upon entry to the room, successfully.
        addItem(room.roomItem.name);
    }
    if (room._name =="Bedroom"){
        checkInventory(backpack);
    }
    // displaying text on the front end, including the character and item
    textContent = room.describe() + "<p>" + charDisplay + "</p>" + "<p>" + itemDisplay + "</p>";
    // "textarea" links to p tag in HTML.
    // describe() goes into textContent, which is then inputted "textarea" in the HTML
    document.getElementById("textarea").innerHTML = textContent
}

// where the item names are pushed
var backpack = [];

console.log(backpack)

// adding an eventlistener on keydown that triggers a function named "event"
document.addEventListener("keydown", function (event) {
    // if they enter key is pressed. (if the key that is pressed is equal to "enter")
    if (event.key === "Enter") {
        // assingns the value of "usertext" (the input box) to "command"
        command = document.getElementById("usertext").value;
        // setting the valid user inputs
        const directions = ["north", "south", "east", "west"]
        // whatever the user inputs, its converted to lower case to match the valid inputs. If it matches, it will call "move"
        if (directions.includes(command.toLowerCase())) {
            // replacing the "move" function with the user "command" fucntion
            currentRoom = currentRoom.move(command)
            // changing the default room to the new room
            displayRoomInfo(currentRoom);
        } else {
            // if that fails, the "usertext" in HTML is changed to alert "..."
            document.getElementById("usertext").value = ""
            alert("That is not a valid command, please try again.")
        }
    }
});

function startGame() {
    // defaulting the start room to "Kitchen"
    currentRoom = Kitchen;
    // calling the displayRoomInfo function to display the correct text
    displayRoomInfo(currentRoom);
}

startGame()


// Joint effort Danny & Maria