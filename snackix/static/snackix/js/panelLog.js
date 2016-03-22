window.logHttpRequest = null

function logPanelInit()
{
    document.getElementById("showLogPanel").addEventListener("click",openLogPanel);
    document.querySelector("div#logPanel>div.close").addEventListener("click",closeLogPanel);

    window.logHttpRequest = new XMLHttpRequest();
    window.logHttpRequest.onreadystatechange =  refreshLogPanel;

}

function refreshLogPanel()
{

    if(window.logHttpRequest.readyState == 4)
    {
	
	if(window.logHttpRequest.status == 200)
	{

	    var data = JSON.parse(window.logHttpRequest.response);
	    
	    for ( d in data )
	    {
		addOneLog(data[d]);
	    }
	}
	else
	{

	}
    }

}

function addOneLog(data)
{

    var divPanel = document.querySelector("div.panel#logPanel>div#logList");
    
    var cont = document.createElement("div");
    
    
    var date = document.createElement("date");
    date.innerHTML = data["date"];
    
    var text = document.createElement("text");
    text.innerHTML = "  " + data["product"]+"  "+data["message"];
    
    cont.appendChild(date);
    cont.appendChild(text);

    divPanel.appendChild(cont);

}

function openLogPanel()
{
    document.getElementById("logPanel").className = "show panel";
    window.logHttpRequest.open('GET','http://127.0.0.1:8000/panel/ajax/log/'+window.currentUser,true);
    window.logHttpRequest.send();

    
}


function closeLogPanel()
{
    document.getElementById("logPanel").className = "hide panel";
    document.querySelector("div.panel#logPanel>div#logList").innerHTML = "";
}

function toogleLogPanel()
{
    var elem = document.getElementById("logPanel");
    if(elem.className.contain("show"))
	closeLogPanel();
    else
	openLogPanel();
    
}
