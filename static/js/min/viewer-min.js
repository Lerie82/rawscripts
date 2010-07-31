var OSName="Unknown OS";if(navigator.appVersion.indexOf("Win")!=-1){OSName="Windows"}if(navigator.appVersion.indexOf("Mac")!=-1){OSName="MacOS"}if(navigator.appVersion.indexOf("X11")!=-1){OSName="UNIX"}if(navigator.appVersion.indexOf("Linux")!=-1){OSName="Linux"}if($.browser.webkit){var browser="webkit"}if($.browser.mozilla){var browser="mozilla"}if($.browser.opera){var browser="opera"}var ud=0;var viewNotes=true;var timer;var typeToScript=true;var pasting=false;var undoQue=[];var redoQue=[];var pageBreaks=[];var mouseX=0;var mouseY=0;var shiftDown=false;var mouseDownBool=false;var scrollBarBool=false;var commandDownBool=false;var characters=[];var scenes=[];var canvas;var ctx;var linesNLB=[];var vOffset=0;var pos={col:0,row:0};var anch={col:0,row:0};var background="#fff";var font="10pt Courier";var fontWidth=8;var foreground="#000";var lineheight=13;var milli=0;var formatMenu=false;var resource_id="random123456789";var WrapVariableArray=[[62,111+50,0,1,2],[62,111+50,0,0,2],[40,271+50,0,1,1],[36,191+50,0,0,2],[30,231+50,0,0,1],[61,601+50,1,1,2]];var editorWidth=850;var headerHeight=65;var lines=[];notes=[];$(document).ready(function(){document.getElementById("canvas").height=$("#container").height()-60;document.getElementById("sidebar").style.height=($("#container").height()-65)+"px";document.getElementById("sidebar").style.width=($("#container").width()-853)+"px";$("#container").mousewheel(function(a,b){if(a.target.id=="canvas"){a.preventDefault();scroll(-b*45)}});$("#recipient").keyup(function(a){if(a.which==188){tokenize("recipient")}});$("#renameField").keydown(function(a){if(a.which==13){a.preventDefault();renameScript()}});$("#recipient").keydown(function(a){if(a.which==13){a.preventDefault()}});$("#subject").keydown(function(a){if(a.which==13){a.preventDefault()}});$(".menuItem").click(function(){openMenu(this.id)});$(".menuItem").mouseover(function(){topMenuOver(this.id)});$(".menuItem").mouseout(function(){topMenuOut(this.id)})});$(window).resize(function(){document.getElementById("canvas").height=$("#container").height()-60;document.getElementById("sidebar").style.height=($("#container").height()-65)+"px";document.getElementById("sidebar").style.width=($("#container").width()-853)+"px"});$("*").keydown(function(a){var b=new Date();milli=b.getMilliseconds();if(a.which==38){upArrow()}else{if(a.which==40){downArrow()}else{if(a.which==39){rightArrow()}else{if(a.which==37){leftArrow()}else{if(a.which==16){shiftDown=true}else{if((OSName=="MacOS"&&(a.which==91||a.which==93)&&browser=="webkit")||(OSName=="MacOS"&&a.which==224&&browser=="mozilla")||(OSName=="MacOS"&&a.which==17&&browser=="opera")||(OSName!="MacOS"&&a.which==17)){commandDownBool=true}}}}}}if((ud<0||ud>document.getElementById("canvas").height-80)&&typeToScript&&a.which!=13&&a.which!=46&&a.which!=8){scroll(ud-400)}if(typeToScript){document.getElementById("ccp").focus();document.getElementById("ccp").select()}});$("*").keyup(function(a){if(a.which==16){shiftDown=false}if(typeToScript){document.getElementById("ccp").focus();document.getElementById("ccp").select()}});$("*").mousedown(function(a){if(typeToScript){mouseDown(a);document.getElementById("ccp").focus();document.getElementById("ccp").select()}});$("*").mouseup(function(a){if(typeToScript){mouseUp(a);document.getElementById("ccp").focus();document.getElementById("ccp").select()}});$("*").mousemove(function(a){mouseMove(a)});function selection(){if(pos.row>anch.row){var d={row:anch.row,col:anch.col};var a={row:pos.row,col:pos.col}}else{if(pos.row==anch.row&&pos.col>anch.col){var d={row:anch.row,col:anch.col};var a={row:pos.row,col:pos.col}}else{var d={row:pos.row,col:pos.col};var a={row:anch.row,col:anch.col}}}if(d.row==a.row){var b=lines[d.row][0].slice(d.col,a.col)}else{arr=[];arr.push([lines[d.row][0].slice(d.col),lines[d.row][1]]);d.row+=1;while(d.row<a.row){arr.push([lines[d.row][0],lines[d.row][1]]);d.row+=1}arr.push([lines[a.row][0].slice(0,a.col),lines[a.row][1]]);var b=JSON.stringify(arr)}var e=document.getElementById("ccp");e.value=b;e.focus();e.select()}function setup(){resource_id=window.location.href.split("=")[1];$.post("/scriptcontent",{resource_id:resource_id},function(e){if(e=="not found"){lines=[["Sorry, the script wasn't found.",1]];paint(false,false,true,false);return}var f=JSON.parse(e);var g=f[0];document.getElementById("title").innerHTML=g;var a=f[1];for(var d=0;d<a.length;d++){lines.push([a[d][0],a[d][1]])}if(lines.length==2){pos.row=1;anch.row=1;pos.col=lines[1][0].length;anch.col=pos.col}for(d in f[3]){notes.push(f[3][d])}var c=document.getElementById("canvas");var b=c.getContext("2d");document.getElementById("edit_title_href").href="/titlepage?resource_id="+resource_id;tabs(0);sceneIndex();noteIndex();document.getElementById("ccp").focus();document.getElementById("ccp").select();paint(false,false,true,false);setInterval("paint(false,false, false,false)",40)})}function tabs(a){var b=["sceneTab","noteTab"];for(i in b){var d=document.getElementById(b[i]);if(i==a){d.style.backgroundColor="#3F5EA6";d.style.color="white";document.getElementById(b[i].replace("Tab","s")).style.display="block"}else{d.style.backgroundColor="#6C8CD5";d.style.color="black";document.getElementById(b[i].replace("Tab","s")).style.display="none"}}}function mouseUp(c){mouseDownBool=false;scrollBarBool=false;var b=document.getElementById("canvas").width;var a=document.getElementById("canvas").height;if(c.clientY-headerHeight>a-39&&c.clientY-headerHeight<a&&c.clientX>editorWidth-22&&c.clientX<editorWidth-2){if(c.clientY-headerHeight>a-20){scroll(30)}else{scroll(-30)}}}function mouseDown(k){var b=false;var m=document.getElementsByTagName("div");for(var g=0;g<m.length;g++){if(m[g].className=="topMenu"&&m[g].style.display=="block"){b=true;var n=m[g]}}if(b){var d=k.target;while(d.nodeName!="DIV"){d=d.parentNode}id=d.id;var j=id.slice(0,-1);if(j=="format"){changeFormat(id.slice(-1))}if(id=="save"){save(0)}else{if(id=="new"){newScriptPrompt()}else{if(id=="open"){openPrompt()}else{if(id=="rename"){renamePrompt()}else{if(id=="exportas"){exportPrompt()}else{if(id=="duplicate"){duplicate()}else{if(id=="close"){closeScript()}else{if(id=="undo"){undo()}else{if(id=="redo"){redo()}else{if(id=="cut"){var q=setTimeout("cut()",50)}else{if(id=="copy"){copy()}else{if(id=="paste"){pasting=true;var q=setTimeout("paste()",50)}else{if(id=="insertNote"){viewNotes=true;newThread()}else{if(id=="editTitlePage"){window.open("/titlepage?resource_id="+resource_id)}else{if(id=="spellCheck"){launchSpellCheck()}else{if(id=="revision"){window.open("/revisionhistory?resource_id="+resource_id)}else{if(id=="notes"){viewNotes=(viewNotes?false:true)}else{if(id=="email"){emailPrompt()}}}}}}}}}}}}}}}}}}n.style.display="none"}else{if(document.getElementById("suggestBox")!=null){if(k.target.className=="suggestItem"){lines[pos.row][0]=k.target.value;pos.col=anch.col=lines[pos.row][0].length}document.getElementById("suggestBox").parentNode.removeChild(document.getElementById("suggestBox"))}else{var p=document.getElementById("canvas").height;var h=(pageBreaks.length+1)*72*lineheight;var o=((p)/h)*(p-39);if(o<20){o=20}if(o>=p-39){o=p-39}var l=(vOffset/(h-p))*(p-39-o)+headerHeight;if(k.clientX>headerHeight&&k.clientX<editorWidth-100&&k.clientY-headerHeight>40){mouseDownBool=true;paint(false,k,false,false)}else{if(k.clientX<editorWidth&&k.clientX>editorWidth-20&&k.clientY>l&&k.clientY<l+o){scrollBarBool=true}}}}}function mouseMove(a){if(scrollBarBool){scrollBarDrag(a)}mouseX=a.clientX;mouseY=a.clientY;if(mouseDownBool){paint(a,false,false,true)}}function scrollBarDrag(d){var c=mouseY-d.clientY;var a=document.getElementById("canvas").height-50;var b=(pageBreaks.length+1)*72*lineheight;vOffset-=b/a*c;if(vOffset<0){vOffset=0}var b=(pageBreaks.length+1)*72*lineheight-document.getElementById("canvas").height+20;if(vOffset>b){vOffset=b+20}}function scroll(a){vOffset+=a;if(vOffset<0){vOffset=0}var b=(pageBreaks.length+1)*72*lineheight-document.getElementById("canvas").height+20;if(vOffset>b){vOffset=b+20}}function jumpTo(a){if(a!=""){var g=parseInt(a.replace("row",""));pos.row=g;anch.row=pos.row;pos.col=lines[pos.row][0].length;anch.col=pos.col}else{var g=pos.row}var c=0;for(var b=0;b<g;b++){for(var d=0;d<pageBreaks.length;d++){if(pageBreaks[d][0]==b){c+=lineheight*(72-pageBreaks[d][1])}}c+=(linesNLB[b].length*lineheight)}vOffset=c;var f=(pageBreaks.length+1)*72*lineheight-document.getElementById("canvas").height;if(vOffset>f){vOffset=f}}function upArrow(){if(typeToScript&&document.getElementById("suggestBox")==null){if(pos.row==0&&pos.col==0){return}var j=lines[pos.row][1];if(j==0){var h=WrapVariableArray[0]}else{if(j==1){var h=WrapVariableArray[1]}else{if(j==2){var h=WrapVariableArray[2]}else{if(j==3){var h=WrapVariableArray[3]}else{if(j==4){var h=WrapVariableArray[4]}else{if(j==5){var h=WrapVariableArray[5]}}}}}}if(lines[pos.row][0].length>h[0]){var k=lines[pos.row][0].split(" ");var a=0;var b=[];while(a<k.length){if(k.slice(a).join().length<=h[0]){b.push(k.slice(a).join().length);a=k.length}else{var l=0;while(k.slice(a,a+l).join().length<h[0]){l++}b.push(k.slice(a,a+l-1).join().length);a+=l-1}}l=0;var g=b[0];while(g<pos.col){l++;g+=b[l]+1}if(l==0){if(checkSpell){ajaxSpell(pos.row)}var c=lines[pos.row-1][1];if(c==0){var d=WrapVariableArray[0]}else{if(c==1){var d=WrapVariableArray[1]}else{if(c==2){var d=WrapVariableArray[2]}else{if(c==3){var d=WrapVariableArray[3]}else{if(c==4){var d=WrapVariableArray[4]}else{if(c==5){var d=WrapVariableArray[5]}}}}}}if(lines[pos.row-1][0].length<d[0]){pos.row--;if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{var k=lines[pos.row-1][0].split(" ");var a=0;var b=[];while(a<k.length){if(k.slice(a).join().length<=h[0]){b.push(k.slice(a).join().length);a=k.length}else{var l=0;while(k.slice(a,a+l).join().length<h[0]){l++}b.push(k.slice(a,a+l-1).join().length);a+=l-1}}pos.row--;pos.col+=lines[pos.row][0].length-b[b.length-1];if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}else{pos.col-=b[l-1]+1;if(pos.col>(g-b[l]-1)){pos.col=g-b[l]-1}}}else{if(pos.row==0){pos.col=0}else{if(checkSpell){ajaxSpell(pos.row)}var c=lines[pos.row-1][1];if(c==0){var d=WrapVariableArray[0]}else{if(c==1){var d=WrapVariableArray[1]}else{if(c==2){var d=WrapVariableArray[2]}else{if(c==3){var d=WrapVariableArray[3]}else{if(c==4){var d=WrapVariableArray[4]}else{if(c==5){var d=WrapVariableArray[5]}}}}}}if(lines[pos.row-1][0].length<d[0]){pos.row--;if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{var k=lines[pos.row-1][0].split(" ");var a=0;var b=[];while(a<k.length){if(k.slice(a).join().length<=h[0]){b.push(k.slice(a).join().length);a=k.length}else{var l=0;while(k.slice(a,a+l).join().length<h[0]){l++}b.push(k.slice(a,a+l-1).join().length);a+=l-1}}pos.row--;pos.col+=lines[pos.row][0].length-b[b.length-1];if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}paint(false,false,false,true)}else{if(document.getElementById("suggestBox")!=null){var e=document.getElementById("focus");e.removeAttribute("id");e=e.previousSibling;if(e==null){e=document.getElementById("suggestBox").lastChild}if(e.nodeType=="#text"){e=e.previousSibling}if(e==null){e=document.getElementById("suggestBox").lastChild}e.id="focus"}}}function downArrow(){if(typeToScript&&document.getElementById("suggestBox")==null){if(pos.row==lines.length-1&&pos.col==lines[pos.row][0].length){return}var h=lines[pos.row][1];if(h==0){var g=WrapVariableArray[0]}else{if(h==1){var g=WrapVariableArray[1]}else{if(h==2){var g=WrapVariableArray[2]}else{if(h==3){var g=WrapVariableArray[3]}else{if(h==4){var g=WrapVariableArray[4]}else{if(h==5){var g=WrapVariableArray[5]}}}}}}if(lines[pos.row][0].length>g[0]){var j=lines[pos.row][0].split(" ");var a=0;var b=[];while(a<j.length){if(j.slice(a).join().length<=g[0]){b.push(j.slice(a).join().length);a=j.length}else{var k=0;while(j.slice(a,a+k).join().length<g[0]){k++}b.push(j.slice(a,a+k-1).join().length);a+=k-1}}k=0;var e=b[0];while(e<pos.col){k++;e+=b[k]+1}if(k+1==b.length){if(checkSpell){ajaxSpell(pos.row)}for(var c=0;c<b.length-1;c++){pos.col-=b[c]}pos.col--;pos.row++;if(pos.row>lines.length-1){pos.row--;pos.col=lines[pos.row][0].length}if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{pos.col+=b[k]+1;if(pos.col>(e+b[k+1]+1)){pos.col=e+b[k+1]+1}}}else{if(pos.row==lines.length-1){pos.col=lines[pos.row][0].length}else{pos.row++;if(pos.row>lines.length-1){pos.row=lines.length-1}if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}paint(false,false,false,true)}else{if(document.getElementById("suggestBox")!=null){var d=document.getElementById("focus");d.removeAttribute("id");d=d.nextSibling;if(d==null){d=document.getElementById("suggestBox").firstChild}if(d.nodeType=="#text"){d=d.nextSibling}if(d==null){d=document.getElementById("suggestBox").firstChild}d.id="focus"}}}function leftArrow(){if(typeToScript){var b=false;if(pos.row==0&&pos.col==0){return}if(pos.col==0){if(checkSpell){ajaxSpell(pos.row)}pos.row--;pos.col=lines[pos.row][0].length;var b=true}else{pos.col=pos.col-1}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}var a=document.getElementById("suggestBox");if(b&&a!=null){a.parentNode.removeChild(a)}}}function rightArrow(){if(typeToScript){var b=false;if(pos.col==lines[pos.row][0].length&&pos.row==lines.length-1){return}if(pos.col==lines[pos.row][0].length){if(checkSpell){ajaxSpell(pos.row)}pos.row++;pos.col=0;b=true}else{pos.col=pos.col+1}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}var a=document.getElementById("suggestBox");if(b&&a!=null){a.parentNode.removeChild(a)}}}function pagination(){pageBreaks=[];i=0;var b=0;while(i<lines.length){lineCount=b;while(lineCount+linesNLB[i].length<56){lineCount+=linesNLB[i].length;i++;if(i==lines.length){return}}var a=0;b=0;if(lines[i][1]==3&&lineCount<54&&lineCount+linesNLB[i].length>57){a=55-lineCount;b=1-a;lineCount=56}else{if(lines[i][1]==3&&lineCount<54&&linesNLB[i].length>4){a=linesNLB[i].length-3;b=1-a;lineCount=55}else{if(lines[i][1]==1&&lineCount<55&&lineCount+linesNLB[i].length>57){a=55-lineCount;b=1-a;lineCount=56}else{if(lines[i][1]==1&&lineCount<55&&linesNLB[i].length>4){a=linesNLB[i].length-3;b=1-a;lineCount=55}else{while(lines[i-1][1]==0||lines[i-1][1]==2||lines[i-1][1]==4){i--;lineCount-=linesNLB[i].length}}}}}pageBreaks.push([i,lineCount,a])}}function sceneIndex(){scenes=[];var a=0;for(var b=0;b<lines.length;b++){if(lines[b][1]==0){a++;scenes.push([String(a)+") "+lines[b][0].toUpperCase(),b])}}var e=document.getElementById("sceneBox");e.innerHTML="";for(var b=0;b<scenes.length;b++){var d=e.appendChild(document.createElement("p"));d.appendChild(document.createTextNode(scenes[b][0]));d.className="sceneItem";d.id="row"+scenes[b][1]}$(".sceneItem").click(function(){$(this).css("background-color","#999ccc");jumpTo(this.id)});$(".sceneItem").mouseover(function(){$(this).css("background-color","#ccccff")});$(".sceneItem").mouseout(function(){$(this).css("background-color","white")})}function sortNotes(d,c){if(d[0]<c[0]){return -1}if(d[0]>c[0]){return 1}if(d[1]<c[1]){return -1}if(d[1]>c[1]){return 1}return 0}function noteIndex(){notes.sort(sortNotes);var g=document.getElementById("noteBox");g.innerHTML="";for(x in notes){var d=g.appendChild(document.createElement("div"));d.className="thread";for(y in notes[x][2]){var f=d.appendChild(document.createElement("div"));var e=f.appendChild(document.createElement("div"));e.innerHTML=notes[x][2][y][0];var b=f.appendChild(document.createElement("div"));b.appendChild(document.createTextNode(notes[x][2][y][1].split("@")[0]));b.align="right";b.className="msgInfo";f.className="msg";f.id=notes[x][3]+"msg"}var a=d.appendChild(document.createElement("div"));a.className="respond";a.appendChild(document.createTextNode("Respond"));a.id=notes[x][3]}typeToScript=true;$(".respond").click(function(){newMessage(this.id)});$(".msg").click(function(){for(i in notes){if(String(notes[i][3])==String(this.id.replace("msg",""))){pos.row=anch.row=notes[i][0];pos.col=anch.col=notes[i][1]}}paint(false,false,false,false);if(ud>document.getElementById("canvas").height){scroll(ud-document.getElementById("canvas").height+200)}if(ud<0){scroll(ud-200)}})}function newThread(){tabs(1);noteIndex();typeToScript=false;var h=document.getElementById("noteBox");var d=h.appendChild(document.createElement("div"));d.className="thread";id=Math.round(Math.random()*1000000000);var e=true;while(e==true){e=false;for(b in notes){if(String(notes[b][3])==String(id)){id=Math.round(Math.random()*1000000000);e=true}}}var g=d.appendChild(document.createElement("div"));g.className="respondControls";var b=g.appendChild(document.createElement("div"));b.contentEditable=true;b.id="nmi";var f=g.appendChild(document.createElement("input"));f.type="button";f.value="Save";f.id="noteSave";var a=g.appendChild(document.createElement("input"));a.type="button";a.value="Cancel";a.id="noteCancel";$("#noteSave").click(function(){submitNewThread(id)});$("#noteCancel").click(function(){noteIndex()});b.focus()}function submitNewThread(b){var e=document.getElementById("nmi").innerHTML;var c=document.getElementById("user_email").innerHTML;var g=new Date();if(e!=""){var a=[pos.row,pos.col,[[e,c,g]],b];notes.push(a);var f=[pos.row,pos.col,e,b];$.post("/notesnewthread",{resource_id:resource_id,row:pos.row,col:pos.col,content:e,thread_id:b},function(h){if(h!="sent"){alert("Sorry, there was a problem sending that message. Please try again later.")}})}noteIndex()}function newMessage(b){noteIndex();typeToScript=false;var g=document.getElementById(b);var f=g.parentNode.insertBefore(document.createElement("div"),g);f.className="respondControls";var d=f.appendChild(document.createElement("div"));d.contentEditable=true;d.id="nmi";var e=f.appendChild(document.createElement("input"));e.type="button";e.value="Save";e.id="noteSave";var a=f.appendChild(document.createElement("input"));a.type="button";a.value="Cancel";a.id="noteCancel";g.parentNode.removeChild(g);$("#noteSave").click(function(){submitMessage(b)});$("#noteCancel").click(function(){noteIndex()});d.focus()}function submitMessage(b){for(x in notes){if(notes[x][3]==b){var g=x}}var f=new Date();var e=document.getElementById("nmi").innerHTML;var c=document.getElementById("user_email").innerHTML;if(e!=""){var a=[e,c,f];notes[g][2].push(a);$.post("/notessubmitmessage",{resource_id:resource_id,content:e,thread_id:b},function(h){if(h!="sent"){alert("Sorry, there was a problem sending that message. Please try again later.")}})}noteIndex()}function openMenu(a){document.getElementById(a).style.backgroundColor="#6484df";document.getElementById(a).style.color="white";document.getElementById(a+"Menu").style.display="block";var d=document.getElementsByTagName("td");for(var b=0;b<d.length;b++){if(d[b].className=="formatTD"){if(d[b].id=="check"+lines[pos.row][1]){d[b].innerHTML="";d[b].appendChild(document.createTextNode("✓"))}else{d[b].innerHTML=""}}}}function topMenuOver(a){var b=false;var e=document.getElementsByTagName("div");for(var d=0;d<e.length;d++){if(e[d].className=="menuItem"){e[d].style.backgroundColor="#A2BAE9";e[d].style.color="black"}if(e[d].className=="topMenu"){if(e[d].style.display=="block"){e[d].style.display="none";b=true}}}if(b){document.getElementById(a+"Menu").style.display="block"}document.getElementById(a).style.backgroundColor="#6484df";document.getElementById(a).style.color="white";var e=document.getElementsByTagName("td");for(var d=0;d<e.length;d++){if(e[d].className=="formatTD"){if(e[d].id=="check"+lines[pos.row][1]){e[d].innerHTML="";e[d].appendChild(document.createTextNode("✓"))}else{e[d].innerHTML=""}}}}function topMenuOut(a){if(document.getElementById(a+"Menu").style.display=="none"){document.getElementById(a).style.backgroundColor="#A2BAE9";document.getElementById(a).style.color="black"}}function closeScript(){var a=JSON.stringify(lines);$.post("/save",{data:a,resource_id:resource_id},function(b){self.close()})}function newScriptPrompt(){typeToScript=false;document.getElementById("newscriptpopup").style.visibility="visible"}function hideNewScriptPrompt(){typeToScript=true;document.getElementById("newScript").value="";document.getElementById("newscriptpopup").style.visibility="hidden"}function createScript(){var a=document.getElementById("newScript").value;if(a!=""){$.post("/newscript",{filename:a},function(b){window.open("/editor?resource_id="+b)})}hideNewScriptPrompt()}function exportPrompt(){if(document.getElementById("saveButton").value=="Save"){save(0)}typeToScript=false;document.getElementById("exportpopup").style.visibility="visible"}function hideExportPrompt(){typeToScript=true;document.getElementById("exportpopup").style.visibility="hidden"}function exportScripts(){var e=window.location.href;var g=e.split("=")[1];if(g=="demo"){nope();return}else{var j;var h="&title_page="+document.getElementById("et").selectedIndex;var f=document.getElementsByTagName("input");for(var k=0;k<f.length;k++){if(f[k].checked==true){if(f[k].className=="exportList"){j=f[k].name;e="/export?resource_id="+g+"&export_format="+j+"&fromPage=editor"+h;window.open(e)}}}}}function scrollArrows(b){var a=document.getElementById("canvas").height;b.fillStyle="#333";b.fillRect(editorWidth-22,a-39,20,20);b.fillStyle="#ddd";b.fillRect(editorWidth-20,a-37,16,16);b.beginPath();b.moveTo(editorWidth-18,a-24);b.lineTo(editorWidth-12,a-35);b.lineTo(editorWidth-6,a-24);b.closePath();b.fillStyle="#333";b.fill();b.fillStyle="#333";b.fillRect(editorWidth-22,a-19,20,20);b.fillStyle="#ddd";b.fillRect(editorWidth-20,a-18,16,16);b.beginPath();b.moveTo(editorWidth-18,a-15);b.lineTo(editorWidth-12,a-4);b.lineTo(editorWidth-6,a-15);b.closePath();b.fillStyle="#333";b.fill()}function scrollBar(b,f){var a=document.getElementById("canvas").height;var d=(pageBreaks.length+1)*72*lineheight+40;var e=((a)/d)*(a-39);if(e<20){e=20}if(e>=a-39){e=a-39}var c=(vOffset/(d-a))*(a-39-e);b.fillRect(editorWidth-22,c,20,e)}function drawRange(s){if(pos.row>anch.row){var p={row:anch.row,col:anch.col};var h={row:pos.row,col:pos.col}}else{if(pos.row==anch.row&&pos.col>anch.col){var p={row:anch.row,col:anch.col};var h={row:pos.row,col:pos.col}}else{var p={row:pos.row,col:pos.col};var h={row:anch.row,col:anch.col}}}var r=lineheight*9+3;var m=0;for(var k=0;k<p.row;k++){if(pageBreaks.length!=0&&pageBreaks[m][2]==0&&pageBreaks[m][0]-1==k){r=72*lineheight*(m+1)+9*lineheight+4;m++;if(m==pageBreaks.length){m--}}else{if(pageBreaks.length!=0&&pageBreaks[m][2]!=0&&pageBreaks[m][0]==k){r=72*lineheight*(m+1)+9*lineheight+4;r+=(linesNLB[k].length-pageBreaks[m][2])*lineheight;if(lines[k][1]==3){r+=lineheight}m++;if(m==pageBreaks.length){m--}}else{r+=lineheight*linesNLB[k].length}}}var k=0;var q=linesNLB[p.row][k]+1;while(p.col>q){r+=lineheight;if(pageBreaks.length!=0&&pageBreaks[m][0]==p.row&&pageBreaks[m][2]==k+1){r=72*lineheight*(m+1)+9*lineheight+4;if(lines[p.row][1]==3){r+=lineheight}}k++;q+=linesNLB[p.row][k]+1}q-=linesNLB[p.row][k]+1;var l=WrapVariableArray[lines[p.row][1]][1];l+=((p.col-q)*fontWidth);r+=lineheight;for(note in notes){if(notes[note][0]==p.row){if(q<notes[note][1]&&q+linesNLB[p.row][k]+1>notes[note][1]){if(notes[note][1]<p.col){l+=fontWidth}}}}var d=lineheight*9+3;m=0;for(var g=0;g<h.row;g++){if(pageBreaks.length!=0&&pageBreaks[m][2]==0&&pageBreaks[m][0]-1==g){d=72*lineheight*(m+1)+9*lineheight+4;m++;if(m==pageBreaks.length){m--}}else{if(pageBreaks.length!=0&&pageBreaks[m][2]!=0&&pageBreaks[m][0]==g){d=72*lineheight*(m+1)+9*lineheight+4;d+=(linesNLB[g].length-pageBreaks[m][2])*lineheight;if(lines[g][1]==3){d+=lineheight}m++;if(m==pageBreaks.length){m--}}else{d+=lineheight*linesNLB[g].length}}}var g=0;var n=linesNLB[h.row][g]+1;while(h.col>n){d+=lineheight;if(pageBreaks.length!=0&&pageBreaks[m][0]==h.row&&pageBreaks[m][2]==g+1){d=72*lineheight*(m+1)+9*lineheight+4;if(lines[h.row][1]==3){d+=lineheight}}g++;n+=linesNLB[h.row][g]+1}n-=linesNLB[h.row][g]+1;var b=WrapVariableArray[lines[h.row][1]][1];b+=((h.col-n)*fontWidth);d+=lineheight;for(note in notes){if(notes[note][0]==h.row){if(n<notes[note][1]&&n+linesNLB[h.row][g]+1>notes[note][1]){if(notes[note][1]<h.col){b+=fontWidth}}}}s.fillStyle="lightBlue";if(d==r){var f=l;if(lines[p.row][1]==5){f-=(lines[p.row][0].length*fontWidth)}s.fillRect(f,r-vOffset,b-l,12)}else{var c=l;if(lines[p.row][1]==5){c-=(lines[p.row][0].length*fontWidth)}s.fillRect(c,r-vOffset,(q+linesNLB[p.row][k]-p.col)*fontWidth,12);while(r+lineheight<d){for(var a=0;a<pageBreaks.length;a++){if(pageBreaks.length!=0&&pageBreaks[a][0]-1==p.row&&pageBreaks[a][2]==0&&k==linesNLB[p.row].length-1){r=72*lineheight*(a+1)+9*lineheight+4}else{if(pageBreaks.length!=0&&pageBreaks[a][0]==p.row&&k==pageBreaks[a][2]-1){r=72*lineheight*(a+1)+9*lineheight+4;if(lines[p.row][1]==3){r+=lineheight}}}}k++;r+=lineheight;if(linesNLB[p.row].length<=k){p.row++;k=0}if(r!=d){var e=WrapVariableArray[lines[p.row][1]][1];if(lines[p.row][1]==5){e-=(lines[p.row][0].length*fontWidth)}s.fillRect(e,r-vOffset,linesNLB[p.row][k]*fontWidth,12)}}var o=WrapVariableArray[lines[h.row][1]][1];if(lines[h.row][1]==5){o-=(lines[h.row][0].length*fontWidth)}s.fillRect(o,d-vOffset,(h.col-n)*fontWidth,12)}}function drawNote(f,a,d,b,e){if(lines[e][1]==5){b.fillStyle="gold";b.beginPath();b.moveTo(f-fontWidth*(lines[e][0].length-d+1),a-vOffset-lineheight+3);b.lineTo(f-fontWidth*(lines[e][0].length-d+1),a-vOffset-lineheight+3+lineheight);b.lineTo(f-fontWidth*(lines[e][0].length-d+1)+fontWidth,a-vOffset-lineheight+3+lineheight);b.lineTo(f-fontWidth*(lines[e][0].length-d+1)+fontWidth,a-vOffset-lineheight+3+4);b.lineTo(f-fontWidth*(lines[e][0].length-d+1)+fontWidth-4,a-vOffset-lineheight+3);b.closePath();b.fill();b.strokeStyle="#333";b.lineWidth=1;b.beginPath();for(var c=1;c<6;c++){b.moveTo(f-fontWidth*(lines[e][0].length-d+1)+1,a-vOffset-lineheight+3+(2*c)+0.5);b.lineTo(f-fontWidth*(lines[e][0].length-d+1)+fontWidth-1,a-vOffset-lineheight+3+(2*c)+0.5);b.stroke()}b.strokeStyle="#999";b.beginPath();b.moveTo(f-fontWidth*(lines[e][0].length-d+1)+fontWidth-4,a-vOffset-lineheight+3);b.lineTo(f-fontWidth*(lines[e][0].length-d+1)+fontWidth-4,a-vOffset-lineheight+3+4);b.lineTo(f-fontWidth*(lines[e][0].length-d+1)+fontWidth,a-vOffset-lineheight+3+4);b.stroke()}else{b.fillStyle="gold";b.beginPath();b.moveTo(f+fontWidth*d,a-vOffset-lineheight+3);b.lineTo(f+fontWidth*d,a-vOffset-lineheight+3+lineheight);b.lineTo(f+fontWidth*d+fontWidth,a-vOffset-lineheight+3+lineheight);b.lineTo(f+fontWidth*d+fontWidth,a-vOffset-lineheight+3+4);b.lineTo(f+fontWidth*d+fontWidth-4,a-vOffset-lineheight+3);b.closePath();b.fill();b.strokeStyle="#333";b.lineWidth=1;b.beginPath();for(var e=1;e<6;e++){b.moveTo(f+fontWidth*d+1,a-vOffset-lineheight+3+(2*e)+0.5);b.lineTo(f+fontWidth*d+fontWidth-1,a-vOffset-lineheight+3+(2*e)+0.5);b.stroke()}b.strokeStyle="#999";b.beginPath();b.moveTo(f+fontWidth*d+fontWidth-4,a-vOffset-lineheight+3);b.lineTo(f+fontWidth*d+fontWidth-4,a-vOffset-lineheight+3+4);b.lineTo(f+fontWidth*d+fontWidth,a-vOffset-lineheight+3+4);b.stroke()}b.fillStyle=foreground}function sortNumbers(d,c){return d-c}function paint(ah,C,Z,A){if(typeToScript){var p=document.getElementById("canvas");var w=p.getContext("2d");w.clearRect(0,0,2000,2500);w.fillStyle="#ccc";w.fillRect(0,0,editorWidth,document.getElementById("canvas").height);w.fillStyle=foreground;var V=45;var T=lineheight;for(var ad=0;ad<=pageBreaks.length;ad++){w.fillStyle=background;w.fillRect(V,T-vOffset,editorWidth*0.85,lineheight*70);w.strokeStyle="#000";w.lineWidth=1;w.strokeRect(V,T-vOffset,Math.round(editorWidth*0.85),lineheight*70);w.strokeStyle="#999";w.strokeRect(V-2,T-vOffset-2,Math.round(editorWidth*0.85)+4,lineheight*70+4);w.fillStyle=foreground;if(ad>0){w.fillText(String(ad+1)+".",645,T-vOffset+85)}T+=lineheight*72}var N=lineheight*9+2;var L=WrapVariableArray[0];w.fillStyle="#ddd";if(!Z){var U=0;for(var ad=0;ad<lines.length;ad++){if(pageBreaks.length!=0&&pageBreaks[U][0]==ad){N=72*lineheight*(U+1)+9*lineheight+2;if(pageBreaks[U][2]!=0){N-=pageBreaks[U][2]*lineheight;if(lines[ad][1]==3){N+=lineheight}}U++;if(U==pageBreaks.length){U--}}if(ad<linesNLB.length){for(var ab=0;ab<linesNLB[ad].length;ab++){N+=lineheight;if(lines[ad][1]==0){if(linesNLB[ad][ab]!=0){w.fillRect(L[1]-3,N-vOffset,61*fontWidth+6,14)}if(lines[ad][0]==""&&ab==0){w.fillRect(L[1]-3,N-vOffset,61*fontWidth+6,14)}}}}}}w.fillStyle=foreground;if(pos.row!=anch.row||anch.col!=pos.col){drawRange(w);if(!pasting){selection()}}w.fillStyle=foreground;w.font=font;var O=lineheight*11;var h=[];var l="";var U=0;var s=false;var ag=0;for(var ad=0;ad<lines.length;ad++){if(lines[ad][1]==0){ag++}if(lines[ad][1]==4){if(lines[ad][0].charAt(0)!="("){lines[ad][0]="("+lines[ad][0]}if(lines[ad][0].charAt(lines[ad][0].length-1)!=")"){lines[ad][0]=lines[ad][0]+")"}}var ao=false;if(!Z){if(pageBreaks.length!=0&&pageBreaks[U]!=undefined&&pageBreaks[U][0]==ad){if(pageBreaks[U][2]==0){O=72*lineheight*(U+1)+11*lineheight;U++;if(U>=pageBreaks.length){if(!s){s=U+1}U=pageBreaks.length-2}}else{ao=true}}}if(!Z&&!ao&&(O-vOffset>1200||O-vOffset<-200)){O+=(lineheight*linesNLB[ad].length);if(ad==pos.row){var J=O;o=[]}}else{var v=[];if(viewNotes){for(note in notes){if(notes[note][0]==ad){v.push(notes[note][1])}}}v=v.sort(sortNumbers);var ap=lines[ad][1];var k=(C?anch.row:pos.row);if(ad==pos.row){var J=O-lineheight;if(ap==1){var K=WrapVariableArray[1][1]}else{if(ap==0){var K=WrapVariableArray[0][1]}else{if(ap==3){var K=WrapVariableArray[3][1]}else{if(ap==2){var K=WrapVariableArray[2][1]}else{if(ap==4){var K=WrapVariableArray[4][1]}else{if(ap==5){var K=WrapVariableArray[5][1]}}}}}}var B=true;var o=[]}if(ad==anch.row){var H=O-lineheight;var M=true;var a=[]}var ae=lines[ad][0];if(ap==0){var L=WrapVariableArray[0]}else{if(ap==1){var L=WrapVariableArray[1]}else{if(ap==2){var L=WrapVariableArray[2]}else{if(ap==3){var L=WrapVariableArray[3]}else{if(ap==4){var L=WrapVariableArray[4]}else{if(ap==5){var L=WrapVariableArray[5]}}}}}}var u=ae.split(" ");var Q=0;if(ah||C){var aa=[]}linesNLB[ad]=[];var g=0;var E=false;var b=false;while(Q<u.length){var S=0;if(u.slice(Q).join().length<L[0]){var al=u.slice(Q).join(" ");if(lines[ad][1]==2&&l!=""&&lines[ad][0].toUpperCase()==l.toUpperCase()){al+=" (Cont'd)"}if(lines[ad][1]==0){l=""}if(L[3]==1){al=al.toUpperCase()}if(L[2]==1){w.textAlign="right"}var ak=al;var Y=[];if(viewNotes){for(note in v){if(v[note]>=lines[ad][0].length-al.length){ak=ak.substr(0,v[note]-g+Y.length)+" "+ak.substr(v[note]-g+Y.length);drawNote(L[1],O,v[note]-g+Y.length,w,ad);Y.push(v[note])}}}if(al!=""){w.fillText(ak,L[1],O-vOffset)}w.textAlign="left";Q=u.length;linesNLB[ad].push(al.length);O+=lineheight;if(L[4]==2){linesNLB[ad].push(0);O+=lineheight}if(ah||C){aa.push(al.length)}if(B){o.push(al.length)}if(M){a.push(al.length)}}else{var S=0;while(u.slice(Q,Q+S).join(" ").length<L[0]){newLineToPrint=u.slice(Q,Q+S).join(" ");S++;if(L[3]==1){newLineToPrint=newLineToPrint.toUpperCase()}}var ac=newLineToPrint;var Y=[];if(viewNotes){for(note in v){if(v[note]>=g&&v[note]<=g+newLineToPrint.length){ac=ac.substr(0,v[note]-g+Y.length)+" "+ac.substr(v[note]-g+Y.length);drawNote(L[1],O,v[note]-g+Y.length,w,ad);Y.push(v[note])}}}g+=newLineToPrint.length+1;w.fillText(ac,L[1],O-vOffset);linesNLB[ad].push(newLineToPrint.length);O+=lineheight;Q+=S-1;S=0;if(ah||C){aa.push(newLineToPrint.length)}if(B){o.push(newLineToPrint.length)}if(M){a.push(newLineToPrint.length)}}if(lines[ad][1]==3&&ad+1!=lines.length&&lines[ad+1][1]==4&&linesNLB[ad][linesNLB[ad].length-1]==0){linesNLB[ad].pop();O-=lineheight}if(ah&&!b&&ah.clientY-headerHeight<O-vOffset-lineheight&&ah.clientY-headerHeight>O-vOffset-(linesNLB[ad].length*lineheight)-lineheight){pos.row=ad;pos.col=0;var S=0;var X=O-vOffset-(linesNLB[ad].length*lineheight);while(ah.clientY-headerHeight>X){pos.col+=linesNLB[ad][S]+1;X+=lineheight;S++}if(ap!=5){var D=Math.round(((ah.clientX-L[1])/fontWidth));if(D>linesNLB[ad][S]){D=linesNLB[ad][S]}if(D<0){D=0}pos.col+=D}else{var D=Math.round(((L[1]-ah.clientX)/fontWidth));if(D<0){D=0}pos.col-=D;pos.col+=lines[ad][0].length}if(viewNotes){for(note in Y){if(Y[note]<pos.col){pos.col--}}}var I=0;for(var aj=0;aj<aa.length;aj++){I+=aa[aj]+1}if(pos.col<0){pos.col=0}if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}b=true}if(C&&!E&&C.clientY-headerHeight<O-vOffset-lineheight&&C.clientY-headerHeight>O-vOffset-(linesNLB[ad].length*lineheight)-lineheight){anch.row=ad;anch.col=0;var S=0;var X=O-vOffset-(linesNLB[ad].length*lineheight);while(C.clientY-headerHeight>X){anch.col+=linesNLB[ad][S]+1;X+=lineheight;S++}if(ap!=5){var D=Math.round(((C.clientX-L[1])/fontWidth));if(D>linesNLB[ad][S]){D=linesNLB[ad][S]}if(D<0){D=0}anch.col+=D}else{var D=Math.round(((L[1]-C.clientX)/fontWidth));if(D<0){D=0}anch.col-=D;anch.col+=lines[ad][0].length}if(viewNotes){for(note in Y){if(Y[note]<anch.col){anch.col--}}}var I=0;for(var aj=0;aj<aa.length;aj++){I+=aa[aj]+1}if(anch.col<0){anch.col=0}if(anch.col>lines[anch.row][0].length){anch.col=lines[anch.row][0].length}E=true}if(ao&&linesNLB[ad].length==pageBreaks[U][2]){if(lines[ad][1]==3){w.fillText("(MORE)",WrapVariableArray[2][1],O-vOffset)}O=72*lineheight*(U+1)+11*lineheight;if(lines[ad][1]==3){w.fillText(l.toUpperCase()+" (CONT'D)",WrapVariableArray[2][1],O-vOffset);O+=lineheight}U++;ao=false;if(pos.row==ad){h.push(U)}}}var B=false;var M=false}if(lines[ad][1]==2){var l=lines[ad][0]}if(ad==pos.row&&s==false){s=U+1}if(ad==pos.row){var an=ag;var f=v}if(U>=pageBreaks.length){if(s==false){s=U+1}U=pageBreaks.length-2}}while(lines.length<linesNLB.length){linesNLB.pop()}var ai=new Date();var z=ai.getMilliseconds();var F=z-milli;var m=false;if(F>0&&F<500){m=true}if(F<0&&F<-500){m=true}if(o){var P=0;var t=pos.col;var r=o[P];while(pos.col>r){P++;r+=1+o[P]}r-=o[P];var R=0;for(note in f){var W=f[note];console.log();if(W<pos.col&&W>r&&W<r+o[P]){R++}}if(h.length>0&&P>=pageBreaks[h[0]-1][2]){s+=1;J=72*h[0]*lineheight+9*lineheight;if(lines[pos.row][1]==3){J+=lineheight*2;P-=pageBreaks[h[0]-1][2]}else{if(lines[pos.row][1]==1){P-=pageBreaks[h[0]-1][2];J+=lineheight}}}if(m){var G=K+((pos.col-r+R)*fontWidth);if(lines[pos.row][1]==5){G-=lines[pos.row][0].length*fontWidth}ud=2+J+(P*lineheight)-vOffset;try{w.fillRect(G,ud,2,17)}catch(af){console.log(lines[pos.row][0])}}}w.lineWidth=4;w.strokeStyle="#ddd";w.beginPath();w.moveTo(2,2);w.lineTo(2,document.getElementById("canvas").height-1);w.lineTo(editorWidth,document.getElementById("canvas").height-1);w.lineTo(editorWidth,2);w.lineTo(2,2);w.stroke();w.fillStyle="#aaa";w.fillRect(3,document.getElementById("canvas").height-24,editorWidth-25,24);w.strokeStyle="#666";w.lineWidth=1;w.beginPath();w.moveTo(2,document.getElementById("canvas").height-25);w.lineTo(2,document.getElementById("canvas").height-2);w.lineTo(editorWidth-23,document.getElementById("canvas").height-2);w.lineTo(editorWidth-23,document.getElementById("canvas").height-25);w.closePath();w.stroke();w.beginPath();w.moveTo(1,document.getElementById("canvas").height-24);w.lineTo(1,document.getElementById("canvas").height-1);w.lineTo(editorWidth-22,document.getElementById("canvas").height-1);w.lineTo(editorWidth-22,document.getElementById("canvas").height-24);w.closePath();w.strokeStyle="#333";w.stroke();var am=pageBreaks.length+1;var c="Page "+s+" of "+am;w.font="10pt sans-serif";w.fillStyle="#000";w.fillText(c,editorWidth-150,document.getElementById("canvas").height-8);var q="Scene "+an+" of "+scenes.length;w.fillText(q,50,document.getElementById("canvas").height-8);w.font=font;scrollArrows(w);scrollBar(w,O);if(C){pos.row=anch.row;pos.col=anch.col}if(Z){pagination()}if(mouseDownBool&&pos.row<anch.row&&mouseY<40){scroll(-20)}if(mouseDownBool&&pos.row>anch.row&&mouseY>document.getElementById("canvas").height-50){scroll(20)}if(A=="enter"){if(ud>document.getElementById("canvas").height){scroll(600)}}else{if(A){if((2+J+(P*lineheight)-vOffset)>document.getElementById("canvas").height-60){scroll(45)}else{if(ud<45){scroll(-45)}}}}}};