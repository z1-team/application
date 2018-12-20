<?php

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;

class PushController
{
  private $storage;

  public function __construct(ContainerInterface $container)
  {
    $this->storage = new AppStorage($container);
  }

  public function save(Request $request, Response $response, array $args)
  {
    $body = $request->getParsedBody();
    $status = $this->storage->pushSubscribers->add($body['client_id'], $body['subscription']);
    return $response->withJson([
      'status' => $status
    ])->withHeader('Access-Control-Allow-Origin', '*');
  }
}
