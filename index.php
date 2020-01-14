<?php

/*
IFRAME:
nevideno:<!--style="visibility: hidden; height: 0px; width: 0px;"-->
debug:<!--width=500 height=500 style="left: 50%; top:50%; z-index: 50;"-->
*/

echo <<<index

<HTML>
<HEAD>
<style type="text/css" media="tty"><![CDATA[/*<body>*/]]></style>
<script>
function SetBasic()
{
//GameFrame.HideLang('cz');
//GameFrame.SetChessVari(2);
}
</script>
</HEAD>
<BODY onload="SetBasic()">
<style>
.BASE{POSITION: absolute; }
</style>
<span id="dbt" style="position: absolute; width: 350px; height: 600px;
 left: 0px; top: 0px; overflow: auto;">
</span>
<IFRAME name="GameFrame" id=1 style="position: absolute;PADDING: 0px; MARGIN: 0px; border: 0px; width: 600px; height: 600px; left: 0px;" src=game.html
margin=0 padding=0 border=none scrolling=no>
</BODY>
</HTML>

index;
?>
