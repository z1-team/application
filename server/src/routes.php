<?php

use ClickhouseClient\Client\Config;
use Slim\Http\Request;
use Slim\Http\Response;

$app->post('/api/v1/event', function (Request $request, Response $response, array $args) {
  $config = new Config(
    ['host' => '140.82.39.71', 'port' => '8123', 'protocol' => 'http'],
    ['database' => 'analytics'],
    ['user' => 'z1', 'password' => '7Z0D/8wF']
  );
  $store = new EventStore($config);
  $store->save(new Event($_REQUEST));
  return $response->withHeader('Access-Control-Allow-Origin', '*');
});

$app->post('/api/v1/auth', function (Request $request, Response $response, array $args) {
  $body = $request->getParsedBody();
  $auth = new Auth($this->get('settings')['db']);
  $token = $auth->login($body['login'], $body['password']);
  $result = ['success' => false];
  if ($token) {
    $result = [
      'success' => true,
      'token' => $token
    ];
  }
  return $response->withJson($result)
    ->withHeader('Access-Control-Allow-Origin', '*');
});

$app->get('/api/v1/partners', function (Request $request, Response $response, array $args) {
  Partner::initClass($this->get('settings')['db']);
  $controller = new PartnerController($this->get('settings')['db']);
  return $response->withJson($controller->fetchAll())
    ->withHeader('Access-Control-Allow-Origin', '*');
});

$app->post('/api/v1/partners', function (Request $request, Response $response, array $args) {
  Partner::initClass($this->get('settings')['db']);
  $controller = new PartnerController($this->get('settings')['db']);
  $auth = new Auth($this->get('settings')['db']);
  $result = ['error' => 'unknown error'];
  $body = $request->getParsedBody();
  if (isset($body['token']) && isset($body['payload'])) {
    $account = $auth->verifyToken($body['token']);
    if ($account && strcmp($account['role'], 'admin') === 0) {
      $result = $controller->create($body['payload']);
    } else {
      $result = ['error' => 'Access denied'];
    }
  } else {
    $result = ['error' => 'Bad request'];
  }
  return $response->withJson($result)
    ->withHeader('Access-Control-Allow-Origin', '*');
});

$app->options('/api/v1/{path:.*}', function (Request $request, Response $response, array $args) {
  $this->logger->info("OPTIONS PASSED");
  return $response->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->put('/api/v1/partners', function (Request $request, Response $response, array $args) {
  $this->logger->info("Break point #1: PASSED");
  Partner::initClass($this->get('settings')['db']);
  $controller = new PartnerController($this->get('settings')['db']);
  $auth = new Auth($this->get('settings')['db']);
  $result = ['error' => 'unknown error'];
  $body = $request->getParsedBody();
  if (isset($body['token']) && isset($body['payload'])) {
    $account = $auth->verifyToken($body['token']);
    if ($account && strcmp($account['role'], 'admin') === 0) {
      $result = $controller->update($body['payload']);
    } else {
      $result = ['error' => 'Access denied'];
    }
  } else {
    $result = ['error' => 'Bad request'];
  }
  return $response->withJson($result)
    ->withHeader('Access-Control-Allow-Origin', '*');
});

$app->delete('/api/v1/partners/{id}', function (Request $request, Response $response, array $args) {
  Partner::initClass($this->get('settings')['db']);
  $controller = new PartnerController($this->get('settings')['db']);
  $auth = new Auth($this->get('settings')['db']);
  $result = ['error' => 'unknown error'];
  $account = $auth->verifyToken($body['token']);
  if ($account && strcmp($account['role'], 'admin') === 0) {
    $result = $controller->delete($args['id']);
  } else {
    $result = ['error' => 'Access denied'];
  }
  return $response->withJson($result)
    ->withHeader('Access-Control-Allow-Origin', '*');
});

$app->get('/{path:.*}', function (Request $request, Response $response, array $args) {
    $ip = $_SERVER['REMOTE_ADDR'];
    $geo = new GeoIP($this->get('settings')['db']);
    $ip_info = $geo->findCity($ip);
    $ip_info['ip'] = $ip;
    return $this->renderer->render($response, 'landing.php', [
      'ip_info' => $ip_info
    ]);
});