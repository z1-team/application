<?php

$a = ['a' => 1, 'b' => 2, 'c' => 4];
var_dump(array_intersect_key($a, ['b' => 0, 'c' => 0]));
var_dump(array_diff_key($a, ['b' => 0, 'c' => 0]));
