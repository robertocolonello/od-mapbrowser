var datasets = {};
var commonConfig = {};

function loadDatasets(datasetObj){
	datasets = datasetObj.datasets;
	commonConfig = datasetObj.common;
};

function showObj(obj) {
	for(var p in obj) {
		if (obj.hasOwnProperty(p)){
			if (typeof obj[p] == "object") {
				showObj(obj[p]);
			} 

		}
	}
};

function showDataSources(el, ds) {
	var ulEl = document.createElement("ul");
	ulEl.setAttribute("style", "list-style-type:none");
	for(var item in ds) {
		if (ds.hasOwnProperty(item)){
			let itemEl = document.createElement("li");
			let inpEl = document.createElement("input");
			inpEl.setAttribute("type", "checkbox")
			inpEl.setAttribute("name", "dataset");
			itemEl.setAttribute("style", "background-color: rgb(" + ds[item].color + ");");
			inpEl.setAttribute("value", item);
			itemEl.appendChild(inpEl);
			itemEl.appendChild(document.createTextNode(item));
			ulEl.appendChild(itemEl);
		}
	}

	el.appendChild(ulEl);
};

function GetSelected(id) {

    //Reference the Table.
    var tblFruits = document.getElementById(id);
    if (tblFruits == null) {
    	return false;
    }

    //Reference all the CheckBoxes in Table.
    var chks = tblFruits.getElementsByTagName("input");
		var callParameters = {};
    // Loop and push the checked CheckBox value in Array.
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
        	let params = datasets[chks[i].value];
        	params["url"] = commonConfig["url"];
        	callParameters[chks[i].value] = datasets[chks[i].value];
        }
    }

    //Display the selected CheckBox values.
    if (Object.keys(callParameters).length > 0) {
	    var urlDt = new Array();
	    var i=0;
	    for (var key in callParameters) {
		    var dataSrcUrl = callParameters[key].url + key;
		    var dataSource = {
			     data: dataSrcUrl, 
                 detail: dataSrcUrl + "/",
                 name: callParameters[key].name,
                 color: callParameters[key].color
		    };			urlDt[i] = dataSource;
			i++;
	    }
	    gmData.urlData = urlDt;
        
    }
};
