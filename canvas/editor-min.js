var shiftDown=false;var characters=[];var scenes=[];var canvas;var ctx;var linesNLB=[];var vOffset=0;var pos={col:0,row:0};var anch={col:0,row:0};var background="#fff";var font="10pt Courier";var fontWidth=8;var foreground="#000";var lineheight=13;var milli=0;var formatMenu=false;var formats=["Slugline","Action","Character","Dialog","Parenthetical","Transition"];var WrapVariableArray=[[61,31,0,1,2],[61,31,0,0,2],[40,232,0,1,1],[36,131,0,0,2],[30,181,0,0,1],[61,632,1,1,2]];var editorWidth=675;function setup(){var b=document.getElementById("canvas");var a=b.getContext("2d");document.onkeypress=handlekeypress;characterInit();sceneIndex();paint(false,false,true);setInterval("paint(false,false, false)",40)}function mouseUp(i){var h=document.getElementById("canvas").width;var f=document.getElementById("canvas").height;if(!formatMenu){if(i.clientX>10&&i.clientX<100&&i.clientY<30&&i.clientY>10){formatMenu=true}else{if(i.clientY>f-39&&i.clientY<f&&i.clientX>editorWidth-22&&i.clientX<editorWidth-2){if(i.clientY>f-20){scroll(30)}else{scroll(-30)}}else{paint(i,false,false)}}}else{if(i.clientX>10&&i.clientX<110&&i.clientY<150&&i.clientY>10){var g=i.clientY;var d=25;var j=19;if(g<d){lines[pos.row][1]=0}else{if(g<(d+j)){lines[pos.row][1]=1}else{if(g<(d+2*j)){lines[pos.row][1]=2}else{if(g<(d+3*j)){lines[pos.row][1]=3}else{if(g<(d+4*j)){lines[pos.row][1]=4}else{lines[pos.row][1]=5}}}}}}formatMenu=false}if(i.clientX>200&&i.clientX<310&&i.clientY<27&&i.clientY>7){lines=fivePages;paint(false,false,true)}}function mouseDown(a){paint(false,a,false)}function scroll(a){vOffset+=a;if(vOffset<0){vOffset=0}}function upArrow(){if(pos.row==0&&pos.col==0){return}var g=lines[pos.row][1];if(g==0){var f=WrapVariableArray[0]}else{if(g==1){var f=WrapVariableArray[1]}else{if(g==2){var f=WrapVariableArray[2]}else{if(g==3){var f=WrapVariableArray[3]}else{if(g==4){var f=WrapVariableArray[4]}else{if(g==5){var f=WrapVariableArray[5]}}}}}}if(lines[pos.row][0].length>f[0]){var h=lines[pos.row][0].split(" ");var a=0;var b=[];while(a<h.length){if(h.slice(a).join().length<=f[0]){b.push(h.slice(a).join().length);a=h.length}else{var i=0;while(h.slice(a,a+i).join().length<f[0]){i++}b.push(h.slice(a,a+i-1).join().length);a+=i-1}}i=0;var e=b[0];while(e<pos.col){i++;e+=b[i]+1}if(i==0){var c=lines[pos.row-1][1];if(c==0){var d=WrapVariableArray[0]}else{if(c==1){var d=WrapVariableArray[1]}else{if(c==2){var d=WrapVariableArray[2]}else{if(c==3){var d=WrapVariableArray[3]}else{if(c==4){var d=WrapVariableArray[4]}else{if(c==5){var d=WrapVariableArray[5]}}}}}}if(lines[pos.row-1][0].length<d[0]){pos.row--;if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{var h=lines[pos.row-1][0].split(" ");var a=0;var b=[];while(a<h.length){if(h.slice(a).join().length<=f[0]){b.push(h.slice(a).join().length);a=h.length}else{var i=0;while(h.slice(a,a+i).join().length<f[0]){i++}b.push(h.slice(a,a+i-1).join().length);a+=i-1}}pos.row--;pos.col+=lines[pos.row][0].length-b[b.length-1];if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}else{pos.col-=b[i-1]+1;if(pos.col>(e-b[i]-1)){pos.col=e-b[i]-1}}}else{if(pos.row==0){pos.col=0}else{var c=lines[pos.row-1][1];if(c==0){var d=WrapVariableArray[0]}else{if(c==1){var d=WrapVariableArray[1]}else{if(c==2){var d=WrapVariableArray[2]}else{if(c==3){var d=WrapVariableArray[3]}else{if(c==4){var d=WrapVariableArray[4]}else{if(c==5){var d=WrapVariableArray[5]}}}}}}if(lines[pos.row-1][0].length<d[0]){pos.row--;if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{var h=lines[pos.row-1][0].split(" ");var a=0;var b=[];while(a<h.length){if(h.slice(a).join().length<=f[0]){b.push(h.slice(a).join().length);a=h.length}else{var i=0;while(h.slice(a,a+i).join().length<f[0]){i++}b.push(h.slice(a,a+i-1).join().length);a+=i-1}}pos.row--;pos.col+=lines[pos.row][0].length-b[b.length-1];if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}}function downArrow(){if(pos.row==lines.length-1&&pos.col==lines[pos.row][0].length){return}var d=lines[pos.row][1];if(d==0){var c=WrapVariableArray[0]}else{if(d==1){var c=WrapVariableArray[1]}else{if(d==2){var c=WrapVariableArray[2]}else{if(d==3){var c=WrapVariableArray[3]}else{if(d==4){var c=WrapVariableArray[4]}else{if(d==5){var c=WrapVariableArray[5]}}}}}}if(lines[pos.row][0].length>c[0]){var b=lines[pos.row][0].split(" ");var f=0;var g=[];while(f<b.length){if(b.slice(f).join().length<=c[0]){g.push(b.slice(f).join().length);f=b.length}else{var a=0;while(b.slice(f,f+a).join().length<c[0]){a++}g.push(b.slice(f,f+a-1).join().length);f+=a-1}}a=0;var h=g[0];while(h<pos.col){a++;h+=g[a]+1}if(a+1==g.length){for(var e=0;e<g.length-1;e++){pos.col-=g[e]}pos.col--;pos.row++;if(pos.row>lines.length-1){pos.row--;pos.col=lines[pos.row][0].length}if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}else{pos.col+=g[a]+1;if(pos.col>(h+g[a+1]+1)){pos.col=h+g[a+1]+1}}}else{if(pos.row==lines.length-1){pos.col=lines[pos.row][0].length}else{pos.row++;if(pos.row>lines.length-1){pos.row=lines.length-1}if(pos.col>lines[pos.row][0].length){pos.col=lines[pos.row][0].length}}}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}}function leftArrow(){if(pos.row==0&&pos.col==0){return}if(pos.col==0){pos.row--;pos.col=lines[pos.row][0].length}else{pos.col=pos.col-1}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}}function rightArrow(){if(pos.col==lines[pos.row][0].length&&pos.row==lines.length-1){return}if(pos.col==lines[pos.row][0].length){pos.row++;pos.col=0}else{pos.col=pos.col+1}if(!shiftDown){anch.col=pos.col;anch.row=pos.row}}function backspace(g){g.preventDefault();var a=false;if(lines[pos.row][1]==0){var a=true}if(pos.row==anch.row&&pos.col==anch.col){if(pos.col==0&&pos.row==0){return}if(pos.col==0){var b=lines[pos.row][0];lines.splice(pos.row,1);var d=lines[pos.row-1][0].length;lines[pos.row-1][0]=lines[pos.row-1][0]+b;pos.col=d;pos.row--}else{lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);pos.col--}anch.col=pos.col;anch.row=pos.row}else{var f=false;if(anch.row>pos.row){f=true}if(anch.row==pos.row&&anch.col>pos.col){f=true}if(f){var c=anch.row;anch.row=pos.row;pos.row=c;c=anch.col;anch.col=pos.col;pos.col=c}while(pos.col!=anch.col||pos.row!=anch.row){if(lines[pos.row][1]==0){a=true}if(pos.col==0){var b=lines[pos.row][0];lines.splice(pos.row,1);var d=lines[pos.row-1][0].length;lines[pos.row-1][0]=lines[pos.row-1][0]+b;pos.col=d;pos.row--}else{lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);pos.col--}}}if(a){sceneIndex()}}function deleteButton(){var a=false;if(pos.row==anch.row&&pos.col==anch.col){if(lines[pos.row][1]==0){var a=true}if(pos.col==(lines[pos.row][0].length)&&pos.row==lines.length-1){return}if(pos.col==(lines[pos.row][0].length)){if(lines[pos.row+1][1]==0){a=true}var b=lines[pos.row+1][0];lines.splice((pos.row+1),1);lines[pos.row][0]+=b}else{lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col)+lines[pos.row][0].slice(pos.col+1)}}else{var e=false;if(anch.row>pos.row){e=true}if(anch.row==pos.row&&anch.col>pos.col){e=true}if(e){var d=anch.row;anch.row=pos.row;pos.row=d;d=anch.col;anch.col=pos.col;pos.col=d}while(pos.col!=anch.col||pos.row!=anch.row){if(lines[pos.row][1]==0){a=true}if(pos.col==0){var b=lines[pos.row][0];lines.splice(pos.row,1);var c=lines[pos.row-1][0].length;lines[pos.row-1][0]=lines[pos.row-1][0]+b;pos.col=c;pos.row--}else{lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col-1)+lines[pos.row][0].slice(pos.col);pos.col--}}}if(a){sceneIndex()}}function enter(){if(lines[pos.row][1]==2){characterIndex(lines[pos.row][0])}var b=lines[pos.row][0].slice(0,pos.col);var a=lines[pos.row][0].slice(pos.col);lines[pos.row][0]=b;if(lines[pos.row][1]==0){var c=1}else{if(lines[pos.row][1]==1){var c=2}else{if(lines[pos.row][1]==2){var c=3}else{if(lines[pos.row][1]==4){var c=3}else{if(lines[pos.row][1]==3){var c=2}else{if(lines[pos.row][1]==5){var c=0}}}}}}var d=[a,c];lines.splice(pos.row+1,0,d);pos.row++;pos.col=0;anch.row=pos.row;anch.col=pos.col;console.log(lines[pos.row][0]);paint(false,false,true);if(lines[pos.row][1]==1){sceneIndex()}}function tab(){var a=false;if(lines[pos.row][1]==0){var a=true}var b=lines[pos.row][1];if(b==1){lines[pos.row][1]=0;a=true}else{if(b==0){lines[pos.row][1]=2}else{if(b==2){lines[pos.row][1]=1}else{if(b==3){lines[pos.row][1]=4}else{if(b==4){lines[pos.row][1]=3}else{if(b==5){lines[pos.row][1]=0;a=true}}}}}}if(a){sceneIndex()}}function handlekeypress(a){var b=new Date();milli=b.getMilliseconds();if(pos.row!=anch.row||pos.col!=anch.col){deleteButton()}if(a.which!=13){lines[pos.row][0]=lines[pos.row][0].slice(0,pos.col)+String.fromCharCode(a.charCode)+lines[pos.row][0].slice(pos.col);pos.col++;if(lines[pos.row][1]==0){sceneIndex()}}anch.col=pos.col;anch.row=pos.row}function characterInit(){for(var a=0;a<lines.length;a++){if(lines[a][1]==2){characterIndex(lines[a][0])}}}function characterIndex(b){var a=b.toUpperCase();var d=false;for(var c=0;c<characters.length;c++){if(characters[c][0]==a){characters[c][1]=characters[c][1]+1;d=true}}if(!d){characters.push([a,1])}}function sceneIndex(){scenes=[];var a=0;for(var b=0;b<lines.length;b++){if(lines[b][1]==0){a++;scenes.push(String(a)+") "+lines[b][0].toUpperCase())}}}function scrollArrows(b){var a=document.getElementById("canvas").height;b.fillStyle="#333";b.fillRect(editorWidth-22,a-39,20,20);b.fillStyle="#ddd";b.fillRect(editorWidth-20,a-37,16,16);b.beginPath();b.moveTo(editorWidth-18,a-24);b.lineTo(editorWidth-12,a-35);b.lineTo(editorWidth-6,a-24);b.closePath();b.fillStyle="#333";b.fill();b.fillStyle="#333";b.fillRect(editorWidth-22,a-19,20,20);b.fillStyle="#ddd";b.fillRect(editorWidth-20,a-18,16,16);b.beginPath();b.moveTo(editorWidth-18,a-15);b.lineTo(editorWidth-12,a-4);b.lineTo(editorWidth-6,a-15);b.closePath();b.fillStyle="#333";b.fill()}function scrollBar(b,e){var a=document.getElementById("canvas").height;var d=((a-35)/e)*(a-35-39);if(d<30){d=30}if(d>=a-35-39){d=a-35-39}var c=(vOffset/(e-a))*(a-35-39-d)+35;b.fillRect(editorWidth-22,c,20,d)}function paint(ad,A,X){var p=document.getElementById("canvas");var u=p.getContext("2d");u.clearRect(0,0,2000,2500);u.fillStyle=background;u.fillStyle=foreground;u.lineWidth=4;u.strokeStyle="#ddd";u.beginPath();u.moveTo(2,2);u.lineTo(2,document.getElementById("canvas").height-1);u.lineTo(editorWidth,document.getElementById("canvas").height-1);u.lineTo(editorWidth,2);u.stroke();if(pos.row!=anch.row||anch.col!=pos.col){if(pos.row>anch.row){var b={row:anch.row,col:anch.col};var R={row:pos.row,col:pos.col}}else{if(pos.row==anch.row&&pos.col>anch.col){var b={row:anch.row,col:anch.col};var R={row:pos.row,col:pos.col}}else{var b={row:pos.row,col:pos.col};var R={row:anch.row,col:anch.col}}}var t=41;for(var aa=0;aa<b.row;aa++){t+=lineheight*linesNLB[aa].length}var aa=0;var n=linesNLB[b.row][aa]+1;while(b.col>n){t+=lineheight;aa++;n+=linesNLB[b.row][aa]+1}n-=linesNLB[b.row][aa]+1;var U=WrapVariableArray[lines[b.row][1]][1];U+=((b.col-n)*fontWidth);t+=lineheight;var v=41;for(var Z=0;Z<R.row;Z++){v+=lineheight*linesNLB[Z].length}var Z=0;var m=linesNLB[R.row][Z]+1;while(R.col>m){v+=lineheight;Z++;m+=linesNLB[R.row][Z]+1}m-=linesNLB[R.row][Z]+1;var C=WrapVariableArray[lines[R.row][1]][1];C+=((R.col-m)*fontWidth);v+=lineheight;u.fillStyle="lightBlue";if(v==t){var c=U;if(lines[b.row][1]==5){c-=(lines[b.row][0].length*fontWidth)}u.fillRect(c,t-vOffset,C-U,12)}else{var V=U;if(lines[b.row][1]==5){V-=(lines[b.row][0].length*fontWidth)}u.fillRect(V,t-vOffset,(n+linesNLB[b.row][aa]-b.col)*fontWidth,12);while(t+lineheight<v){aa++;t+=lineheight;if(linesNLB[b.row].length<=aa){b.row++;aa=0}var W=WrapVariableArray[lines[b.row][1]][1];if(lines[b.row][1]==5){W-=(lines[b.row][0].length*fontWidth)}u.fillRect(W,t-vOffset,linesNLB[b.row][aa]*fontWidth,12)}var h=WrapVariableArray[lines[R.row][1]][1];if(lines[R.row][1]==5){h-=(lines[R.row][0].length*fontWidth)}u.fillRect(h,v-vOffset,(R.col-m)*fontWidth,12)}}u.fillStyle=foreground;u.font=font;var O=lineheight+50;for(var aa=0;aa<lines.length;aa++){if(!X&&(O-vOffset>1200||O-vOffset<0)){O+=(lineheight*linesNLB[aa].length)}else{var ah=lines[aa][1];var k=(A?anch.row:pos.row);if(aa==pos.row){var H=O-lineheight;if(ah==1){var I=WrapVariableArray[1][1]}else{if(ah==0){var I=WrapVariableArray[0][1]}else{if(ah==3){var I=WrapVariableArray[3][1]}else{if(ah==2){var I=WrapVariableArray[2][1]}else{if(ah==4){var I=WrapVariableArray[4][1]}else{if(ah==5){var I=WrapVariableArray[5][1]}}}}}}var x=true;var o=[]}if(aa==anch.row){var F=O-lineheight;var L=true;var a=[]}var ab=lines[aa][0];if(ah==0){var K=WrapVariableArray[0];var M=(Math.round((ab.length/61)+0.5))*16;u.fillStyle="#ddd";u.fillRect(K[1]-3,(O-12-vOffset),605,M);u.fillStyle=foreground}else{if(ah==1){var K=WrapVariableArray[1]}else{if(ah==2){var K=WrapVariableArray[2]}else{if(ah==3){var K=WrapVariableArray[3]}else{if(ah==4){var K=WrapVariableArray[4]}else{if(ah==5){var K=WrapVariableArray[5]}}}}}}var s=ab.split(" ");var Q=0;if(ad||A){var Y=[]}linesNLB[aa]=[];while(Q<s.length){var T=0;if(s.slice(Q).join().length<K[0]){var ag=s.slice(Q).join(" ");if(K[3]==1){ag=ag.toUpperCase()}if(K[2]==1){u.textAlign="right"}if(ag!=""){u.fillText(ag,K[1],O-vOffset)}u.textAlign="left";Q=s.length;linesNLB[aa].push(ag.length);O+=lineheight;if(K[4]==2){linesNLB[aa].push(0);O+=lineheight}if(ad||A){Y.push(ag.length)}if(x){o.push(ag.length)}if(L){a.push(ag.length)}}else{var T=0;while(s.slice(Q,Q+T).join(" ").length<K[0]){newLineToPrint=s.slice(Q,Q+T).join(" ");T++;if(K[3]==1){newLineToPrint=newLineToPrint.toUpperCase()}}u.fillText(newLineToPrint,K[1],O-vOffset);linesNLB[aa].push(newLineToPrint.length);O+=lineheight;Q+=T-1;T=0;var J=1;if(ad||A){Y.push(newLineToPrint.length)}if(x){o.push(newLineToPrint.length)}if(L){a.push(newLineToPrint.length)}}if(ad&&ad.clientY+vOffset>(O-6-25*J)&&ad.clientY+vOffset<(O+19-25*J)){pos.row=aa;pos.col=0;for(var af=0;af<Y.length-1;af++){pos.col+=Y[af]+1}if(ah!=5){pos.col+=Math.round(((ad.clientX-K[1])/fontWidth))}else{pos.col-=Math.round(((K[1]-ad.clientX)/fontWidth));pos.col+=lines[aa][0].length}var G=0;for(var af=0;af<Y.length;af++){G+=Y[af]+1}if(pos.col>G){pos.col=G-1}if(pos.col<0){pos.col=0}}if(A&&A.clientY+vOffset>(O-6-25*J)&&A.clientY+vOffset<(O+19-25*J)){anch.row=aa;anch.col=0;for(var af=0;af<Y.length-1;af++){anch.col+=Y[af]+1}if(ah!=5){anch.col+=Math.round(((A.clientX-K[1])/fontWidth))}else{anch.col-=Math.round(((K[1]-A.clientX)/fontWidth));anch.col+=lines[aa][0].length}var G=0;for(var af=0;af<Y.length;af++){G+=Y[af]+1}if(anch.col>G){anch.col=G-1}if(anch.col<0){anch.col=0}}}var x=false;var L=false}}for(var N=aa+1;N<linesNLB.length;N++){linesNLB.pop();N--}var ae=new Date();var w=ae.getMilliseconds();var B=w-milli;var l=false;if(B>0&&B<500){l=true}if(B<0&&B<-500){l=true}if(l&&o){var P=0;var r=pos.col;var q=o[P];while(pos.col>q){P++;q+=1+o[P]}q-=o[P];var D=I+((pos.col-q)*fontWidth);if(lines[pos.row][1]==5){D-=lines[pos.row][0].length*fontWidth}var S=2+H+(P*lineheight)-vOffset;u.fillRect(D,S,2,17)}var g=50;for(var aa=0;aa<scenes.length;aa++){u.fillText(scenes[aa],editorWidth+20,g);g+=lineheight}u.fillStyle="#6484df";u.fillRect(0,0,document.getElementById("canvas").width,35);u.fillStyle="#efefef";u.fillRect(10,7,110,20);u.fillStyle=foreground;u.font="12pt Arial";var ac=lines[pos.row][1];if(ac==0){var E="Slugline"}else{if(ac==1){var E="Action"}else{if(ac==2){var E="Character"}else{if(ac==3){var E="Dialog"}else{if(ac==4){var E="Parenthetical"}else{if(ac==5){var E="Transition"}}}}}}u.fillText(E,15,23);u.font=font;u.fillStyle=foreground;u.fillRect(200,7,110,20);if(formatMenu){u.fillStyle="#efefef";u.fillRect(10,7,110,120);u.fillStyle=foreground;u.font="12pt Arial";formatMenuY=23;for(var aa=0;aa<formats.length;aa++){u.fillText(formats[aa],15,formatMenuY);formatMenuY+=19}}scrollArrows(u);scrollBar(u,O);if(A){pos.row=anch.row;pos.col=anch.col}};