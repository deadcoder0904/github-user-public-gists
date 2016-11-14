function humanReadableDate(date) {
	var year = date.slice(0,4);
	var month = date.slice(5,7);
	var day = date.slice(8,10);
	var hoursmins = date.slice(11,16);

	return day + "/" + month + "/" + year + " @ " + hoursmins ;
}

function handleData(data) {
	console.log(data);
	var username = $("#userid").val();
	var text = "<h1 class='b white tc f1'>User <a class='b blue' target='_blank' href='https://gist.github.com/" 
							+ username + "'>" + username + "</a> has no public gists on Github</h1>";
	if(data.length == 0) {
		$("section").html(text);
	}
	else {
		var section = $("section:first");
		var arr = [];
			
	  arr.push("<h1 class='tc'>");
    arr.push("<a href='https://gist.github.com/deadcoder0904' target='_blank'>" + username + "</a>");
    arr.push("</h1>");
		
	  arr.push("<table align='center' class='collapse ba br2 b--black-90 pv2 ph3'>");
    arr.push("<tbody class='bg-blue pa7 ma3'>");
    arr.push("<tr class='yellow bg-red b pa5'>");
    arr.push("<th class='tr f6 ttu fw6 pv2 ph3'>#</th>");
    arr.push("<th class='pv2 ph2 tl f6 fw6 ttu'>Created At</th>");
    arr.push("<th class='pv2 ph3 tl f6 fw6 ttu'>Description</th>");
    arr.push("</tr>");

		for (var i = 0; i <= data.length - 1; i++) {
			var html_url = data[i].html_url;
			var description = data[i].description || "No Description Provided";
			var created_at = humanReadableDate(data[i].created_at);
		  
      arr.push("<tr class='white b'>");
      arr.push("<td class='pv2 ph3'>" + (i+1) + "</td>");
      arr.push("<td class='pv2 ph2'>" + created_at + "</td>");
			arr.push("<td class='pv2 ph3'>");
			arr.push("<a href='" + html_url + "' class='white' target='_blank'> " + description + "</a>");
			arr.push("</td>");
			arr.push("</tr>");
		}
		arr.push("</tbody>");
    arr.push("</table>");
		section.html(arr.join(''));
	}

}

$(document).ready(function() {
	var submit = $("#form");

	submit.on("submit",function(e) {
		e.preventDefault();
		var username = $("#userid").val();
		if(username !== ""){
			$.ajax({
		  	url: "https://api.github.com/users/" + username + "/gists"
			}).done(function(res) {
		   		handleData(res);
			}).catch(function(err) {
				if(err.statusText == "Not Found") 
					$("section").html("<h1 class='b white tc f1'>User Not Found</h1>");
			});
		}
	});

});