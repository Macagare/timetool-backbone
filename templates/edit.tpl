<form class="form-horizontal">
  <fieldset>
    <legend>Form Name</legend>
    <div class="control-group">
      <label class="control-label" for="title">Aufgabe</label>
      <div class="controls">
        <input id="title" name="title" type="text"  class="input-medium" value="<%- title %>">
      </div>
    </div>

    <div class="control-group">
      <label class="control-label" for="date">Datum</label>
      <div class="controls">
        <input id="date" name="date" type="text" class="input-mini" value="<%- date %>">
        
      </div>
    </div>

    <div class="control-group">
      <label class="control-label" for="duration">Dauer</label>
      <div class="controls">
        <input id="duration" name="duration" type="text" class="input-mini" value="<%- duration %>">
        
      </div>
    </div>

    <div class="control-group">
      <label class="control-label" for="description">Beschreibung</label>
      <div class="controls">                     
        <textarea id="description" name="description"><%- description %></textarea>
      </div>
    </div>

    <div class="control-group">
      <div class="controls">
        <input type="submit" value="Speichern" class="btn btn-default">
      </div>
    </div>

  </fieldset>
</form>