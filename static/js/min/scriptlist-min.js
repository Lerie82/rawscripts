function uploadWindow(a){if(a.data=="uploading"){document.getElementById("uploadFrame").height="0px";document.getElementById("uploadFrame").width="0px";document.getElementById("uploading").style.display="block"}else{document.getElementById("uploadFrame").style.height="210px";document.getElementById("uploadFrame").style.width="250px";document.getElementById("uploading").style.display="none";window.open(a.data);refreshList()}}function tabs(a){var d=document.getElementsByTagName("input");for(var b=0;b<d.length;b++){if(d[b].type=="checkbox"){d[b].checked=false}}if(a=="myScripts"){document.getElementById("owned").style.display="block";document.getElementById("shared").style.display="none"}else{document.getElementById("owned").style.display="none";document.getElementById("shared").style.display="block"}}function refreshList(){$.post("/list",function(E){document.getElementById("loading").style.display="none";var m=E.split("?shared=")[0];if(m=="?owned=none"){document.getElementById("noentries").style.display="block"}else{var k=document.getElementById("content").childNodes;for(var z=0;z<k.length;z++){k[z].parentNode.removeChild(k[z]);z--}m=m.slice(19);var t=m.split("?scriptname=");var q=document.getElementById("content").appendChild(document.createElement("div"));q.id="list";for(var z=0;z<t.length;z++){var F=t[z].split("?resource_id=")[0];var f=t[z].split("?resource_id=")[1].split("?alternate_link=")[0];var u=t[z].split("?resource_id=")[1].split("?alternate_link=")[1].split("?updated=")[0];var B=t[z].split("?resource_id=")[1].split("?alternate_link=")[1].split("?updated=")[1].split("?shared_with=")[0];var b=t[z].split("?shared_with=");b.splice(0,1);var l=q.appendChild(document.createElement("div"));l.id=f;l.className="entry";var A=l.appendChild(document.createElement("table"));A.width="100%";var x=A.appendChild(document.createElement("tr"));var c=x.appendChild(document.createElement("td"));c.className="checkboxCell";var s=c.appendChild(document.createElement("input"));s.type="checkbox";s.name="listItems";s.value=f;var e=x.appendChild(document.createElement("td"));var o=e.appendChild(document.createElement("a"));o.id="name"+f;var y='javascript:script("'+f+'")';o.href=y;o.appendChild(document.createTextNode(F));var j=x.appendChild(document.createElement("td"));j.className="sharedCell";j.align="right";if(b[0]=="none"){var a=""}else{if(b.length==1){var a="1 person "}else{var a=String(b.length)+" people "}}j.appendChild(document.createTextNode(a));var g=j.appendChild(document.createElement("a"));var y="javascript:sharePrompt('"+f+"')";g.href=y;g.appendChild(document.createTextNode("Manage"));g.id="share"+f;g.title=b.join("&");var v=x.appendChild(document.createElement("td"));v.className="emailCell";v.align="center";var n=v.appendChild(document.createElement("a"));n.className="emailLink";y='javascript:emailPrompt("'+f+'")';n.href=y;n.appendChild(document.createTextNode("Email"));var r=x.appendChild(document.createElement("td"));r.className="updatedCell";r.align="center";r.appendChild(document.createTextNode(B));var C=x.appendChild(document.createElement("td"));C.className="gdocsCell";C.align="center";var p=C.appendChild(document.createElement("a"));p.href=u;p.target="_blank";var w=p.appendChild(document.createElement("img"));w.src="images/docs.gif";var h=p.appendChild(document.createElement("img"));h.src="images/popup.png"}}var d=E.split("?shared=")[1];document.getElementById("sharedLoading").style.display="none";if(d=="none"){document.getElementById("sharedNoEntries").style.display="block"}else{var k=document.getElementById("sharedContent").childNodes;for(var z=0;z<k.length;z++){k[z].parentNode.removeChild(k[z]);z--}d=d.slice(12);var D=d.split("?scriptname=");var q=document.getElementById("sharedContent").appendChild(document.createElement("div"));q.id="sharedList";for(var z=0;z<D.length;z++){var F=D[z].split("?resource_id=")[0];var f=D[z].split("?resource_id=")[1].split("?alternate_link=")[0];var u=D[z].split("?resource_id=")[1].split("?alternate_link=")[1].split("?updated=")[0];var B=D[z].split("?resource_id=")[1].split("?alternate_link=")[1].split("?updated=")[1].split("?shared_with=")[0];var b=D[z].split("?shared_with=",2)[1];var l=q.appendChild(document.createElement("div"));l.id=f;l.className="entry";var A=l.appendChild(document.createElement("table"));A.width="100%";var x=A.appendChild(document.createElement("tr"));var c=x.appendChild(document.createElement("td"));c.className="checkboxCell";var s=c.appendChild(document.createElement("input"));s.type="checkbox";s.name="sharedListItems";s.value=f;var e=x.appendChild(document.createElement("td"));var o=e.appendChild(document.createElement("a"));o.id="name"+f;var y='javascript:script("'+f+'")';o.href=y;o.appendChild(document.createTextNode(F));var j=x.appendChild(document.createElement("td"));j.className="sharedCell";j.align="center";j.appendChild(document.createTextNode(b));var v=x.appendChild(document.createElement("td"));v.className="emailCell";v.align="center";var n=v.appendChild(document.createElement("a"));n.className="emailLink";y='javascript:emailPrompt("'+f+'")';n.href=y;n.appendChild(document.createTextNode("Email"));var r=x.appendChild(document.createElement("td"));r.className="updatedCell";r.align="center";r.appendChild(document.createTextNode(B));var C=x.appendChild(document.createElement("td"));C.className="gdocsCell";C.align="center";var p=C.appendChild(document.createElement("a"));p.href=u;p.target="_blank";var w=p.appendChild(document.createElement("img"));w.src="images/docs.gif";var h=p.appendChild(document.createElement("img"));h.src="images/popup.png"}}})}function tokenize(f){var j=0;var u=document.getElementsByTagName("div");for(var q=0;q<u.length;q++){if(u[q].className=="token"){j++}}if(j>4){alert("You can only have 5 recipients at a time for now. Only the first five will be sent.");return}var a=document.getElementById(f);var v=a.value.replace(",","");var s=v.replace(/ /g,"");if(s==""){return}var b=v.split(" ");var o=b.pop();var w="";if(b.length==0){w=o}else{w=b.join(" ").replace(/"/g,"")}var d=document.createElement("div");var h=document.getElementById(f+"s").appendChild(d);h.className="token";h.id=o;var e=document.createElement("span");var t=h.appendChild(e);var n=document.createTextNode(w);t.appendChild(n);var e=document.createElement("span");var p=h.appendChild(e);var l=document.createTextNode(o);p.className="mailto";p.appendChild(l);var g=document.createElement("a");var k=h.appendChild(g);var r=document.createTextNode(" | X");k.appendChild(r);var m='javascript:removeToken("'+o+'")';k.setAttribute("href",m);a.value=""}function removeToken(a){var b=document.getElementById(a);b.parentNode.removeChild(b)}function selectAll(d,e){var c=document.getElementsByTagName("input");var a=d.checked;for(var b=0;b<c.length;b++){if(c[b].type=="checkbox"){if(c[b].name==e){c[b].checked=a}}}}function script(a){url="/editor?resource_id="+a;window.open(url)}function deleteScript(b){var a=document.getElementById(b);a.style.backgroundColor="#ccc";a.style.opacity="0.5";$.post("/delete",{resource_id:b},function(){a.parentNode.removeChild(a)})}function batchProcess(a){var c=document.getElementsByTagName("input");for(var b=0;b<c.length;b++){if(c[b].type=="checkbox"){if(c[b].checked==true){if(c[b].name=="listItems"||c[b].name=="sharedListItems"){if(a=="delete"){deleteScript(c[b].value)}}}}}}function emailComplete(a){document.getElementById("emailS").disabled=false;document.getElementById("emailS").value="Send";if(a=="sent"){alert("Email Sent");hideEmailPrompt()}else{alert("There was a problem sending your email. Please try again later.")}}function emailScript(){tokenize("recipient");var b=new Array();var g=document.getElementsByTagName("span");for(var e=0;e<g.length;e++){if(g[e].className=="mailto"){b.push(g[e].innerHTML)}}var a=b.join(",");var d=document.getElementById("subject").value;var f=document.getElementById("message").innerHTML;$.post("/emailscript",{resource_id:resource_id,recipients:a,subject:d,body_message:f,fromPage:"scriptlist"},function(c){emailComplete(c)});document.getElementById("emailS").disabled=true;document.getElementById("emailS").value="Sending..."}var resource_id="";function emailPrompt(a){resource_id=a;document.getElementById("emailpopup").style.visibility="visible"}function hideEmailPrompt(){document.getElementById("emailpopup").style.visibility="hidden";document.getElementById("recipient").value="";document.getElementById("subject").value="";document.getElementById("message").innerHTML="";document.getElementById("recipients").innerHTML=""}function renamePrompt(){var a=0;var c=document.getElementsByTagName("input");for(var b=0;b<c.length;b++){if(c[b].type=="checkbox"){if(c[b].checked==true){if(c[b].name=="listItems"){var d=c[b].value;a++}}}}if(a>1){alert("select one at a time")}else{if(a==1){var e="name"+d;document.getElementById("renameTitle").innerHTML="Rename "+document.getElementById(e).innerHTML;document.getElementById("renameField").value=document.getElementById(e).innerHTML;document.getElementById("renamepopup").style.visibility="visible";document.getElementById("resource_id").value=d}}}function hideRenamePrompt(){document.getElementById("renameField").value="";document.getElementById("renamepopup").style.visibility="hidden"}function renameScript(){var b=document.getElementById("resource_id").value;var a=document.getElementById("renameField").value;if(a==""){return}var c="name"+b;document.getElementById(c).innerHTML=a;$.post("/rename",{resource_id:b,rename:a,fromPage:"scriptlist"});hideRenamePrompt()}function uploadPrompt(){document.getElementById("uploadpopup").style.visibility="visible"}function hideUploadPrompt(){document.getElementById("uploadFrame").src="/convert";document.getElementById("uploadpopup").style.visibility="hidden"}function titleChange(){var a=document.getElementById("script").value;var b=a.replace(".celtx","");document.getElementById("hidden").value=b}function uploadScript(){var b=document.getElementById("script").files[0].getAsBinary();var a=document.getElementById("filename");$.post("/convertprocess",{script:b,filename:a})}function newScriptPrompt(){document.getElementById("newscriptpopup").style.visibility="visible"}function hideNewScriptPrompt(){document.getElementById("newScript").value="";document.getElementById("newscriptpopup").style.visibility="hidden"}function createScript(){var a=document.getElementById("newScript").value;if(a!=""){var b="/loading?filename="+a;window.open(b)}hideNewScriptPrompt();setTimeout("refreshList()",10000)}function hideExportPrompt(){document.getElementById("exportpopup").style.visibility="hidden";document.getElementById("exportList").innerHTML=""}function exportPrompt(){var a=0;var b=document.getElementsByTagName("input");for(var d=0;d<b.length;d++){if(b[d].type=="checkbox"){if(b[d].checked==true){if(b[d].name=="listItems"||b[d].name=="sharedListItems"){var h=document.createElement("tr");var j=document.getElementById("exportList").appendChild(h);var k=j.appendChild(document.createElement("td"));var c=document.createTextNode(document.getElementById("name"+b[d].value).innerHTML);k.appendChild(c);k=j.appendChild(document.createElement("td"));var g=document.createElement("select");var f=k.appendChild(g);f.name=b[d].value;var e=f.appendChild(document.createElement("option"));e.appendChild(document.createTextNode("Adobe PDF"));e=f.appendChild(document.createElement("option"));e.appendChild(document.createTextNode(".txt (for Celtx or FD)"));a++}}}}if(a>0){document.getElementById("exportpopup").style.visibility="visible"}}function exportScripts(){var d;var c;var a=document.getElementsByTagName("select");for(var b=0;b<a.length;b++){d=a[b].name;if(a[b].selectedIndex==0){c="pdf"}else{c="txt"}url="/export?resource_id="+d+"&export_format="+c+"&fromPage=scriptlist";window.open(url)}hideExportPrompt()}function removeAccess(b){var a=confirm("Are you sure you want to take away access from "+b+"?");if(a==true){var c=document.getElementById("shareResource_id").value;$.post("/removeaccess",{resource_id:c,fromPage:"scriptlist",removePerson:b},function(d){removeShareUser(d)});document.getElementById(b.toLowerCase()).style.opacity="0.5";document.getElementById(b.toLowerCase()).style.backgroundColor="#ddd"}}function removeShareUser(a){document.getElementById(a).parentNode.removeChild(document.getElementById(a))}function sharePrompt(h){document.getElementById("shareS").disabled=false;document.getElementById("shareS").value="Sending Invite...";$.post("/contactlist",{fromPage:"editorShare"},function(k){var i=k.split(";");$("input#collaborator").autocomplete({source:i})});var c=document.getElementById("share"+h).title.split("&");var d=document.getElementById("hasAccess");for(var f=0;f<c.length;f++){if(c[f]!="none"){var j=d.appendChild(document.createElement("tr"));j.id=c[f].toLowerCase();var e=j.appendChild(document.createElement("td"));e.appendChild(document.createTextNode(c[f]));var g=j.appendChild(document.createElement("td"));g.align="right";var a=g.appendChild(document.createElement("a"));a.appendChild(document.createTextNode("Remove Access"));var b="javascript:removeAccess('"+c[f]+"')";a.href=b}}document.getElementById("shareTitle").innerHTML=document.getElementById("name"+h).innerHTML;document.getElementById("sharepopup").style.visibility="visible";document.getElementById("shareResource_id").value=h}function hideSharePrompt(){document.getElementById("sharepopup").style.visibility="hidden";document.getElementById("collaborator").value="";document.getElementById("collaborators").innerHTML="";document.getElementById("hasAccess").innerHTML=""}function shareScript(){tokenize("collaborator");var a=new Array();var g=document.getElementsByTagName("span");for(var d=0;d<g.length;d++){if(g[d].className=="mailto"){a.push(g[d].innerHTML)}}var f=a.join(",");var b=window.location.href;var e=document.getElementById("shareResource_id").value;$.post("/share",{resource_id:e,collaborators:f,fromPage:"editor"},function(){refreshList();hideSharePrompt();sharePrompt(e)});document.getElementById("shareS").disabled=true;document.getElementById("shareS").value="Sending Invites..."};