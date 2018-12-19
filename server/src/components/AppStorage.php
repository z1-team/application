<?php

use ClickhouseClient\Client\Client;
use ClickhouseClient\Client\Config;

class AppStorage
{
  public $tests;
  public $client;
  public $groups;

  public function __construct($container)
  {
    // Получаем настройки для БД
    $cs = $container->settings['clickhouse'];
    $config = $container->settings['db'];
    // Инициализируем локальную БД
    try {
      $localDB = new PDO($config['dsn'], $config['user'], $config['password']);
    } catch (PDOException $e) {
      echo 'Подключение не удалось: ' . $e->getMessage();
    }
    // Инициализируем ClickHouse
    $clickHouseConfig = new Config($cs[0], $cs[1], $cs[2]);
    $clickHouseDB = new Client($clickHouseConfig);
    // Подключаем хранилища
    $this->tests = new TestsStorage($localDB);
    $this->client = new ClientsStorage($localDB, $clickHouseDB);
    $this->groups = new GroupsStorage($localDB);
    $this->pushSubscribers = new PushSubscribersStorage($localDB);
  }
}
