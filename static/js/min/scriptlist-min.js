function uploadWindow(a){if(a.data=="uploading"){document.getElementById("uploadFrame").height="0px";document.getElementById("uploadFrame").width="0px";document.getElementById("uploading").style.display="block"}else{document.getElementById("uploadFrame").style.height="210px";document.getElementById("uploadFrame").style.width="250px";document.getElementById("uploading").style.display="none";window.open("editor?resource_id="+a.data);refreshList()}}function tabs(a){var d=document.getElementsByTagName("input");for(var b=0;b<d.length;b++){if(d[b].type=="checkbox"){d[b].checked=false}}if(a=="myScripts"){document.getElementById("owned").style.display="block";document.getElementById("shared").style.display="none";document.getElementById("trash").style.display="none";document.getElementById("my_script_buttons").style.display="block";document.getElementById("friends_scripts_buttons").style.display="none";document.getElementById("trash_buttons").style.display="none"}else{if(a=="trashTab"){document.getElementById("owned").style.display="none";document.getElementById("shared").style.display="none";document.getElementById("trash").style.display="block";document.getElementById("my_script_buttons").style.display="none";document.getElementById("friends_scripts_buttons").style.display="none";document.getElementById("trash_buttons").style.display="block"}else{document.getElementById("owned").style.display="none";document.getElementById("shared").style.display="block";document.getElementById("trash").style.display="none";document.getElementById("my_script_buttons").style.display="none";document.getElementById("friends_scripts_buttons").style.display="block";document.getElementById("trash_buttons").style.display="none"}}}function refreshList(a){$.post("/list",function(F){console.log(F);document.getElementById("loading").style.display="none";var l=document.getElementById("content").childNodes;for(var B=0;B<l.length;B++){l[B].parentNode.removeChild(l[B]);B--}var r=document.getElementById("content").appendChild(document.createElement("div"));r.id="list";var y=JSON.parse(F);var q=y[0];var p=y[1];var w=y[2];if(q.length==0){document.getElementById("noentries").style.display="block"}for(var B=0;B<q.length;B++){var G=q[B][1];var g=q[B][0];var D=q[B][2];var d=q[B][4];var m=r.appendChild(document.createElement("div"));m.id=g;m.className="entry";var C=m.appendChild(document.createElement("table"));C.width="100%";var v=C.appendChild(document.createElement("tr"));var e=v.appendChild(document.createElement("td"));e.className="checkboxCell";var t=e.appendChild(document.createElement("input"));t.type="checkbox";t.name="listItems";t.value=g;var f=v.appendChild(document.createElement("td"));var o=f.appendChild(document.createElement("a"));o.id="name"+g;var A='javascript:script("'+g+'")';o.href=A;o.appendChild(document.createTextNode(G));var k=v.appendChild(document.createElement("td"));k.className="sharedCell";k.align="right";if(d.length==0){var c=""}else{if(d.length==1){var c="1 person "}else{var c=String(d.length)+" people "}}k.appendChild(document.createTextNode(c));var h=k.appendChild(document.createElement("a"));var A="javascript:sharePrompt('"+g+"')";h.href=A;h.appendChild(document.createTextNode("Manage"));h.id="share"+g;h.title=d.join("&");var u=v.appendChild(document.createElement("td"));u.className="emailCell";u.align="center";var n=u.appendChild(document.createElement("a"));n.className="emailLink";A='javascript:emailPrompt("'+g+'")';n.href=A;n.appendChild(document.createTextNode("Email"));var s=v.appendChild(document.createElement("td"));s.className="updatedCell";s.align="center";s.appendChild(document.createTextNode(D))}document.getElementById("sharedLoading").style.display="none";if(w.length==0){document.getElementById("sharedNoEntries").style.display="block"}var r=document.getElementById("sharedContent").appendChild(document.createElement("div"));r.id="sharedList";for(B in w){var g=w[B][0];var G=w[B][1];var D=w[B][2];var b=w[B][3];var m=r.appendChild(document.createElement("div"));m.id=g;m.className="entry";var C=m.appendChild(document.createElement("table"));C.width="100%";var v=C.appendChild(document.createElement("tr"));var e=v.appendChild(document.createElement("td"));e.className="checkboxCell";var t=e.appendChild(document.createElement("input"));t.type="checkbox";t.name="sharedListItems";t.value=g;var f=v.appendChild(document.createElement("td"));var o=f.appendChild(document.createElement("a"));o.id="name"+g;var A='javascript:script("'+g+'")';o.href=A;o.appendChild(document.createTextNode(G));var E=v.appendChild(document.createElement("td"));E.appendChild(document.createTextNode(b));E.align="right";E.className="ownerCell";var s=v.appendChild(document.createElement("td"));s.className="updatedCell";s.align="center";s.appendChild(document.createTextNode(D))}document.getElementById("trashLoading").style.display="none";var l=document.getElementById("trashContent").childNodes;for(var B=0;B<l.length;B++){l[B].parentNode.removeChild(l[B]);B--}var r=document.getElementById("trashContent").appendChild(document.createElement("div"));r.id="trashList";for(B in p){var G=p[B][1];var g=p[B][0];var D=p[B][2];var m=r.appendChild(document.createElement("div"));m.id=g;m.className="entry";var C=m.appendChild(document.createElement("table"));C.width="100%";var v=C.appendChild(document.createElement("tr"));var e=v.appendChild(document.createElement("td"));e.className="checkboxCell";var t=e.appendChild(document.createElement("input"));t.type="checkbox";t.name="trashListItems";t.value=g;var f=v.appendChild(document.createElement("td"));var o=f.appendChild(document.createElement("a"));o.id="name"+g;var A='javascript:script("'+g+'")';o.href=A;o.appendChild(document.createTextNode(G));var k=v.appendChild(document.createElement("td"));k.className="sharedCell";k.align="right";var s=v.appendChild(document.createElement("td"));s.className="updatedCell";s.align="left";s.style.width="215px";s.appendChild(document.createTextNode(D))}if(a){sharePrompt(a)}})}function selectAll(d,e){var c=document.getElementsByTagName("input");var a=d.checked;for(var b=0;b<c.length;b++){if(c[b].type=="checkbox"){if(c[b].name==e){c[b].checked=a}}}}function script(a){url="/editor?resource_id="+a;window.open(url)}function deleteScript(a){var b=document.getElementById(a);b.style.backgroundColor="#ccc";b.style.opacity="0.5";$.post("/delete",{resource_id:a},function(){b.parentNode.removeChild(b);document.getElementById("trashList").appendChild(b);b.style.backgroundColor="white";b.style.opacity="1";var d=b.firstChild;d=(d.nodeName=="#text"?d.nextSibling:d);d.getElementsByTagName("input")[0].name="trashListItems";var e=d.getElementsByTagName("td");e[2].parentNode.removeChild(e[2]);e[2].parentNode.removeChild(e[2]);e[2].align="left";e[2].style.width="215px"})}function undelete(a){var b=document.getElementById(a);b.style.backgroundColor="#ccc";b.style.opacity="0.5";$.post("/undelete",{resource_id:a},function(){b.parentNode.removeChild(b);document.getElementById("list").appendChild(b);b.style.backgroundColor="white";b.style.opacity="1";var e=b.firstChild;e=(e.nodeName=="#text"?e.nextSibling:e);e=e.firstChild;e=(e.nodeName=="#text"?e.nextSibling:e);var g=e.getElementsByTagName("td");e.getElementsByTagName("input")[0].name="listItems";g[g.length-1].align="center";g[g.length-1].className="updatedCell";g[g.length-1].removeAttribute("style");var d=g[0].parentNode.insertBefore(document.createElement("td"),g[g.length-1]);d.className="emailCell";d.align="center";var f=d.appendChild(document.createElement("a"));f.className="emailLink";href='javascript:emailPrompt("'+a+'")';f.href=href;f.appendChild(document.createTextNode("Email"))})}function hardDelete(a){var b=document.getElementById(a);b.style.backgroundColor="#ccc";b.style.opacity="0.5";$.post("/harddelete",{resource_id:a},function(){b.parentNode.removeChild(b)})}function batchProcess(b){var a=true;if(b=="hardDelete"){a=false;if(confirm("Are you sure you want to delete these scripts? This cannot be undone.")){a=true}}if(a){var d=document.getElementsByTagName("input");for(var c=0;c<d.length;c++){if(d[c].type=="checkbox"){if(d[c].checked==true){if(d[c].name=="listItems"||d[c].name=="sharedListItems"||d[c].name=="trashListItems"){if(b=="delete"){deleteScript(d[c].value)}if(b=="undelete"){undelete(d[c].value)}if(b=="hardDelete"){hardDelete(d[c].value)}}}}}}}function emailComplete(a){document.getElementById("emailS").disabled=false;document.getElementById("emailS").value="Send";if(a=="sent"){alert("Email Sent");hideEmailPrompt()}else{alert("There was a problem sending your email. Please try again later.")}}function emailScript(){tokenize("recipient");var b=new Array();var h=document.getElementsByTagName("span");for(var f=0;f<h.length;f++){if(h[f].className=="mailto"){b.push(h[f].innerHTML)}}var a=b.join(",");var e=document.getElementById("subject").value;var g=document.getElementById("message").innerHTML;var d=document.getElementById("emailTitle").selectedIndex;$.post("/emailscript",{resource_id:resource_id,recipients:a,subject:e,body_message:g,fromPage:"scriptlist",title_page:d},function(c){emailComplete(c)});document.getElementById("emailS").disabled=true;document.getElementById("emailS").value="Sending..."}var resource_id="";function emailPrompt(a){resource_id=a;document.getElementById("emailpopup").style.visibility="visible";document.getElementById("edit_title_href").href="/titlepage?resource_id="+resource_id}function hideEmailPrompt(){document.getElementById("emailpopup").style.visibility="hidden";document.getElementById("recipient").value="";document.getElementById("subject").value="";document.getElementById("message").innerHTML="";document.getElementById("recipients").innerHTML=""}function duplicate(){var a=0;var c=document.getElementsByTagName("input");for(var b=0;b<c.length;b++){if(c[b].type=="checkbox"){if(c[b].checked==true){if(c[b].name=="listItems"){var d=c[b].value;a++}}}}if(a>1){alert("select one at a time")}else{if(a==1){$.post("/duplicate",{resource_id:d,fromPage:"editor"},function(e){if(e=="fail"){return}else{window.open(e),refreshList()}})}}}function renamePrompt(){var a=0;var c=document.getElementsByTagName("input");for(var b=0;b<c.length;b++){if(c[b].type=="checkbox"){if(c[b].checked==true){if(c[b].name=="listItems"){var d=c[b].value;a++}}}}if(a>1){alert("select one at a time")}else{if(a==1){var e="name"+d;document.getElementById("renameTitle").innerHTML="Rename "+document.getElementById(e).innerHTML;document.getElementById("renameField").value=document.getElementById(e).innerHTML;document.getElementById("renamepopup").style.visibility="visible";document.getElementById("resource_id").value=d}}}function hideRenamePrompt(){document.getElementById("renameField").value="";document.getElementById("renamepopup").style.visibility="hidden"}function renameScript(){var b=document.getElementById("resource_id").value;var a=document.getElementById("renameField").value;if(a==""){return}var c="name"+b;document.getElementById(c).innerHTML=a;$.post("/rename",{resource_id:b,rename:a,fromPage:"scriptlist"});hideRenamePrompt()}function uploadPrompt(){document.getElementById("uploadpopup").style.visibility="visible"}function hideUploadPrompt(){document.getElementById("uploadFrame").src="/convert";document.getElementById("uploadpopup").style.visibility="hidden"}function titleChange(){var a=document.getElementById("script").value;var b=a.replace(".celtx","");document.getElementById("hidden").value=b}function uploadScript(){var b=document.getElementById("script").files[0].getAsBinary();var a=document.getElementById("filename");$.post("/convertprocess",{script:b,filename:a})}function newScriptPrompt(){document.getElementById("newscriptpopup").style.visibility="visible"}function hideNewScriptPrompt(){document.getElementById("newScript").value="";document.getElementById("newscriptpopup").style.visibility="hidden"}function createScript(){var a=document.getElementById("newScript").value;if(a!=""){$.post("/newscript",{filename:a},function(b){window.open("editor?resource_id="+b)})}hideNewScriptPrompt();setTimeout("refreshList()",10000)}function recieveMessage(a){}function hideExportPrompt(){document.getElementById("exportpopup").style.visibility="hidden";document.getElementById("exportList").innerHTML=""}function exportPrompt(){var b=0;var c=document.getElementsByTagName("input");for(var e=0;e<c.length;e++){if(c[e].type=="checkbox"){if(c[e].checked==true){if(c[e].name=="listItems"||c[e].name=="sharedListItems"){var k=document.createElement("tr");var l=document.getElementById("exportList").appendChild(k);var m=l.appendChild(document.createElement("td"));var d=document.createTextNode(document.getElementById("name"+c[e].value).innerHTML);m.appendChild(d);m=l.appendChild(document.createElement("td"));var j=document.createElement("select");var h=m.appendChild(j);h.name=c[e].value;var f=h.appendChild(document.createElement("option"));f.appendChild(document.createTextNode("Adobe PDF"));f=h.appendChild(document.createElement("option"));f.appendChild(document.createTextNode("txt (for Celtx or FD)"));m=k.appendChild(document.createElement("td"));j=m.appendChild(document.createElement("select"));j.name="export_format";f=j.appendChild(document.createElement("option"));f.appendChild(document.createTextNode("Without Title Page"));f=j.appendChild(document.createElement("option"));f.appendChild(document.createTextNode("With Title Page"));var g=k.appendChild(document.createElement("td")).appendChild(document.createElement("a"));g.appendChild(document.createTextNode("Edit Title page"));g.href="/titlepage?resource_id="+c[e].value;g.target="_blank";b++}}}}if(b>0){document.getElementById("exportpopup").style.visibility="visible"}}function exportScripts(){var f;var c;var a=document.getElementsByTagName("select");for(var b=0;b<a.length;b++){if(a[b].name!="export_format"&&a[b].name!=""){f=a[b].name;if(a[b].selectedIndex==0){c="pdf"}else{c="txt"}var e=a[b].parentNode;e=e.nextSibling;if(e.nodeName=="#text"){e=e.nextSibling}e=e.firstChild;if(e.nodeName=="#text"){e=e.nextSibling}var d="&title_page="+e.selectedIndex;url="/export?resource_id="+f+"&export_format="+c+"&fromPage=scriptlist"+d;window.open(url)}}hideExportPrompt()}function removeAccess(b){var a=confirm("Are you sure you want to take away access from "+b+"?");if(a==true){var c=document.getElementById("shareResource_id").value;$.post("/removeaccess",{resource_id:c,fromPage:"scriptlist",removePerson:b},function(d){removeShareUser(d)});document.getElementById("shared"+b.toLowerCase()).style.opacity="0.5";document.getElementById("shared"+b.toLowerCase()).style.backgroundColor="#ddd"}}function removeShareUser(a){document.getElementById("shared"+a).parentNode.removeChild(document.getElementById("shared"+a));refreshList()}function sharePrompt(h){document.getElementById("shareS").disabled=false;document.getElementById("shareS").value="Send Invitation";var c=(document.getElementById("share"+h).title==""?[]:document.getElementById("share"+h).title.split("&"));var d=document.getElementById("hasAccess");document.getElementById("collaborator").value="";document.getElementById("collaborators").innerHTML="";d.innerHTML="";for(var f=0;f<c.length;f++){if(c[f]!="none"){var j=d.appendChild(document.createElement("tr"));j.id="shared"+c[f].toLowerCase();var e=j.appendChild(document.createElement("td"));e.appendChild(document.createTextNode(c[f]));var g=j.appendChild(document.createElement("td"));g.align="right";var a=g.appendChild(document.createElement("a"));a.appendChild(document.createTextNode("Remove Access"));var b="javascript:removeAccess('"+c[f]+"')";a.href=b}}document.getElementById("shareTitle").innerHTML=document.getElementById("name"+h).innerHTML;document.getElementById("sharepopup").style.visibility="visible";document.getElementById("shareResource_id").value=h}function hideSharePrompt(){document.getElementById("sharepopup").style.visibility="hidden";document.getElementById("collaborator").value="";document.getElementById("collaborators").innerHTML="";document.getElementById("hasAccess").innerHTML=""}function shareScript(){tokenize("collaborator");var a=new Array();var f=document.getElementsByTagName("span");for(var b=0;b<f.length;b++){if(f[b].className=="mailto"){a.push(f[b].innerHTML)}}var e=a.join(",");var d=document.getElementById("shareResource_id").value;$.post("/share",{resource_id:d,collaborators:e,fromPage:"scriptlist"},function(c){refreshList(d)});document.getElementById("shareS").disabled=true;document.getElementById("shareS").value="Sending Invites..."}function tokenize(f){var j=0;var u=document.getElementsByTagName("div");for(var q=0;q<u.length;q++){if(u[q].className=="token"){j++}}if(j>4){alert("You can only have 5 recipients at a time for now. Only the first five will be sent.");return}var a=document.getElementById(f);var v=a.value.replace(",","");var s=v.replace(/ /g,"");if(s==""){return}var b=v.split(" ");var o=b.pop();var w="";if(b.length==0){w=o}else{w=b.join(" ").replace(/"/g,"")}var d=document.createElement("div");var h=document.getElementById(f+"s").appendChild(d);h.className="token";h.id=o;var e=document.createElement("span");var t=h.appendChild(e);var n=document.createTextNode(w);t.appendChild(n);var e=document.createElement("span");var p=h.appendChild(e);var l=document.createTextNode(o);p.className="mailto";p.appendChild(l);var g=document.createElement("a");var k=h.appendChild(g);var r=document.createTextNode(" | X");k.appendChild(r);var m='javascript:removeToken("'+o+'")';k.setAttribute("href",m);a.value=""}function removeToken(a){var b=document.getElementById(a);b.parentNode.removeChild(b)};