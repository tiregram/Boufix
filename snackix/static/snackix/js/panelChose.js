function panelInit()
{
    httpRequestPanel = new XMLHttpRequest();
    httpRequestPanel.onreadystatechange = setProductDispo;
    httpRequestPanel.open('GET','http://127.0.0.1:8000/panel/ajax/product/all');
    httpRequestPanel.send();
    
    var buttonPanelSub = document.getElementById("buttonPanelSub");
    
    buttonPanelSub.addEventListener("click",
				    function(event)
				    {
					var range= document.getElementById("rangeSub");
					httpRequestPanel.onreadystatechange = refrechMember;
					httpRequestPanel.open('GET','http://127.0.0.1:8000/panel/sub/'+window.currentUser+'/'+range.value);
					httpRequestPanel.send();
					panelClose();
				    }
				   );

    var buttonPanelAdd = document.getElementById("buttonPanelAdd");

    buttonPanelAdd.addEventListener("click",
				    function(event)
				    {
					var range= document.getElementById("rangeAdd");
					httpRequestPanel.onreadystatechange = refrechMember;
					httpRequestPanel.open('GET','http://127.0.0.1:8000/panel/add/'+window.currentUser+'/'+range.value);
					httpRequestPanel.send();
					panelClose();
				    }
				   );
    
    var buttonPanelClose = document.getElementById("closePanel");
    console.log(buttonPanelClose);
    
    buttonPanelClose.addEventListener(
	"click",
	panelClose
    );
}

function setProductDispo(request)
{

    
    
    if(httpRequestPanel.readyState == 4)
    {
	if(httpRequestPanel.status == 200)
	{
	    var data = JSON.parse(request.currentTarget.responseText);
	    var conener = document.getElementsByClassName("choses")[0];
	    for(var oneProductIndice in data)
	    {
		var oneProduct = data[oneProductIndice].fields;
		var elem = document.createElement("div");
		elem.innerHTML = oneProduct.name;

		elem.className = "chose";
		
		elem.id = oneProduct.name;
		elem.style["background-image"]="url(\"/"+oneProduct.image+"\")";

		elem.addEventListener("click",aplyProduct);
		
		conener.appendChild(elem);

		
	    }
	}
    }
}

function panelClose()
{
    var panel  = document.getElementById("panelChose");
    panel.className = panel.className.replace("show","hide");   
}

function panelOpen()
{
    var panel  = document.getElementById("panelChose");
    panel.className = panel.className.replace("hide","show");
}


function panelOpenForUser(request)
{
    if(httpRequest.readyState == 4)
    {
	if(httpRequest.status == 200)
	{
	    
	    document.getElementById("rangeAdd").value =1;
	    document.getElementById("rangeSub").value =1;
	    document.getElementById("outAdd").value =1;
	    document.getElementById("outSub").value =1;


	    var data = JSON.parse(request.currentTarget.responseText)[0].fields;
	    window.currentUser = data.name;	    
	    var panel = document.getElementById("panelChose");
	    
	    var namePanel = panel.getElementsByClassName("name")[0];
	    namePanel.innerHTML = data.name;
	    
	    var value = panel.getElementsByClassName("value")[0];
	    value.innerHTML = data.value;
	    
	}
    }
}

window.currentUser=null;

function aplyProduct(elem)
{
    if(window.currentUser != null ){
	httpRequest.onreadystatechange = refrechMember;
	console.log(elem.target);
	httpRequest.open('GET','http://127.0.0.1:8000/panel/aply/'+window.currentUser+'/'+elem.target.id);
	httpRequest.send();
	panelClose();
    }
}


function askForshowMyLog()
{
    if(window.currentUser != null ){
	httpRequest.onreadystatechange = refrechMember;
	console.log(elem.target);
	httpRequest.open('GET','http://127.0.0.1:8000/panel/aply/'+window.currentUser+'/'+elem.target.id);
	httpRequest.send();

    }
}

function displayMyLog()
{
 
    if(httpRequest.readyState == 4)
    {
	if(httpRequest.status == 200)
	{
	    openLog();	    
	}
    }
    
}


function openLog()
{

}

function closeLog()
{

}
