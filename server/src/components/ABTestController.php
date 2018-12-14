<?php

use Psr\Container\ContainerInterface;

class ABTestController
{
  private $storage;

  public function __construct(ContainerInterface $container)
  {
    $this->storage = new AppStorage($container);
  }

  public function test()
  {
    
  }
}
