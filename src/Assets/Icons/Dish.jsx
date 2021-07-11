import React from "react";

function Dish(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      {...props}
    >
      <path
        d="M2185 4935 c-16 -15 -25 -36 -25 -55 0 -51 38 -80 105 -80 l55 0 0
-79 0 -78 -97 -7 c-311 -21 -579 -111 -833 -279 -463 -305 -749 -839 -750
-1394 l0 -83 -175 0 c-173 0 -176 0 -200 -25 -24 -23 -25 -31 -25 -136 0 -61
5 -130 12 -153 16 -55 99 -138 154 -154 27 -8 119 -12 266 -12 l224 0 0 -73
c0 -56 5 -82 22 -114 31 -59 607 -585 1240 -1133 495 -429 502 -435 470 -442
-64 -13 -68 -28 -68 -240 0 -187 0 -189 25 -213 l24 -25 511 0 511 0 24 25
c25 24 25 26 25 215 0 189 0 191 -25 215 -13 14 -31 25 -40 25 -12 0 -15 13
-15 61 0 59 2 63 47 113 25 28 60 80 77 116 l31 65 3 295 3 295 156 343 156
344 -6 64 -5 64 307 0 c359 0 375 3 444 80 56 62 67 102 67 239 0 105 -1 113
-25 136 -24 25 -27 25 -198 25 l-174 0 -6 138 c-4 75 -11 166 -17 202 -102
618 -532 1129 -1117 1329 -132 45 -248 69 -405 83 l-138 12 0 78 0 78 55 0
c67 0 105 29 105 80 0 19 -9 40 -25 55 l-24 25 -351 0 -351 0 -24 -25z m455
-215 l0 -80 -80 0 -80 0 0 80 0 80 80 0 80 0 0 -80z m470 -272 c281 -62 523
-189 726 -381 302 -286 463 -638 481 -1054 l6 -133 -1763 0 -1763 0 6 138 c8
156 31 287 77 423 173 521 630 917 1170 1013 133 24 133 24 550 21 380 -2 399
-3 510 -27z m1610 -1783 c0 -46 -4 -60 -25 -80 l-24 -25 -2111 0 -2111 0 -24
25 c-21 20 -25 34 -25 80 l0 55 2160 0 2160 0 0 -55z m-3496 -287 c15 -14 64
-109 121 -232 52 -116 95 -211 95 -213 0 -11 -367 333 -378 354 -16 30 -9 66
18 93 29 29 110 28 144 -2z m401 8 c10 -7 86 -148 169 -312 l151 -299 424
-169 425 -170 175 44 c97 23 183 47 192 51 10 5 117 192 239 416 122 225 233
418 246 431 22 20 36 22 120 22 87 0 97 -2 119 -25 14 -13 25 -36 25 -50 0
-14 -70 -179 -155 -367 l-155 -341 0 -286 c0 -333 -1 -333 -100 -437 l-60 -62
0 -96 0 -96 -265 0 -265 0 -583 505 -582 505 -148 325 c-81 178 -147 336 -147
350 0 14 11 37 25 50 19 20 34 25 78 25 29 0 62 -6 72 -14z m1835 9 c0 -7
-381 -707 -390 -718 -5 -5 -66 -23 -136 -41 l-129 -32 -373 149 -373 150 -125
248 -124 249 825 0 c454 0 825 -2 825 -5z m60 -1995 l0 -80 -400 0 -400 0 0
80 0 80 400 0 400 0 0 -80z"
        stroke="currentColor"
        strokeWidth={20}
      />
    </svg>
  );
}

export default Dish;