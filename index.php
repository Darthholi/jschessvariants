<?php
echo <<<index

<HTML>
<HEAD>
<style type="text/css" media="tty"><![CDATA[/*<body>*/]]></style>
<script>

/*
This work is distributed under a kind acknowledgement of the original author of the chess engine, TSCP, and so remains under a copyright (2019) by Tom Kerrigan.
For more detail see http://www.tckerrigan.com/Chess/TSCP/
*/

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
