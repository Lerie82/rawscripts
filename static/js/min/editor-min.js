function nope(){alert("Sorry, you're going to have to login to use these functions.")}function couldNotLoad(b){var a=b.split("&alternate_link&")[1];document.getElementById("couldnotloadpopup").style.visibility="visible";document.getElementById("alt_link").href=a}function refresh(){window.location.href=window.location.href}function infoSizes(){var a=$("#scriptInfo").height()-50;var b=(a/3)-$("#sceneBoxHandle").height();$("#sceneindex").height(b);$("#noteindex").height(b);$("#characterindex").height(b);while($("#characterindex").height()>+0){$("#noteindex").height($("#noteindex").height()+1);$("#characterindex").height($("#characterindex").height()-1)}}function infoResize(b){var a=document.getElementById("mouseInfo").innerHTML.split("?");var d=a[1];var c=a[2]-b.clientY;if(d=="noteBoxHandle"){if($("#sceneindex").height()-c>=0){if($("#noteindex").height()+c>=0){$("#sceneindex").height($("#sceneindex").height()-c);$("#noteindex").height($("#noteindex").height()+c)}}}else{if(d=="characterBoxHandle"){if($("#noteindex").height()-c>=0){if($("#characterindex").height()+c>=0){$("#noteindex").height($("#noteindex").height()-c);$("#characterindex").height($("#characterindex").height()+c)}}}}a[2]=b.clientY;document.getElementById("mouseInfo").innerHTML=a.join("?")}function trackMouseDown(a){if(a.target.id!="sceneBoxHandle"){var b=a.clientY;document.getElementById("mouseInfo").innerHTML="down?"+a.target.id+"?"+b}}function trackMouseUp(a){document.getElementById("mouseInfo").innerHTML="up?0?0"}function tokenize(f){var j=0;var u=document.getElementsByTagName("div");for(var q=0;q<u.length;q++){if(u[q].className=="token"){j++}}if(j>4){alert("You can only have 5 recipients at a time for now. Only the first five will be sent.");return}var a=document.getElementById(f);var v=a.value.replace(",","");var s=v.replace(/ /g,"");if(s==""){return}var b=v.split(" ");var o=b.pop();var w="";if(b.length==0){w=o}else{w=b.join(" ").replace(/"/g,"")}var d=document.createElement("div");var h=document.getElementById(f+"s").appendChild(d);h.className="token";h.id=o;var e=document.createElement("span");var t=h.appendChild(e);var n=document.createTextNode(w);t.appendChild(n);var e=document.createElement("span");var p=h.appendChild(e);var l=document.createTextNode(o);p.className="mailto";p.appendChild(l);var g=document.createElement("a");var k=h.appendChild(g);var r=document.createTextNode(" | X");k.appendChild(r);var m='javascript:removeToken("'+o+'")';k.setAttribute("href",m);a.value=""}function removeToken(a){var b=document.getElementById(a);b.parentNode.removeChild(b)}function suggestNav(g){g.preventDefault();var h=document.getElementsByTagName("div");var a=new Array();for(var d=0;d<h.length;d++){if(h[d].className=="charSuggest"){a.push(h[d])}}if(document.getElementById("focus")==null){a[0].id="focus"}else{var b=document.getElementById("focus");b.removeAttribute("id");var f;if(g.which==40){if(f=b.nextSibling){if(f.nodeName=="#text"){f=f.nextSibling}f.setAttribute("id","focus")}}if(g.which==38){if(f=b.previousSibling){if(f.nodeName=="#text"){f=f.nextSibling}f.setAttribute("id","focus")}}}}function characterSuggest(p){var v=document.getElementById("suggest");if(v!=null){v.parentNode.removeChild(v)}if(p.innerHTML==""){return}if(p.innerHTML=="<br>"){return}p.id="charFocus";var h=$("#charFocus").offset();var u=window.innerHeight-h.top;if(u<100){var C=100-u;var B="+="+C;$("#container").scrollTo(B,10);h.top=h.top-C}var q=h.top+16+"px";var E=h.left+"px";p.removeAttribute("id");var m=document.createElement("div");var D=document.body.appendChild(m);D.id="suggest";D.style.position="fixed";D.style.top=q;D.style.left=E;D.style.zIndex="100";D.className="suggestBox";var g="";if(p.nodeName=="H3"){g="character"}else{g="scene"}var f=0;var w=p.firstChild.nodeValue.length;var z=document.getElementsByTagName("p");for(var y=0;y<z.length;y++){if(z[y].className==g){if(g=="scene"){var e=z[y].innerHTML.split(")",2);t=e[1];t=t.substr(1);t=t.substring(0,w)}else{var t=z[y].innerHTML.substring(0,w)}if(p.firstChild.nodeValue.toLowerCase()==t.toLowerCase()){var r;if(g=="scene"){var e=z[y].innerHTML.split(")",2);r=e[1].substr(1).toUpperCase()}else{r=z[y].innerHTML}var o=0;var A=document.getElementsByTagName("a");for(var n=0;n<A.length;n++){if(A[n].parentNode.className=="charSuggest"&&A[n].innerHTML==r){o=1}if(r.toUpperCase()==p.firstChild.nodeValue.toUpperCase()){o=1}}if(o==0){var m=document.createElement("div");var j=D.appendChild(m);j.className="charSuggest";var k=document.createElement("a");var d=j.appendChild(k);d.innerHTML=r;if(g=="character"){d.innerHTML=d.innerHTML.replace(/^\s+|\s+$/g,"")}var x='javascript:selectCharacter("'+r+'")';d.href=x;f=1}}}}if(f==0){D.parentNode.removeChild(D)}else{D.firstChild.id="focus";$(".charSuggest").mouseover(function(){var a=document.getElementById("focus");if(a!=null){a.removeAttribute("id")}this.id="focus"})}}function selectCharacter(a){var e=document.getElementById("suggest");if(e!=null){e.parentNode.removeChild(e)}var d=window.getSelection().anchorNode;var c=(d.nodeName=="#text"?d.parentNode:d);c.innerHTML=a;var b=window.getSelection();b.extend(c,1);b.collapseToEnd();sceneIndex()}function charSelect(c){var b=document.getElementById("focus").firstChild;var a=b.innerHTML;selectCharacter(a)}function bottomScroll(){var c=window.getSelection().anchorNode;var b=(c.nodeName=="#text"?c.parentNode:c);b.id="scrollFocus";var d=$("#scrollFocus").offset();var a=window.innerHeight-d.top;if(a<100){$("#container").scrollTo("+=100",0)}b.removeAttribute("id")}function tabButton(b){b.preventDefault();var a=document.getElementById("format").selectedIndex;if(a==4){a=0}else{if(a==3){a=5}else{if(a==2){a=1}else{if(a==5){a=3}else{if(a==1){a=0}else{a=2}}}}}document.getElementById("format").selectedIndex=a;a=a+1;fontEdit("formatBlock","h"+a)}function insertSharedNotes(z){if(z=="none"||z=="nonedata"||z=="cleaned notes db"||z=="no new notes"){}else{var r=0;var x=document.getElementById("textEditor").childNodes;z=z.slice(6);var o=z.split("&user&");for(var v=0;v<o.length;v++){try{var e=o[v].split("&data&");var A=e[0];var h=e[1].split("&unit&");for(var u=0;u<h.length;u++){var p=h[u].split("?comment=")[0];var b=h[u].split("?comment=")[1].split("?position=")[0];var y=h[u].split("?comment=")[1].split("?position=")[1];var g=document.getElementsByTagName("span");var l=0;for(var q=0;q<g.length;q++){if(g[q].title.split("?comment=")[0]==p){g[q].title=p+"?comment="+b+"?user="+A;l=1;r++}}if(l==0){for(var t=0;t<x.length;t++){if(String(t)==y){var d=x[t].appendChild(document.createElement("span"));d.className="sharedNotes";d.title=p+"?comment="+b+"?user="+A;d.appendChild(document.createTextNode("X"));r++}}}}}catch(f){}}}if(r!=0){notesIndex();var n=document.getElementById("save");var w=document.getElementById("exportS");var a=document.getElementById("emailS");n.value="Save";n.disabled=false;a.disabled=false;w.disabled=false;a.value="Send";w.value="Export";save()}}function updateNote(f){var a=f.id;if(a==""){a=f.parentNode.id}var h=document.getElementsByTagName("span");for(var g=0;g<h.length;g++){if(h[g].title.split("?comment=")[0]==a){var j=new Date();var b=j.getTime();var c=new RegExp("<br>","ig");var k=new RegExp("<div>","ig");var l=new RegExp("</div>","ig");if($.browser.mozilla){var e=f.innerHTML.replace(c,"HTMLLINEBREAK")}else{var e=f.innerHTML.replace(c,"").replace(l,"").replace(k,"HTMLLINEBREAK")}h[g].title=b+"?comment="+e;f.id=b}}}function insertNote(){fontEdit("insertHTML","a");var l=window.getSelection().getRangeAt(0);var a=l.startContainer;var e=l.startOffset-1;window.getSelection().extend(a,e);var m="<span class='notes' title='new'>X</span>";fontEdit("insertHTML",m);var f;var h=0;var k=document.getElementsByTagName("span");for(var g=0;g<k.length;g++){if(k[g].title=="new"){k[g].className="notes";var f=k[g];h=1}}if(h==0){for(var g=0;g<k.length;g++){if(k[g].className=="Apple-style-span"&&k[g].innerHTML=="X"){k[g].className="notes";var f=k[g]}}}var j=new Date();var b=j.getTime();f.title=b+"?comment=";notesIndex();document.getElementById(b).focus()}function selectNote(c){var b=c.title;var a=b.split("?comment=");var d=a[0];document.getElementById(d).focus()}function notesIndex(){var n=document.getElementById("noteindex").childNodes;for(var a=0;a<n.length;a++){document.getElementById("noteindex").removeChild(n[a]);a--}var f=0;var k=document.getElementsByTagName("span");for(var d=0;d<k.length;d++){if(k[d].className=="notes"||k[d].className=="sharedNotes"){k[d].innerHTML="X";var b="";var e=k[d].title.split("?comment=");var h=e[1].split("?user=")[0];if(k[d].className=="sharedNotes"){b=e[1].split("?user=")[1]}if($.browser.mozilla){var l=new RegExp("HTMLLINEBREAK","gi");var g=h.replace(l,"<br>");if(b!=""){g=g+"<br><br>--"+b}}else{var o=h.split("HTMLLINEBREAK");var g=o[0];for(var a=1;a<o.length;a++){g=g+"<div>";if(o[a]==""){g=g+"<br>"}else{g=g+o[a]}g=g+"</div>"}if(b!=""){g=g+"<div><br></div><div><br></div><div>--"+b+"</div>"}}var m=document.getElementById("noteindex").appendChild(document.createElement("div"));m.innerHTML=g;if(k[d].className=="notes"){m.className="postit";m.contentEditable="true"}if(k[d].className=="sharedNotes"){m.className="sharedPostit"}m.id=e[0];f++}}$(".postit").blur(function(c){updateNote(c.target)});$(".sharedPostit").click(function(c){scrollToNote(c.target)});return f}function scrollToNote(d){var f=d.id;if(f==""){f=d.parentNode.id}var e=document.getElementsByTagName("span");var b=0;var a=0;while(a==0){if(e[b].title.split("?comment=")[0]==f){a=1;e[b].id="note";e[b].innerHTML="X";$("#container").scrollTo("#note",500,{onAfter:function(){e[b].removeAttribute("id")}})}else{b++}if(b>e.length){a=1}}}function fontEdit(a,e){try{var d=window.getSelection().anchorNode;var b=(d.nodeName=="#text"?d.parentNode:d);if(b.className=="notes"||b.className=="sharedNotes"){return}}catch(c){}document.execCommand(a,"",e);bottomScroll();onTabOrEnter()}function enterButton(l){var j=0;var n=document.getElementsByTagName("span");for(var h=0;h<n.length;h++){var g=0;if(n[h].className=="notes"||n[h].className=="sharedNotes"){ifNotes=1}if(ifNotes==1&&n[h].parentNode.nodeName=="DIV"){var o=n[h].parentNode.previousSibling.nodeName;var f;if(o=="H1"){f="h2"}else{if(o=="H2"){f="h3"}else{if(o=="H3"){f="h4"}else{if(o=="H4"){f="h3"}else{if(o=="H5"){f="h1"}else{f="h4"}}}}}var m=document.getElementById("textEditor").insertBefore(document.createElement(f),n[h].parentNode);n[h].parentNode.parentNode.removeChild(n[h].parentNode);m.innerHTML="s";var k=document.createRange();k.selectNode(m);k.collapse(false);m.firstChild.select();j=1}}if(j==0){lineFormat()}var b=window.getSelection().anchorNode;var a=(b.nodeName=="#text"?b.parentNode:b);var o=a.nodeName;if(o=="H4"){characterIndex()}else{if(o=="H2"){sceneIndex()}}}function lineFormat(){var a=document.getElementById("format").selectedIndex;if(a==0){a=1}else{if(a==1){a=2}else{if(a==2){a=3}else{if(a==3){a=2}else{if(a==5){a=3}else{a=0}}}}}document.getElementById("format").selectedIndex=a;a=a+1;fontEdit("formatBlock","h"+a)}function getFormat(){try{var d=window.getSelection().anchorNode;var a=(d.nodeName=="#text"?d.parentNode:d);if(a.nodeName=="SPAN"){a=a.parentNode}var e=a.nodeName;if(e=="H1"){e=0}else{if(e=="H2"){e=1}else{if(e=="H3"){e=2}else{if(e=="H4"){e=3}else{if(e=="H5"){e=4}else{e=5}}}}}document.getElementById("format").selectedIndex=e;currentPage();onTabOrEnter()}catch(b){}}function onTabOrEnter(){var b=window.getSelection().anchorNode;var a=(b.nodeName=="#text"?b.parentNode:b);var f=a.nodeName;var e=document.getElementById("onTabOrEnter");if(f=="H1"){e.innerHTML="Tab : Character -- Enter : Action"}else{if(f=="H2"){e.innerHTML="Tab : Slugline -- Enter : Character"}else{if(f=="H3"){e.innerHTML="Tab : Action -- Enter : Dialouge"}else{if(f=="H4"){e.innerHTML="Tab : Parenthetical -- Enter : Character"}else{if(f=="H5"){e.innerHTML="Tab : Slugline -- Enter : Slugline"}else{e.innerHTML="Tab : Dialouge -- Enter : Dialouge"}}}}}}function sceneIndex(){var a=document.getElementById("textEditor").getElementsByTagName("h1");var g=0;var t=document.getElementById("sceneindex");var d=t.childNodes;for(var m=0;m<d.length;m=0){d[0].parentNode.removeChild(d[0])}while(g<a.length){var j=document.createElement("p");var q=t.appendChild(j);var e=g+1;var c="";var h=a[g].childNodes;try{for(var m=0;m<h.length;m++){var o=0;if(h[m].className=="notes"||h[m].className=="sharedNotes"){o=1}if(h[m].nodeName=="undefined"){}else{if(h[m].nodeName=="#text"){c=c+h[m].nodeValue}else{if(h[m].nodeName=="SPAN"&&o==0){var b=h[m].firstChild.nodeValue;c=c+b;h[m].parentNode.removeChild(h[m]);a[g].lastChild.nodeValue=a[g].firstChild.nodeValue+b}else{if(o==1){}else{c=c+h[m].firstChild.nodeValue}}}}}}catch(f){}var n=e+") "+c;n=n.replace(/<BR>/i,"");var r=document.createTextNode(n);q.appendChild(r);q.className="scene";q.id="p"+e;q.style.cursor="pointer";a[g].setAttribute("id",e);g++}$(".scene").mouseover(function(){$(this).css("background-color","#ccccff")});$(".scene").mouseout(function(){$(this).css("background-color","white")});$(".scene").click(function(){$(this).css("background-color","#999ccc");sceneSelect(this.id)})}function sceneSelect(b){var c="p"+b;var a="#"+b.replace(/p/,"");$("#container").scrollTo(a,500)}function characterIndex(){var m=document.getElementsByTagName("h3");if(m[0]==null){return}var j=new Array();for(var p=0;p<m.length;p++){j[p]=String(m[p].firstChild.nodeValue).toUpperCase().replace(" (CONT'D)","").replace(/&nbsp;/gi,"").replace(/\s+$/,"").replace(" (O.S.)","").replace(" (O.C.)","").replace(" (V.O.)","")}j.sort();var o=0;var n=1;while(o<j.length-1){if(j[o]==j[n]){j.splice(n,1)}else{o++;n++}}var g=document.getElementById("characterindex");var q=g.childNodes;for(var h=0;h<q.length;h=0){q[0].parentNode.removeChild(q[0])}var d=0;while(d<j.length){if(j[d]!="(MORE)"){var f=document.createElement("p");var l=g.appendChild(f);l.innerHTML=j[d];l.className="character"}d++}continued()}function pasteEdit(){if($.browser.webkit){setTimeout(function(){var g=window.getSelection().anchorNode;var b=(g.nodeName=="#text"?g.parentNode:g);removeAttribute();var j=document.getElementById("textEditor");var k=j.childNodes;for(var e=0;e<k.length;e++){var h=k[e].firstChild;if(h=="[object HTMLMetaElement]"){k[e].removeChild(h)}else{if(h=="[object Text]"){}else{if(h==null){}else{document.getElementById("textEditor").insertBefore(h,k[e]);e--}}}}sceneIndex();var a=window.getSelection();a.extend(b,1);a.collapseToEnd();bottomScroll()},0)}sceneIndex()}function removeAttribute(){var a=document.getElementById("textEditor").getElementsByTagName("meta");for(var b=0;b<a.length;b++){var d=a[b].parentNode;d.removeChild(a[b]);b--}var a=document.getElementById("textEditor").getElementsByTagName("h1");for(var c=0;c<a.length;c++){a[c].removeAttribute("style")}var a=document.getElementById("textEditor").getElementsByTagName("h2");for(var c=0;c<a.length;c++){a[c].removeAttribute("style")}var a=document.getElementById("textEditor").getElementsByTagName("h3");for(var c=0;c<a.length;c++){a[c].removeAttribute("style")}var a=document.getElementById("textEditor").getElementsByTagName("h4");for(var c=0;c<a.length;c++){a[c].removeAttribute("style")}var a=document.getElementById("textEditor").getElementsByTagName("h5");for(var c=0;c<a.length;c++){a[c].removeAttribute("style")}var a=document.getElementById("textEditor").getElementsByTagName("h6");for(var c=0;c<a.length;c++){a[c].removeAttribute("style")}}function pagination(){document.getElementById("textEditor").style.marginTop="10000px";var L=document.getElementsByTagName("hr");for(var N=0;N<L.length;N++){var I=L[N].parentNode;I.removeChild(L[N]);N--}var T=document.getElementsByTagName("h3");for(var H=0;H<T.length;H++){if(T[H].className=="more"){var V=T[H].previousSibling;if(V.nodeName=="#text"){V=V.previousSibling}var E=V.innerHTML;var b=T[H].nextSibling;while(b.nodeName!="H3"){b=b.nextSibling}var I=b.parentNode;I.removeChild(b);var d=T[H].nextSibling;while(d.nodeName!="H4"){d=d.nextSibling}E=E+" "+d.innerHTML;var I=d.parentNode;I.removeChild(d);V.innerHTML=E;I.removeChild(T[H])}}var B=document.getElementsByTagName("h5");for(var G=0;G<B.length;G++){if(B[G].className=="pn"){B[G].parentNode.removeChild(B[G]);G--}}var W=document.getElementById("textEditor").childNodes;var D=0;var x=[];var l=1;for(var R=0;R<W.length;R++){if(W[R].nodeName=="#text"){}else{var v=0;if(W[R].nodeName=="H1"){D=D+2}else{if(W[R].nodeName=="H3"){D=D+2;var u=W[R].innerHTML}else{if(W[R].nodeName=="H5"){D=D+2}else{if(W[R].nodeName=="H2"){D++;var s="";var S=W[R].childNodes;for(var U=0;U<S.length;U++){if(S[U].nodeName!="SPAN"){s=s+S[U].nodeValue}}var X=s.split(" ");for(var P=0;P<X.length;P++){v=v+X[P].length+1;if(v>62){D++;v=0;P--;l++}}D++}else{if(W[R].nodeName=="H4"){var s="";var S=W[R].childNodes;for(var U=0;U<S.length;U++){if(S[U].nodeName!="SPAN"){s=s+S[U].nodeValue}}var X=s.split(" ");for(var P=0;P<X.length;P++){v=v+X[P].length+1;if(v>35){D++;v=0;P--;l++}}D++}else{if(W[R].nodeName=="H6"){var s="";var S=W[R].childNodes;for(var U=0;U<S.length;U++){if(S[U].nodeName!="SPAN"){s=s+S[U].nodeValue}}var X=s.split(" ");for(var P=0;P<X.length;P++){v=v+X[P].length+1;if(v>26){D++;v=0;P--}}}}}}}}if(D>56){if(W[R].nodeName=="H2"){}if(W[R].nodeName=="H5"){R--;if(W[R].nodeName=="#text"){R--}}if(W[R].nodeName=="H1"){R--;if(W[R].nodeName=="#text"){R--}}if(W[R].nodeName=="H4"){if(l>3){if(D-l<55){var A=W[R].cloneNode(true);var t=document.getElementById("textEditor").insertBefore(A,W[R+1]);var z=56-D+l;var X=W[R].innerHTML.split(" ");var e=0;var K=0;var a=0;var M=0;var y="";while(e<z){if(X[K].length+M<35){y=y+String(X[K])+" ";M=M+X[K].length+1;a=a+X[K].length+1;K++}else{M=0;e++}}var g=t.innerHTML;g=g.replace(y,"");if(g.length<35){var f=y.split(" ");M=0;while(M<35){M=M+f[f.length-1]+1;g=f.pop()+" "+g}y=f.join(" ")}W[R].innerHTML=y;t.innerHTML=g;var J=document.createElement("h3");var C=document.getElementById("textEditor").insertBefore(J,t);C.innerHTML="(MORE)";C.className="more";var F=document.createElement("h3");var Q=document.getElementById("textEditor").insertBefore(F,t);Q.innerHTML=u;R++;R++}else{R--;if(W[R].nodeName=="#text"){R--}}}else{R--;if(W[R].nodeName=="#text"){R--}}}if(W[R].nodeName=="H6"){R--;if(W[R].nodeName=="#text"){R--}}var w=R+x.length;x.push(w);D=0;R--}l=1}}for(var K=0;K<x.length;K++){var O=document.createElement("hr");insertedElement=document.getElementById("textEditor").insertBefore(O,W[x[K]]);insertedElement.className="pb"}var w=document.getElementsByTagName("hr");for(var I=0;I<w.length;I++){var o=document.getElementById("textEditor").insertBefore(document.createElement("h5"),w[I].nextSibling);o.appendChild(document.createTextNode((I+2)+"."));o.className="pn"}document.getElementById("totalPages").innerHTML=" of  "+(x.length+1);document.getElementById("textEditor").style.marginTop="10px";continued()}function currentPage(){var e=window.getSelection().anchorNode;var a=(e.nodeName=="#text"?e.parentNode:e);var f=document.getElementById("textEditor").childNodes;var b=0;var d=1;while(f[b]!=a){if(f[b].nodeName=="HR"){d++}b++;if(b>f.length){return}}document.getElementById("currentPage").innerHTML=d}function htmlTitleUpdate(){if(document.getElementById("title")==""){document.title="Script Editor"}else{document.title=document.getElementById("title").innerHTML}}function continued(){var l=document.getElementsByTagName("h3");for(var f=0;f<l.length;f++){l[f].innerHTML=l[f].innerHTML.replace(/\s+$/,"");try{l[f].firstChild.nodeValue=l[f].firstChild.nodeValue.replace(/\s+$/,"")}catch(h){}}for(var d=0;d<l.length-1;d++){l[d].firstChild.nodeValue=l[d].firstChild.nodeValue.replace(" (CONT'D)","")}var l=document.getElementById("textEditor").childNodes;var g=null;var a=[];var k;for(var f=0;f<l.length;f++){k="";if(l[f].nodeName=="H1"){g=null}if(l[f].nodeName=="H3"){a=l[f].childNodes;for(var e=0;e<a.length;e++){if(a[e].nodeName=="#text"){k=k+a[e].nodeValue}}k=k.toUpperCase();k=k.replace(" (O.S.)","").replace(" (V.O.)","").replace(" (O.C.)","").toUpperCase();if(g=="&more&"){l[f].innerHTML=l[f].innerHTML+" (CONT'D)";g=k}else{if(l[f].className=="more"){g="&more&"}else{if(k==g){l[f].innerHTML=l[f].innerHTML+" (CONT'D)";g=k}else{g=k}}}}}}function printPrompt(){var a=notesIndex();if(a==0){printScript(0)}else{document.getElementById("printpopup").style.visibility="visible"}}function hidePrintPrompt(){document.getElementById("printpopup").style.visibility="hidden"}function printScript(a){pagination();document.getElementById("wholeShebang").style.display="none";var b=document.body.appendChild(document.createElement("div"));b.id="printDiv";b.style.width="600px";b.style.margin="auto";var j="<div>";var o=document.getElementById("textEditor").innerHTML;o=o.replace(/<hr class="pb">/gi,'<p style="display:none"></p>');o=o.replace(/class="pn"/gi,'class="printPageBreak"');o=o.replace(/<h3 class="more">/gi,'<h3 class="printMore">');o=o.replace(/<span class="notes"/gi,'<span class="printNotes"');o=o.replace(/<span class="sharedNotes"/gi,'<span class="printNotes"');b.innerHTML=o;var n=b.childNodes;for(var e=0;e<n.length;e++){if(n[e].className!="printPageBreak"&&n[e].className!="printMore"&&n[e].className!="printPageBreak"){n[e].className="print"}}if(a==1){var q=b.appendChild(document.createElement("p"));q.appendChild(document.createTextNode("Notes for "+document.getElementById("title").firstChild.nodeValue.toUpperCase()+":"));q.style.pageBreakBefore="always";var r=b.appendChild(document.createElement("ol"));var m=1;var h=document.getElementsByTagName("span");for(var e=0;e<h.length;e++){if(h[e].className=="printNotes"){h[e].removeAttribute("style");h[e].innerHTML=m;var d=h[e].parentNode;var l=0;while(l==0){if(d=d.previousSibling){if(d.className=="printPageBreak"){var g=d.nextSibling;g=(g.nodeName=="#text"?g.nextSibling:g);var p=d.innerHTML.replace(".","");l=1}}else{var p=1;l=1}}var s=h[e].title.split("?comment=")[1].split("?user=");var f="Page "+p+" -- "+s[0].replace(/HTMLLINEBREAK/g,"<br>");if(s.length>1){f=f+"<br><br>--"+s[1]}var k=r.appendChild(document.createElement("li"));k.className="footnote";k.innerHTML=f;m++}}}else{$(".printNotes").css("display","none")}$(".printPageBreak").css("page-break-before","always");window.print();hidePrintPrompt();document.getElementById("wholeShebang").style.display="block";b.parentNode.removeChild(b)}function renamePrompt(){document.getElementById("renamepopup").style.visibility="visible"}function hideRenamePrompt(){document.getElementById("renameField").value="";document.getElementById("renamepopup").style.visibility="hidden"}function renameScript(){if(document.getElementById("demo").innerHTML=="demo"){nope();return}var b=window.location.href;var c=b.split("=")[1];var a=document.getElementById("renameField").value;if(a==""){return}document.getElementById("title").innerHTML=a;$.post("/rename",{resource_id:c,rename:a,fromPage:"editor"});hideRenamePrompt()}function hideExportPrompt(){document.getElementById("exportpopup").style.visibility="hidden"}function exportPrompt(){save();document.getElementById("exportpopup").style.visibility="visible"}function exportScripts(){if(document.getElementById("demo").innerHTML=="demo"){nope();return}var b=window.location.href;var e=b.split("=")[1];var d;var a=document.getElementsByTagName("input");for(var c=0;c<a.length;c++){if(a[c].checked==true){if(a[c].className=="exportList"){d=a[c].name;b="/export?resource_id="+e+"&export_format="+d+"&fromPage=editor";window.open(b)}}}hideExportPrompt()}function sharePrompt(){$.post("/contactlist",{fromPage:"editorShare"},function(b){var a=b.split(";");$("input#collaborator").autocomplete({source:a})});document.getElementById("sharepopup").style.visibility="visible"}function hideSharePrompt(){document.getElementById("sharepopup").style.visibility="hidden";document.getElementById("collaborator").value="";document.getElementById("collaborators").innerHTML=""}function shareScript(){if(document.getElementById("demo").innerHTML=="demo"){nope();return}tokenize("collaborator");var a=new Array();var g=document.getElementsByTagName("span");for(var d=0;d<g.length;d++){if(g[d].className=="mailto"){a.push(g[d].innerHTML)}}var f=a.join(",");var b=window.location.href;var e=b.split("=")[1];$.post("/share",{resource_id:e,collaborators:f,fromPage:"editor"});hideSharePrompt()}function emailComplete(a){document.getElementById("emailS").disabled=false;document.getElementById("emailS").value="Send";if(a=="sent"){alert("Email Sent");hideDiv()}else{alert("There was a problem sending your email. Please try again later.")}}function emailScript(){if(document.getElementById("demo").innerHTML=="demo"){nope();return}tokenize("recipient");var b=new Array();var j=document.getElementsByTagName("span");for(var f=0;f<j.length;f++){if(j[f].className=="mailto"){b.push(j[f].innerHTML)}}var a=b.join(",");var e=document.getElementById("subject").value;var g=document.getElementById("message").innerHTML;var d=window.location.href;var h=d.split("=")[1];$.post("/emailscript",{resource_id:h,recipients:a,subject:e,body_message:g,fromPage:"editor"},function(c){emailComplete(c)});document.getElementById("emailS").disabled=true;document.getElementById("emailS").value="Sending..."}function emailPrompt(a){$.post("/contactlist",{fromPage:"editorEmail"},function(c){var b=c.split(";");$("input#recipient").autocomplete({source:b})});save();if(document.getElementById("demo").innerHTML=="demo"){return}document.getElementById("hideshow").style.visibility="visible"}function hideDiv(){document.getElementById("hideshow").style.visibility="hidden";document.getElementById("recipient").value="";document.getElementById("subject").value="";document.getElementById("message").innerHTML="";document.getElementById("recipients").innerHTML=""}function save(){if(document.getElementById("demo").innerHTML=="demo"){nope();return}try{$(".sm").removeClass("sm");var d=window.getSelection().anchorNode;var c=(d.nodeName=="#text"?d.parentNode:d);if(c.parentNode.id=="textEditor"){c.className="sm"}}catch(e){}if(document.getElementById("suggest")!=null){return}var i=document.getElementById("save");var h=document.getElementById("exportS");var b=document.getElementById("emailS");if(i.value!="Saved"){i.disabled=true;b.disabled=true;h.disabled=true;i.value="Remove Attributes...";removeAttribute();b.value="Setting pages...";h.value="Setting pages...";i.value="Setting pages...";pagination();b.value="Saving...";h.value="Saving...";i.value="Saving...";var a=window.location.href;var f=a.split("=")[1];var g=document.getElementById("textEditor").innerHTML;$.post("/save",{resource_id:f,content:g,fromPage:"editor"},function(j){i.value="Saved";b.disabled=false;h.disabled=false;b.value="Send";h.value="Export";insertSharedNotes(j)});sceneIndex()}}function saveClose(){if(document.getElementById("demo").innerHTML=="demo"){nope();return}removeAttribute();var c=document.getElementById("save");c.disabled=true;c.value="Setting pages...";pasteEdit();pagination();c.value="Saving...";var a=window.location.href;var d=a.split("=")[1];var b=document.getElementById("textEditor").innerHTML;$.post("/save",{resource_id:d,content:b},function(){window.close()})};