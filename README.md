# debotnetinator
Tools to strip your links of unwanted tracking, [https://debotnet.xyz/](https://debotnet.xyz/)

## What's the point?
(Read this at [https://debotnet.xyz/thepoint.html](https://debotnet.xyz/thepoint.html) instead, markdown sucks!)

**Note:** All links shown will have even remotely identifiable information censored.

In the beginning, (about five days ago at time of writing) when this tool was but a twinkle in the eye of a madman, (me) the debotnet-inator was a joke. I went into building this tool for the main reason of removing the unnecessary garbage eBay and other services add to their links, because when those links get shared on other platforms, they clog up chat. I was pretty sure they were using that extra garbage for purposes of tracking, but I had no way to prove it. Then I found it. The link from Hell.

It looked relatively innocuous. `https://letgo.onelink.me/O2PG/<8 character alphanumerical id>`. Obviously shortened from somewhere else, so I went ahead and expanded the link using the urlex mode on the Debotnet-inator. The resulting link was over 430 characters long. 430 characters! No wonder it had been shortened. So I took a closer look at it. Here is the link:

```
https://www.letgo.com/en-us/product/<uuid>?utm_campaign=product-detail-share&utm_medium=copy_link&utm_source=ios_app&position=top&af_sub1=<uuid>&pid=af_app_invites&referrer_af_id=<13-7 numerical id>&af_sub4=top&shortlink=<same 8 character id from short link>&af_sub2=<Name, First Last>&af_referrer_customer_id=<same uuid from &af_sub1>&af_channel=copy_link&af_siteid=ios_app&c=product-detail-share
```

Of course you see the problem. This person's real, actual first and last name was embedded in the link in plain text. All other potentially identifiable information aside, that is a giant security issue if anyone who shares a link through this service, even anyone who shares a link from iOS while signed in, unknowingly gives people their real first and last name just by showing them a listing on LetGo. I've long speculated at being able to find people's accounts through referral IDs in links they share, but this just made it real for me.

I encourage you to use the Debotnet-inator or your brain and a freedom-respecting text editor of your choice to "debotnet" the links you send out, and ask others to do the same. Even if your link doesn't include your first and last name in plain text, it may still be possible for someone to find information about you, such as your account information.

At the time of writing, the person who originally shared this link has contacted LetGo support about these practices. I will update this page if anything comes of that, though I'm sure support will just deflect.