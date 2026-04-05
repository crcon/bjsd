(function(){
"use strict";
var slides=[
{t:"封面",u:"slides/p01/page.html",g:"开篇"},
{t:"目录",u:"slides/p02/page.html",g:"开篇"},
{t:"管理层摘要",u:"slides/p03/page.html",g:"开篇"},
{t:"全社会用电量总览",u:"slides/p04/page.html",g:"第一篇 · 全国市场概况"},
{t:"发电装机容量与结构",u:"slides/p05/page.html",g:"第一篇 · 全国市场概况"},
{t:"发电设备利用小时数",u:"slides/p06/page.html",g:"第一篇 · 全国市场概况"},
{t:"市场成员规模",u:"slides/p07/page.html",g:"第一篇 · 全国市场概况"},
{t:"市场化交易电量",u:"slides/p08/page.html",g:"第一篇 · 全国市场概况"},
{t:"清洁能源与新能源",u:"slides/p09/page.html",g:"第一篇 · 全国市场概况"},
{t:"绿电绿证与零售",u:"slides/p10/page.html",g:"第一篇 · 全国市场概况"},
{t:"1+6 政策框架",u:"slides/p11/page.html",g:"第二篇 · 政策与成效"},
{t:"政策要点深度解读",u:"slides/p12/page.html",g:"第二篇 · 政策与成效"},
{t:"服务电力保供",u:"slides/p13/page.html",g:"第二篇 · 政策与成效"},
{t:"服务新型电力系统",u:"slides/p14/page.html",g:"第二篇 · 政策与成效"},
{t:"能源资源优化配置",u:"slides/p15/page.html",g:"第二篇 · 政策与成效"},
{t:"促进绿色电力消费",u:"slides/p16/page.html",g:"第二篇 · 政策与成效"},
{t:"绿电绿证市场深度",u:"slides/p17/page.html",g:"第二篇 · 政策与成效"},
{t:"全国统一电力市场",u:"slides/p18/page.html",g:"第三篇 · 市场建设与运营"},
{t:"中长期与现货衔接",u:"slides/p19/page.html",g:"第三篇 · 市场建设与运营"},
{t:"容量与辅助服务",u:"slides/p20/page.html",g:"第三篇 · 市场建设与运营"},
{t:"市场运营与平台",u:"slides/p21/page.html",g:"第三篇 · 市场建设与运营"},
{t:"交易机构规范与平台",u:"slides/p22/page.html",g:"第三篇 · 市场建设与运营"},
{t:"市场服务与党建引领",u:"slides/p23/page.html",g:"第三篇 · 市场建设与运营"},
{t:"全国概况总结",u:"slides/p24/page.html",g:"第三篇 · 市场建设与运营"},
{t:"四川专题封面",u:"slides/p25/page.html",g:"第四篇 · 四川电力专题"},
{t:"四川电力供需格局",u:"slides/p26/page.html",g:"第四篇 · 四川电力专题"},
{t:"水火互济与丰枯调节",u:"slides/p27/page.html",g:"第四篇 · 四川电力专题"},
{t:"四川新能源发展",u:"slides/p28/page.html",g:"第四篇 · 四川电力专题"},
{t:"四川电力市场机制",u:"slides/p29/page.html",g:"第四篇 · 四川电力专题"},
{t:"世运会保供实践",u:"slides/p30/page.html",g:"第四篇 · 四川电力专题"},
{t:"四川电力外送格局",u:"slides/p31/page.html",g:"第四篇 · 四川电力专题"},
{t:"四川储能发展现状",u:"slides/p32/page.html",g:"第四篇 · 四川电力专题"},
{t:"四川专题小结",u:"slides/p33/page.html",g:"第四篇 · 四川电力专题"},
{t:"储能投资策略封面",u:"slides/p34/page.html",g:"第五篇 · 独立储能投资策略"},
{t:"独立储能盈利模型",u:"slides/p35/page.html",g:"第五篇 · 独立储能投资策略"},
{t:"选址策略",u:"slides/p36/page.html",g:"第五篇 · 独立储能投资策略"},
{t:"政策红利与收益增强",u:"slides/p37/page.html",g:"第五篇 · 独立储能投资策略"},
{t:"风险识别与对冲",u:"slides/p38/page.html",g:"第五篇 · 独立储能投资策略"},
{t:"实施路径与行动计划",u:"slides/p39/page.html",g:"第五篇 · 独立储能投资策略"},
{t:"封底",u:"slides/p40/page.html",g:"收尾"}
];
var params=new URLSearchParams(location.search);
function initDeck(){
var frame=document.getElementById("slide-frame");
var counter=document.querySelector(".stage-counter");
var nav=document.querySelector(".sidebar-nav");
var progressFill=document.querySelector(".sidebar-progress-fill");
var state={index:0};
function buildNav(){
var groups={};var order=[];
slides.forEach(function(s,i){
if(!groups[s.g]){groups[s.g]=[];order.push(s.g);}
groups[s.g].push({idx:i,title:s.t});
});
var html="";
order.forEach(function(g){
html+='<div class="nav-group"><div class="nav-group-label">'+g+'</div>';
groups[g].forEach(function(item){
var n=String(item.idx+1).padStart(2,"0");
html+='<div class="nav-item" data-idx="'+item.idx+'"><span class="nav-item-num">'+n+'</span>'+item.title+'</div>';
});
html+='</div>';
});
nav.innerHTML=html;
nav.addEventListener("click",function(e){
var el=e.target.closest(".nav-item");
if(el){jump(Number(el.dataset.idx));}
});
}
function sync(){
var s=slides[state.index];
frame.src=s.u;
if(counter)counter.textContent=String(state.index+1)+" / "+slides.length;
if(progressFill)progressFill.style.width=((state.index+1)/slides.length*100).toFixed(1)+"%";
nav.querySelectorAll(".nav-item").forEach(function(el){
el.classList.toggle("is-active",Number(el.dataset.idx)===state.index);
});
var active=nav.querySelector(".nav-item.is-active");
if(active)active.scrollIntoView({block:"nearest",behavior:"smooth"});
}
function go(step){
var n=Math.max(0,Math.min(slides.length-1,state.index+step));
if(n!==state.index){state.index=n;sync();}
}
function jump(i){
if(i>=0&&i<slides.length&&i!==state.index){state.index=i;sync();}
}
function toggleFS(){
if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(function(){});
else document.exitFullscreen().catch(function(){});
}
document.querySelectorAll("[data-action]").forEach(function(btn){
btn.addEventListener("click",function(){
var a=btn.dataset.action;
if(a==="prev")go(-1);
else if(a==="next")go(1);
else if(a==="fullscreen")toggleFS();
else if(a==="print")window.open(location.pathname+"?print=1&autoprint=1","_blank","noopener");
});
});
window.addEventListener("keydown",function(e){
if(e.defaultPrevented)return;
var tag=document.activeElement?document.activeElement.tagName:"";
if(tag==="INPUT"||tag==="TEXTAREA")return;
if(e.key==="ArrowRight"||e.key==="PageDown"||e.key===" "){e.preventDefault();go(1);}
else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();go(-1);}
else if(e.key==="Home"){e.preventDefault();jump(0);}
else if(e.key==="End"){e.preventDefault();jump(slides.length-1);}
else if(e.key==="f"||e.key==="F"){e.preventDefault();toggleFS();}
});
buildNav();sync();
}
function initCharts(root){
root.querySelectorAll(".chart").forEach(function(node){
var type=node.getAttribute("data-type");
var points=parsePoints(node.getAttribute("data-points"));
if(!points.length)return;
if(type==="bars")renderBars(node,points);
else if(type==="hbars")renderHbars(node,points);
});
}
function parsePoints(input){
return(input||"").split(";").map(function(s){return s.trim();}).filter(Boolean).map(function(s){
var p=s.split(":");var l=p.slice(0,-1).join(":").trim();var v=Number(p[p.length-1]);
return{label:l,value:v};
}).filter(function(d){return!isNaN(d.value);});
}
function renderBars(node,points){
var max=Math.max.apply(null,points.map(function(d){return d.value;}));
node.classList.add("chart-bars");
node.style.setProperty("--cols",String(points.length));
node.innerHTML=points.map(function(d){
var h=max>0?Math.max(8,(d.value/max)*100):0;
return '<div class="chart-bar"><div class="chart-bar-shape" style="height:'+h.toFixed(2)+'%"><div class="chart-bar-value">'+d.value+'</div></div><div class="chart-bar-label">'+d.label+'</div></div>';
}).join("");
}
function renderHbars(node,points){
var max=Math.max.apply(null,points.map(function(d){return d.value;}));
node.classList.add("chart-hbars");
node.innerHTML=points.map(function(d){
var w=max>0?(d.value/max)*100:0;
return '<div class="chart-hbar-row"><div class="chart-hbar-label">'+d.label+'</div><div class="chart-hbar-track"><div class="chart-hbar-fill" style="width:'+w.toFixed(2)+'%"></div></div><div class="chart-hbar-value">'+d.value+'</div></div>';
}).join("");
}
async function initPrintDeck(){
var shell=document.getElementById("print-shell");
document.body.classList.add("is-print-mode");
var parser=new DOMParser();
for(var i=0;i<slides.length;i++){
var r=await fetch(slides[i].u);var html=await r.text();
var doc=parser.parseFromString(html,"text/html");
var slide=doc.querySelector(".slide");if(!slide)continue;
var wrap=document.createElement("article");
wrap.className="print-page";
wrap.appendChild(document.importNode(slide,true));
var ft=document.createElement("div");ft.className="print-footer";
ft.innerHTML='<span>北京电力交易中心 2025年电力市场年报</span><span>'+String(i+1)+' / '+slides.length+'</span>';
wrap.appendChild(ft);shell.appendChild(wrap);
}
initCharts(shell);document.body.classList.add("is-visible");
if(params.get("autoprint")==="1")setTimeout(function(){window.print();},400);
}
function initSlide(){
document.body.classList.remove("is-visible");
requestAnimationFrame(function(){requestAnimationFrame(function(){document.body.classList.add("is-visible");});});
initCharts(document);
}
if(document.body&&document.body.dataset.app==="deck"){
if(params.get("print")==="1")initPrintDeck();else initDeck();
}
if(document.body&&document.body.dataset.app==="slide"){initSlide();}
})();
