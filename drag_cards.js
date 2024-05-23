document.addEventListener('DOMContentLoaded', (event) => {
  const containers = document.querySelectorAll('#draggable-cards-container');
  const draggable = new Draggable.Sortable(containers, {
    draggable: '.col',
    delay: 150, // delay fix so when clicking button dont accidentally drag
    // fix miror image slipping away/not in sync wiht the cursor with setting some shits
    mirror: {
      constrainDimensions: true, 
      cursorOffsetX: 0,
      cursorOffsetY: 0,
      appendTo: 'body',
      xAxis: true,
      yAxis: true 
    }
  });

  draggable.on('sortable:start', () => console.log('Drag started'));
  draggable.on('sortable:sort', () => console.log('Dragging'));
  draggable.on('sortable:stop', () => console.log('Drag stopped'));
});

