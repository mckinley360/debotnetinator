/*jshint esversion: 10 */
window.onload = function () {
	if ('URLSearchParams' in window) {
		var params = new URLSearchParams(window.location.search);
		if (params.has("url")) {
			document.getElementById("textbox").value = decodeURIComponent(params.get("url"));
		}
	}
};
var ebayID = {}, amazonID = {}, knownLinkTest = {}, decoded = {}, mode = {}, garbage = {};
function process() {
	try {
		var link = document.getElementById("textbox").value;
		var options = document.getElementsByName("mode");
		for (var i = 0; i < options.length; i++) {
			if (options[i].checked) {
				mode = options[i].id;
				break;
			}
		}
		if (document.getElementById("uridecode").checked) {
			link = decodeURIComponent(link);
		}
		switch (mode) {
		case "smart":
			try { knownLinkTest = link.match(/https?:\/\/(?:(?:www\.ebay)|(?:www\.amazon)|(?:youtu)|(?:www\.google))\./)[0]; }
			catch (e) { throw("This domain does not have any special optimizations available."); }
			var tld = link.slice(knownLinkTest.length).match(/^.+?(?=\/)/)[0];
			switch (knownLinkTest) {
			case "https://www.ebay.":
				try { ebayID = link.match(/\d{12}/)[0]; }
				catch (e) { throw("Could not find item ID. Is this link for an eBay item?"); }
				output(knownLinkTest + tld + "/itm/" + ebayID);
				break;
			case "https://www.amazon.":
				try { amazonID = link.match(/\/(?:(?:dp)|(?:product))\/\S{10}/)[0].slice(-10); }
				catch (e) { throw("Could not find item ID. Is this link for an Amazon item?"); }
				output(knownLinkTest + tld + "/dp/" + amazonID);
				break;
			case "https://youtu.":
				output("https://www.youtube.com/watch?v=" + hardTrim(link).slice(-11));
				break;
			case "https://www.google.":
				output(extract(decodeURIComponent(link)));
				break;
			}
		break;

		case "trim":
			output(trim(link));
			break;

		case "hardtrim":
			output(hardTrim(link));
			break;

		case "extract":
			output(extract(link));
			break;

		case "expand":
			var urlex = "https://urlex.org/" + link;
			window.open(urlex, "_blank").focus();
			output(urlex);
			break;

		case "deamp":
			output(link.replace("/amp/","/"));
			break;

		case "uridecodeonly":
			output(decodeURIComponent(link));
			break;

		case "base64decode":
			try { decoded = atob(link); }
			catch (e) { throw("Could not Base64 decode input."); }
			output(decoded);
		}
	} catch (e) { error("Error: " + e); }
}

function extract(link) {
	try { garbage = link.match(/https?:\/\/.+(?=https?)/)[0]; }
	catch (e) { throw("Could not extract link"); }
	return trim(link.slice(garbage.length));
}

function trim(link) {
	try { garbage = link.match(/(&\S+)+$/g).join(""); }
	catch (e) { return link; }
	return link.slice(0, link.length - garbage.length);
}

function hardTrim(link) {
	try { garbage = link.match(/\?\S+(&\S+)*$/g).join(""); }
	catch (e) { return link; }
	return link.slice(0, link.length - garbage.length);
}

function output(newLink) {
	document.getElementById("output").value = newLink;
	document.getElementById("outputLink").href = newLink;
}

function error(message) {
	document.getElementById("output").value = message;
	document.getElementById("outputLink").href = "#";
}