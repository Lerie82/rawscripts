var typeToScript=true;var undoQue=[];var redoQue=[];var pageBreaks=[];var mouseX=0;var mouseY=0;var shiftDown=false;var mouseDownBool=false;var scrollBarBool=false;var characters=[];var scenes=[];var canvas;var ctx;var linesNLB=[];var vOffset=0;var pos={col:0,row:0};var anch={col:0,row:0};var background="#fff";var font="10pt Courier";var fontWidth=8;var foreground="#000";var lineheight=13;var milli=0;var formatMenu=false;var formats=["Slugline","Action","Character","Dialog","Parenthetical","Transition"];var resource_id="random123456789";var WrapVariableArray=[[62,111+50,0,1,2],[62,111+50,0,0,2],[40,271+50,0,1,1],[36,191+50,0,0,2],[30,231+50,0,0,1],[61,601+50,1,1,2]];var editorWidth=850;var headerHeight=65;var lines=[];$(document).ready(function(){document.getElementById("canvas").height=$("#container").height()-65;document.getElementById("sidebar").style.height=($("#container").height()-65)+"px";document.getElementById("sidebar").style.width=($("#container").width()-850)+"px";$("#container").mousewheel(function(a,b){if(a.target.id=="canvas"){a.preventDefault();scroll(-b*45)}});$(".menuItem").click(function(){openMenu(this.id)});$(".menuItem").mouseover(function(){topMenuOver(this.id)});$(".menuItem").mouseout(function(){topMenuOut(this.id)})});$(window).resize(function(){document.getElementById("canvas").height=$("#container").height()-65;document.getElementById("sidebar").style.height=($("#container").height()-65)+"px";document.getElementById("sidebar").style.width=($("#container").width()-850)+"px"});$("*").keydown(function(a){var b=new Date();milli=b.getMilliseconds();if(a.which==13){enter()}else{if(a.which==38){upArrow()}else{if(a.which==40){downArrow()}else{if(a.which==39){rightArrow()}else{if(a.which==37){leftArrow()}else{if(a.which==8){backspace(a)}else{if(a.which==46){deleteButton()}else{if(a.which==9){a.preventDefault();tab()}else{if(a.which==16){shiftDown=true}}}}}}}}}});$("*").keyup(function(a){if(a.which==16){shiftDown=false}});$("*").mousedown(function(a){mouseDown(a)});$("*").mouseup(function(a){mouseUp(a)});$("*").mousemove(function(a){mouseMove(a)});function save(){var a=JSON.stringify(lines);$.post("/save",{data:a,resource_id:resource_id},function(b){console.log(b)})}function setup(){resource_id=window.location.href.split("=")[1];$.post("/scriptcontent",{resource_id:resource_id},function(e){if(e=="not found"){lines=[["Sorry, the script wasn't found.",1]];paint(false,false,true,false);return}var f=e.split("?title=")[0];document.getElementById("title").innerHTML=f;e=e.split("?title=")[1];if(e==""){lines=[["Fade In:",1],["Int. ",0]]}else{var a=JSON.parse(e);for(var d=0;d<a.length;d++){lines.push([a[d][0],a[d][1]])}}if(lines.length==2){pos.row=1;anch.row=1;pos.col=lines[1][0].length;anch.col=pos.col}console.log(lines.length);var c=document.getElementById("canvas");var b=c.getContext("2d");document.onkeypress=handlekeypress;characterInit();sceneIndex();paint(false,false,true,false);setInterval("paint(false,false, false,false)",40)})}function changeFormat(a){undoQue.push(["format",pos.row,pos.col,lines[pos.row][1]]);lines[pos.row][1]=a;anch.col=pos.col;anch.row=pos.row;sceneIndex()}function mouseUp(c){mouseDownBool=false;scrollBarBool=false;var b=document.getElementById("canvas").width;var a=document.getElementById("canvas").height;if(c.clientY-headerHeight>a-39&&c.clientY-headerHeight<a&&c.clientX>editorWidth-22&&c.clientX<editorWidth-2){if(c.clientY-headerHeight>a-20){scroll(30)}else{scroll(-30)}}}function mouseDown(k){var b=false;var m=document.getElementsByTagName("div");for(var g=0;g<m.length;g++){if(m[g].className=="topMenu"&&m[g].style.display=="block"){b=true;var n=m[g]}}if(b){var d=k.target;while(d.nodeName!="DIV"){d=d.parentNode}id=d.id;var j=id.slice(0,-1);if(j=="format"){changeFormat(id.slice(-1))}if(id=="save"){save()}else{if(id=="undo"){undo()}else{if(id=="rename"){renamePrompt()}else{if(id=="exportas"){exportPrompt()}}}}n.style.display="none"}else{var p=document.getElementById("canvas").height;var h=(pageBreaks.length+1)*72*lineheight;var o=((p)/h)*(p-39);if(o<20){o=20}if(o>=p-39){o=p-39}var l=(vOffset/(h-p))*(p-39-o)+headerHeight;if(k.clientX>headerHeight&&k.clientX<editorWidth-100&&k.clientY-headerHeight>40){mouseDownBool=true;paint(false,k,false,false)}else{if(k.clientX<editorWidth&&k.clientX>editorWidth-20&&k.clientY>l&&k.clientY<l+o){scrollBarBool=true}}}}function mouseMove(a){if(scrollBarBool){scrollBarDrag(a)}mouseX=a.clientX;mouseY=a.clientY;if(mouseDownBool){paint(a,false,false,true)}}function scrollBarDrag(d){var c=mouseY-d.clientY;var a=document.getElementById("canvas").height-50;var b=(pageBreaks.length+1)*72*lineheight;vOffset-=b/a*c;if(vOffset<0){vOffset=0}var b=(pageBreaks.length+1)*72*lineheight-document.getElementById("canvas").height;if(vOffset>b){vOffset=b}}function scroll(a){vOffset+=a;if(vOffset<0){vOffset=0}var b=(pageBreaks.length+1)*72*lineheight-document.getElementById("canvas").height;if(vOffset>b){vOffset=b}}function jumpTo(a){console.log(a);if(a!=""){var g=parseInt(a.replace("row",""));pos.row=g;anch.row=pos.row;pos.col=lines[pos.row][0].length;anch.col=pos.col}else{var g=pos.row}var c=0;for(var b=0;b<g;b++){for(var d=0;d<pageBreaks.length;d++){if(pageBreaks[d][0]==b){c+=lineheight*(72-pageBreaks[d][1])}}c+=(linesNLB[b].length*lineheight)}vOffset=c;var f=(pageBreaks.length+1)*72*lineheight-document.getElementById("canvas").height;if(vOffset>f){vOffset=f}}function upArrow(){if(typeToScript){if(pos.row==0&&pos.col==0){return}var g=lines[pos.row][1];if(g==0){var f=WrapVariableArray[0]}else{if(g==1){var f=WrapVariableArray[1]}else{if(g==2){var f=WrapVariableArray[2]}else{if(g==3){var f=WrapVariableArray[3]}else{if(g==4){var f=WrapVariableArray[4]}else{if(g==5){var f=WrapVariableArray[5]}}}}}}if(lines[pos.row][0].length>f[0]){var h=lines[pos.row][0].split(" ");var a=0;var b=[];while(a<h.length){if(h.slice(a).join().length<=f[0]){b.push(h.slice(a).join().length);a=h.length}else{var j=0;while(h.slice(a,a+j).join().length<f[0]){j++}b.push(h.slice(a,a+j-1).join().length);a+=j-1}}j=0;var e=b[0];while(e<pos.col){j++;e+=b[j]+1}if(j==0){var c=lines[pos.row-1][1];if(c==0){var d=WrapVariableArray[0]}else{if(c==1){var d=WrapVariableArray[1]}else{if(c==2){var d=WrapVariableArray[2]}else{if(c==3){var d=WrapVariableArray[3]}else{if(c==4){var d=WrapVariableArray[4]}else{if(c==5){var d=WrapVariableArray[5]}}}}}}if(lines[pos.row-1][0].length<d[0]){pos.row--;if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{var h=lines[pos.row-1][0].split(" ");var a=0;var b=[];while(a<h.length){if(h.slice(a).join().length<=f[0]){b.push(h.slice(a).join().length);a=h.length}else{var j=0;while(h.slice(a,a+j).join().length<f[0]){j++}b.push(h.slice(a,a+j-1).join().length);a+=j-1}}pos.row--;pos.col+=lines[pos.row][0].length-b[b.length-1];if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}else{pos.col-=b[j-1]+1;if(pos.col>(e-b[j]-1)){pos.col=e-b[j]-1}}}else{if(pos.row==0){pos.col=0}else{var c=lines[pos.row-1][1];if(c==0){var d=WrapVariableArray[0]}else{if(c==1){var d=WrapVariableArray[1]}else{if(c==2){var d=WrapVariableArray[2]}else{if(c==3){var d=WrapVariableArray[3]}else{if(c==4){var d=WrapVariableArray[4]}else{if(c==5){var d=WrapVariableArray[5]}}}}}}if(lines[pos.row-1][0].length<d[0]){pos.row--;if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{var h=lines[pos.row-1][0].split(" ");var a=0;var b=[];while(a<h.length){if(h.slice(a).join().length<=f[0]){b.push(h.slice(a).join().length);a=h.length}else{var j=0;while(h.slice(a,a+j).join().length<f[0]){j++}b.push(h.slice(a,a+j-1).join().length);a+=j-1}}pos.row--;pos.col+=lines[pos.row][0].length-b[b.length-1];if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}paint(false,false,false,true)}}function downArrow(){if(typeToScript){if(pos.row==lines.length-1&&pos.col==lines[pos.row][0].length){return}var d=lines[pos.row][1];if(d==0){var c=WrapVariableArray[0]}else{if(d==1){var c=WrapVariableArray[1]}else{if(d==2){var c=WrapVariableArray[2]}else{if(d==3){var c=WrapVariableArray[3]}else{if(d==4){var c=WrapVariableArray[4]}else{if(d==5){var c=WrapVariableArray[5]}}}}}}if(lines[pos.row][0].length>c[0]){var b=lines[pos.row][0].split(" ");var f=0;var g=[];while(f<b.length){if(b.slice(f).join().length<=c[0]){g.push(b.slice(f).join().length);f=b.length}else{var a=0;while(b.slice(f,f+a).join().length<c[0]){a++}g.push(b.slice(f,f+a-1).join().length);f+=a-1}}a=0;var h=g[0];while(h<pos.col){a++;h+=g[a]+1}if(a+1==g.length){for(var e=0;e<g.length-1;e++){pos.col-=g[e]}pos.col--;pos.row++;if(pos.row>lines.length-1){pos.row--;pos.col=lines[pos.row][0].length}if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{pos.col+=g[a]+1;if(pos.col>(h+g[a+1]+1)){pos.col=h+g[a+1]+1}}}else{if(pos.row==lines.length-1){pos.col=lines[pos.row][0].length}else{pos.row++;if(pos.row>lines.length-1){pos.row=lines.length-1}if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}paint(false,false,false,true)}}function leftArrow(){if(typeToScript){if(pos.row==0&&pos.col==0){return}if(pos.col==0){pos.row--;pos.col=lines[pos.row][0].length}else{pos.col=pos.col-1}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}}}function rightArrow(){if(typeToScript){if(pos.col==lines[pos.row][0].length&&pos.row==lines.length-1){return}if(pos.col==lines[pos.row][0].length){pos.row++;pos.col=0}else{pos.col=pos.col+1}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}}}function backspace(g){if(typeToScript){g.preventDefault();var b=false;var c=false;if(lines[pos.row][1]==0){var c=true}if(pos.row==anch.row&&pos.col==anch.col){if(pos.col==0&&pos.row==0){return}else{if(lines[pos.row][1]==4&&pos.col==1){var d=lines[pos.row][0];if(d.charAt(0)=="("){d=d.substr(1)}if(d.charAt(d.length-1)==")"){d=d.slice(0,-1)}var h=lines[pos.row-1][0].length;lines.splice(pos.row,1);pos.row--;pos.col=h;lines[pos.row][0]=lines[pos.row][0]+d;undoQue.push(["back",pos.row,pos.col,"line",4])}else{if(pos.col==0){var a=lines[pos.row][1];var d=lines[pos.row][0];lines.splice(pos.row,1);var h=lines[pos.row-1][0].length;lines[pos.row-1][0]=lines[pos.row-1][0]+d;pos.col=h;pos.row--;undoQue.push(["back",pos.row,pos.col,"line",a]);b=true}else{undoQue.push(["back",pos.row,pos.col,lines[pos.row][0][pos.col-1]]);lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);pos.col--}}}anch.col=pos.col;anch.row=pos.row}else{b=true;var l=false;if(anch.row>pos.row){l=true}if(anch.row==pos.row&&anch.col>pos.col){l=true}if(l){var k=anch.row;anch.row=pos.row;pos.row=k;k=anch.col;anch.col=pos.col;pos.col=k}var f=0;while(pos.col!=anch.col||pos.row!=anch.row){f++;if(lines[pos.row][1]==0){c=true}if(pos.col==0){var a=lines[pos.row][1];var d=lines[pos.row][0];lines.splice(pos.row,1);var h=lines[pos.row-1][0].length;lines[pos.row-1][0]=lines[pos.row-1][0]+d;pos.col=h;pos.row--;undoQue.push(["back",pos.row,pos.col,"line",a])}else{undoQue.push(["back",pos.row,pos.col,lines[pos.row][0][pos.col-1]]);lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);pos.col--}}undoQue.push(["br",f])}paint(false,false,b,false);if(c){sceneIndex()}}}function deleteButton(){if(typeToScript){var a=false;var e=false;if(pos.row==anch.row&&pos.col==anch.col){if(lines[pos.row][1]==0){var a=true}if(pos.col==(lines[pos.row][0].length)&&pos.row==lines.length-1){return}if(lines[pos.row][1]==4&&lines[pos.row][0]=="()"){undoQue.push(["delete",pos.row,pos.col,"line",4]);lines.splice(pos.row,1);pos.col=0;anch.col=0}else{if(pos.col==(lines[pos.row][0].length)){undoQue.push(["delete",pos.row,pos.col,"line",lines[pos.row+1][1]]);if(lines[pos.row+1][1]==0){a=true}var b=lines[pos.row+1][0];lines.splice((pos.row+1),1);lines[pos.row][0]+=b;e=true}else{undoQue.push(["delete",pos.row,pos.col,lines[pos.row][0][pos.col]]);lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col)+lines[pos.row][0].slice(pos.col+1)}}}else{e=true;var f=false;if(anch.row>pos.row){f=true}if(anch.row==pos.row&&anch.col>pos.col){f=true}if(f){var d=anch.row;anch.row=pos.row;pos.row=d;d=anch.col;anch.col=pos.col;pos.col=d}var g=0;while(pos.col!=anch.col||pos.row!=anch.row){g++;if(lines[pos.row][1]==0){a=true}if(pos.col==0){undoQue.push(["delete",pos.row-1,lines[pos.row-1][0].length,"line",lines[pos.row][1]]);var b=lines[pos.row][0];lines.splice(pos.row,1);var c=lines[pos.row-1][0].length;lines[pos.row-1][0]=lines[pos.row-1][0]+b;pos.col=c;pos.row--}else{undoQue.push(["delete",pos.row,pos.col,lines[pos.row][0][pos.col-1]]);lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);pos.col--}}undoQue.push(["dr",g])}paint(false,false,e,false);if(a){sceneIndex()}}}function enter(){if(typeToScript){undoQue.push(["enter",pos.row,pos.col]);if(lines[pos.row][1]==2){characterIndex(lines[pos.row][0])}var b=lines[pos.row][0].slice(0,pos.col);var a=lines[pos.row][0].slice(pos.col);lines[pos.row][0]=b;if(lines[pos.row][1]==0){var c=1}else{if(lines[pos.row][1]==1){var c=2}else{if(lines[pos.row][1]==2){var c=3}else{if(lines[pos.row][1]==4){var c=3}else{if(lines[pos.row][1]==3){var c=2}else{if(lines[pos.row][1]==5){var c=0}}}}}}var d=[a,c];lines.splice(pos.row+1,0,d);pos.row++;pos.col=0;anch.row=pos.row;anch.col=pos.col;paint(false,false,true,false);if(lines[pos.row][1]==1){sceneIndex()}}}function tab(){undoQue.push(["format",pos.row,pos.col,lines[pos.row][1]]);var a=false;if(lines[pos.row][1]==0){var a=true}var b=lines[pos.row][1];if(b==1){lines[pos.row][1]=0;a=true}else{if(b==0){lines[pos.row][1]=2}else{if(b==2){lines[pos.row][1]=1}else{if(b==3){lines[pos.row][1]=4}else{if(b==4){lines[pos.row][1]=3}else{if(b==5){lines[pos.row][1]=0;a=true}}}}}}if(a){sceneIndex()}if(lines[pos.row][1]==4){if(lines[pos.row][0].charAt(0)!="("){lines[pos.row][0]="("+lines[pos.row][0];pos.col++;anch.col++}if(lines[pos.row][0].charAt(lines[pos.row][0].length-1)!=")"){lines[pos.row][0]=lines[pos.row][0]+")"}}if(lines[pos.row][1]==3){if(lines[pos.row][0].charAt(0)=="("){lines[pos.row][0]=lines[pos.row][0].substr(1);pos.col--;anch.col--}if(lines[pos.row][0].charAt(lines[pos.row][0].length-1)==")"){lines[pos.row][0]=lines[pos.row][0].slice(0,-1)}}}function handlekeypress(a){if(typeToScript){a.preventDefault();var b=new Date();milli=b.getMilliseconds();if(pos.row!=anch.row||pos.col!=anch.col){deleteButton()}if(a.which!=13&&a.which!=37&&a.which!=0&&a.which!=8){undoQue.push([String.fromCharCode(a.charCode),pos.row,pos.col]);lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col)+String.fromCharCode(a.charCode)+lines[pos.row][0].slice(pos.col);pos.col++;if(lines[pos.row][1]==0){sceneIndex()}}anch.col=pos.col;anch.row=pos.row}}function undo(){if(undoQue.length==0){return}var c=undoQue.pop();redoQue.push(c);console.log(c);var e=false;if(c[0]=="enter"){var b=lines[c[1]+1][0];lines.splice((c[1]+1),1);if(lines[c[1]][1]==4&&lines[c[1]][0].charAt(lines[c[1]][0].length-1)==")"){lines[c[1]][0]=lines[c[1]][0].slice(0,-1)}lines[c[1]][0]+=b;e=true}else{if(c[0]=="back"){if(c[3]=="line"){var b=lines[c[1]][0].slice(0,c[2]);var a=lines[c[1]][0].slice(c[2]);if(c[4]==3&&a.charAt(a.length-1)==")"){a=a.slice(0,-1)}lines[c[1]][0]=b;var f=[a,c[4]];lines.splice(c[1]+1,0,f);c[1]=c[1]+1;c[2]=0;e=true}else{lines[c[1]][0]=lines[c[1]][0].slice(0,c[2]-1)+c[3]+lines[c[1]][0].slice(c[2]-1)}}else{if(c[0]=="delete"){if(c[3]=="line"){var b=lines[c[1]][0].slice(0,c[2]);var a=lines[c[1]][0].slice(c[2]);if(c[4]==3&&a.charAt(a.length-1)==")"){a=a.slice(0,-1)}lines[c[1]][0]=b;var f=[a,c[4]];lines.splice(c[1]+1,0,f);e=true}else{lines[c[1]][0]=lines[c[1]][0].slice(0,c[2])+c[3]+lines[c[1]][0].slice(c[2])}}else{if(c[0]=="format"){lines[c[1]][1]=c[3];if(lines[c[1]][0].charAt(0)=="("){lines[c[1]][0]=lines[c[1]][0].substr(1)}if(lines[c[1]][0].charAt(lines[c[1]][0].length-1)==")"){lines[c[1]][0]=lines[c[1]][0].slice(0,-1)}}else{if(c[0]=="br"){var g=c[1];for(var d=0;d<g;d++){var c=undoQue.pop();redoQue.push(c);if(c[3]=="line"){var b=lines[c[1]][0].slice(0,c[2]);var a=lines[c[1]][0].slice(c[2]);if(c[4]==3&&a.charAt(a.length-1)==")"){a=a.slice(0,-1)}lines[c[1]][0]=b;var f=[a,c[4]];lines.splice(c[1]+1,0,f);c[1]=c[1]+1;c[2]=0;e=true}else{lines[c[1]][0]=lines[c[1]][0].slice(0,c[2]-1)+c[3]+lines[c[1]][0].slice(c[2]-1)}}}else{if(c[0]=="dr"){var g=c[1];for(var d=0;d<g;d++){var c=undoQue.pop();redoQue.push(c);if(c[3]=="line"){var b=lines[c[1]][0].slice(0,c[2]);var a=lines[c[1]][0].slice(c[2]);if(c[4]==3&&a.charAt(a.length-1)==")"){a=a.slice(0,-1)}lines[c[1]][0]=b;var f=[a,c[4]];lines.splice(c[1]+1,0,f);e=true}else{lines[c[1]][0]=lines[c[1]][0].slice(0,c[2]-1)+c[3]+lines[c[1]][0].slice(c[2]-1)}}}else{lines[c[1]][0]=lines[c[1]][0].slice(0,c[2])+lines[c[1]][0].slice(c[2]+1);if(lines[c[1]][1]==4&&lines[c[1]][0][c[2]-1]==")"){lines[c[1]][0]=lines[c[1]][0].slice(0,c[2])+lines[c[1]][0].slice(c[2]+1);c[2]=c[2]-1}}}}}}}pos.row=c[1];pos.col=c[2];anch.row=pos.row;anch.col=pos.col;paint(false,false,true,false)}function pagination(){pageBreaks=[];i=0;var b=0;while(i<lines.length){lineCount=b;while(lineCount+linesNLB[i].length<56){lineCount+=linesNLB[i].length;i++;if(i==lines.length){return}}var a=0;b=0;if(lines[i][1]==3&&lineCount<54&&lineCount+linesNLB[i].length>57){a=55-lineCount;b=1-a;lineCount=56}else{if(lines[i][1]==3&&lineCount<54&&linesNLB[i].length>4){a=linesNLB[i].length-3;b=1-a;lineCount=55}else{if(lines[i][1]==1&&lineCount<55&&lineCount+linesNLB[i].length>57){a=55-lineCount;b=1-a;lineCount=56}else{if(lines[i][1]==1&&lineCount<55&&linesNLB[i].length>4){a=linesNLB[i].length-3;b=1-a;lineCount=55}else{while(lines[i-1][1]==0||lines[i-1][1]==2||lines[i-1][1]==4){i--;lineCount-=linesNLB[i].length}}}}}pageBreaks.push([i,lineCount,a])}}function characterInit(){for(var a=0;a<lines.length;a++){if(lines[a][1]==2){characterIndex(lines[a][0])}}}function characterIndex(b){var a=b.toUpperCase();var d=false;for(var c=0;c<characters.length;c++){if(characters[c][0]==a){characters[c][1]=characters[c][1]+1;d=true}}if(!d){characters.push([a,1])}}function sceneIndex(){scenes=[];var a=0;for(var b=0;b<lines.length;b++){if(lines[b][1]==0){a++;scenes.push([String(a)+") "+lines[b][0].toUpperCase(),b])}}var e=document.getElementById("sidebar");e.innerHTML="";for(var b=0;b<scenes.length;b++){var d=e.appendChild(document.createElement("p"));d.appendChild(document.createTextNode(scenes[b][0]));d.className="sceneItem";d.id="row"+scenes[b][1]}$(".sceneItem").click(function(){$(this).css("background-color","#999ccc");jumpTo(this.id)});$(".sceneItem").mouseover(function(){$(this).css("background-color","#ccccff")});$(".sceneItem").mouseout(function(){$(this).css("background-color","white")})}function openMenu(a){document.getElementById(a).style.backgroundColor="#6484df";document.getElementById(a).style.color="white";document.getElementById(a+"Menu").style.display="block";var d=document.getElementsByTagName("td");for(var b=0;b<d.length;b++){if(d[b].className=="formatTD"){if(d[b].id=="check"+lines[pos.row][1]){d[b].innerHTML="";d[b].appendChild(document.createTextNode("✓"))}else{d[b].innerHTML=""}}}}function topMenuOver(a){var b=false;var e=document.getElementsByTagName("div");for(var d=0;d<e.length;d++){if(e[d].className=="menuItem"){e[d].style.backgroundColor="#A2BAE9";e[d].style.color="black"}if(e[d].className=="topMenu"){if(e[d].style.display=="block"){e[d].style.display="none";b=true}}}if(b){document.getElementById(a+"Menu").style.display="block"}document.getElementById(a).style.backgroundColor="#6484df";document.getElementById(a).style.color="white";var e=document.getElementsByTagName("td");for(var d=0;d<e.length;d++){if(e[d].className=="formatTD"){if(e[d].id=="check"+lines[pos.row][1]){e[d].innerHTML="";e[d].appendChild(document.createTextNode("✓"))}else{e[d].innerHTML=""}}}}function topMenuOut(a){if(document.getElementById(a+"Menu").style.display=="none"){document.getElementById(a).style.backgroundColor="#A2BAE9";document.getElementById(a).style.color="black"}}function renamePrompt(){typeToScript=false;document.getElementById("renameTitle").innerHTML="Rename: "+document.getElementById("title").innerHTML;document.getElementById("renameField").value=document.getElementById("title").innerHTML;document.getElementById("renamepopup").style.visibility="visible"}function hideRenamePrompt(){document.getElementById("renameField").value="";document.getElementById("renamepopup").style.visibility="hidden";typeToScript=true}function renameScript(){var a=document.getElementById("renameField").value;if(a==""){return}document.getElementById("title").innerHTML=a;$.post("/rename",{resource_id:resource_id,rename:a,fromPage:"scriptlist"});hideRenamePrompt()}function exportPrompt(){save();document.getElementById("exportpopup").style.visibility="visible"}function hideExportPrompt(){document.getElementById("exportpopup").style.visibility="hidden"}function exportScripts(){var e=window.location.href;var g=e.split("=")[1];if(g=="demo"){nope();return}else{var h;var f=document.getElementsByTagName("input");for(var j=0;j<f.length;j++){if(f[j].checked==true){if(f[j].className=="exportList"){h=f[j].name;e="/export?resource_id="+g+"&export_format="+h+"&fromPage=editor";window.open(e)}}}}}function scrollArrows(b){var a=document.getElementById("canvas").height;b.fillStyle="#333";b.fillRect(editorWidth-22,a-39,20,20);b.fillStyle="#ddd";b.fillRect(editorWidth-20,a-37,16,16);b.beginPath();b.moveTo(editorWidth-18,a-24);b.lineTo(editorWidth-12,a-35);b.lineTo(editorWidth-6,a-24);b.closePath();b.fillStyle="#333";b.fill();b.fillStyle="#333";b.fillRect(editorWidth-22,a-19,20,20);b.fillStyle="#ddd";b.fillRect(editorWidth-20,a-18,16,16);b.beginPath();b.moveTo(editorWidth-18,a-15);b.lineTo(editorWidth-12,a-4);b.lineTo(editorWidth-6,a-15);b.closePath();b.fillStyle="#333";b.fill()}function scrollBar(b,f){var a=document.getElementById("canvas").height;var d=(pageBreaks.length+1)*72*lineheight;var e=((a)/d)*(a-39);if(e<20){e=20}if(e>=a-39){e=a-39}var c=(vOffset/(d-a))*(a-39-e);b.fillRect(editorWidth-22,c,20,e)}function drawRange(s){if(pos.row>anch.row){var p={row:anch.row,col:anch.col};var h={row:pos.row,col:pos.col}}else{if(pos.row==anch.row&&pos.col>anch.col){var p={row:anch.row,col:anch.col};var h={row:pos.row,col:pos.col}}else{var p={row:pos.row,col:pos.col};var h={row:anch.row,col:anch.col}}}var r=lineheight*9+3;var m=0;for(var k=0;k<p.row;k++){if(pageBreaks.length!=0&&pageBreaks[m][0]==k){r=72*lineheight*(m+1)+9*lineheight+4;r-=(pageBreaks[m][2])*lineheight;if(lines[k][1]==3){r+=lineheight}m++;if(m==pageBreaks.length){m--}}r+=lineheight*linesNLB[k].length}var k=0;var q=linesNLB[p.row][k]+1;while(p.col>q){r+=lineheight;if(pageBreaks[m][0]==p.row&&pageBreaks[m][2]==k+1){r=72*lineheight*(m+1)+9*lineheight+4;if(lines[p.row][1]==3){r+=lineheight}}else{if(pageBreaks[m][0]-1==p.row&&pageBreaks[m][2]==k){r=72*lineheight*(m+1)+9*lineheight+4;if(lines[p.row][1]==3){r+=lineheight}}}k++;q+=linesNLB[p.row][k]+1}q-=linesNLB[p.row][k]+1;var l=WrapVariableArray[lines[p.row][1]][1];l+=((p.col-q)*fontWidth);r+=lineheight;var d=lineheight*9+3;m=0;for(var g=0;g<h.row;g++){if(pageBreaks.length!=0&&pageBreaks[m][0]==g){d=72*lineheight*(m+1)+9*lineheight+4;d-=(pageBreaks[m][2])*lineheight;if(lines[g][1]==3){d+=lineheight}m++;if(m==pageBreaks.length){m--}}d+=lineheight*linesNLB[g].length}var g=0;var n=linesNLB[h.row][g]+1;while(h.col>n){d+=lineheight;if(pageBreaks[m][0]==h.row&&pageBreaks[m][2]==g+1){d=72*lineheight*(m+1)+9*lineheight+4;if(lines[h.row][1]==3){d+=lineheight}}else{if(pageBreaks[m][0]-1==h.row&&pageBreaks[m][2]==k){d=72*lineheight*(m+1)+9*lineheight+4;if(lines[h.row][1]==3){d+=lineheight}}}g++;n+=linesNLB[h.row][g]+1}n-=linesNLB[h.row][g]+1;var b=WrapVariableArray[lines[h.row][1]][1];b+=((h.col-n)*fontWidth);d+=lineheight;s.fillStyle="lightBlue";if(d==r){var f=l;if(lines[p.row][1]==5){f-=(lines[p.row][0].length*fontWidth)}s.fillRect(f,r-vOffset,b-l,12)}else{var c=l;if(lines[p.row][1]==5){c-=(lines[p.row][0].length*fontWidth)}s.fillRect(c,r-vOffset,(q+linesNLB[p.row][k]-p.col)*fontWidth,12);while(r+lineheight<d){for(var a=0;a<pageBreaks.length;a++){if(pageBreaks.length!=0&&pageBreaks[a][0]-1==p.row&&pageBreaks[a][2]==0&&k==linesNLB[p.row].length-1){r=72*lineheight*(a+1)+9*lineheight+4}else{if(pageBreaks.length!=0&&pageBreaks[a][0]==p.row&&k==pageBreaks[a][2]-1){r=72*lineheight*(a+1)+9*lineheight+4;if(lines[p.row][1]==3){r+=lineheight}}}}k++;r+=lineheight;if(linesNLB[p.row].length<=k){p.row++;k=0}var e=WrapVariableArray[lines[p.row][1]][1];if(lines[p.row][1]==5){e-=(lines[p.row][0].length*fontWidth)}s.fillRect(e,r-vOffset,linesNLB[p.row][k]*fontWidth,12)}var o=WrapVariableArray[lines[h.row][1]][1];if(lines[h.row][1]==5){o-=(lines[h.row][0].length*fontWidth)}s.fillRect(o,d-vOffset,(h.col-n)*fontWidth,12)}}function paint(T,s,N,q){var k=document.getElementById("canvas");var o=k.getContext("2d");o.clearRect(0,0,2000,2500);o.fillStyle="#ccc";o.fillRect(0,0,editorWidth,document.getElementById("canvas").height);o.fillStyle=foreground;var L=45;var J=lineheight;for(var Q=0;Q<=pageBreaks.length;Q++){o.fillStyle=background;o.fillRect(L,J-vOffset,editorWidth*0.85,lineheight*70);o.strokeStyle="#000";o.lineWidth=1;o.strokeRect(L,J-vOffset,Math.round(editorWidth*0.85),lineheight*70);o.strokeStyle="#999";o.strokeRect(L-2,J-vOffset-2,Math.round(editorWidth*0.85)+4,lineheight*70+4);o.fillStyle=foreground;if(Q>0){o.fillText(String(Q+1)+".",645,J-vOffset+85)}J+=lineheight*72}var D=lineheight*9+2;var B=WrapVariableArray[0];o.fillStyle="#ddd";if(!N){var K=0;for(var Q=0;Q<lines.length;Q++){if(pageBreaks.length!=0&&pageBreaks[K][0]==Q){D=72*lineheight*(K+1)+9*lineheight+2;if(pageBreaks[K][2]!=0){D-=pageBreaks[K][2]*lineheight;if(lines[Q][1]==3){D+=lineheight}}K++;if(K==pageBreaks.length){K--}}if(Q<linesNLB.length){for(var P=0;P<linesNLB[Q].length;P++){D+=lineheight;if(lines[Q][1]==0){if(linesNLB[Q][P]!=0){o.fillRect(B[1]-3,D-vOffset,61*fontWidth+6,14)}if(lines[Q][0]==""&&P==0){o.fillRect(B[1]-3,D-vOffset,61*fontWidth+6,14)}}}}}}o.fillStyle=foreground;if(pos.row!=anch.row||anch.col!=pos.col){drawRange(o)}o.fillStyle=foreground;o.font=font;var E=lineheight*11;var b=[];var f="";var K=0;for(var Q=0;Q<lines.length;Q++){if(lines[Q][1]==4){if(lines[Q][0].charAt(0)!="("){lines[Q][0]="("+lines[Q][0]}if(lines[Q][0].charAt(lines[Q][0].length-1)!=")"){lines[Q][0]=lines[Q][0]+")"}}var X=false;if(!N){if(pageBreaks.length!=0&&pageBreaks[K][0]==Q){if(pageBreaks[K][2]==0){E=72*lineheight*(K+1)+11*lineheight;K++;if(K==pageBreaks.length){K--}}else{X=true}}}if(!N&&!X&&(E-vOffset>1200||E-vOffset<-200)){E+=(lineheight*linesNLB[Q].length)}else{var Y=lines[Q][1];var c=(s?anch.row:pos.row);if(Q==pos.row){var z=E-lineheight;if(Y==1){var A=WrapVariableArray[1][1]}else{if(Y==0){var A=WrapVariableArray[0][1]}else{if(Y==3){var A=WrapVariableArray[3][1]}else{if(Y==2){var A=WrapVariableArray[2][1]}else{if(Y==4){var A=WrapVariableArray[4][1]}else{if(Y==5){var A=WrapVariableArray[5][1]}}}}}}var r=true;var h=[]}if(Q==anch.row){var w=E-lineheight;var C=true;var a=[]}var R=lines[Q][0];if(Y==0){var B=WrapVariableArray[0]}else{if(Y==1){var B=WrapVariableArray[1]}else{if(Y==2){var B=WrapVariableArray[2]}else{if(Y==3){var B=WrapVariableArray[3]}else{if(Y==4){var B=WrapVariableArray[4]}else{if(Y==5){var B=WrapVariableArray[5]}}}}}}var n=R.split(" ");var G=0;if(T||s){var O=[]}linesNLB[Q]=[];while(G<n.length){var I=0;if(n.slice(G).join().length<B[0]){var W=n.slice(G).join(" ");if(lines[Q][1]==2&&f!=""&&lines[Q][0].toUpperCase()==f.toUpperCase()){W+=" (Cont'd)"}if(lines[Q][1]==0){f=""}if(B[3]==1){W=W.toUpperCase()}if(B[2]==1){o.textAlign="right"}if(W!=""){o.fillText(W,B[1],E-vOffset)}o.textAlign="left";G=n.length;linesNLB[Q].push(W.length);E+=lineheight;if(B[4]==2){linesNLB[Q].push(0);E+=lineheight}if(T||s){O.push(W.length)}if(r){h.push(W.length)}if(C){a.push(W.length)}}else{var I=0;while(n.slice(G,G+I).join(" ").length<B[0]){newLineToPrint=n.slice(G,G+I).join(" ");I++;if(B[3]==1){newLineToPrint=newLineToPrint.toUpperCase()}}o.fillText(newLineToPrint,B[1],E-vOffset);linesNLB[Q].push(newLineToPrint.length);E+=lineheight;G+=I-1;I=0;if(T||s){O.push(newLineToPrint.length)}if(r){h.push(newLineToPrint.length)}if(C){a.push(newLineToPrint.length)}}if(lines[Q][1]==3&&Q+1!=lines.length&&lines[Q+1][1]==4&&linesNLB[Q][linesNLB[Q].length-1]==0){linesNLB[Q].pop();E-=lineheight}if(T&&T.clientY-headerHeight<E-vOffset-lineheight&&T.clientY-headerHeight>E-vOffset-(linesNLB[Q].length*lineheight)-lineheight){pos.row=Q;pos.col=0;var I=0;var M=E-vOffset-(linesNLB[Q].length*lineheight);while(T.clientY-headerHeight>M){pos.col+=linesNLB[Q][I]+1;M+=lineheight;I++}if(Y!=5){var t=Math.round(((T.clientX-B[1])/fontWidth));if(t>linesNLB[Q][I]){t=linesNLB[Q][I]}if(t<0){t=0}pos.col+=t}else{var t=Math.round(((B[1]-T.clientX)/fontWidth));if(t<0){t=0}pos.col-=t;pos.col+=lines[Q][0].length}var x=0;for(var V=0;V<O.length;V++){x+=O[V]+1}if(pos.col<0){pos.col=0}if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}if(s&&s.clientY-headerHeight<E-vOffset-lineheight&&s.clientY-headerHeight>E-vOffset-(linesNLB[Q].length*lineheight)-lineheight){anch.row=Q;anch.col=0;var I=0;var M=E-vOffset-(linesNLB[Q].length*lineheight);while(s.clientY-headerHeight>M){anch.col+=linesNLB[Q][I]+1;M+=lineheight;I++}if(Y!=5){var t=Math.round(((s.clientX-B[1])/fontWidth));if(t>linesNLB[Q][I]){t=linesNLB[Q][I]}if(t<0){t=0}anch.col+=t}else{var t=Math.round(((B[1]-s.clientX)/fontWidth));if(t<0){t=0}anch.col-=t;anch.col+=lines[Q][0].length}var x=0;for(var V=0;V<O.length;V++){x+=O[V]+1}if(anch.col<0){anch.col=0}if(anch.col>lines[anch.row][0].length){anch.col=lines[anch.row][0].length}}if(X&&linesNLB[Q].length==pageBreaks[K][2]){if(lines[Q][1]==3){o.fillText("(MORE)",WrapVariableArray[2][1],E-vOffset)}E=72*lineheight*(K+1)+11*lineheight;if(lines[Q][1]==3){o.fillText(f.toUpperCase()+"(CONT'D)",WrapVariableArray[2][1],E-vOffset);E+=lineheight}K++;X=false;if(pos.row==Q){b.push(K)}}}var r=false;var C=false}if(lines[Q][1]==2){var f=lines[Q][0]}}while(lines.length<linesNLB.length){linesNLB.pop()}var U=new Date();var p=U.getMilliseconds();var u=p-milli;var g=false;if(u>0&&u<500){g=true}if(u<0&&u<-500){g=true}if(g&&h){var F=0;var m=pos.col;var l=h[F];while(pos.col>l){F++;l+=1+h[F]}if(b.length>0&&F>=pageBreaks[b[0]-1][2]){z=72*b[0]*lineheight+7*lineheight;if(pageBreaks[b[0]-1][1]!=56&&lines[pos.row][1]==3){z+=lineheight*2}else{if(lines[pos.row][1]==3){z+=lineheight}else{if(pageBreaks[b[0]-1][1]!=56&&lines[pos.row][1]==1){z+=lineheight}}}}l-=h[F];var v=A+((pos.col-l)*fontWidth);if(lines[pos.row][1]==5){v-=lines[pos.row][0].length*fontWidth}var H=2+z+(F*lineheight)-vOffset;try{o.fillRect(v,H,2,17)}catch(S){console.log(lines[pos.row][0])}}o.lineWidth=4;o.strokeStyle="#ddd";o.beginPath();o.moveTo(2,2);o.lineTo(2,document.getElementById("canvas").height-1);o.lineTo(editorWidth,document.getElementById("canvas").height-1);o.lineTo(editorWidth,2);o.lineTo(2,2);o.stroke();o.fillStyle="#6484df";scrollArrows(o);scrollBar(o,E);if(s){pos.row=anch.row;pos.col=anch.col}if(mouseDownBool&&pos.row<anch.row&&mouseY<40){scroll(-20)}if(mouseDownBool&&pos.row>anch.row&&mouseY>document.getElementById("canvas").height-50){scroll(20)}if(q){if((2+z+(F*lineheight)-vOffset)>document.getElementById("canvas").height-50){scroll(45)}if((2+z+(F*lineheight)-vOffset)<45){scroll(-45)}}if(N){pagination()}document.getElementById("format").selectedIndex=lines[pos.row][1]};