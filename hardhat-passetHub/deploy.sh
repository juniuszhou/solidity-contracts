#!/usr/bin/env bash

my_list=("ONE, One")
#     "TWO, Two"
#     "THREE, Three"
#     "FOUR, Four"
#     "FIVE, Five"
#     "SIX, Six"
#     "SEVEN, Seven"
#     "EIGHT, Eight"
#     "NINE, Nine"
#     "TEN, Ten"
#     "ELEVEN, Eleven"
#     "TWELVE, Twelve"
#     "THIRTEEN, Thirteen"
#     "FOURTEEN, Fourteen"
#     "FIFTEEN, Fifteen"
#     "SIXTEEN, Sixteen"
#     "SEVENTEEN, Seventeen"
#     "EIGHTEEN, Eighteen"
#     "NINETEEN, Nineteen"
#     "TWENTY, Twenty"
# )

for item in "${my_list[@]}"; do
    echo "$item"
done