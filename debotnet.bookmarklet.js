/*jshint esversion: 10 */

var id = {}, knownLinkTest = {}, decoded = {}, mode = {}, garbage = {};
var utmSource = ['share', 'google', 'blog', 'Twitter', 'facebook', ], utmMedium = ['organic', 'cpc', 'email', 'social', 'banner', 'cpa', 'android_app', 'ios_app'], utmCampaign = ['events', 'share', 'Google'];

function bookmarklettojs() {
	var qargs = {
		"uridecode":false,
		"fakeutm":false
	};
	var link = prompt("enter link:");
	var mode = prompt("mode (sm(art), tr(im), h(ard)tr(im), ext(ract), exp(and), (de)amp, uri(decodeonly), b(ase)64(decode))");
	var modalconvert = {"sm":"smart","tr":"trim","htr":"hardtrim","ext":"extract","exp":"expand","amp":"deamp","uri":"uridecodeonly","b64":"base64decode"};
	mode = modalconvert[mode];
	var checks = Object.keys(qargs);
	for (var i = 0; i < checks.length; i++) {
		qargs[checks[i]] = confirm(checks[i]);
	}
	process(link, mode, qargs);
}

function process(link, mode, qargs) {
	try {
		if (qargs.uridecode) { link = decodeURIComponent(link); }
		switch (mode) {
		case "smart":
			try { knownLinkTest = link.match(/https?:\/\/(?:(?:www\.ebay)|(?:www\.amazon)|(?:youtu)|(?:www\.google))\./)[0]; }
			catch (e) { throw("This domain does not have any special optimizations available."); }
			var tld = link.slice(knownLinkTest.length).match(/^.+?(?=\/)/)[0];
			switch (knownLinkTest) {
			case "https://www.ebay.":
				try { id = link.match(/\d{12}/)[0]; }
				catch (e) { throw("Could not find item ID. Is this link for an eBay item?"); }
				output(knownLinkTest + tld + "/itm/" + id, qargs);
				break;
			case "https://www.amazon.":
				try { id = link.match(/\/(?:(?:dp)|(?:product))\/\S{10}/)[0].slice(-10); }
				catch (e) { throw("Could not find item ID. Is this link for an Amazon item?"); }
				output(knownLinkTest + tld + "/dp/" + id, qargs);
				break;
			case "https://youtu.":
				output("https://www.youtube.com/watch?v=" + hardTrim(link).slice(-11), qargs);
				break;
			case "https://www.google.":
				if (link.match(/\/amp\/s\//)) {
					garbage = link.match(/https:\/\/www\.google\.[\w\.]+\/amp\/s\//)[0];
					output(deAmp(decodeURIComponent("http://" + link.slice(garbage.length))), qargs);
				} else if (link.match(/\/url/)) {
					output(extract(decodeURIComponent(link)), qargs);
				} else { error("Smart Mode supports /amp and /url directories for Google only."); }
				break;
			}
		break;

		case "trim":
			output(trim(link), qargs);
			break;

		case "hardtrim":
			output(hardTrim(link), qargs);
			break;

		case "extract":
			output(extract(link), qargs);
			break;

		case "expand":
			var urlex = "https://urlex.org/" + link;
			window.open(urlex, "_blank").focus();
			output(urlex, qargs);
			break;

		case "deamp":
			output(deAmp(link), qargs);
			break;

		case "uridecodeonly":
			output(decodeURIComponent(link), qargs);
			break;

		case "base64decode":
			try { decoded = atob(link); }
			catch (e) { throw("Could not Base64 decode input."); }
			output(decoded, qargs);
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

function deAmp(link) {
	return link.replace(/\/(platform\/)?amp\/?/,"/");
}

function output(newLink, qargs) {
	if (qargs.fakeutm) {
		newLink = newLink + "?utm_source=" + sample(utmSource) + "&utm_medium=" + sample(utmMedium) + "&utm_campaign=" + sample(utmCampaign);
	}
	alert(newLink);
}

function error(message) {
	alert(message);
}


function sample(array) {
	return array[Math.floor(Math.random() * array.length)];
}

bookmarklettojs();
