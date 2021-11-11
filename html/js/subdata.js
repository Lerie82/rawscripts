function SubmitData(){
	var title = document.getElementById('Title').value;
	var date = document.getElementById('Date').value;
	var data = document.getElementById('data').value;
	$.post("/blogpost", {title:title, date:date, data:data}, function(d){alert(d)});
}
function preview(){
	var d = document.getElementById("previewspace");
	var f = d.appendChild(document.createElement("div"));
	f.id="feed";
	var u = f.appendChild(document.createElement('ul'));
	var l = u.appendChild(document.createElement('li'));
	l.style.width ="500px";
	var s = l.appendChild(document.createElement('span'));
	s.className="headline";
	s.appendChild(document.createTextNode(document.getElementById("Title").value));
	var date = l.appendChild(document.createElement('p'));
	date.className="date";
	date.appendChild(document.createTextNode("9/05/2009"));
	l.appendChild(document.createElement('div')).innerHTML=document.getElementById("Data").value;

	
}