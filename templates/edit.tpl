<form class="form-horizontal">
  <fieldset>
    <legend>Insert Task</legend>
    <div class="control-group">
      <label class="control-label" for="title">Task</label>
      <div class="controls">
        <input id="title" name="title" type="text"  class="input-medium" value="<%- title %>">
      </div>
    </div>

    <div class="control-group">
      <label class="control-label" for="date">Date</label>
      <div class="controls">
        <input id="date" name="date" type="text" class="input-medium" value="<%- date %>">
        
      </div>
    </div>

    <div class="control-group">
      <label class="control-label" for="duration">Duration</label>
      <div class="controls">
        <input id="duration" name="duration" type="text" class="input-mini" value="<%- duration %>">
        
      </div>
    </div>

    <div class="control-group">
      <label class="control-label" for="description">Description</label>
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