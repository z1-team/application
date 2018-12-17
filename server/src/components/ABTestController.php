<?php

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;

class ABTestController
{
  private $storage;

  public function __construct(ContainerInterface $container)
  {
    $this->storage = new AppStorage($container);
  }

  public function test(Request $request, Response $response, array $args)
  {
    $extra = ['banner' => 'bg3'];
    $tests = $this->storage->tests->listActive();
    $params = $this->storage->client->testParams($args['client'], $tests, $extra);
    return $response->withJson($params);
  }
}
