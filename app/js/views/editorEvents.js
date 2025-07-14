export function editorView(container) { 
  container.innerHTML = `
    <div class="editor">
        <div class="input-event">
            <label for="name-event">Name</label>
            <input type="text" name="name-event" id="name-event">
            
            <label for="description-event">description</label>
            <input type="text" name="description-event" id="description-event">
            
            <label for="date-event">description</label>
            <input type="date" name="date-event" id="date-event">
            
            <label for="capacity-event">description</label>
            <input type="number" name="capacity-event" id="capacity-event">
        </div>
        <div class="btns-create">
            <button type="button" id="cancel">cancel</button>
            <button type="button" id="save">save</button>
        </div>
    </div>`;
}

export function createView(container) { 
  container.innerHTML = `
    <div class="create">
        <div class="input-event">
            <label for="name-event">Name</label>
            <input type="text" name="name-event" id="name-event">
            
            <label for="description-event">description</label>
            <input type="text" name="description-event" id="description-event">
            
            <label for="date-event">description</label>
            <input type="date" name="date-event" id="date-event">
            
            <label for="capacity-event">description</label>
            <input type="number" name="capacity-event" id="capacity-event">
        </div>
        <div class="btns-create">
            <button type="button" id="cancel">cancel</button>
            <button type="button" id="save">save</button>
        </div>
    </div>`;
}