// select the start game button
document.querySelector(".intro button").onclick = function () {
    // prompt window to ask for name
    let yourName = prompt("What is your Name?");
    // if name is empty
    if (yourName == null || yourName == ""){
        // set name to unknown
        document.querySelector(".name span").innerHTML = 'UnKnown';

    }else{
        // set name to your name
        document.querySelector(".name span").innerHTML = yourName;

    }
    // Remove splash screen
    document.querySelector(".intro").remove();

};
let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

// let orderRange = [...Array(blocks.length).keys()];

// OR

let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);
// Add Order css property to game blocks
blocks.forEach((block, index) => {

    // Add css order property
    block.style.order = orderRange[index];

    // Add click Event
    block.addEventListener('click', function (){

        //Trigger the flip block function
        flipBlock(block);
    });
});

// Flip Block Function
function flipBlock(selectedBlock) {

    // Add Class is flipped
    selectedBlock.classList.add('is-flipped');

    //collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'));

    //if theres two selected blocks
    if (allFlippedBlocks.length === 2){
        
        // stop clicking function
        stopClicking();

    // check matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

}

// Stop Clicking Function
function stopClicking() {

    // Add class no cliking on main container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        //Remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);
};

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology){

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('hes-match');
        secondBlock.classList.add('hes-match');
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}
// shuffle function 
function shuffle(array) {

    //settings vars
    let current = array.length, 
        temp, 
        random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        //Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] current Element = Random Element
        array[current] = array[random];

        //[3] Random Element = Get Element from stash
        array[random] = temp;
    }

    return array;
}


