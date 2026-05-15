const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');
let draggedCard = null;

cards.forEach((card)=>{
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
})

lists.forEach((list)=>{
    list.addEventListener('dragover', dragOver);
    list.addEventListener('dragenter', dragEnter);
    list.addEventListener('dragleave', dragLeave);
    list.addEventListener('drop', dragDrop);
});

function dragStart(e){
    e.dataTransfer.setData('text/plain', this.id);
}

function dragEnd(){
    console.log('Drag ended');
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
    console.log('Drag left');
}

function dragDrop(e){
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    this.appendChild(card);
}