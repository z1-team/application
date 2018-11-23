<?php

require('vendor/autoload.php');

use ClickhouseClient\Client\Config;
use ClickhouseClient\Client\Client;

class Event
{
  private $default;
  private $request;

  private function getField($field)
  {
    return isset($this->request[$field]) ? $this->request[$field] : $this->default[$field];
  }

  private function getPayload()
  {
    return json_decode($this->getField('payload'), true);
  }

  public function __construct($request)
  {
    $this->default = [
      'utm_source' => NULL,
      'utm_campaign' => NULL,
      'client_id' => NULL,
      'yclick_id' => NULL,
      'type' => 'event_none',
      'date' => date('Y-m-d'),
      'datetime' => date('Y-m-d H:i:s'),
      'localtime' => date('Y-m-d H:i:s'),
      'payload' => '{}'
    ];
    $this->request = $request;
  }

  public function name()
  {
    return $this->getField('type');
  }

  public function yClickId()
  {
    return $this->getField('yclick_id');
  }

  public function clientId()
  {
    return $this->getField('client_id');
  }

  public function utmCampaign()
  {
    return $this->getField('utm_campaign');
  }

  public function utmExtraKeys()
  {
    return ['utm_source'];
  }

  public function utmExtraValues()
  {
    return [$this->getField('utm_source')];
  }

  public function eventExtraKeys()
  {
    return array_keys($this->getPayload());
  }

  public function eventExtraValues()
  {
    return array_values($this->getPayload());
  }

  public function date()
  {
    return $this->getField('date');
  }

  public function dateTime()
  {
    return $this->getField('datetime');
  }

  public function userIP()
  {
    return $_SERVER['REMOTE_ADDR'];
  }

  public function userRegion()
  {
    return NULL;
  }

  public function userCity()
  {
    return NULL;
  }

  public function userLocalTime()
  {
    return $this->getField('localtime');
  }
}

class EventStore
{
  private $client;

  public function __construct($config)
  {
    $this->client = new Client($config);
  }

  public function save($event) {
    $this->client->writeRows('insert into analytics.events', [
      [
        'EventName' => $event->name(),
        'YClickId' => $event->yClickId(),
        'ClientId' => $event->clientId(),
        'UtmCampaign' => $event->utmCampaign(),
        'UtmExtraKeys' => $event->utmExtraKeys(),
        'UtmExtraValues' => $event->utmExtraValues(),
        'EventExtraKeys' => $event->eventExtraKeys(),
        'EventExtraValues' => $event->eventExtraValues(),
        'EventDate' => $event->date(),
        'EventDateTime' => $event->dateTime(),
        'UserIP' => $event->userIP(),
        'UserRegion' => $event->userRegion(),
        'UserCity' => $event->userCity(),
        'UserLocalTime' => $event->userLocalTime(),
        'ExtraKeys' => [],
        'ExtraValues' => [],
        'EventVersion' => 1
      ]
    ]);
  }
}

header('Access-Control-Allow-Origin: *');

$config = new Config(
  ['host' => '140.82.39.71', 'port' => '8123', 'protocol' => 'http'],
  ['database' => 'analytics'],
  ['user' => 'z1', 'password' => '7Z0D/8wF']
);

$store = new EventStore($config);
$store->save(new Event($_REQUEST));
