function post(){
	var win = window.parent;
    win.postMessage('uploading', "{{ origin }}");
}
function titleChange(){
	var filename = document.getElementById('file').value;
	var arr = filename.split('.');
	if (arr[arr.length-1]!='celtx' && arr[arr.length-1]!='txt' && arr[arr.length-1]!='fdx'){
		document.getElementById('warning').style.display = 'block';
		document.getElementById('submit').disabled = true;
		return;
		}
	document.getElementById('warning').style.display = 'none';
	document.getElementById('submit').disabled = false;
	var title = filename.replace('.celtx', '');
    title = title.replace('.txt', '');
	title = title.replace('.fdx', '');
	document.getElementById('hidden').value = title;
    var ff = arr[arr.length-1];
    document.getElementById('ff').value = ff;
	}
