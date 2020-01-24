/*

This work is distributed under a kind acknowledgement of the original author of the chess engine, TSCP, and so remains under a copyright (2019) by Tom Kerrigan.
For more detail see http://www.tckerrigan.com/Chess/TSCP/

*/


function SMove()
{
  this.From=0;
  this.To=0;
	this.Morph=0;
  this.Score=0;
};
function HMove()
{
  this.From=0;
  this.To=0;
	this.Morph=0;
  this.Capture=0;
  this.Castle=0;
	this.EP=0;
	this.Fifty=0;
	this.Hash=-1;
};
function SrchElement()
{
  this.alpha=0;
  this.beta=10000;
  this.depth=0;
  this.i=-1;
  this.check=false;
  this.fdid=false;
};

function TBoard()
{
  this.UnitVal=new Array(100, 300, 300, 500, 900, 0);
  this.UnitValCS = new Array(100, 200, 400, 500, 300, 0);
  this.IndexPS=new Array(0,1,2,255,255,3);
  this.UnitSquare=new Array(4);
  this.UnitSquare[0]=new Array(
	  0,   0,   0,   0,   0,   0,   0,   0,
	  5,  10,  15,  20,  20,  15,  10,   5,
	  4,   8,  12,  16,  16,  12,   8,   4,
		3,   6,   9,  12,  12,   9,   6,   3,
	  2,   4,   6,   8,   8,   6,   4,   2,
	  1,   2,   3, -10, -10,   3,   2,   1,
	  0,   0,   0, -40, -40,   0,   0,   0,
	  0,   0,   0,   0,   0,   0,   0,   0
  );
  this.UnitSquare[1]=new Array(
	-10, -10, -10, -10, -10, -10, -10, -10,
	-10,   0,   0,   0,   0,   0,   0, -10,
	-10,   0,   5,   5,   5,   5,   0, -10,
	-10,   0,   5,  10,  10,   5,   0, -10,
	-10,   0,   5,  10,  10,   5,   0, -10,
	-10,   0,   5,   5,   5,   5,   0, -10,
	-10,   0,   0,   0,   0,   0,   0, -10,
	-10, -30, -10, -10, -10, -10, -30, -10
  );
  this.UnitSquare[2]=new Array(
	-10, -10, -10, -10, -10, -10, -10, -10,
	-10,   0,   0,   0,   0,   0,   0, -10,
	-10,   0,   5,   5,   5,   5,   0, -10,
	-10,   0,   5,  10,  10,   5,   0, -10,
	-10,   0,   5,  10,  10,   5,   0, -10,
	-10,   0,   5,   5,   5,   5,   0, -10,
	-10,   0,   0,   0,   0,   0,   0, -10,
	-10, -10, -20, -10, -10, -20, -10, -10
  );
  this.UnitSquare[3]=new Array(
	-40, -40, -40, -40, -40, -40, -40, -40,
	-40, -40, -40, -40, -40, -40, -40, -40,
	-40, -40, -40, -40, -40, -40, -40, -40,
	-40, -40, -40, -40, -40, -40, -40, -40,
	-40, -40, -40, -40, -40, -40, -40, -40,
	-40, -40, -40, -40, -40, -40, -40, -40,
	-20, -20, -20, -20, -20, -20, -20, -20,
	  0,  20,  40, -20,   0, -20,  40,  20
  );
  this.KingEndUS=new Array(
	  0,  10,  20,  30,  30,  20,  10,   0,
	 10,  20,  30,  40,  40,  30,  20,  10,
	 20,  30,  40,  50,  50,  40,  30,  20,
	 30,  40,  50,  60,  60,  50,  40,  30,
	 30,  40,  50,  60,  60,  50,  40,  30,
	 20,  30,  40,  50,  50,  40,  30,  20,
	 10,  20,  30,  40,  40,  30,  20,  10,
	  0,  10,  20,  30,  30,  20,  10,   0
  );
  this.flip=new Array(
	 56,  57,  58,  59,  60,  61,  62,  63,
	 48,  49,  50,  51,  52,  53,  54,  55,
	 40,  41,  42,  43,  44,  45,  46,  47,
	 32,  33,  34,  35,  36,  37,  38,  39,
	 24,  25,  26,  27,  28,  29,  30,  31,
	 16,  17,  18,  19,  20,  21,  22,  23,
	  8,   9,  10,  11,  12,  13,  14,  15,
	  0,   1,   2,   3,   4,   5,   6,   7
  );
  this.BoardB=new Array(
	 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	 -1,  0,  1,  2,  3,  4,  5,  6,  7, -1,
	 -1,  8,  9, 10, 11, 12, 13, 14, 15, -1,
	 -1, 16, 17, 18, 19, 20, 21, 22, 23, -1,
	 -1, 24, 25, 26, 27, 28, 29, 30, 31, -1,
	 -1, 32, 33, 34, 35, 36, 37, 38, 39, -1,
	 -1, 40, 41, 42, 43, 44, 45, 46, 47, -1,
	 -1, 48, 49, 50, 51, 52, 53, 54, 55, -1,
	 -1, 56, 57, 58, 59, 60, 61, 62, 63, -1,
	 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
  );
  this.IDBoardB=new Array(
	21, 22, 23, 24, 25, 26, 27, 28,
	31, 32, 33, 34, 35, 36, 37, 38,
	41, 42, 43, 44, 45, 46, 47, 48,
	51, 52, 53, 54, 55, 56, 57, 58,
	61, 62, 63, 64, 65, 66, 67, 68,
	71, 72, 73, 74, 75, 76, 77, 78,
	81, 82, 83, 84, 85, 86, 87, 88,
	91, 92, 93, 94, 95, 96, 97, 98
  );
  this.ForwardM=new Array(false, false, true, true, true, false);
  this.OneStepStop=new Array(false,
  false,false,false,false,false,false,false,false,false,
  false,false,false,false,false,
  false,false,false,false,true,true,true,true,
  false,false,false,false,false,false,false,false,false);

  this.DirStart=new Array(0, 1, 10, 15, 24, 24);
  this.Dirs=new Array(
	 0,
	 -21, -19, -12, -8, 8, 12, 19, 21,0,
	 -11, -9, 9, 11, 0,
	 -10, -1, 1, 10, -11, -9, 9, 11, 0,//upraveno
	 -11, -10, -9, -1, 1, 9, 10, 11,0
  );
  this.castle_mask=new Array(
	 7, 15, 15, 15,  3, 15, 15, 11,
	15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15,
	13, 15, 15, 15, 12, 15, 15, 14
  );
  this.piece_char=new Array(	'P', 'N', 'B', 'R', 'Q', 'K');
  this.StartColors=new Array(
	1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0
  );
  this.StartUnits=new Array(
	3, 1, 2, 4, 5, 2, 1, 3,
	0, 0, 0, 0, 0, 0, 0, 0,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	0, 0, 0, 0, 0, 0, 0, 0,
	3, 1, 2, 4, 5, 2, 1, 3
  );
  this.StartUnitsPC=new Array(
	3, 1, 2, 4, 5, 2, 1, 3,
	0, 0, 0, 0, 0, 0, 0, 0,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	0, 0, 0, 0, 0, 0, 0, 0,
	3, 1, 2, 4, 5, 2, 1, 3
);
//CUBIC SHOGI
  this.ShStartColors = new Array(
	6, 1, 1, 1, 1, 1, 1, 6,
	6, 1, 6, 6, 6, 6, 1, 6,
        1, 1, 1, 1, 1, 1, 1, 1,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
        0, 0, 0, 0, 0, 0, 0, 0,
	6, 0, 6, 6, 6, 6, 0, 6,
	6, 0, 0, 0, 0, 0, 0, 6
);
  this.ShStartUnits = new Array(
	6, 1, 2, 4, 5, 4, 1, 6,
	6, 3, 6, 6, 6, 6, 2, 6,
  0, 0, 0, 0, 0, 0, 0, 0,
	6, 6, 6, 6, 6, 6, 6, 6,
	6, 6, 6, 6, 6, 6, 6, 6,
	0, 0, 0, 0, 0, 0, 0, 0,
	6, 2, 6, 6, 6, 6, 3, 6,
	6, 1, 4, 5, 4, 2, 1, 6
);


  this.GEN_STACK=112000;
  this.MAX_PLY=32;
  this.HIST_STACK=400;
  this.LIGHT=0;
  this.DARK=1;

  this.PAWN=0;
  this.KNIGHT=1;
  this.BISHOP=2;
  this.ROOK=3;
  this.QUEEN=4;
  this.KING=5;
  this.EMPTY=6;

  this.A1=56;
  this.B1=57;
  this.C1=58;
  this.D1=59;
  this.E1=60;
  this.F1=61;
  this.G1=62;
  this.H1=63;
  this.A8=0;
  this.B8=1;
  this.C8=2;
  this.D8=3;
  this.E8=4;
  this.F8=5;
  this.G8=6;
  this.H8=7;

  this.ROW=function(x)
  {
    return (Math.floor(x/8));
  };
  this.COL=function(x)
  {
    return (x%8);
  };
  this.DOUBLED_PAWN_PENALTY=10;
  this.ISOLATED_PAWN_PENALTY=20;
  this.BACKWARDS_PAWN_PENALTY=8;
  this.PASSED_PAWN_BONUS=20;
  this.ROOK_SEMI_OPEN_FILE_BONUS=10;
  this.ROOK_OPEN_FILE_BONUS=15;
  this.ROOK_ON_SEVENTH_BONUS=20;



  this.PRank=new Array(2);
  this.PRank[0]=new Array(10);
  this.PRank[1]=new Array(10);
  this.PieceM=new Array(2);
	this.PawnM=new Array(2);
  this.ChessVari=2;//0-KS,1-EC,2-PC,3-HC,55-?,4-Butterflychess,7-cshogi
  this.ECZone=7;
  this.Color=new Array(64);
  this.Unit=new Array(64);
  this.Side= this.LIGHT;
  this.XSide= this.DARK;
  this.Castle = 15;
  this.EP= 255;
  this.Fifty = 0;
  this.SPly= 0;
  this.HPly = 0;
  this.Grave=new Array(2);
  this.Grave[0]=new Array(6);
  this.Grave[1]=new Array(6);
  this.Moves=new Array(this.GEN_STACK);
  for (var i=0;i<this.GEN_STACK;i++)
  {
    this.Moves[i]=new SMove();
  }
  this.FMoveI=new Array(this.MAX_PLY);
  this.BoardHist=new Array(64);
  for (var i=0;i<64;i++)
  {
    this.BoardHist[i]=new Array(64);
    for (var j=0;j<64;j++)
    {
      this.BoardHist[i][j]=0;
    }
  }
  this.History=new Array(this.HIST_STACK);
  for (var i=0;i<this.HIST_STACK;i++)
  {
    this.History[i]=new HMove();
  }
  this.MaxTime=30000;
  this.MaxDepth=4;
  this.StartTime=0;
  this.StopTime=0;
  this.Nodes=0;
  this.PriVari=new Array(this.MAX_PLY);
  for (var i=0;i<this.MAX_PLY;i++)
    this.PriVari[i]=new Array(this.MAX_PLY);
  for (var i=0;i<this.MAX_PLY;i++)
    for (var j=0;j<this.MAX_PLY;j++)
      this.PriVari[i][j]=new SMove();

  this.SrchStack=new Array(this.MAX_PLY+1);
  for (var i=0;i<this.MAX_PLY+1;i++)
  {
    this.SrchStack[i]=new SrchElement();
  }



  this.PVLen=new Array(this.MAX_PLY);
  this.FollowPV=true;
  this.HSide=0;
  this.HEP=new Array(64);

//---------------------------------------------------------------------------
this.move_str=function(M)
{
  var xa=8 - this.ROW(M.From);
  var xb=8 - this.ROW(M.To);
  var str=String.fromCharCode(this.COL(M.From)+97)+""+
  xa+""+String.fromCharCode(this.COL(M.To)+97)+""+xb;
	return str;
};
//---------------------------------------------------------------------------
this.InCheck=function(s)
{
  for (var i = 0; i < 64; i++)
  {
		if (this.Unit[i] == this.KING && this.Color[i] == s)
			return this.Attack(i, s ^ 1);
  }
	return true;
};
//---------------------------------------------------------------------------
this.Attack=function(sq,s)
{
	for (var i = 0; i < 64; i++)
	{
		if (this.Color[i] == s)
		{
      if (this.ChessVari==7)//cubicShogi
      {
        switch (this.Unit[i])
        {
          case this.PAWN:
          {
            if (s==this.LIGHT)
            {
              if (sq== i - 8) return true;
            }
            else
            {
              if (sq== i + 8) return true;
            }
            continue;
          }
        break;
          case this.QUEEN:
          {
            if (this.COL(i)<7 && sq== i + 1) return true;
            if (this.COL(i)>0 && sq== i - 1) return true;
            if (this.ROW(i)>0 && sq== i - 8) return true;
            if (this.ROW(i)<7 && sq== i + 8) return true;

            if (s==this.LIGHT)
            {
              if (this.ROW(i)>0 && this.COL(i)<7 && sq== i - 7) return true;
              if (this.ROW(i)>0 && this.COL(i)>0 && sq== i - 9) return true;
            }
            else
            {
              if (this.ROW(i)<7 && this.COL(i)>0 && sq== i + 7) return true;
              if (this.ROW(i)<7 && this.COL(i)<7 && sq== i + 9) return true;
            }
            continue;
          }
        break;
          case this.KNIGHT:
          {
            if (s==this.LIGHT)
            {
              if (this.COL(i)>=1) if (sq==i-17) return true;
              //if (this.COL(i)>=2) if (sq==i-10) return true;
              if (this.COL(i)<=6) if (sq==i-15) return true;
              //if (this.COL(i)<=5) if (sq==i-6) return true;
              if (this.COL(i)<=6) if (sq==i+1) return true;
              if (this.COL(i)>=1) if (sq==i-1) return true;
            }
            else
            {
              if (this.COL(i)<=6) if (sq==i+17) return true;
              //if (this.COL(i)<=5) if (sq==i+10) return true;
              if (this.COL(i)>=1) if (sq==i+15) return true;
              //if (this.COL(i)>=2) if (sq==i+6) return true;
              if (this.COL(i)<=6) if (sq==i+1) return true;
              if (this.COL(i)>=1) if (sq==i-1) return true;
            }
            continue;
          }
        break;
          case this.BISHOP:
          {
            if (s==this.LIGHT)
            {
              if (this.ROW(i)<=2)
              {
                if (this.COL(i)<=6 && sq==i+1) return true;
                if (this.COL(i)>=1 && sq==i-1) return true;
                if (this.ROW(i)>=1 && sq==i-8) return true;
                if (sq==i+8) return true;
              }
            }
            else
            {
              if (this.ROW(i)>=5)
              {
                if (this.COL(i)<=6 && sq==i+1) return true;
                if (this.COL(i)>=1 && sq==i-1) return true;
                if (this.ROW(i)<=6 && sq==i+8) return true;
                if (sq==i-8) return true;
              }
            }
            //continue;+normalni
          }
        break;
          case this.ROOK:
          {
            if (s==this.LIGHT)
            {
              if (this.ROW(i)<=0)
              {
                //if (this.COL(i)<=6 && this.ROW(i)>=1) NewMov(i,i-7);
                if (this.COL(i)<=6 && sq==i+9) return true;
                //if (COL(i)>=1 && ROW(i)>=1) NewMov(i,i-9);
                if (this.COL(i)>=1 && sq==i+7) return true;
              }
              if (this.ROW(i)<=2)
              {
                if (this.COL(i)<=6 && this.ROW(i)>=1 && sq==i-7) return true;
                //if (COL(i)<=6) NewMov(i,i+9);
                if (this.COL(i)>=1 && this.ROW(i)>=1 && sq==i-9) return true;
                //if (COL(i)>=1) NewMov(i,i+7);
              }
            }
            else
            {
              if (this.ROW(i)>=7)
              {
                if (this.COL(i)<=6 && sq==i-7) return true;
                //if (COL(i)<=6 && ROW(i)<=6) NewMov(i,i+9);
                if (this.COL(i)>=1 && sq==i-9) return true;
                //if (COL(i)>=1  && ROW(i)<=6) NewMov(i,i+7);
              }
              if (this.ROW(i)>=5)
              {
                //if (COL(i)<=6) NewMov(i,i-7);
                if (this.COL(i)<=6 && this.ROW(i)<=6 && sq==i+9) return true;
                //if (COL(i)>=1) NewMov(i,i-9);
                if (this.COL(i)>=1  && this.ROW(i)<=6 && sq==i+7) return true;
              }
            }
            //continue;+normalni
          }
        break;
        }

      }
			if (this.Unit[i] == this.PAWN)
			{
				if (s == this.LIGHT)
				{
					if (this.COL(i) != 0 && i - 9 == sq)
						return true;
					if (this.COL(i) != 7 && i - 7 == sq)
						return true;
				}
				else
				{
					if (this.COL(i) != 0 && i + 7 == sq)
						return true;
					if (this.COL(i) != 7 && i + 9 == sq)
						return true;
				}
			}
			else
      {
        var j=this.DirStart[this.Unit[i]];
				while (this.Dirs[j]!=0)
				{
					for (var n = i;;)
					{
						n = this.BoardB[this.IDBoardB[n] + this.Dirs[j]];
						if (n == -1)
							break;
						if (n == sq)
							return true;
						if (this.Color[n] != this.EMPTY)
            {
              //butterflychess
              if (this.ChessVari==4 && (this.Unit[i]==this.QUEEN || this.Unit[i]==this.BISHOP || this.Unit[i]==this.ROOK))
              {
                var newn = this.BoardB[this.IDBoardB[n] + this.Dirs[j]];
                //if ( ((this.ROW(n)==1)? ( (this.ROW(newn)==((s==this.LIGHT)?2:0)) || (this.ROW(newn)==1) ) : true) &&
                //     ((this.ROW(n)==6)? ( (this.ROW(newn)==((s==this.LIGHT)?7:5)) || (this.ROW(newn)==6) ) : true)  )
		if ((this.ROW(n)>1) && (this.ROW(n)<6))//NOVA PODMINKA pouze STANDART a nesmi se skakat prez prvni a posledni radu
                {
                if (newn != -1 && (newn==sq))
                  return true;
                }
              }
              //end butterflychess

							break;
            }
            if ((!this.ForwardM[this.Unit[i]] || (this.ChessVari==55 && this.OneStepStop[j])))
              break;
					}
          j++;
          if (this.ChessVari!=55 && this.OneStepStop[j])
            break;
        }
      }
		}
	}
	return false;
};
//---------------------------------------------------------------------------
this.GenMov=function(Caps)
{
	this.FMoveI[this.SPly + 1] = this.FMoveI[this.SPly];

  for (var i = 0; i < 64; ++i)
  {
    if (this.Color[i] == this.XSide) continue;
    if (this.ChessVari==7 && !Caps && this.Color[i] == this.EMPTY)//cubicShogi
    {
    	for (var c=this.PAWN; c <= this.QUEEN; ++c)
      {
        if (this.Grave[this.Side][c]<=0) continue;
        //if ((c==this.PAWN /*|| c==this.KNIGHT || c==this.BISHOP*/) && (this.Side==this.LIGHT ? this.ROW(i)<=1 : this.ROW(i)>=6)) continue;
        if (c==this.PAWN)
        {
          var xnxt=true;
          for (var y=0;y<8 && xnxt;y++)
          {
            if (this.Unit[this.COL(i)+8*y]==this.PAWN)
            {
              if (this.Color[this.COL(i)+8*y]==this.Side || ((this.Side==this.LIGHT)?(y>this.ROW(i)):(y<this.ROW(i)))) xnxt=false;
            }
          }
          if (!xnxt) continue;
        }

        var NewInd=this.FMoveI[this.SPly + 1];
        this.FMoveI[this.SPly + 1]+=1;
        this.Moves[NewInd].From = i;
        this.Moves[NewInd].To = i;
        this.Moves[NewInd].Morph = c;
	this.Moves[NewInd].Score = 100 + (c * 10);

       }
    }
    if (this.Color[i] != this.Side)
	    continue;

    if (this.ChessVari==7)//cubicShogi
    {
      switch (this.Unit[i])
      {
        case this.PAWN:
        {
          if (this.Side==this.LIGHT)
            this.GoMov(i, i - 8);//, 17);
          else
            this.GoMov(i, i  + 8);//, 17);
          continue;
        }
      break;
        case this.QUEEN:
        {
          if (this.COL(i)<7) this.GoMov(i, i + 1);//vpravo
          if (this.COL(i)>0) this.GoMov(i, i - 1);//vlevo
          if (this.ROW(i)>0) this.GoMov(i, i - 8);//dopredu
          if (this.ROW(i)<7) this.GoMov(i, i + 8);//dozadu

          if (this.Side==this.LIGHT)
          {
            if (this.ROW(i)>0 && this.COL(i)<7) this.GoMov(i, i - 7);//sikmo dopredu vpravo
            if (this.ROW(i)>0 && this.COL(i)>0) this.GoMov(i, i - 9);//s d vlevo
          }
          else
          {
            if (this.ROW(i)<7 && this.COL(i)>0) this.GoMov(i, i + 7);//sikmo dopredu vpravo
            if (this.ROW(i)<7 && this.COL(i)<7) this.GoMov(i, i + 9);//s d vlevo
          }
          continue;
        }
      break;
        case this.KNIGHT:
        {
          if (this.Side==this.LIGHT)
          {
            if (this.COL(i)>=1) this.GoMov(i,i-17);
            //if (COL(i)>=2) this.GoMov(i,i-10);
            if (this.COL(i)<=6) this.GoMov(i,i-15);
            //if (COL(i)<=5) this.GoMov(i,i-6);
            if (this.COL(i)<=6) this.GoMov(i,i+1);
            if (this.COL(i)>=1) this.GoMov(i,i-1);
          }
          else
          {
            if (this.COL(i)<=6) this.GoMov(i,i+17);
            //if (COL(i)<=5) this.GoMov(i,i+10);
            if (this.COL(i)>=1) this.GoMov(i,i+15);
            //if (COL(i)>=2) this.GoMov(i,i+6);
            if (this.COL(i)<=6) this.GoMov(i,i+1);
            if (this.COL(i)>=1) this.GoMov(i,i-1);
          }
          continue;
        }
      break;
      case this.BISHOP:
        {
          if (this.Side==this.LIGHT)
          {
            if (this.ROW(i)<=2)
            {
              if (this.COL(i)<=6) this.GoMov(i,i+1);
              if (this.COL(i)>=1) this.GoMov(i,i-1);
              if (this.ROW(i)>=1) this.GoMov(i,i-8);
              if (this.ROW(i)<=1) this.GoMov(i,i+8);
            }
          }
          else
          {
            if (this.ROW(i)>=5)
            {
              if (this.COL(i)<=6) this.GoMov(i,i+1);
              if (this.COL(i)>=1) this.GoMov(i,i-1);
              if (this.ROW(i)<=6) this.GoMov(i,i+8);
              if (this.ROW(i)>=6) this.GoMov(i,i-8);
            }
          }
          //continue;+normalni
        }
      break;
      case this.ROOK:
        {
          if (this.Side==this.LIGHT)
          {
            if (this.ROW(i)<=1)
            {
              //if (COL(i)<=6 && ROW(i)>=1) GoMov(i,i-7);
              if (this.COL(i)<=6) this.GoMov(i,i+9);
              //if (COL(i)>=1 && ROW(i)>=1) GoMov(i,i-9);
              if (this.COL(i)>=1) this.GoMov(i,i+7);
            }
            if (this.ROW(i)<=2)
            {
              if (this.COL(i)<=6 && this.ROW(i)>=1) this.GoMov(i,i-7);
              //if (COL(i)<=6) NewMov(i,i+9);
              if (this.COL(i)>=1 && this.ROW(i)>=1) this.GoMov(i,i-9);
              //if (COL(i)>=1) NewMov(i,i+7);
            }
          }
          else
          {
            if (this.ROW(i)>=6)
            {
              if (this.COL(i)<=6) this.GoMov(i,i-7);
              //if (COL(i)<=6 && ROW(i)<=6) GoMov(i,i+9);
              if (this.COL(i)>=1) this.GoMov(i,i-9);
              //if (COL(i)>=1  && ROW(i)<=6) GoMov(i,i+7);
            }
            if (this.ROW(i)>=5)
            {
              //if (COL(i)<=6) GoMov(i,i-7);
              if (this.COL(i)<=6 && this.ROW(i)<=6) this.GoMov(i,i+9);
              //if (COL(i)>=1) GoMov(i,i-9);
              if (this.COL(i)>=1  && this.ROW(i)<=6) this.GoMov(i,i+7);
            }
          }
          //continue;+normalni
        }
      break;
      }

    }

    if (!Caps && ((this.ChessVari==0 && this.Unit[i] == this.PAWN) || (this.ChessVari==3 && this.Unit[i] != this.KING /*&& !this.Attack(i,this.XSide)*/)))
    { //generovani morfovacich tahu
      var c;
      if (this.ChessVari==0)
        c = this.KNIGHT;
      else
      {
        c=this.PAWN;
        if (this.Attack(i,this.XSide))
          c=this.KNIGHT;
      }

      for (; c <= this.QUEEN; ++c)
      {
        if (this.Grave[this.XSide][c]<=0) continue;
        if (this.ChessVari==3 && c-this.Unit[i]==0) continue;
        var NewInd=this.FMoveI[this.SPly + 1];
        this.FMoveI[this.SPly + 1]+=1;
        this.Moves[NewInd].From = i;
        this.Moves[NewInd].To = i;
        this.Moves[NewInd].Morph = c-this.Unit[i];
        if (this.ChessVari==0)
          this.Moves[NewInd].Score = 1000000 + (c * 10);
        else
        {
          if (c==this.PAWN || this.Unit[i]==this.PAWN)
            this.Moves[NewInd].Score = 1000000 + (c*10);
          else
            this.Moves[NewInd].Score = 1000000 + (c-this.Unit[i])*10;
        }
      }
    }

    if (this.Unit[i] == this.PAWN)
    {

      if (this.Side == this.LIGHT)
      {
        if (this.COL(i) != 0 && this.Color[i - 9] == this.DARK)
          this.NewMov(i, i - 9);
        if (this.COL(i) != 7 && this.Color[i - 7] == this.DARK)
          this.NewMov(i, i - 7);
        if (Caps)
        {
          if (i<=15 && this.Color[i - 8] == this.EMPTY)
            this.NewMov(i, i - 8);
          if (i<=23 && this.ChessVari==2 && this.Unit[i-8]!=this.PAWN && this.Color[i - 16] == this.EMPTY && i>=16)//teleport
            this.NewMov(i, i - 16);
        }
        else
        {
          if (this.ChessVari==0)
          {
            /*for (int n = i;;)
            {
              n = BoardB[IDBoardB[n] - 10];
              if (n == -1)
                break;
              if (Color[n] == EMPTY)
              NewMov(i, n);//, 0);
                else
              break;
            } */
            if (this.Color[i - 8] == this.EMPTY)
		        this.NewMov(i, i - 8);//, 16);
            if (i>=48 && this.Color[i - 8] == this.EMPTY && this.Color[i - 16] == this.EMPTY)//EP for KS
              this.NewMov(i, i - 16);
            /*if (i>=16)
            {
              if ((this.COL(i-2-16)==this.COL(i)-2) && (this.Color[i-2-16]==this.EMPTY) && (this.Color[i-1-8]==this.EMPTY))
                  this.NewMov(i,i-2-16);
              if ((this.COL(i-0-16)==this.COL(i)-0) && (this.Color[i-0-16]==this.EMPTY) && (this.Color[i-0-8]==this.EMPTY))
                  this.NewMov(i,i-0-16);
              if ((this.COL(i+2-16)==this.COL(i)+2) && (this.Color[i+2-16]==this.EMPTY) && (this.Color[i+1-8]==this.EMPTY))
                  this.NewMov(i,i+2-16);
            }*/
if ((this.COL(i-0-16)==this.COL(i)-0) && (this.Color[i-0-16]==this.EMPTY) && (this.Color[i-0-8]==this.EMPTY))
                  this.NewMov(i,i-0-16);
	        }
          else
          {
            if (this.Color[i - 8] == this.EMPTY)
              this.NewMov(i, i - 8);
            if (((this.ChessVari==2 && this.Unit[i-8]!=this.PAWN /*&& i>=32*/) || (this.ChessVari!=2 && i>=48 && this.Color[i - 8] == this.EMPTY)) && this.Color[i - 16] == this.EMPTY)//teleport
              this.NewMov(i, i - 16);
          }
        }
      }
      else
      {
        if (this.COL(i) != 0 && this.Color[i + 7] == this.LIGHT)
          this.NewMov(i, i + 7);//, 17);
        if (this.COL(i) != 7 && this.Color[i + 9] == this.LIGHT)
          this.NewMov(i, i + 9);//, 17);

        if (Caps)
        {
          if (i>=48 && this.Color[i + 8] == this.EMPTY)
            this.NewMov(i, i + 8);//, 16);
          if (i>=40 && this.ChessVari==2 && this.Unit[i+8]!=this.PAWN && this.Color[i + 16] == this.EMPTY)
            this.NewMov(i, i + 16);
        }
        else
        {
          if (this.ChessVari==0)
          {
            /*for (int n = i;;)
            {
              n = BoardB[IDBoardB[n] + 10];
              if (n == -1)
                break;
              if (Color[n] == EMPTY)
                NewMov(i, n);//, 0);
              else
                break;
            } */
            if (this.Color[i + 8] == this.EMPTY)
              this.NewMov(i, i + 8);//, 16);
            if (i<=15 && this.Color[i + 8] == this.EMPTY && this.Color[i + 16] == this.EMPTY)//EP for KS
              this.NewMov(i, i + 16);
            /*if (i<=40)
            {
              if ((this.COL(i-2+16)==this.COL(i)-2) && (this.Color[i-2+16]==this.EMPTY) && (this.Color[i-1+8]==this.EMPTY))
                  this.NewMov(i,i-2+16);
              if ((this.COL(i-0+16)==this.COL(i)-0) && (this.Color[i-0+16]==this.EMPTY) && (this.Color[i-0+8]==this.EMPTY))
                  this.NewMov(i,i-0+16);
              if ((this.COL(i+2+16)==this.COL(i)+2) && (this.Color[i+2+16]==this.EMPTY) && (this.Color[i+1+8]==this.EMPTY))
                  this.NewMov(i,i+2+16);
            }*/
if ((this.COL(i-0+16)==this.COL(i)-0) && (this.Color[i-0+16]==this.EMPTY) && (this.Color[i-0+8]==this.EMPTY))
                  this.NewMov(i,i-0+16);
          }
          else
          {
            if (this.Color[i + 8] == this.EMPTY)
              this.NewMov(i, i + 8);//, 16);
            if (((this.ChessVari==2 && this.Unit[i+8]!=this.PAWN /*&& i<=31*/) || (this.ChessVari!=2 && i<=15 && this.Color[i + 8] == this.EMPTY)) && this.Color[i + 16] == this.EMPTY)
              this.NewMov(i, i + 16);
          }
        }
      }
    }
    else
    {
      var j=this.DirStart[this.Unit[i]];
      while (this.Dirs[j]!=0)
      {
        for (var n = i;;)
        {
          n = this.BoardB[this.IDBoardB[n] + this.Dirs[j]];
          if (n == -1)
            break;
          if (this.Color[n] != this.EMPTY)
          {
            if (this.Color[n] == this.XSide)
              this.NewMov(i, n);//, 1);

            //butterflychess
            if (this.ChessVari==4 && (this.ROW(n)!=0 && this.ROW(n)==1 && this.ROW(n)==6 && this.ROW(n)==7) &&
 (this.Unit[i]==this.QUEEN || this.Unit[i]==this.BISHOP || this.Unit[i]==this.ROOK))
            {
              var newn = this.BoardB[this.IDBoardB[n] + this.Dirs[j]];
              if ( ((this.ROW(n)==1)? ( (this.ROW(newn)==((this.Side==this.LIGHT)?2:0)) || (this.ROW(newn)==1) ) : true) &&
                   ((this.ROW(n)==6)? ( (this.ROW(newn)==((this.Side==this.LIGHT)?7:5)) || (this.ROW(newn)==6) ) : true)  )
              {
              if (newn == -1)
                break;
              if (this.Color[newn] == this.EMPTY || this.Color[newn] == this.XSide)
                this.NewMov(i, newn);
              }
            }
            //end butterflychess
            break;
          }
          if (!Caps)
            this.NewMov(i, n);//, 0);
          if (!this.ForwardM[this.Unit[i]] || (this.ChessVari==55 && this.OneStepStop[j]))
            break;
        }
        j++;
	      if (this.ChessVari!=55 && this.OneStepStop[j])
            break;
      }
    }
  }

  if (!Caps && this.ChessVari!=7)
  {
    if (this.Side == this.LIGHT)
    {
      if (this.Castle & 1)
        this.NewMov(this.E1, this.G1);//, 2);
      if (this.Castle & 2)
        this.NewMov(this.E1, this.C1);//, 2);
    }
    else
    {
      if (this.Castle & 4)
        this.NewMov(this.E8, this.G8);//, 2);
      if (this.Castle & 8)
        this.NewMov(this.E8, this.C8);//, 2);
    }
  }

	/* en passant*/
	if (this.EP <64)
	{
		if (this.Side == this.LIGHT)
		{
			if (this.COL(this.EP) != 0 && this.Color[this.EP + 7] == this.LIGHT && this.Unit[this.EP + 7] == this.PAWN)
				this.NewMov(this.EP + 7, this.EP);//, 21);
			if (this.COL(this.EP) != 7 && this.Color[this.EP + 9] == this.LIGHT && this.Unit[this.EP + 9] == this.PAWN)
				this.NewMov(this.EP + 9, this.EP);//, 21);
		}
		else
		{
			if (this.COL(this.EP) != 0 && this.Color[this.EP - 9] == this.DARK && this.Unit[this.EP - 9] == this.PAWN)
				this.NewMov(this.EP - 9, this.EP);//, 21);
			if (this.COL(this.EP) != 7 && this.Color[this.EP - 7] == this.DARK && this.Unit[this.EP - 7] == this.PAWN)
				this.NewMov(this.EP - 7, this.EP);//, 21);
		}
	}   
};
//---------------------------------------------------------------------------
this.GoMov=function(from,to)
{
  if (from<0 || to>=64 || to<0)
    return;
  if (this.Color[to]!=this.EMPTY && this.Color[to]!=this.XSide)
    return;
  this.NewMov(from,to);
}
//---------------------------------------------------------------------------
this.NewMov=function(from,to)
{
  if (from<0 || to>=64 || to<0)
    return;

	/*if (Morph!=0)
	{
    if (Side == LIGHT?To <= H8:To >= A1)
    {
      for (unsigned char i = KNIGHT; i <= QUEEN; ++i)
	    {
		    g = &gen_dat[first_move[ply + 1]++];
		    g->m.b.From = (char)From;
		    g->m.b.To = (char)To;
		    g->m.b.Morph = (char)i;
		    g->score = 1000000 + (i * 10);
	    }
			return;
    }
	} */

	var NewInd=this.FMoveI[this.SPly + 1];
  this.FMoveI[this.SPly + 1]+=1;
	this.Moves[NewInd].From = from;
	this.Moves[NewInd].To = to;
	this.Moves[NewInd].Morph = 0;
  this.Moves[NewInd].Score = 0;
	if (this.Color[to] != this.EMPTY)
		this.Moves[NewInd].Score = 1000000 + (this.Unit[to] * 10) - this.Unit[from];
	else
		this.Moves[NewInd].Score = this.BoardHist[from][to];
  //if (ChessVari==1 && Unit[From]!=KING && (Side == LIGHT?(To <= (9-ECZone)*8-1):(To >= (ECZone-1)*8)))
                                                                //15 :48
  if (this.ChessVari==1 && this.Unit[from]!=this.KING && (this.Side == this.LIGHT?to <= (9-this.ECZone)*8-1:to >= (this.ECZone-1)*8))
  {
    this.Moves[NewInd].Morph=this.QUEEN-this.Unit[from];
    this.Moves[NewInd].Score=1000000+this.QUEEN*10;
  }
  if ((this.ChessVari==2 || this.ChessVari==4 ) && this.Unit[from]==this.PAWN && (this.Side == this.LIGHT?to <= 7:to >= 56))
  {
    this.Moves[NewInd].Morph=this.QUEEN-this.Unit[from];
    this.Moves[NewInd].Score=1000000+this.QUEEN*10;
  }
  if (this.ChessVari==7 && (this.Unit[from]==this.PAWN) && (this.Side == this.LIGHT?to <= 23:to >= 40))
  {
    this.Moves[NewInd].Morph=this.QUEEN-this.Unit[from];
    this.Moves[NewInd].Score=1000000+this.QUEEN*10;
  }
  if (this.ChessVari==7 && (this.Unit[from]==this.KNIGHT) && (this.Side == this.LIGHT?(to <= 23 /*&& From>15*/):(to >= 48 /*&& From<40*/)))
  {
    this.Moves[NewInd].Morph=this.QUEEN-this.Unit[from];
    this.Moves[NewInd].Score=1000000+this.QUEEN*10;
  }

};
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
this.Move=function(m)
{
  this.RochMove=false;
  this.EPMove=255;

  if (this.Unit[m.From]==this.KING && (m.To-m.From==2 || m.From-m.To==2) && this.ChessVari!=7)
	{
		var From, To;
		if (this.InCheck(this.Side))
			return false;
		switch (m.To)
		{
			case 62:
				if (this.Color[this.F1] != this.EMPTY || this.Color[this.G1] != this.EMPTY ||
						this.Attack(this.F1, this.XSide) || this.Attack(this.G1, this.XSide))
					return false;
				From = this.H1;
				To = this.F1;
				break;
			case 58:
				if (this.Color[this.B1] != this.EMPTY || this.Color[this.C1] != this.EMPTY || this.Color[this.D1] != this.EMPTY ||
						this.Attack(this.C1, this.XSide) || this.Attack(this.D1, this.XSide))
					return false;
				From = this.A1;
				To = this.D1;
				break;
			case 6:
				if (this.Color[this.F8] != this.EMPTY || this.Color[this.G8] != this.EMPTY ||
						this.Attack(this.F8, this.XSide) || this.Attack(this.G8, this.XSide))
					return false;
				From = this.H8;
				To = this.F8;
				break;
			case 2:
				if (this.Color[this.B8] != this.EMPTY || this.Color[this.C8] != this.EMPTY || this.Color[this.D8] != this.EMPTY ||
						this.Attack(this.C8, this.XSide) || this.Attack(this.D8, this.XSide))
					return false;
				From = this.A8;
				To = this.D8;
				break;
			default:
				From = -1;
				To = -1;
				break;
		}
    this.RochMove=true;
    this.RFR=From;
    this.RTO=To;
		this.Color[To] = this.Color[From];
		this.Unit[To] = this.Unit[From];
		this.Color[From] = this.EMPTY;
		this.Unit[From] = this.EMPTY;
	}

	this.History[this.HPly].From = m.From;
  this.History[this.HPly].To = m.To;
  this.History[this.HPly].Morph = m.Morph;
  if (m.To==m.From)  //KSmorfovani
	{
		this.History[this.HPly].Capture=this.EMPTY;
	}
	else
	{
    this.History[this.HPly].Capture = this.Unit[m.To];
    if (this.Unit[m.To]!=this.EMPTY) //hrbitov
    {
      if (this.ChessVari!=7)
        this.Grave[this.XSide][this.Unit[m.To]]++;
      else
      {
        if (this.Grave[this.Side][this.PAWN]>0 && (this.Unit[m.To]!=this.PAWN))
        {
          this.History[this.HPly].Capture +=10;
          this.Grave[this.Side][this.PAWN]--;
          this.Grave[this.Side][this.Unit[m.To]]++;
          this.Grave[this.XSide][this.PAWN]++;
        }
      }
    }
	}

  this.History[this.HPly].Castle=this.Castle;
  this.History[this.HPly].EP=this.EP;
  this.History[this.HPly].Fifty=this.Fifty;
  this.History[this.HPly].Hash=this.Hash;
	++this.SPly;
	++this.HPly;

  /*en passant*/
	if ((this.ChessVari>=0 && this.ChessVari<=4 ) && this.EP == m.To && this.Unit[m.From]==this.PAWN)
	{
		if (this.Side == this.LIGHT)
		{
			this.Color[m.To+8] = this.EMPTY;
			this.Unit[m.To+8] = this.EMPTY;
                 this.EPMove=m.To+8;
		}
		else
		{
			this.Color[m.To-8] = this.EMPTY;
			this.Unit[m.To-8] = this.EMPTY;
                 this.EPMove=m.To-8;
		}
	}     

	this.Castle &= this.castle_mask[m.From] & this.castle_mask[m.To];
	if ((this.ChessVari>=0 && this.ChessVari<=4 ) && this.Unit[m.From]==this.PAWN && (m.From-m.To==16 || m.To-m.From==16))
	{
		if (this.Side == this.LIGHT)
			this.EP = m.To + 8;
		else
			this.EP = m.To - 8;
	}
	else
		this.EP = 255;
	if (this.Unit[m.From]==this.PAWN && this.Unit[m.To]!=this.EMPTY)
		this.Fifty = 0;
	else
		++this.Fifty;

	if (m.To==m.From)  //KSmorfovani
	{
    if (this.ChessVari==7)
    {
      this.Unit[m.To] = m.Morph;
		  this.Grave[this.Side][m.Morph]--;
      this.Color[m.To] = this.Side;
    }
    else
    {
      if (this.ChessVari==3)
        this.Grave[this.XSide][this.Unit[m.To]]++;
      this.Unit[m.To] += m.Morph;
      this.Grave[this.XSide][this.Unit[m.To]]--;
    }
	}
	else
	{
		this.Color[m.To] = this.Side;
		if (m.Morph!=0 && m.Morph<this.EMPTY && m.Morph<1000000)
			this.Unit[m.To] =(this.ChessVari==1 || this.ChessVari==7)?this.Unit[m.From]+m.Morph: m.Morph;
		else
			this.Unit[m.To] = this.Unit[m.From];
		this.Color[m.From] = this.EMPTY;
		this.Unit[m.From] = this.EMPTY;
	}

	this.Side ^= 1;
	this.XSide ^= 1;
	if (this.InCheck(this.XSide))
	{
		this.Back();
		return false;
	}
	//CompHash();
	return true;
};
//---------------------------------------------------------------------------
this.FindMove=function(From,To,Morph)
{
  if (this.ChessVari==3 && From==To)//korekce jinyho znaceni
    Morph-=this.Unit[From];
  for (var i = 0; i < this.FMoveI[1]; i++)
  {
	  if (this.Moves[i].From == From && this.Moves[i].To == To && (Morph==0 || this.Moves[i].Morph==Morph))
	  {
      return i;
    }
  }
  return -1;
};
//---------------------------------------------------------------------------
this.MoveParam=function(From,To,Morph)
{
  if (this.ChessVari==3 && From==To)//korekce jinyho znaceni
    Morph-=this.Unit[From];
  for (var i = 0; i < this.FMoveI[1]; i++)
  {
	  if (this.Moves[i].From == From && this.Moves[i].To == To && (Morph==0 || this.Moves[i].Morph==Morph))
	  {
      if (this.Move(this.Moves[i]))
      {
        this.SPly = 0;
	      this.GenMov();
        return true;
      }
    }
  }
  return false;
};
//---------------------------------------------------------------------------
this.Back=function()
{
  this.Side ^= 1;
	this.XSide ^= 1;
	--this.SPly;
	--this.HPly;
  this.RochMove=false;
  this.EPMove=255;

  this.Castle=this.History[this.HPly].Castle;
  this.EP=this.History[this.HPly].EP;
  this.Fifty=this.History[this.HPly].Fifty;
  this.Hash=this.History[this.HPly].Hash;

  var M=this.History[this.HPly];

	if (M.From==M.To)   //KS morf
  {
    if (this.ChessVari==7)    //cubicshogi nasazeni
    {
      this.Grave[this.Side][this.Unit[M.To]]++;
      this.Unit[M.To]=this.EMPTY;
      this.Color[M.To]=this.EMPTY;
    }
    else
    {
      this.Grave[this.XSide][this.Unit[M.To]]++;
      if (this.ChessVari==3)
      {
        this.Unit[M.To] -= M.Morph;
        this.Grave[this.XSide][this.Unit[M.To]]--;
      }
      else  //==0
        this.Unit[M.From] = this.PAWN;
    }
	}
	else
	{
		this.Color[M.From] = this.Side;
		if (M.Morph!=0 && M.Morph<this.EMPTY && M.Morph<1000000)
			this.Unit[M.From] = (this.ChessVari==1 || this.ChessVari==7)?this.Unit[M.To]-M.Morph:this.PAWN;
		else
			this.Unit[M.From] = this.Unit[M.To];
    if (this.ChessVari==7)
    {
      if (this.History[this.HPly].Capture == this.EMPTY)
      {
        this.Color[M.To] = this.EMPTY;
        this.Unit[M.To] = this.EMPTY;
      }
      else          //cubic shogi
      {
        this.Color[M.To] = this.XSide;
        var xDon = this.History[this.HPly].Capture>=10;
        var xCaptured=this.History[this.HPly].Capture;
        if (xDon) xCaptured-=10;

			  this.Unit[M.To] = xCaptured;
        //if (xCaptured!=PAWN)
          //Grave[XSide][PAWN]--;
        //else
        //{
          if (xDon)
          {
            this.Grave[this.Side][this.PAWN]++;
            this.Grave[this.Side][xCaptured]--;
            this.Grave[this.XSide][this.PAWN]--;
          }
        //}
      }
    }
    else
    {
	  	if (this.History[this.HPly].Capture >= this.EMPTY) //nikoho sme necapturovali
		  {
			  this.Color[M.To] = this.EMPTY;
			  this.Unit[M.To] = this.EMPTY;
		  }
		  else
		  {
        this.Color[M.To] = this.XSide;
        this.Unit[M.To] = this.History[this.HPly].Capture;
        this.Grave[this.XSide][this.Unit[M.To]]--;
		  }
    }
  }
	if (this.Unit[M.From]==this.KING && (M.To-M.From==2 || M.From-M.To==2) && this.ChessVari!=7)
	{
		var From, To;

		switch(M.To)
		{
			case 62:
				From = this.F1;
				To = this.H1;
				break;
			case 58:
				From = this.D1;
				To = this.A1;
				break;
			case 6:
				From = this.F8;
				To = this.H8;
				break;
			case 2:
				From = this.D8;
				To = this.A8;
				break;
			default:
				From = -1;
				To = -1;
				break;
		}
    this.RochMove=true;
    this.RFR=From;
    this.RTO=To;
		this.Color[To] = this.Side;
		this.Unit[To] = this.ROOK;
		this.Color[From] = this.EMPTY;
		this.Unit[From] = this.EMPTY;
	}

  if (this.EP == M.To && this.Unit[M.From]==this.PAWN)
	{
		if (this.Side == this.LIGHT)
		{
			this.Color[M.To + 8] = this.XSide;
			this.Unit[M.To + 8] = this.PAWN;
                this.EPMove=M.To+8;
		}
		else
    {
			this.Color[M.To - 8] = this.XSide;
			this.Unit[M.To - 8] = this.PAWN;
                this.EPMove=M.To-8;
		}
	}
};
//---------------------------------------------------------------------------
this.Undo=function()
{
	if (!this.HPly)
		return false;
	this.Back();
	this.SPly = 0;
	this.GenMov();
	return true;
};
//---------------------------------------------------------------------------
this.BeginGame=function()
{
  for (var i=0;i<64;i++)
  {
    this.Color[i]=this.StartColors[i];
    if (this.ChessVari==2)//PC
	  this.Unit[i]=this.StartUnitsPC[i];
    else if (this.ChessVari==7)//CS
    {
      this.Unit[i]=this.ShStartUnits[i];
      this.Color[i]=this.ShStartColors[i];
    }
    else
      this.Unit[i]=this.StartUnits[i];
  }
  for (var i=0;i<2;i++)
  {
    for (var j=0;j<6;j++)
    {
      this.Grave[i][j]=0;
    }
  }
  if (this.ChessVari==7)
  {
    this.Grave[0][0]=2;//2//4
    this.Grave[1][0]=2;//2//4
  }

	this.Side = this.LIGHT;
	this.XSide = this.DARK;
	this.Castle = 15;
	this.EP = 255;
	this.Fifty = 0;
	this.SPly = 0;
	this.HPly = 0;
	//CompHash();
	this.FMoveI[0] = 0;
	this.GenMov();
}
//---------------------------------------------------------------------------
this.TaskThink=function(ObjNameRef)
{
  this.PriVari[0][0].From=255;
  if (this.HPly<=1)
  {
    if (this.ChessVari!=7)
    {
    var t=new Array(new Array(5,7,9,5,7,9),new Array(9,8,11,10,13,12));
    var mfr=Math.floor(Math.random()*6);
    this.PriVari[0][0].From=this.Moves[t[this.HPly][mfr]].From;
    this.PriVari[0][0].To=this.Moves[t[this.HPly][mfr]].To;
    this.PriVari[0][0].Morph=this.Moves[t[this.HPly][mfr]].Morph;
    this.SearchStop=true;
    return;
    }
    else
    {
      if (this.Side==1)
      {
        var mfr=Math.floor(Math.random()*7);
        var k=0;
        switch (mfr)
        {
          case 0: k=this.FindMove(17,25,0);
        break;
          case 1: k=this.FindMove(9,12,0);
        break;
          case 2: k=this.FindMove(9,13,0);
        break;
          case 3: k=this.FindMove(3,11,0);
        break;
          case 4: k=this.FindMove(5,13,0);
        break;
          case 5: k=this.FindMove(19,27,0);
        break;
          case 6: k=this.FindMove(21,29,0);
        break;
        }
        this.PriVari[0][0].From=this.Moves[k].From;
        this.PriVari[0][0].To=this.Moves[k].To;
        this.PriVari[0][0].Morph=this.Moves[k].Morph;
    this.SearchStop=true;
        return;
      }
    }
  }
  var foo=new Date();
	this.StartTime = foo.getTime();
	this.StopTime = this.StartTime + this.MaxTime;

	this.SPly = 0;
	this.Nodes = 0;
  for (var i=0;i<this.MAX_PLY;i++)
    for (var j=0;j<this.MAX_PLY;j++)
      this.PriVari[i][j]=new SMove();
  for (var i=0;i<64;i++)
    for (var j=0;j<64;j++)
      this.BoardHist[i][j]=0;

  this.DebugInfo="";
  this.DEBUGrecurtext="";

  //nezamrzavani
  this.Index=0;
  this.StackPos=-1;
  this.AntiThread=false;
  this.SrchStack[0].alpha=0;
  this.SearchStop=false;
  this.Spam=true;
  //forward se automaticky inicializuje
  this.FuncTaskSearch=setInterval(ObjNameRef+".TaskSpam()",1);
};
//---------------------------------------------------------------------------
this.EndTask=function()
{
  this.AntiThread=true;//muze byt nastaveno na true do dalsiho volani TaskThink
  clearInterval(this.FuncTaskSearch); // zruší opakované naèasování
  //if (this.SearchStop)
  while (this.SPly)
    this.Back();//dorekurzit se zpatky pomoci Back
  this.SearchStop=true;
};
//---------------------------------------------------------------------------
this.TaskSpam=function()
{
  if (this.AntiThread)
    return; //nespusteni pokud bezi vice vlaken, musi se dodrzovat konzistence
  this.AntiThread=true;
  //
  var foo=new Date();
  if (this.StopTime<foo.getTime())
  {
    this.SearchStop=true;
    this.EndTask();
    return;   //ukonceni totalni
  }
  //
  for (var i=0;i<500;i++)
    this.TaskSearch();
  this.AntiThread=false;
};
//---------------------------------------------------------------------------
this.TaskSearch=function()
{
  if (this.StackPos<0)
  {
    this.Index++;
    if (this.Index>this.MaxDepth || this.SrchStack[0].alpha>9000 || this.SrchStack[0].alpha<-9000)
    {
      this.EndTask();
      return; //ukonceni totalni
    }
    this.StackPos=0;
    var oldscore=this.SrchStack[0].alpha;
    this.SrchStack[0].alpha=-10000;
    this.SrchStack[0].beta=10000;
    this.SrchStack[0].depth=this.Index;
    this.SrchStack[0].i=-1;
    this.SrchStack[0].check=false;
    this.SrchStack[0].fdid=false;
    this.FollowPV = true;
    this.Forward=true;
    /*//debug
    if (this.SPly!=0) alert("chyba, sply="+this.SPly);

    if (this.Index>1)
    {
      var vri=this.Index-1;
      this.DebugInfo+="; "+vri+" nodes:"+this.Nodes+" s:"+oldscore+" "
      for (var j = 0; j < this.PVLen[0]; ++j)
      {
        this.DebugInfo+=" "+this.move_str(this.PriVari[0][j]);
      }
      this.DEBUGrecurtext+="<BR><BR>"+vri+" nodes:"+this.Nodes+" s:"+oldscore+"<BR><BR>";
      for (var j = 0; j < this.PVLen[0]; ++j)
        this.DEBUGrecurtext+="; "+this.move_str(this.PriVari[0][j]);
      this.DEBUGrecurtext+="<BR><BR>";

    //
    }
    //  */

  }
  //
  var x;
  if (this.Forward)//nevratila se nam hodnota, zpracovavam tenhle prvek poprvy
  { //nerekurzime se zpatky, jedeme dal
    if (this.SrchStack[this.StackPos].i==-1) //init, at uz z jakyhokoli duvodu
    {
      this.Nodes++;

      this.PVLen[this.SPly] = this.SPly;

      if (this.SPly >= this.MAX_PLY - 1 || this.HPly >= this.HIST_STACK - 1)
      { //vraceni hodnoty, odrekurzeni
        this.SrchStack[this.StackPos].alpha=this.Eval();
        this.StackPos--;//odrekurzeni
        this.Forward=false;
        return;
      }

      if (this.SrchStack[this.StackPos].depth>0)
      {
        this.SrchStack[this.StackPos].check=this.InCheck(this.Side);
        if (this.SrchStack[this.StackPos].check)
          ++this.SrchStack[this.StackPos].depth;
      }
      else //quiesce
      {
        // check with the evaluation function
        x = this.Eval();
        if (x >= this.SrchStack[this.StackPos].beta)
        {
          //vraceni hodnoty, odrekurzeni
          this.SrchStack[this.StackPos].alpha=this.SrchStack[this.StackPos].beta;
          this.Forward=false;
          this.StackPos--;//odrekurzeni
          return;
        }
        if (x > this.SrchStack[this.StackPos].alpha)
          this.SrchStack[this.StackPos].alpha = x;
      }

      this.GenMov(this.SrchStack[this.StackPos].depth<=0);
      if (this.FollowPV)  // are we following the PV?
      {
        this.FollowPV = false;
        for(var i = this.FMoveI[this.SPly]; i < this.FMoveI[this.SPly + 1]; ++i)
        {
          var unda=this.Moves[i].From;
          var undb=this.Moves[i].To;
          var undc=this.Moves[i].Morph;
          if ((unda == this.PriVari[0][this.SPly].From)
          && (undb == this.PriVari[0][this.SPly].To)
          && (undc == this.PriVari[0][this.SPly].Morph))
          {
            this.FollowPV = true;
            this.Moves[i].Score += 10000000;
            break;
          }
        }
      }
      this.SrchStack[this.StackPos].i=this.FMoveI[this.SPly]-1;
      //automaticky se zvetsi o 1 a tim se inicializuje na spravnou hodnotu
    }
    //forcyklus :D
    this.SrchStack[this.StackPos].i++;
    var loci=this.SrchStack[this.StackPos].i;
    var depth=this.SrchStack[this.StackPos].depth;
    if (loci>=this.FMoveI[this.SPly + 1])
    {
    //endcyklu, vyrekurzeni se o uroven vejs
      this.Forward=false;

      if (depth<=0) //quiesce ends here
      {
        this.StackPos--;//odrekurzeni
        return;        //alpha vraci normalne
      }

      //nastaveni vraceci alfy ve spec pripadech
      if (!this.SrchStack[this.StackPos].fdid)
      {
        if (this.SrchStack[this.StackPos].check)
          this.SrchStack[this.StackPos].alpha= -10000 + this.SPly;
        else
          this.SrchStack[this.StackPos].alpha=0;
      }

      // fifty move draw rule
      //if (Fifty >= 100)
      //  return 0;

      this.StackPos--;//odrekurzeni
      return;    //alpha vraci i normalne
    }
    //pruchod v cyklu pred rekurzi, po rekurzi se deje ve forward=false
    var bj = loci;// best j
	  for (var j = loci; j < this.FMoveI[this.SPly + 1]; ++j)
	  {
		  if (this.Moves[j].Score > this.Moves[bj].Score)
			  bj = j;
	  }
	  var g = new SMove();
    g.From= this.Moves[loci].From;
    g.To= this.Moves[loci].To;
    g.Morph= this.Moves[loci].Morph;
    g.Score= this.Moves[loci].Score;
    this.Moves[loci].From= this.Moves[bj].From;
    this.Moves[loci].To= this.Moves[bj].To;
    this.Moves[loci].Morph= this.Moves[bj].Morph;
    this.Moves[loci].Score= this.Moves[bj].Score;
    this.Moves[bj].From= g.From;
    this.Moves[bj].To= g.To;
    this.Moves[bj].Morph= g.Morph;
    this.Moves[bj].Score= g.Score;
    //

		if (!this.Move(this.Moves[loci]))
    {
			return; //continue automaticky dalsim
    }
    this.SrchStack[this.StackPos].fdid=true;
    var oldalpha=this.SrchStack[this.StackPos].alpha;
    var oldbeta=this.SrchStack[this.StackPos].beta;
    //Search
    this.StackPos++;
    this.SrchStack[this.StackPos].alpha=-oldbeta;
    this.SrchStack[this.StackPos].beta=-oldalpha;
    this.SrchStack[this.StackPos].depth=depth-1;
    this.SrchStack[this.StackPos].i=-1;//novej
    this.SrchStack[this.StackPos].check=false;
    this.SrchStack[this.StackPos].fdid=false;
    this.SrchStack[this.StackPos].DEBUGNODE=this.Nodes+1;
    //end, musime se zarekurzit dopredu, forward je uz true

    /* //debug
    var dx=this.Nodes+1;
    //DEBUG
    if (this.Nodes<=1024)
    {
      var a=-oldbeta;
      var b=-oldalpha;
      var d=depth-1;
      for (var k=0;k<d;k++)
        this.DEBUGrecurtext+=".";
      this.DEBUGrecurtext+=dx+": A:"+a+" B:"+b+" D:"+d+" ";
      this.DEBUGrecurtext+="SPly: "+this.SPly+"["+this.FMoveI[this.SPly-1]+"/"+loci+"/"+this.FMoveI[this.SPly]+"]; ";
      this.DEBUGrecurtext+=this.move_str(this.Moves[loci])+"<BR>";
    }
    // */

    return;
  }
  else
  {

    /*//DEBUG
    if (this.Nodes<=1024)
    {
      var d=this.SrchStack[this.StackPos].depth-1;
      for (var k=0;k<d;k++)
        this.DEBUGrecurtext+=".";
      //this.DEBUGrecurtext+="X("+dx+"): A:"+a+" B:"+b+" D:"+d+
      //" S:"+x+"<BR>";
      var score=-this.SrchStack[this.StackPos+1].alpha;
      this.DEBUGrecurtext+="X("+this.SrchStack[this.StackPos+1].DEBUGNODE+"): S:"+score+"<BR>";
      var ttt=false;
      if (score > this.SrchStack[this.StackPos].alpha)
		  {
      for (var j = this.SPly; j < this.PVLen[this.SPly]; ++j)
      {
				 this.DEBUGrecurtext+= this.move_str(this.PriVari[this.SPly][j])+",";
         ttt=true;
      }
      }
      if (ttt) this.DEBUGrecurtext+="<BR>";
    }
    //  */

    this.Back();
    this.Forward=true;//vzdycky pojedeme dal dalsi iteraci cyklu na momentalnim prvku
    x=-this.SrchStack[this.StackPos+1].alpha;
    var loci=this.SrchStack[this.StackPos].i;
    var depth=this.SrchStack[this.StackPos].depth;
		if (x > this.SrchStack[this.StackPos].alpha)
		{
      if (depth>0) //pouze v orig search
      {
			  this.BoardHist[this.Moves[loci].From][this.Moves[loci].To] += depth;
      }
			if (x >= this.SrchStack[this.StackPos].beta)
      {
        this.SrchStack[this.StackPos].alpha=this.SrchStack[this.StackPos].beta;
        this.StackPos--;//odrekurzeni
        this.Forward=false;
				return;//beta
      }
			this.SrchStack[this.StackPos].alpha = x;

			this.PriVari[this.SPly][this.SPly].From = this.Moves[loci].From;
      this.PriVari[this.SPly][this.SPly].To = this.Moves[loci].To;
      this.PriVari[this.SPly][this.SPly].Morph = this.Moves[loci].Morph;
			for (var j = this.SPly + 1; j < this.PVLen[this.SPly + 1]; ++j)
      {
				this.PriVari[this.SPly][j].From = this.PriVari[this.SPly + 1][j].From;
        this.PriVari[this.SPly][j].To = this.PriVari[this.SPly + 1][j].To;
        this.PriVari[this.SPly][j].Morph = this.PriVari[this.SPly + 1][j].Morph;
      }
			this.PVLen[this.SPly] = this.PVLen[this.SPly + 1];
		}
  }
};
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
this.Reps=function()
{
	var r = 0;

	for (var i = this.HPly - this.Fifty; i < this.HPly; ++i)
		if (this.History[i].Hash == this.Hash)
			++r;
	return r;
};
//---------------------------------------------------------------------------
this.Eval=function()
{
  var f;
	var Score=new Array(2);  // each Side's score

	for (var i = 0; i < 10; ++i)
	{
		this.PRank[this.LIGHT][i] = 0;
		this.PRank[this.DARK][i] = 7;
	}
	this.PieceM[this.LIGHT] = 0;
	this.PieceM[this.DARK] = 0;
	this.PawnM[this.LIGHT] = 0;
	this.PawnM[this.DARK] = 0;
	for (var i = 0; i < 64; ++i)
	{
		if (this.Color[i] == this.EMPTY)
			continue;
		if (this.Unit[i] == this.PAWN)
		{
                        if (this.ChessVari == 7) //cubicShogi
                        this.PawnM[this.Color[i]] += this.UnitValCS[this.PAWN];
                        else
			this.PawnM[this.Color[i]] += this.UnitVal[this.PAWN];
			f = this.COL(i) + 1;
		 	if (this.Color[i] == this.LIGHT)
			{
				if (this.PRank[this.LIGHT][f] < this.ROW(i))
					this.PRank[this.LIGHT][f] = this.ROW(i);
			}
			else
			{
				if (this.PRank[this.DARK][f] > this.ROW(i))
					this.PRank[this.DARK][f] = this.ROW(i);
			}
		}
		else
    {
		  if (this.ChessVari == 7) //cubicShogi
        this.PieceM[this.Color[i]] += this.UnitValCS[this.PAWN];
      else
			  this.PieceM[this.Color[i]] += this.UnitVal[this.PAWN];
    }
	}

	Score[this.LIGHT] = this.PieceM[this.LIGHT] + this.PawnM[this.LIGHT];
	Score[this.DARK] = this.PieceM[this.DARK] + this.PawnM[this.DARK];
	for (var i = 0; i < 64; ++i)
	{
		if (this.Color[i] == this.EMPTY)
			continue;
    var l=this.Color[i]==0?i:this.flip[i];
    switch (this.Unit[i])
    {
      case 0:
        Score[this.Color[i]] += this.EPawn(i);
      break;
      case 3:
      {
        var LD=new Array(2);
        LD[0]=this.PRank[this.LIGHT][this.COL(i) + 1] == 0;
        LD[1]=this.PRank[this.DARK][this.COL(i) + 1] == 7;
        if (LD[this.Color[i]])
				{
					if (LD[this.Color[i]^1])
						Score[this.Color[i]] += this.ROOK_OPEN_FILE_BONUS;
					else
						Score[this.Color[i]] += this.ROOK_SEMI_OPEN_FILE_BONUS;
				}
				if (this.ROW(i) == 1+this.Color[i]*5)
					Score[this.Color[i]] += this.ROOK_ON_SEVENTH_BONUS;
      }
      break;
      case 5:
      {
				if (this.PieceM[this.Color[i]^1] <= 1200)
					Score[this.Color[i]] += this.KingEndUS[l];
				else
					Score[this.Color[i]] += this.EKing(i);
      }
      break;
      default:
      {
        if (this.IndexPS[this.Unit[i]]!=255)
          Score[this.Color[i]]+=this.UnitSquare[this.IndexPS[this.Unit[i]]][i];
      }
      break;

    }
	}



// CubicShogi Grave score

  if (this.ChessVari==7)
  {
    for (var c=this.PAWN; c <= this.QUEEN; ++c)
    {
			Score[this.LIGHT]+=this.Grave[this.LIGHT][c]*this.UnitValCS[c]*0.9;
      Score[this.DARK]+=this.Grave[this.DARK][c]*this.UnitValCS[c]*0.9;
    }
  }



  return Score[this.Side]-Score[this.XSide];
};
//---------------------------------------------------------------------------
this.EPawn=function(sq)
{
	var r = 0;
	var f = this.COL(sq) + 1;
  var MSide=this.Color[sq];

  if (MSide==0)
  {
	r += this.UnitSquare[0][sq];

	if (this.PRank[this.LIGHT][f] > this.ROW(sq))
		r -= this.DOUBLED_PAWN_PENALTY;

	if ((this.PRank[this.LIGHT][f - 1] == 0) &&
			(this.PRank[this.LIGHT][f + 1] == 0))
		r -= this.ISOLATED_PAWN_PENALTY;

	else if ((this.PRank[this.LIGHT][f - 1] < this.ROW(sq)) &&
			(this.PRank[this.LIGHT][f + 1] < this.ROW(sq)))
		r -= this.BACKWARDS_PAWN_PENALTY;

	if ((this.PRank[this.DARK][f - 1] >= this.ROW(sq)) &&
			(this.PRank[this.DARK][f] >= this.ROW(sq)) &&
			(this.PRank[this.DARK][f + 1] >= this.ROW(sq)))
		r += (7 - this.ROW(sq)) * this.PASSED_PAWN_BONUS;
  }
  else
  {
  r += this.UnitSquare[0][this.flip[sq]];

	if (this.PRank[this.DARK][f] < this.ROW(sq))
		r -= this.DOUBLED_PAWN_PENALTY;

 	if ((this.PRank[this.DARK][f - 1] == 7) &&
			(this.PRank[this.DARK][f + 1] == 7))
		r -= this.ISOLATED_PAWN_PENALTY;

	else if ((this.PRank[this.DARK][f - 1] > this.ROW(sq)) &&
			(this.PRank[this.DARK][f + 1] > this.ROW(sq)))
		r -= this.BACKWARDS_PAWN_PENALTY;

	if ((this.PRank[this.LIGHT][f - 1] <= this.ROW(sq)) &&
			(this.PRank[this.LIGHT][f] <= this.ROW(sq)) &&
			(this.PRank[this.LIGHT][f + 1] <= this.ROW(sq)))
		r += this.ROW(sq) * this.PASSED_PAWN_BONUS;
  }

	return r;
};
//---------------------------------------------------------------------------
this.EKing=function(sq)
{
  var mSide=this.Color[sq];
	var r = this.UnitSquare[3][mSide==0?sq:this.flip[sq]];

	if (this.COL(sq) < 3)
	{
		r += this.EKP(1,mSide);
		r += this.EKP(2,mSide);
		r += this.EKP(3,mSide) / 2;
	}
	else if (this.COL(sq) > 4)
	{
		r += this.EKP(8,mSide);
		r += this.EKP(7,mSide);
		r += this.EKP(6,mSide) / 2;
	}
	else
	{
		for (var i = this.COL(sq); i <= this.COL(sq) + 2; ++i)
			if ((this.PRank[this.LIGHT][i] == 0) &&
					(this.PRank[this.DARK][i] == 7))
				r -= 10;
	}

	r *= this.PieceM[mSide^1];
	r = Math.floor(r/3100);

	return r;
};
//---------------------------------------------------------------------------
this.EKP=function(f,mSide)
{
	var r = 0;

  var pr=this.PRank[mSide][f];
  if (mSide==1) pr=7-pr;

	if (pr == 6);
	else if (pr == 5)
		r -= 10;
	else if (pr != 0)
		r -= 20;
	else
		r -= 25;

  pr=this.PRank[mSide^1][f];
  if (mSide==1) pr=7-pr;

	if (pr == 7)
		r -= 15;
	else if (pr == 5)
		r -= 10;
	else if (pr == 4)
		r -= 5;

	return r;
};
//---------------------------------------------------------------------------
}
