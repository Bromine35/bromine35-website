// insane o ma gaw card dragging
document.addEventListener('DOMContentLoaded', (event) => {
  const containers = document.querySelectorAll('#draggable-cards-container');
  const draggable = new Draggable.Sortable(containers, {
    draggable: '.col'
  });
  // just leave the console.logs here ok i want it there shut up
  draggable.on('sortable:start', () => console.log('Drag started')); //debugging shit
  draggable.on('sortable:sort', () => console.log('Dragging')); // debug poop
  draggable.on('sortable:stop', () => console.log('Drag stopped')); //debug for stop
});
