<?php

function makeTest() {
  $testsCount = 4000;
  $test = [0, 0];

  for ($i = 0; $i < $testsCount; $i++) {
    $test[random_int(0, 1)] += 1;
  }

  $max = 0;

  foreach($test as $key => $value) {
    foreach($test as $key2 => $value2) {
      $max = max(abs($value2 - $value), $max);
    }
  }

  $total = 0;

  foreach($test as $key => $value) {
    $total += $value;
  }

  $avg = $total / 2;

  $maxAvg = 0;

  $minV = 1000000;
  $maxV = 0;

  foreach($test as $key => $value) {
    $maxAvg = max(abs($value - $avg), $maxAvg);
    $minV = min($value, $minV);
    $maxV = max($value, $maxV);
  }

  $maxAvgP = ($maxAvg / $avg) * 100;
  $maxP = ($max / $avg) * 100;
  $vCount = count($test);

  echo $test[0] . ", " . $test[1] . "\n";
}

for ($i = 0; $i < 10000; $i++) {
  makeTest();
}
