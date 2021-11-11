$(document).ready(function(){
$("#start").click(function(){
  $.post("/migrate", function(data, status){alert(data)});
});
$("#delete").click(function(){
  $.post("/migrate-delete", function(data, status){alert(data)});
});
$("#detect-version-errors").click(function(){
  $.post("/migrate-version-errors", function(data, status){alert(data)});
});
$("#fix-version-errors").click(function(){
  $.post("/migrate-version-errors-task", function(data, status){alert(data)});
});
})