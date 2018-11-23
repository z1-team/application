<?php

require dirname(__FILE__) . '/vendor/autoload.php';

use ClickhouseClient\Client\Config;
use ClickhouseClient\Client\Client;

function withNull($value) {
  return strcmp($value, 'NULL') === 0 ? NULL : $value;
}

class Event
{
  private static $utm = [
    'utm_term' => 'utmTerm',
    'utm_source' => 'utmSource',
    'utm_medium' => 'utmMedium',
    'utm_campaign' => 'utmCampaign',
    'utm_content' => 'utmContent',
    'utm_gbid' => 'utmGbId',
    'utm_phrase' => 'utmPhrase',
    'utm_gender' => 'utmGender',
    'utm_age' => 'utmAge'
  ];
  private $default;
  private $request;

  private static function mapUtmKeys($key) {
    return isset(self::$utm[$key]) ? self::$utm[$key] : $key;
  }

  private function getField($field)
  {
    return isset($this->request[$field]) ?
      withNull($this->request[$field]) : $this->default[$field];
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
      'user_id' => NULL,
      'type' => 'event_none',
      'date' => date('Y-m-d'),
      'datetime' => date('Y-m-d H:i:s'),
      'localtime' => date('Y-m-d H:i:s'),
      'payload' => '{}',
      'user_ip' => NULL,
      'user_region' => NULL,
      'user_city' => NULL
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
    $utmParams = array_intersect_key($this->getPayload(), self::$utm);
    $utmParams['utm_source'] = $this->getField('utm_source');
    return array_map(['Event', 'mapUtmKeys'], array_keys($utmParams));
  }

  public function utmExtraValues()
  {
    $utmParams = array_intersect_key($this->getPayload(), self::$utm);
    $utmParams['utm_source'] = $this->getField('utm_source');
    return array_values($utmParams);
  }

  public function eventExtraKeys()
  {
    $otherParams = array_diff_key($this->getPayload(), self::$utm);
    return array_keys($otherParams);
  }

  public function eventExtraValues()
  {
    $otherParams = array_diff_key($this->getPayload(), self::$utm);
    return array_values($otherParams);
  }

  public function extraKeys()
  {
    $userId = $this->getField('user_id');
    return $userId !== NULL ? ['userId'] : [];
  }

  public function extraValues()
  {
    $userId = $this->getField('user_id');
    return $userId !== NULL ? [$userId] : [];
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
    return $this->getField('user_region');
  }

  public function userCity()
  {
    return  $this->getField('user_city');
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
        'ExtraKeys' => $event->extraKeys(),
        'ExtraValues' => $event->extraValues(),
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
